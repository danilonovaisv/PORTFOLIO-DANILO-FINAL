import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = process.env.BUCKET || 'portfolio-media';

if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error("❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: { persistSession: false },
});

const CACHE_CONTROL_IMMUTABLE = 'public, max-age=31536000, immutable';

function normalizeName(str) {
    return String(str || '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function parseV3Path(oldPath) {
    // v3/<brand>/<project>/<kind>/<filename>
    // or v3/<brand>/<project>/<filename>
    const parts = oldPath.split('/');
    if (parts.length < 4 || parts[0] !== 'v3') return null;

    const brand = parts[1];
    const project = parts[2];
    let kind = undefined;
    let filenameRaw = parts[parts.length - 1];

    if (parts.length > 4) {
        kind = parts.slice(3, -1).join('-');
    }

    // extract ext
    const dotIndex = filenameRaw.lastIndexOf('.');
    const ext = dotIndex !== -1 ? filenameRaw.substring(dotIndex + 1) : 'bin';
    const nameBase = dotIndex !== -1 ? filenameRaw.substring(0, dotIndex) : filenameRaw;

    // Since old v3 paths might already have a hash at the end of nameBase, it's safer to just clean it up 
    // but it's okay, we'll re-slugify it and standard "hash" will just be part of the base if dirty.
    // Alternatively, try to remove old 16-char hash if present:
    const hashMatch = nameBase.match(/\.([a-f0-9]{16})$/);
    let cleanName = nameBase;
    if (hashMatch) {
        cleanName = nameBase.substring(0, hashMatch.index);
    }

    return { brand, project, kind, cleanName, ext };
}

function buildV4Path({ brand, project, kind, filename, ext, hash }) {
    const normalizedBrand = normalizeName(brand);
    const normalizedProject = normalizeName(project);

    const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
    const normalizedFilename = normalizeName(nameWithoutExt) || 'file';
    const normalizedExt = normalizeName(ext);

    const parts = ['v4', normalizedBrand, normalizedProject];
    if (kind) {
        const normalizedKind = normalizeName(kind);
        if (normalizedKind) parts.push(normalizedKind);
    }

    parts.push(`${normalizedFilename}.${hash}.${normalizedExt}`);
    return parts.join('/');
}

// Helper to list all files
async function listAllV3() {
    const allFiles = [];
    const queue = ['v3'];

    // Not perfect async queue but works for small/mid bucket
    while (queue.length > 0) {
        const currentPath = queue.shift();
        let offset = 0;

        while (true) {
            const { data, error } = await supabase.storage.from(BUCKET).list(currentPath, {
                limit: 1000,
                offset,
                sortBy: { column: 'name', order: 'asc' },
            });

            if (error) {
                throw error;
            }
            if (!data || data.length === 0) break;

            for (const item of data) {
                if (item.name === '.emptyFolderPlaceholder') continue;
                const fullPath = currentPath ? `${currentPath}/${item.name}` : item.name;

                if (!item.id || item.metadata === null || item.metadata?.mimetype === null) {
                    queue.push(fullPath);
                } else {
                    allFiles.push(fullPath);
                }
            }

            if (data.length < 1000) break;
            offset += 1000;
        }
    }

    return allFiles;
}

async function run() {
    console.log('Fetching list of v3 files...');
    const v3Files = await listAllV3();
    console.log(`Found ${v3Files.length} files to migrate.`);

    const map = {};
    const errors = [];
    let successCount = 0;

    for (const oldPath of v3Files) {
        console.log(`Processing: ${oldPath}`);
        const parsed = parseV3Path(oldPath);
        if (!parsed) {
            console.warn(`Could not parse v3 path: ${oldPath}`);
            errors.push({ oldPath, error: 'Could not parse path' });
            continue;
        }

        // 1. Download
        const { data: blob, error: downloadError } = await supabase.storage.from(BUCKET).download(oldPath);
        if (downloadError || !blob) {
            console.error(`Failed to download ${oldPath}`);
            errors.push({ oldPath, error: `Download failed: ${downloadError?.message}` });
            continue;
        }

        // 2. Hash
        const arrayBuffer = await blob.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const hash = crypto.createHash('sha256').update(buffer).digest('hex').slice(0, 16);

        // 3. New Path
        const newPath = buildV4Path({
            brand: parsed.brand,
            project: parsed.project,
            kind: parsed.kind,
            filename: parsed.cleanName,
            ext: parsed.ext,
            hash,
        });

        console.log(`  -> New path: ${newPath}`);

        // If new map already contains it, it's a duplicate. We can skip re-uploading, just map it.
        // However, maybe there are duplicates across v3. V4 natural hash prevents duplication at path level.
        // 4. Upload
        // We try to upload. If it already exists, Supabase throws if upsert:false. We can catch or check.
        const { data: uploadData, error: uploadError } = await supabase.storage.from(BUCKET).upload(newPath, buffer, {
            contentType: blob.type,
            cacheControl: CACHE_CONTROL_IMMUTABLE,
            upsert: false,
        });

        if (uploadError) {
            if (uploadError.message.includes('already exists') || uploadError.error === 'Duplicate') {
                console.log(`  -> Already exists (deduplicated). Mapping...`);
                map[oldPath] = newPath;
                successCount++;
            } else {
                console.error(`  -> Upload failed:`, uploadError);
                errors.push({ oldPath, error: uploadError.message });
            }
        } else {
            console.log(`  -> Migrated successfully.`);
            map[oldPath] = newPath;
            successCount++;
        }
    }

    const outDir = path.join(process.cwd(), 'scripts', 'migration-out');
    fs.mkdirSync(outDir, { recursive: true });

    fs.writeFileSync(path.join(outDir, 'asset-map-v4.json'), JSON.stringify(map, null, 2));
    if (errors.length > 0) {
        fs.writeFileSync(path.join(outDir, 'migration-errors.json'), JSON.stringify(errors, null, 2));
    }

    console.log(`\nMigration complete! Successfully mapped/uploaded ${successCount}/${v3Files.length} files.`);
    console.log(`Asset map saved to scripts/migration-out/asset-map-v4.json`);
}

run().catch(e => {
    console.error(e);
    process.exit(1);
});
