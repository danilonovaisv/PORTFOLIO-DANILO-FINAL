import fs from 'fs';
import path from 'path';

const NEXT_CONFIG_PATH = path.join(process.cwd(), 'next.config.mjs');

function validateAndFixConfig() {
  if (!fs.existsSync(NEXT_CONFIG_PATH)) {
    console.error('❌ next.config.mjs not found!');
    process.exit(1);
  }

  let content = fs.readFileSync(NEXT_CONFIG_PATH, 'utf-8');

  // Check if output: 'standalone' is present and active (not commented)
  const standaloneRegex = /output:\s*['"]standalone['"]/;

  if (
    standaloneRegex.test(content) &&
    !content.match(/\/\/\s*output:\s*['"]standalone['"]/)
  ) {
    console.log('✅ Next.js Config: Standalone mode is active.');
    return;
  }

  console.warn(
    '⚠️ Next.js Config: Standalone mode MISSING or COMMENTED. Applying fix...'
  );

  // If commented out, uncomment it
  if (content.match(/\/\/\s*output:\s*['"]standalone['"]/)) {
    content = content.replace(/\/\/\s*(output:\s*['"]standalone['"])/, '$1');
  }
  // If missing entirely, inject it inside nextConfig object
  else if (content.includes('const nextConfig = {')) {
    content = content.replace(
      'const nextConfig = {',
      "const nextConfig = {\n  output: 'standalone',"
    );
  } else {
    console.error(
      '❌ Could not automatically inject standalone config. Please add "output: \'standalone\'" manually.'
    );
    process.exit(1);
  }

  fs.writeFileSync(NEXT_CONFIG_PATH, content, 'utf-8');
  console.log('✅ Fixed: Enabled standalone output in next.config.mjs');
}

validateAndFixConfig();
