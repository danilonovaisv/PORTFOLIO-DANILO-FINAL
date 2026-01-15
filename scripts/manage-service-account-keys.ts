/**
 * Script to help manage service account keys
 *
 * This script helps rotate and manage service account keys to avoid hitting the 10-key limit
 *
 * Usage:
 * npx tsx scripts/manage-service-account-keys.ts --account=dannovaisv@gmail.com
 */

import { spawn } from 'child_process';
import { Command } from 'commander';

const program = new Command();

program
  .description('Manage service account keys')
  .option(
    '-a, --account danilo_novais@yahoo.com.br',
    'Service account email address'
  )
  .option('-l, --list', 'List all keys for the service account')
  .option('-c, --cleanup', 'Remove old keys that are older than 30 days')
  .parse(process.argv);

const options = program.opts();

/**
 * Executes a gcloud command
 */
function executeGcloudCommand(args: string[]): Promise<string> {
  return new Promise((resolve, reject) => {
    let stdout = '';
    let stderr = '';

    const cmd = spawn('gcloud', args);

    cmd.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    cmd.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    cmd.on('close', (code) => {
      if (code === 0) {
        resolve(stdout);
      } else {
        reject(new Error(`Command failed with exit code ${code}: ${stderr}`));
      }
    });
  });
}

/**
 * List all keys for a service account
 */
async function listKeys(serviceAccountEmail: string) {
  try {
    const result = await executeGcloudCommand([
      'iam',
      'service-accounts',
      'keys',
      'list',
      '--iam-account',
      serviceAccountEmail,
      '--format',
      'json',
    ]);

    const keys = JSON.parse(result);

    if (keys.length === 0) {
      console.log(`No keys found for service account: ${serviceAccountEmail}`);
      return;
    }

    console.log(
      `Found ${keys.length} keys for service account: ${serviceAccountEmail}`
    );
    keys.forEach((key: any) => {
      console.log(
        `Key ID: ${key.name.split('/').pop()}, Created: ${key.validAfterTime}, Expires: ${key.validBeforeTime}`
      );
    });
  } catch (error) {
    console.error(
      'Error listing keys:',
      error instanceof Error ? error.message : String(error)
    );
  }
}

/**
 * Cleanup old keys that are older than 30 days
 */
async function cleanupOldKeys(serviceAccountEmail: string) {
  try {
    const result = await executeGcloudCommand([
      'iam',
      'service-accounts',
      'keys',
      'list',
      '--iam-account',
      serviceAccountEmail,
      '--format',
      'json',
    ]);

    const keys = JSON.parse(result);

    if (keys.length === 0) {
      console.log(`No keys found for service account: ${serviceAccountEmail}`);
      return;
    }

    // Calculate date 30 days ago
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Filter keys older than 30 days
    const oldKeys = keys.filter((key: any) => {
      const creationDate = new Date(key.validAfterTime);
      return creationDate < thirtyDaysAgo;
    });

    if (oldKeys.length === 0) {
      console.log('No old keys to remove.');
      return;
    }

    console.log(
      `Found ${oldKeys.length} keys older than 30 days. Removing them...`
    );

    for (const key of oldKeys) {
      const keyId = key.name.split('/').pop();
      console.log(`Removing key: ${keyId}`);

      try {
        await executeGcloudCommand([
          'iam',
          'service-accounts',
          'keys',
          'delete',
          keyId,
          '--iam-account',
          serviceAccountEmail,
          '--quiet', // Skip confirmation
        ]);

        console.log(`Successfully removed key: ${keyId}`);
      } catch (error) {
        console.error(
          `Failed to remove key ${keyId}:`,
          error instanceof Error ? error.message : String(error)
        );
      }
    }
  } catch (error) {
    console.error(
      'Error during cleanup:',
      error instanceof Error ? error.message : String(error)
    );
  }
}

// Main execution
async function main() {
  if (!options.account) {
    console.error(
      'Error: Service account email is required. Use -a or --account to specify it.'
    );
    process.exit(1);
  }

  if (options.list) {
    await listKeys(options.account);
  } else if (options.cleanup) {
    await cleanupOldKeys(options.account);
  } else {
    console.log(
      'Please specify an action: --list to list keys, --cleanup to remove old keys'
    );
  }
}

// Run the script
main().catch((error) => {
  console.error('Script failed:', error);
  process.exit(1);
});
