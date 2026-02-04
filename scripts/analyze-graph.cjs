const { spawnSync } = require('child_process');

function hasGraphviz() {
  const result = spawnSync('gvpr', ['--version'], { stdio: 'ignore' });
  return result.status === 0;
}

if (!hasGraphviz()) {
  console.warn(
    'Graphviz (gvpr) is not available in PATH. Skipping graph generation (analysis still runs).'
  );
  process.exit(0);
}

const madge = spawnSync('madge', ['app', '--image', 'graph.svg'], {
  stdio: 'inherit',
});
if (madge.status !== 0) {
  process.exit(madge.status || 1);
}
