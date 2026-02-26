import fs from 'fs';
import path from 'path';

function walk(dir: string, filelist: string[] = []): string[] {
  const skipDirs = ['node_modules', '.next', '.git', 'public', 'out', 'dist'];
  try {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      if (skipDirs.includes(file)) continue;
      const filepath = path.join(dir, file);
      try {
        if (fs.statSync(filepath).isDirectory()) {
          filelist = walk(filepath, filelist);
        } else {
          if (filepath.endsWith('.tsx') || filepath.endsWith('.ts')) {
            filelist.push(filepath);
          }
        }
      } catch (e) {}
    }
  } catch (e) {}
  return filelist;
}

const files = walk(path.join(process.cwd(), 'src'));
let hasError = false;

for (const file of files) {
  const content = fs.readFileSync(file, 'utf-8');

  // 1. Check for legacy v2 or v1 hardcoded strings
  if (
    content.includes("'v1/") ||
    content.includes('"v1/') ||
    content.includes("'v2/") ||
    content.includes('"v2/')
  ) {
    console.error(`[Lint Error] Legacy v1/ or v2/ path ref found in ${file}`);
    hasError = true;
  }

  // 2. Simplistic check for <video> inside grid logic without hover constraints.
  if (
    file.includes('ProjectCard') &&
    content.includes('<video ') &&
    content.includes('autoPlay') &&
    !content.includes('isHovered')
  ) {
    console.error(
      `[Lint Error] <video autoPlay> directly in grid found in ${file}. Use poster WEBP with hover load instead.`
    );
    hasError = true;
  }
}

if (hasError) {
  console.log('V3 Migration Lint: FAILED ❌');
  process.exit(1);
} else {
  console.log('V3 Migration Lint: PASSED ✅');
}
