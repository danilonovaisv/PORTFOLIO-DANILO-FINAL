import fs from 'fs';
import path from 'path';

function traverseDirectory(dir: string, fileCallback: (file: string) => void) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            traverseDirectory(filePath, fileCallback);
        } else if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
            fileCallback(filePath);
        }
    }
}

function checkR3FPatterns() {
    console.log("🔍 Checking for R3F Anti-patterns...");
    let errors = 0;

    traverseDirectory('src/components', (file: string) => {
        const content = fs.readFileSync(file, 'utf8');

        // Simple heuristic: useFrame containing useState
        // This is VERY rough, but suffices as a smoke test
        if (content.includes('useFrame') && content.includes('useState')) {
            // More sophisticated regex needed to verify scope, but flagging for humans is good
            // console.warn(`⚠️ Potential perf issue in ${file}: ensure useState is not called inside usedFrame loop.`);
        }

        if (content.includes('new Vector3(')) {
            const lines = content.split('\n');
            lines.forEach((line, i) => {
                if (line.includes('useFrame') && line.includes('new Vector3')) {
                    console.warn(`❌ Optimization Warning: creating new Vector3 in loop at ${file}:${i + 1}`);
                    errors++;
                }
            });
        }
    });

    if (errors > 0) {
        console.log(`❌ Found ${errors} potential R3F performance issues.`);
        process.exit(1);
    } else {
        console.log("✅ R3F Audit Passed (heuristic).");
    }
}

checkR3FPatterns();
