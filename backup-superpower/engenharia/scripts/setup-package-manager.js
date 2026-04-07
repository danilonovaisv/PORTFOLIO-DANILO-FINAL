import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import os from 'os';

const HOME_DIR = os.homedir();
const GLOBAL_CONFIG_PATH = path.join(
  HOME_DIR,
  '.claude',
  'package-manager.json'
);
const PROJECT_CONFIG_PATH = path.join(
  process.cwd(),
  '.claude',
  'package-manager.json'
);
const PACKAGE_JSON_PATH = path.join(process.cwd(), 'package.json');

const args = process.argv.slice(2);

function getAvailableManagers() {
  const managers = ['pnpm', 'bun', 'yarn', 'npm'];
  return managers.filter((m) => {
    try {
      execSync(`${m} --version`, { stdio: 'ignore' });
      return true;
    } catch (e) {
      return false;
    }
  });
}

function detectPackageManager() {
  // 1. Env variable
  if (process.env.CLAUDE_PACKAGE_MANAGER) {
    return {
      source: 'environment variable',
      value: process.env.CLAUDE_PACKAGE_MANAGER,
    };
  }

  // 2. Project config
  if (fs.existsSync(PROJECT_CONFIG_PATH)) {
    const config = JSON.parse(fs.readFileSync(PROJECT_CONFIG_PATH, 'utf-8'));
    if (config.packageManager) {
      return {
        source: 'project config (.claude/package-manager.json)',
        value: config.packageManager,
      };
    }
  }

  // 3. package.json
  if (fs.existsSync(PACKAGE_JSON_PATH)) {
    const pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf-8'));
    if (pkg.packageManager) {
      return {
        source: 'package.json',
        value: pkg.packageManager.split('@')[0],
      };
    }
  }

  // 4. Lock file
  const lockFiles = {
    'pnpm-lock.yaml': 'pnpm',
    'bun.lockb': 'bun',
    'yarn.lock': 'yarn',
    'package-lock.json': 'npm',
  };
  for (const [file, manager] of Object.entries(lockFiles)) {
    if (fs.existsSync(path.join(process.cwd(), file))) {
      return { source: `lock file (${file})`, value: manager };
    }
  }

  // 5. Global config
  if (fs.existsSync(GLOBAL_CONFIG_PATH)) {
    const config = JSON.parse(fs.readFileSync(GLOBAL_CONFIG_PATH, 'utf-8'));
    if (config.packageManager) {
      return {
        source: 'global config (~/.claude/package-manager.json)',
        value: config.packageManager,
      };
    }
  }

  // 6. Fallback
  const available = getAvailableManagers();
  if (available.length > 0) {
    return { source: 'fallback (first available)', value: available[0] };
  }

  return { source: 'none', value: 'npm' };
}

if (args.includes('--detect')) {
  const result = detectPackageManager();
  console.log(
    `Detected package manager: ${result.value} (from ${result.source})`
  );
} else if (args.includes('--list')) {
  console.log('Available package managers:', getAvailableManagers().join(', '));
} else if (args.includes('--global')) {
  const manager = args[args.indexOf('--global') + 1];
  if (!manager) {
    console.error('Error: Please specify a package manager.');
    process.exit(1);
  }
  const configDir = path.dirname(GLOBAL_CONFIG_PATH);
  if (!fs.existsSync(configDir)) fs.mkdirSync(configDir, { recursive: true });
  fs.writeFileSync(
    GLOBAL_CONFIG_PATH,
    JSON.stringify({ packageManager: manager }, null, 2)
  );
  console.log(`Global package manager set to: ${manager}`);
} else if (args.includes('--project')) {
  const manager = args[args.indexOf('--project') + 1];
  if (!manager) {
    console.error('Error: Please specify a package manager.');
    process.exit(1);
  }
  const configDir = path.dirname(PROJECT_CONFIG_PATH);
  if (!fs.existsSync(configDir)) fs.mkdirSync(configDir, { recursive: true });
  fs.writeFileSync(
    PROJECT_CONFIG_PATH,
    JSON.stringify({ packageManager: manager }, null, 2)
  );
  console.log(`Project package manager set to: ${manager}`);
} else {
  console.log(
    'Usage: node scripts/setup-package-manager.js [--detect | --list | --global <manager> | --project <manager>]'
  );
}
