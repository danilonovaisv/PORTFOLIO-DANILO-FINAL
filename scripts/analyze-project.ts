// scripts/analyze-project.ts
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

interface ReportSection {
  title: string;
  content: string[];
}

const projectRoot = process.cwd();
const report: ReportSection[] = [];

function logSection(title: string, content: string[]) {
  report.push({ title, content });
  console.log(`✅ ${title}`);
}

function listFiles(dir: string, allFiles: string[] = []): string[] {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      listFiles(filePath, allFiles);
    } else {
      allFiles.push(filePath);
    }
  });
  return allFiles;
}

function analyzeDependencies() {
  const pkgPath = path.join(projectRoot, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  const deps = Object.keys(pkg.dependencies || {});
  const devDeps = Object.keys(pkg.devDependencies || {});

  const files = listFiles(projectRoot);
  const unusedDeps = deps.filter(
    (dep) => !files.some((file) => fs.readFileSync(file, 'utf8').includes(dep))
  );

  logSection(
    '📦 Dependências não utilizadas',
    unusedDeps.length ? unusedDeps : ['Nenhuma dependência inútil detectada']
  );
  logSection('🧱 Dependências de desenvolvimento', devDeps);
}

function findUnusedFiles() {
  const srcPath = path.join(projectRoot, 'app');
  if (!fs.existsSync(srcPath)) return;

  const allFiles = listFiles(srcPath);
  const tsxFiles = allFiles.filter(
    (f) => f.endsWith('.tsx') || f.endsWith('.ts')
  );

  const imports = tsxFiles
    .map((file) => fs.readFileSync(file, 'utf8'))
    .join('\n');

  const unused = tsxFiles.filter(
    (f) => !imports.includes(path.basename(f).replace(/\.(tsx|ts)$/, ''))
  );

  logSection('🧹 Componentes / arquivos possivelmente não usados', unused);
}

function analyzeGitBranches() {
  try {
    const branches = execSync('git branch -a --sort=-committerdate', {
      encoding: 'utf8',
    })
      .split('\n')
      .filter(Boolean);
    const oldBranches = branches.filter(
      (b) =>
        b.includes('remotes/') && !b.includes('main') && !b.includes('master')
    );
    logSection('🌿 Branches no repositório', branches);
    logSection('🪓 Branches potencialmente obsoletas', oldBranches);
  } catch {
    logSection('⚠️ Git não detectado', [
      'O script deve ser executado dentro de um repositório Git.',
    ]);
  }
}

function generateReport() {
  const output = [
    '# 🧩 Auditoria do Projeto Danilo Novais Portfolio',
    `Gerado em: ${new Date().toLocaleString()}`,
    '---',
    ...report.map(
      (s) => `## ${s.title}\n${s.content.map((c) => `- ${c}`).join('\n')}\n`
    ),
  ].join('\n\n');

  fs.writeFileSync(
    path.join(projectRoot, 'project-audit-report.md'),
    output,
    'utf8'
  );
  console.log('\n📘 Relatório gerado: project-audit-report.md');
}

console.log('🚀 Iniciando auditoria...');
listFiles(projectRoot);
analyzeDependencies();
findUnusedFiles();
analyzeGitBranches();
generateReport();
