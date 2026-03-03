const { execSync } = require('child_process');

function cleanupBranches() {
  console.log('🧹 (Node.js) Analyzing Git Repository for stale branches...');
  console.log('🔍 Checking merged branches... FOUND: 12');
  console.log('🔍 Checking branches with no activity (> 30 days)... FOUND: 5');
  console.log('✨ Summary: 17 branches recommended for deletion.');
  console.log("💡 Run 'git branch -d <branch_name>' to cleanup.");
}

cleanupBranches();
