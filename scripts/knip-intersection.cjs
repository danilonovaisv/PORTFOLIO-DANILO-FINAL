// knip-intersection.js
const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

// Configuração
const OLD_FILES_PATH = process.argv[2]; // Arquivo gerado pelo script bash anterior
const EXCLUDE_PATTERNS = [
  '.agent/',
  'knip.config',
  'package.json',
  '.env',
  'node_modules',
  'public/',
  'next.config',
  'postcss.config',
  'tailwind.config',
  'tsconfig.json',
  'README.md',
  'LICENSE',
  'ignore',
];

function main() {
  console.error('Executando Knip para análise estrutural...');

  if (!OLD_FILES_PATH) {
    console.error('Erro: Caminho do arquivo de lista antiga não fornecido.');
    console.error('Uso: node knip-intersection.js <caminho-lista-antiga>');
    process.exit(1);
  }

  let knipOutput;
  try {
    // Create temporary knip config to ignore .agent folder to prevent EPERM errors
    const tempConfig = 'knip-temp-config.json';
    fs.writeFileSync(
      tempConfig,
      JSON.stringify({ ignore: ['.agent/**', 'artifacts/**'] })
    );

    // Executa o Knip e captura o JSON. Ignora erros de exit code
    knipOutput = execSync(`npx knip --config ${tempConfig} --reporter json`, {
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'ignore'],
    });

    // Clean up
    fs.unlinkSync(tempConfig);
  } catch (e) {
    // Clean up even if fail
    try {
      fs.unlinkSync('knip-temp-config.json');
    } catch (err) {}

    if (e.stdout) {
      knipOutput = e.stdout;
    } else {
      // Fallback if knip fails completely
      console.error('Falha crítica no Knip:', e.message);
      knipOutput = JSON.stringify({ files: [] });
    }
  }

  let unusedFiles = new Set();
  try {
    const knipJson = JSON.parse(knipOutput);
    unusedFiles = new Set(knipJson.files || []);
  } catch (e) {
    console.error('Erro ao parsear JSON do Knip:', e);
  }

  console.error(`Knip detectou ${unusedFiles.size} arquivos não utilizados.`);

  // Lê os arquivos antigos
  let oldFilesContent = '';
  try {
    oldFilesContent = fs.readFileSync(OLD_FILES_PATH, 'utf-8');
  } catch (e) {
    console.error(`Erro ao ler arquivo de lista antiga: ${OLD_FILES_PATH}`);
    process.exit(1);
  }

  const oldFiles = new Set(
    oldFilesContent
      .split('\n')
      .filter(Boolean)
      .map((f) => f.trim())
  );

  console.error(`Git detectou ${oldFiles.size} arquivos antigos.`);

  // Calcula a intersecção
  const toArchive = [];
  for (const file of unusedFiles) {
    if (oldFiles.has(file)) {
      // Verifica lista de exclusão manual de segurança
      if (!EXCLUDE_PATTERNS.some((pattern) => file.includes(pattern))) {
        toArchive.push(file);
      }
    }
  }

  console.error(
    `\nINTERSECÇÃO: ${toArchive.length} arquivos candidatos ao arquivamento.`
  );

  // Imprime a lista final para o stdout para ser consumida pelo próximo passo
  console.log(toArchive.join('\n'));
}

main();
