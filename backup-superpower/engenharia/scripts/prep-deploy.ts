#!/usr/bin/env node
import { spawn } from 'node:child_process';
import { access } from 'node:fs/promises';
import path from 'node:path';

const assetLists = process.argv.slice(2);
const defaultLists = ['assets.json', 'assets-about.json'];

/**
 * @param {string} command
 * @param {string[]} args
 * @returns {Promise<void>}
 */
async function runCommand(command: string, args: string[]) {
  return new Promise<void>((resolve, reject) => {
    const proc = spawn(command, args, {
      stdio: 'inherit',
      shell: true,
    });
    proc.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${command} ${args.join(' ')} exited with ${code}`));
      }
    });
    proc.on('error', reject);
  });
}

/**
 * @param {string} filePath
 * @returns {Promise<void>}
 */
async function ensureFileExists(filePath: string) {
  await access(filePath);
}

async function run() {
  const lists = assetLists.length > 0 ? assetLists : defaultLists;
  for (const list of lists) {
    const resolved = path.resolve(list);
    try {
      await ensureFileExists(resolved);
    } catch {
      console.warn(
        `Arquivo ${resolved} não encontrado — pulando sincronização.`
      );
      continue;
    }
    console.log(`Sincronizando assets a partir de "${resolved}"...`);
    await runCommand('pnpm', [
      'dlx',
      'tsx',
      'scripts/sync-site-assets.ts',
      resolved,
    ]);
  }

  console.log(
    'Assets sincronizados. Lembre-se de revalidar as rotas públicas se necessário:'
  );
  console.log(' - "/"');
  console.log(' - "/about"');
  console.log(' - "/portfolio"');
}

run().catch((error) => {
  console.error('Erro preparando deploy:', error);
  process.exit(1);
});
