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

const child = spawn(cmdString, {
  stdio: 'inherit',
  shell: true,
  env: process.env, // Passa as variaveis carregadas
});

child.on('exit', (code) => process.exit(code));
