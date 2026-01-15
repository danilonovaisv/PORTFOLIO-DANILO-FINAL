#!/usr/bin/env node
'use strict';
const { spawn } = require('child_process');

const args = process.argv.slice(2);
const isListCommand =
  args[0] === 'ls' && args.some((option) => option.startsWith('--json'));

if (isListCommand) {
  const pnpmProcess = spawn(
    'pnpm',
    ['list', '--prod', '--depth', 'Infinity', '--json'],
    {
      stdio: ['ignore', 'pipe', 'pipe'],
    }
  );
  let stdout = '';

  pnpmProcess.stdout.on('data', (chunk) => {
    stdout += chunk.toString();
  });

  pnpmProcess.stderr.on('data', (chunk) => {
    process.stderr.write(chunk);
  });

  pnpmProcess.on('close', (code) => {
    if (code !== 0) {
      process.exit(code);
    }

    try {
      const parsed = JSON.parse(stdout);
      const dependencies = parsed[0]?.dependencies || {};
      process.stdout.write(JSON.stringify({ dependencies }));
      process.exit(0);
    } catch (error) {
      console.error('Unable to parse pnpm list output:', error);
      process.exit(1);
    }
  });
} else {
  const npmPath = process.env.REAL_NPM_PATH || 'npm';
  const npmProcess = spawn(npmPath, args, { stdio: 'inherit' });
  npmProcess.on('exit', (code) => {
    process.exit(code ?? 0);
  });
}
