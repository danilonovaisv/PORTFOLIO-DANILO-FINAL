import fs from 'fs';
import path from 'path';

// This is a naive dependency tracing script to find dead TS/TSX files
// It traverses all code and maps out who imports what, starting from entry points.

const srcDir = path.join(process.cwd(), 'src');

const allFiles = new Set();
const importedFiles = new Set();
const entryPoints = [
    path.join(srcDir, 'app/layout.tsx'),
    path.join(srcDir, 'app/page.tsx'),
    // add other main entrypoints
];

function getExt(p) {
    if (fs.existsSync(p)) {
        if (!fs.statSync(p).isDirectory()) return p;
    }
    for (const ext of ['.ts', '.tsx', '.js', '.jsx', '/index.ts', '/index.tsx', '/index.js']) {
        if (fs.existsSync(p + ext)) return p + ext;
    }
    return null;
}

function processFile(filepath) {
    if (!filepath || importedFiles.has(filepath)) return;

    try {
        const stat = fs.statSync(filepath);
        if (stat.isDirectory()) return;
    } catch (e) { return; }

    importedFiles.add(filepath);

    let content = "";
    try {
        content = fs.readFileSync(filepath, 'utf8');
    } catch (e) { return; }

    // Extract imports
    const importRegex = /(?:import|from|require)\s*\(?['"]([^'"]+)['"]\)?/g;
    let match;
    while ((match = importRegex.exec(content)) !== null) {
        let dep = match[1];
        let resolvedDep = null;

        if (dep.startsWith('@/')) {
            resolvedDep = path.join(srcDir, dep.replace('@/', ''));
        } else if (dep.startsWith('.')) {
            resolvedDep = path.resolve(path.dirname(filepath), dep);
        }

        if (resolvedDep && resolvedDep.startsWith(srcDir)) {
            const finalDep = getExt(resolvedDep);
            if (finalDep && !importedFiles.has(finalDep)) {
                processFile(finalDep);
            }
        }
    }
}

// Map all valid files
function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filepath = path.join(dir, file);
        try {
            const stat = fs.statSync(filepath);
            if (stat.isDirectory()) {
                walk(filepath);
            } else if (filepath.match(/\.(ts|tsx)$/)) {
                allFiles.add(filepath);
            }
        } catch (e) { }
    }
}

walk(srcDir);

// Check standard Next.js entry points
const appDir = path.join(srcDir, 'app');
function findEntries(dir) {
    try {
        for (const file of fs.readdirSync(dir)) {
            const filepath = path.join(dir, file);
            if (fs.statSync(filepath).isDirectory()) {
                findEntries(filepath);
            } else if (file === 'page.tsx' || file === 'layout.tsx' || file === 'route.ts' || file === 'template.tsx') {
                entryPoints.push(filepath);
            }
        }
    } catch (e) { }
}
findEntries(appDir);

// Trace
for (const entry of entryPoints) {
    if (fs.existsSync(entry)) processFile(entry);
}

// Compute diff
console.log('Unused files detected (naive scan):');
let orphans = 0;
for (const file of allFiles) {
    if (!importedFiles.has(file)) {
        // Exclude definition files and config files
        if (!file.endsWith('.d.ts') && !file.includes('/dataconnect-') && !file.includes('/types/')) {
            console.log(file.replace(process.cwd() + '/', ''));
            orphans++;
        }
    }
}
console.log(`\nTotal potential orphans: ${orphans}`);

