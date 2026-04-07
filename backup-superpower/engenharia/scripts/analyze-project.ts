// @ts-nocheck
// scripts/analyze-project.ts
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

/**
 * @typedef {Object} ReportSection
 * @property {string} title
 * @property {string[]} content
 */

const projectRoot = process.cwd();
/** @type {ReportSection[]} */
const report = [];

/**
 * @param {string} title
 * @param {string[]} content
 */
function logSection(title, content) {
  report.push({ title, content });
  console.log(`✅ ${title}`);
}

function analyzeDependencies() {
  console.log('--- Analisando dependências (depcheck) ---');
  try {
    // Usar o pnpm dlx para garantir que o depcheck seja executado mesmo se não estiver no path
    const output = execSync('pnpm dlx depcheck --json', { encoding: 'utf8' });
    const result = JSON.parse(output);

    const unusedDeps = result.dependencies || [];
    const unusedDevDeps = result.devDependencies || [];

    logSection(
      '📦 Dependências não utilizadas (depcheck)',
      unusedDeps.length ? unusedDeps : ['Nenhuma dependência inútil detectada']
    );
    logSection(
      '🧱 Dependências de desenvolvimento não utilizadas',
      unusedDevDeps.length
        ? unusedDevDeps
        : ['Nenhuma dependência inútil detectada']
    );
  } catch (err) {
    // Depcheck retorna exit code 255 se houver dependências não utilizadas, o que é um "erro" no execSync
    if (err.stdout) {
      try {
        const result = JSON.parse(err.stdout);
        logSection('📦 Dependências não utilizadas', result.dependencies || []);
        logSection(
          '🧱 Dependências de desenvolvimento não utilizadas',
          result.devDependencies || []
        );
      } catch (e) {
        logSection('⚠️ Erro ao analisar dependências', [
          'Não foi possível parsear o output do depcheck',
        ]);
      }
    } else {
      logSection('⚠️ Erro ao analisar dependências', [err.message]);
    }
  }
}

function analyzeGitBranches() {
  try {
    const branches = execSync('git branch -a --sort=-committerdate', {
      encoding: 'utf8',
    })
      .split('\n')
      .map((b) => b.trim())
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
analyzeDependencies();
analyzeGitBranches();
generateReport();
