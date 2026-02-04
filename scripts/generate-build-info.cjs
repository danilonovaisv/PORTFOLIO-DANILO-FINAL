const fs = require('fs');
const path = require('path');

function pickSha() {
  return (
    process.env.GITHUB_SHA ||
    process.env.NEXT_PUBLIC_GIT_SHA ||
    process.env.VERCEL_GIT_COMMIT_SHA ||
    process.env.CF_PAGES_COMMIT_SHA ||
    ''
  );
}

function main() {
  const sha = pickSha();
  const shortSha = sha ? sha.slice(0, 7) : '';
  const iso = new Date().toISOString();

  const buildInfo = {
    buildTimeISO: iso,
    gitSha: sha,
    gitShaShort: shortSha,
    nodeEnv: process.env.NODE_ENV || '',
  };

  const publicDir = path.join(process.cwd(), 'public');
  const outFile = path.join(publicDir, 'build-info.json');

  fs.mkdirSync(publicDir, { recursive: true });
  fs.writeFileSync(outFile, JSON.stringify(buildInfo, null, 2) + '\n', 'utf8');

  // process.stdout.write('[build-info] wrote ' + outFile + '\n');
  // process.stdout.write('[build-info] ' + JSON.stringify(buildInfo) + '\n');
}

main();
