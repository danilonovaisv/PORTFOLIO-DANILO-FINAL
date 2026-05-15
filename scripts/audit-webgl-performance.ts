import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CANVAS_DIR = path.resolve(__dirname, '../src/components/canvas');

const ALLOCATION_PATTERNS = [
  /new THREE\.(Vector[23]|Matrix[34]|Euler|Color|Quaternion)\(/g,
  /\{[^{}]*:[^{}]*\}/g, // Generic object literal check
];

const INSTANCED_MESH_PATTERN = /InstancedMesh/g;
const ANIMATION_LOOP_PATTERNS = [/useFrame\(/, /requestAnimationFrame\(/];

async function auditFile(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const fileName = path.relative(CANVAS_DIR, filePath);

  const results = {
    file: fileName,
    allocationsInLoop: [] as string[],
    instancedMeshes: 0,
    hasLoop: false,
  };

  results.hasLoop = ANIMATION_LOOP_PATTERNS.some((p) => p.test(content));
  const instancedMatches = content.match(INSTANCED_MESH_PATTERN);
  results.instancedMeshes = instancedMatches ? instancedMatches.length : 0;

  if (results.hasLoop) {
    let inLoop = false;
    let braceCount = 0;

    lines.forEach((line, index) => {
      if (ANIMATION_LOOP_PATTERNS.some((p) => p.test(line))) {
        inLoop = true;
        braceCount =
          (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
        return;
      }

      if (inLoop) {
        braceCount +=
          (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;

        // Simple heuristic: check for new allocations inside the loop block
        ALLOCATION_PATTERNS.forEach((pattern) => {
          if (pattern.test(line)) {
            // Exclude common safe patterns like uniform updates if they don't allocate
            if (!line.includes('.uniforms.') || line.includes('new THREE.')) {
              results.allocationsInLoop.push(
                `Line ${index + 1}: ${line.trim()}`
              );
            }
          }
        });

        if (braceCount <= 0) {
          inLoop = false;
        }
      }
    });
  }

  return results;
}

async function walk(dir: string, filelist: string[] = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);
    if (stat.isDirectory()) {
      filelist = await walk(filepath, filelist);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      filelist.push(filepath);
    }
  }
  return filelist;
}

async function main() {
  console.log('🚀 Starting WebGL Performance Audit...');
  const files = await walk(CANVAS_DIR);
  const reports = [];

  for (const file of files) {
    reports.push(await auditFile(file));
  }

  console.log('\n--- AUDIT REPORT ---\n');

  let totalIssues = 0;

  reports.forEach((report) => {
    if (report.hasLoop || report.instancedMeshes > 0) {
      console.log(`FILE: ${report.file}`);
      console.log(
        `- Animation Loop: ${report.hasLoop ? '✅ Detected' : '❌ Not detected'}`
      );
      console.log(`- InstancedMeshes: ${report.instancedMeshes}`);

      if (report.allocationsInLoop.length > 0) {
        console.log(`- ⚠️ Potential Allocations in Loop:`);
        report.allocationsInLoop.forEach((issue) => {
          console.log(`    ${issue}`);
          totalIssues++;
        });
      } else if (report.hasLoop) {
        console.log(`- ✅ Zero Allocation Policy seems followed.`);
      }
      console.log('');
    }
  });

  if (totalIssues === 0) {
    console.log('✨ All clear! No obvious WebGL performance issues detected.');
  } else {
    console.log(`❌ Found ${totalIssues} potential issues. Please review.`);
  }
}

main().catch(console.error);
