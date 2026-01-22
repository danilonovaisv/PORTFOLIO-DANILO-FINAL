#!/usr/bin/env node

import { spawn } from 'child_process';
import { argv } from 'process';

/**
 * Script to deploy with tracking capabilities
 * Supports flags like --all to deploy all services
 */

const PROJECT_ROOT = new URL('.', import.meta.url).pathname;

function runCommand(command, args = [], options = {}) {
  return new Promise((resolve, reject) => {
    const cmd = spawn(command, args, {
      stdio: 'inherit',
      cwd: PROJECT_ROOT,
      env: { ...process.env, FORCE_COLOR: 'true' },
      ...options,
    });

    cmd.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(
          new Error(`${command} ${args.join(' ')} exited with code ${code}`)
        );
      }
    });
  });
}

async function deployWithTracking() {
  console.log('Starting deployment with tracking...');

  // Parse command line arguments
  const args = argv.slice(2);
  const hasAllFlag = args.includes('--all');

  try {
    // Show diagnostic information
    await runCommand('node', ['-v']);
    await runCommand('npm', ['-v']);

    // Check if firebase is installed
    try {
      await runCommand('firebase', ['--version']);
    } catch (error) {
      console.error(
        'Firebase CLI not found. Please install with: npm install -g firebase-tools'
      );
      process.exit(1);
    }

    // Run the build
    console.log('Building project...');
    await runCommand('npm', ['run', 'build']);

    // Prepare deploy command
    let deployArgs = ['deploy'];

    if (!hasAllFlag) {
      // Default to hosting only if --all is not specified
      deployArgs.push('--only', 'hosting');
    }

    deployArgs.push('--project', 'portfolio-danilo-novais');

    // Add tracking information
    console.log(`Deploying to Firebase...`);
    console.log(`Command: firebase ${deployArgs.join(' ')}`);

    await runCommand('firebase', deployArgs);

    console.log('Deployment completed successfully!');
  } catch (error) {
    console.error('Deployment failed:', error.message);
    process.exit(1);
  }
}

// Execute the deployment
deployWithTracking();
