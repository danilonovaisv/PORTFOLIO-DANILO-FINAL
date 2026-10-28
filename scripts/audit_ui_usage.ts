import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const uiDir = 'src/components/ui';
const srcDir = 'src';

function getUiFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return getUiFiles(fullPath);
    if (entry.isFile() && /\.(tsx|ts)$/.test(entry.name)) return [fullPath];
    return [];
  });
}

const files = getUiFiles(uiDir);

console.log('--- UI Component Usage Audit ---');

files.forEach((filePath) => {
  const baseName = path.basename(filePath);
  const componentName = baseName.replace(/\.(tsx|ts)$/, '');

  try {
    const grepCommand = `grep -rn "${componentName}" ${srcDir} --exclude="${baseName}"`;
    const result = execSync(grepCommand, { encoding: 'utf8' });
    if (!result.trim()) {
      console.log(`[UNUSED] ${filePath}`);
    }
  } catch {
    console.log(`[UNUSED] ${filePath}`);
  }
});
