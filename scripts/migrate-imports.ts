import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src');

function walk(dir: string, callback: (filepath: string) => void) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filepath = path.join(dir, file);
        const stat = fs.statSync(filepath);
        if (stat.isDirectory()) {
            walk(filepath, callback);
        } else {
            if (filepath.endsWith('.ts') || filepath.endsWith('.tsx')) {
                callback(filepath);
            }
        }
    }
}

let modifiedFiles = 0;

walk(srcDir, (filepath) => {
    let content = fs.readFileSync(filepath, 'utf8');
    let originalContent = content;

    // Match import ... from '../something' or import ... from './something'
    // and require('../something')

    // We need to resolve what '../something' means relative to `filepath`
    // and then convert it to `@/something`.

    content = content.replace(/from\s+['"](\.\.?\/[^'"]+)['"]/g, (match, p1) => {
        try {
            const absoluteTarget = path.resolve(path.dirname(filepath), p1);
            if (absoluteTarget.startsWith(srcDir)) {
                // It's inside src, convert to @/...
                const relativeToSrc = path.relative(srcDir, absoluteTarget);
                return `from '@/${relativeToSrc}'`;
            }
        } catch (e) { /* ignore */ }
        return match;
    });

    content = content.replace(/import\s+['"](\.\.?\/[^'"]+)['"]/g, (match, p1) => {
        try {
            const absoluteTarget = path.resolve(path.dirname(filepath), p1);
            if (absoluteTarget.startsWith(srcDir)) {
                // It's inside src, convert to @/...
                const relativeToSrc = path.relative(srcDir, absoluteTarget);
                return `import '@/${relativeToSrc}'`;
            }
        } catch (e) { /* ignore */ }
        return match;
    });

    content = content.replace(/require\(['"](\.\.?\/[^'"]+)['"]\)/g, (match, p1) => {
        try {
            const absoluteTarget = path.resolve(path.dirname(filepath), p1);
            if (absoluteTarget.startsWith(srcDir)) {
                // It's inside src, convert to @/...
                const relativeToSrc = path.relative(srcDir, absoluteTarget);
                return `require('@/${relativeToSrc}')`;
            }
        } catch (e) { /* ignore */ }
        return match;
    });

    if (content !== originalContent) {
        fs.writeFileSync(filepath, content, 'utf8');
        modifiedFiles++;
        console.log(`Updated imports in ${path.relative(process.cwd(), filepath)}`);
    }
});

console.log(`\nImport rewrite complete. Modified ${modifiedFiles} files.`);
