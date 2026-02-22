import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src');

function walk(dir, callback) {
  let files = [];
  try {
    files = fs.readdirSync(dir);
  } catch (e) {
    return;
  }

  for (const file of files) {
    const filepath = path.join(dir, file);
    try {
      const stat = fs.statSync(filepath);
      if (stat.isDirectory()) {
        walk(filepath, callback);
      } else {
        if (
          filepath.endsWith('.ts') ||
          filepath.endsWith('.tsx') ||
          filepath.endsWith('.js') ||
          filepath.endsWith('.jsx')
        ) {
          callback(filepath);
        }
      }
    } catch (e) {
      continue;
    }
  }
}

let modifiedFiles = 0;

walk(srcDir, (filepath) => {
  let content;
  try {
    content = fs.readFileSync(filepath, 'utf8');
  } catch (e) {
    return;
  }

  let originalContent = content;

  // Match import ... from '../something' or import ... from './something'
  // and require('../something')

  content = content.replace(/from\s+['"](\.\.?\/[^'"]+)['"]/g, (match, p1) => {
    try {
      const absoluteTarget = path.resolve(path.dirname(filepath), p1);
      if (absoluteTarget.startsWith(srcDir)) {
        let relativeToSrc = path.relative(srcDir, absoluteTarget);
        // Ensure we don't end up with backwards slashes on Windows just in case
        relativeToSrc = relativeToSrc.replace(/\\/g, '/');
        return `from '@/${relativeToSrc}'`;
      }
    } catch (e) {
      /* ignore */
    }
    return match;
  });

  content = content.replace(
    /import\s+['"](\.\.?\/[^'"]+)['"]/g,
    (match, p1) => {
      try {
        if (!match.includes('from ')) {
          const absoluteTarget = path.resolve(path.dirname(filepath), p1);
          if (absoluteTarget.startsWith(srcDir)) {
            let relativeToSrc = path.relative(srcDir, absoluteTarget);
            relativeToSrc = relativeToSrc.replace(/\\/g, '/');
            return `import '@/${relativeToSrc}'`;
          }
        }
      } catch (e) {
        /* ignore */
      }
      return match;
    }
  );

  content = content.replace(
    /require\(['"](\.\.?\/[^'"]+)['"]\)/g,
    (match, p1) => {
      try {
        const absoluteTarget = path.resolve(path.dirname(filepath), p1);
        if (absoluteTarget.startsWith(srcDir)) {
          let relativeToSrc = path.relative(srcDir, absoluteTarget);
          relativeToSrc = relativeToSrc.replace(/\\/g, '/');
          return `require('@/${relativeToSrc}')`;
        }
      } catch (e) {
        /* ignore */
      }
      return match;
    }
  );

  if (content !== originalContent) {
    try {
      fs.writeFileSync(filepath, content, 'utf8');
      modifiedFiles++;
      console.log(
        `Updated imports in ${path.relative(process.cwd(), filepath)}`
      );
    } catch (e) {
      console.error(`Failed to write ${filepath}`, e);
    }
  }
});

console.log(`\nImport rewrite complete. Modified ${modifiedFiles} files.`);
