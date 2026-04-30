import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const uiDir = 'src/components/ui';
const srcDir = 'src';

const files = fs
  .readdirSync(uiDir)
  .filter((f) => f.endsWith('.tsx') || f.endsWith('.ts'));

console.log('--- UI Component Usage Audit ---');

files.forEach((file) => {
  const componentName = file.replace(/\.(tsx|ts)$/, '');
  const baseName = path.basename(file);

  // Search for imports of this component
  // Common patterns:
  // '@/components/ui/component-name'
  // '../ui/component-name'
  // './component-name'

  try {
    const grepCommand = `grep -r "${componentName}" ${srcDir} --exclude-dir=ui`;
    const result = execSync(grepCommand, { encoding: 'utf8' });
    if (!result.trim()) {
      console.log(`[UNUSED] ${file}`);
    } else {
      // console.log(`[USED  ] ${file}`);
    }
  } catch (error) {
    // Grep returns exit code 1 if no matches found
    console.log(`[UNUSED] ${file}`);
  }
});
