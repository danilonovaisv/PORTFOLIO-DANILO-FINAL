const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.resolve(__dirname, '../public');
const SRC_DIR = path.resolve(__dirname, '../src');

function getAllFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      // Ignore .DS_Store and build-info.json
      if (file !== '.DS_Store' && file !== 'build-info.json') {
        fileList.push(path.relative(PUBLIC_DIR, filePath));
      }
    }
  });
  return fileList;
}

function searchInFile(filePath, searchString) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return content.includes(searchString);
  } catch (e) {
    return false;
  }
}

function searchInDir(dir, searchString) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (searchInDir(filePath, searchString)) return true;
    } else {
      if (searchInFile(filePath, searchString)) return true;
    }
  }
  return false;
}

const publicFiles = getAllFiles(PUBLIC_DIR);
const unusedFiles = [];

console.log(`Analyzing ${publicFiles.length} files in public directory...`);

publicFiles.forEach((file) => {
  // Normalize path separators to forward slash for search (as used in imports/src)
  const normalizedFile = file.split(path.sep).join('/');
  // Also search just for the filename, as sometimes paths are relative or partial
  const fileName = path.basename(file);

  // Strategy: aggressive search. If the filename appears anywhere in src, assume used.
  // This avoids false positives (deleting used files) at cost of some false negatives (keeping unused).
  // We can refine to search for normalizedFile if fileName is too common (e.g. "icon.png").
  // But for now, let's search for the filename first.

  const found = searchInDir(SRC_DIR, fileName);

  if (!found) {
    unusedFiles.push(file);
  }
});

console.log('\nPotential Unused Files in public/:');
if (unusedFiles.length === 0) {
  console.log('None found.');
} else {
  unusedFiles.forEach((f) => console.log(f));
}
