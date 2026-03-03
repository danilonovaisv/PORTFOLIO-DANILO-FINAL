import fs from 'fs';
import path from 'path';

function checkFirebasePredeploy() {
  console.log('🔍 Checking Firebase Pre-Deploy Requirements...');

  const packageJsonPath = path.resolve(process.cwd(), 'package.json');
  const firebaseJsonPath = path.resolve(process.cwd(), 'firebase.json');

  if (!fs.existsSync(packageJsonPath)) {
    console.error('❌ package.json not found');
    process.exit(1);
  }

  const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const nodeVersion = pkg.engines?.node;

  console.log(`ℹ️ Project Node Version: ${nodeVersion}`);

  // Firebase Functions typically support specific LTS versions (18, 20, 22)
  if (!['18', '20', '22'].includes(nodeVersion?.replace('>=', ''))) {
    console.warn(
      `⚠️ Warning: Node version ${nodeVersion} might not match Firebase Functions runtime. Recommended: 18, 20, or 22.`
    );
  }

  if (fs.existsSync(firebaseJsonPath)) {
    const firebaseJson = JSON.parse(fs.readFileSync(firebaseJsonPath, 'utf8'));

    // Check webframeworks rewrite
    const hasRewrite = firebaseJson.hosting?.rewrites?.some(
      (r: any) => r.source === '**' && r.function
    );
    const hasWebFrameworksBackend = !!firebaseJson.hosting?.frameworksBackend;

    if (hasRewrite || hasWebFrameworksBackend) {
      console.log(
        '✅ Hosting configuration found (Rewrite or Frameworks Backend)'
      );
    } else {
      console.warn(
        "⚠️ No catch-all rewrite or frameworksBackend found. Ensure 'webframeworks' handles SSR."
      );
    }
  } else {
    console.error('❌ firebase.json not found');
    process.exit(1);
  }

  console.log('✅ Firebase Config Check Complete.');
}

checkFirebasePredeploy();
