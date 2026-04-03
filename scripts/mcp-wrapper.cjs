const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Tenta carregar dotenv se disponível
try {
  const dotenv = require('dotenv');

  // Prioridade: .env.local > .env
  const envLocal = path.resolve(process.cwd(), '.env.local');
  const env = path.resolve(process.cwd(), '.env');

  if (fs.existsSync(envLocal)) {
    dotenv.config({ path: envLocal });
  } else if (fs.existsSync(env)) {
    dotenv.config({ path: env });
  }
} catch (e) {
  console.warn(
    '⚠️  dotenv not found, running without pre-loaded environment variables.'
  );
}

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('❌  No command provided to mcp-wrapper.');
  process.exit(1);
}

// Reconstrói o comando
const cmdString = args.join(' ');
console.log(`🚀  [MCP-Wrapper] Executing: ${cmdString}`);

// Ensure common paths are in PATH for execution environment
const commonPaths = [
  '/opt/homebrew/bin',
  '/usr/local/bin',
  '/usr/bin',
  '/bin',
  '/usr/sbin',
  '/sbin'
];

const currentPath = process.env.PATH || '';
const additionalPaths = commonPaths.filter(p => !currentPath.includes(p)).join(path.delimiter);
const updatedEnvironment = {
  ...process.env,
  PATH: additionalPaths ? `${additionalPaths}${path.delimiter}${currentPath}` : currentPath
};

const child = spawn(cmdString, {
  stdio: 'inherit',
  shell: true,
  env: updatedEnvironment, // Passa as variaveis carregadas + PATH atualizado
});

child.on('exit', (code) => process.exit(code));
