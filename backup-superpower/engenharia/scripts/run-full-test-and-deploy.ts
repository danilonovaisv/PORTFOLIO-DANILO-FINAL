#!/usr/bin/env tsx
/**
 * Full Test and Deploy Script
 * Runs all tests (lint, typecheck, unit tests) and deploys if all pass
 */

import { execSync } from 'child_process';
import { exit } from 'process';

const RESET = '\x1b[0m';
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const BLUE = '\x1b[34m';

function log(message: string, color = RESET) {
  console.log(`${color}${message}${RESET}`);
}

function runCommand(command: string, description: string): boolean {
  log(`\n${'='.repeat(60)}`, BLUE);
  log(`▶ ${description}`, BLUE);
  log('='.repeat(60), BLUE);

  try {
    execSync(command, { stdio: 'inherit', cwd: process.cwd() });
    log(`✅ ${description} - PASSED`, GREEN);
    return true;
  } catch (error) {
    log(`❌ ${description} - FAILED`, RED);
    return false;
  }
}

async function main() {
  log('\n🚀 Starting Full Test and Deploy Pipeline\n', BLUE);

  const steps = [
    { cmd: 'pnpm run lint', desc: 'Linting' },
    { cmd: 'pnpm run typecheck', desc: 'Type Checking' },
    { cmd: 'pnpm exec jest', desc: 'Unit Tests' },
  ];

  // Run all test steps
  for (const step of steps) {
    const success = runCommand(step.cmd, step.desc);
    if (!success) {
      log('\n❌ Tests failed. Deployment aborted.', RED);
      exit(1);
    }
  }

  log('\n✅ All tests passed!', GREEN);
  log('\n📦 Starting deployment...', YELLOW);

  // Run deployment
  const deploySuccess = runCommand('pnpm run deploy', 'Deployment');

  if (deploySuccess) {
    log('\n🎉 Deployment completed successfully!', GREEN);
    exit(0);
  } else {
    log('\n❌ Deployment failed.', RED);
    exit(1);
  }
}

main().catch((error) => {
  log(`\n❌ Unexpected error: ${error.message}`, RED);
  exit(1);
});
