#!/usr/bin/env bash

# Fail fast (exceto em alguns blocos específicos)
set -e

# --------------------------
# CONFIG BÁSICA
# --------------------------

PACKAGE_MANAGER="npm"   # mude para "yarn" ou "pnpm" se quiser
LOCKFILE_NPM="package-lock.json"
LOCKFILE_YARN="yarn.lock"
LOCKFILE_PNPM="pnpm-lock.yaml"

# --------------------------
# FUNÇÕES UTILITÁRIAS
# --------------------------

info() {
  echo ""
  echo "👉 $1"
}

warn() {
  echo ""
  echo "⚠️  $1"
}

success() {
  echo ""
  echo "✅ $1"
}

# Detecta lockfile e ajusta package manager (opcional)
detect_package_manager() {
  if [ -f "yarn.lock" ]; then
    PACKAGE_MANAGER="yarn"
  elif [ -f "pnpm-lock.yaml" ]; then
    PACKAGE_MANAGER="pnpm"
  else
    PACKAGE_MANAGER="npm"
  fi
  info "Usando package manager: $PACKAGE_MANAGER"
}

# --------------------------
# TAREFAS
# --------------------------

check_env() {
  info "Checando versões de Node e gerenciadores..."
  node -v || warn "Node não encontrado"
  npm -v || warn "npm não encontrado"
  yarn -v || warn "yarn não encontrado"
  pnpm -v || warn "pnpm não encontrado"
}

install_deps() {
  detect_package_manager
  info "Instalando dependências..."

  case "$PACKAGE_MANAGER" in
    npm)
      npm install
      ;;
    yarn)
      yarn install
      ;;
    pnpm)
      pnpm install
      ;;
  esac

  success "Dependências instaladas."
}

check_outdated() {
  detect_package_manager
  info "Verificando pacotes desatualizados..."

  case "$PACKAGE_MANAGER" in
    npm)
      npm outdated || true
      ;;
    yarn)
      yarn outdated || true
      ;;
    pnpm)
      pnpm outdated || true
      ;;
  esac
}

update_safe() {
  detect_package_manager
  info "Atualizando dependências (modo seguro, respeitando package.json)..."

  case "$PACKAGE_MANAGER" in
    npm)
      npm update
      ;;
    yarn)
      yarn upgrade
      ;;
    pnpm)
      pnpm update
      ;;
  esac

  success "Atualização segura concluída."
}

update_aggressive() {
  detect_package_manager
  info "Atualização agressiva com npm-check-updates..."

  # npx funciona mesmo se não tiver ncu instalado globalmente
  npx npm-check-updates || true
  npx npm-check-updates -u

  info "Reinstalando dependências após atualizar package.json..."

  case "$PACKAGE_MANAGER" in
    npm)
      npm install
      ;;
    yarn)
      yarn install
      ;;
    pnpm)
      pnpm install
      ;;
  esac

  success "Atualização agressiva concluída."
}

deep_clean() {
  detect_package_manager
  info "Limpando node_modules e lockfile..."

  rm -rf node_modules

  case "$PACKAGE_MANAGER" in
    npm)
      rm -f "$LOCKFILE_NPM"
      npm install
      ;;
    yarn)
      rm -f "$LOCKFILE_YARN"
      yarn install
      ;;
    pnpm)
      rm -f "$LOCKFILE_PNPM"
      pnpm install
      ;;
  esac

  success "Limpeza profunda concluída."
}

depcheck_run() {
  info "Rodando depcheck para encontrar dependências não usadas..."
  npx depcheck || true
}

set_default_branch_main() {
  info "Configurando git init.defaultBranch para 'main'..."
  git config init.defaultBranch main
  success "Branch padrão ajustada para 'main'. Use 'git symbolic-ref refs/remotes/origin/HEAD' para verificar remotos."
}

run_tests() {
  info "Rodando testes (npm test)..."
  if npm run test; then
    success "Testes concluídos."
  else
    warn "Testes falharam. Verifique antes de continuar."
  fi
}

run_lint() {
  info "Rodando lint (npm run lint)..."
  if npm run lint; then
    success "Lint concluído."
  else
    warn "Lint falhou. Ajuste o código."
  fi
}

full_maintenance() {
  info "Iniciando rotina completa de manutenção..."

  check_env
  run_lint
  run_tests
  check_outdated
  depcheck_run

  success "Rotina completa finalizada. Revise os avisos acima."
}

generate_report() {
  # Desliga o "fail fast" temporariamente para coletar tudo, mesmo com erros
  set +e

  detect_package_manager

  TIMESTAMP=$(date +"%Y%m%d-%H%M%S")
  REPORT_FILE="project-report-${TIMESTAMP}.txt"

  echo "===========================================" > "$REPORT_FILE"
  echo " Projeto: $(basename "$(pwd)")" >> "$REPORT_FILE"
  echo " Data: $(date)" >> "$REPORT_FILE"
  echo " Package manager detectado: $PACKAGE_MANAGER" >> "$REPORT_FILE"
  echo "===========================================" >> "$REPORT_FILE"
  echo "" >> "$REPORT_FILE"

  echo "### Ambiente" >> "$REPORT_FILE"
  echo "" >> "$REPORT_FILE"
  echo "\$ node -v" >> "$REPORT_FILE"
  node -v >> "$REPORT_FILE" 2>&1
  echo "" >> "$REPORT_FILE"

  echo "\$ npm -v" >> "$REPORT_FILE"
  npm -v >> "$REPORT_FILE" 2>&1
  echo "" >> "$REPORT_FILE"

  echo "Sistema operacional:" >> "$REPORT_FILE"
  uname -a >> "$REPORT_FILE" 2>&1
  echo "" >> "$REPORT_FILE"

  echo "-------------------------------------------" >> "$REPORT_FILE"
  echo "### Git status" >> "$REPORT_FILE"
  echo "" >> "$REPORT_FILE"
  echo "\$ git status -sb" >> "$REPORT_FILE"
  git status -sb >> "$REPORT_FILE" 2>&1
  echo "" >> "$REPORT_FILE"

  echo "-------------------------------------------" >> "$REPORT_FILE"
  echo "### Lint (npm run lint)" >> "$REPORT_FILE"
  echo "" >> "$REPORT_FILE"
  echo "\$ npm run lint" >> "$REPORT_FILE"
  npm run lint >> "$REPORT_FILE" 2>&1
  echo "" >> "$REPORT_FILE"

  echo "-------------------------------------------" >> "$REPORT_FILE"
  echo "### Testes (npm run test)" >> "$REPORT_FILE"
  echo "" >> "$REPORT_FILE"
  echo "\$ npm run test" >> "$REPORT_FILE"
  npm run test >> "$REPORT_FILE" 2>&1
  echo "" >> "$REPORT_FILE"

  echo "-------------------------------------------" >> "$REPORT_FILE"
  echo "### Dependências desatualizadas" >> "$REPORT_FILE"
  echo "" >> "$REPORT_FILE"
  echo "\$ $PACKAGE_MANAGER outdated" >> "$REPORT_FILE"
  case "$PACKAGE_MANAGER" in
    npm)
      npm outdated >> "$REPORT_FILE" 2>&1
      ;;
    yarn)
      yarn outdated >> "$REPORT_FILE" 2>&1
      ;;
    pnpm)
      pnpm outdated >> "$REPORT_FILE" 2>&1
      ;;
  esac
  echo "" >> "$REPORT_FILE"

  echo "-------------------------------------------" >> "$REPORT_FILE"
  echo "### Depcheck (dependências não usadas / faltando)" >> "$REPORT_FILE"
  echo "" >> "$REPORT_FILE"
  echo "\$ npx depcheck" >> "$REPORT_FILE"
  npx depcheck >> "$REPORT_FILE" 2>&1
  echo "" >> "$REPORT_FILE"

  echo "-------------------------------------------" >> "$REPORT_FILE"
  echo "### Observações" >> "$REPORT_FILE"
  echo "Use este relatório para colar em uma IA (Codex/ChatGPT) e pedir:" >> "$REPORT_FILE"
  echo "- Sugestões para corrigir erros de lint e testes;" >> "$REPORT_FILE"
  echo "- Ajustes de dependências desatualizadas ou não utilizadas;" >> "$REPORT_FILE"
  echo "- Refatorações sugeridas com base nos erros." >> "$REPORT_FILE"
  echo "" >> "$REPORT_FILE"

  # Reativa o fail fast para o resto do script
  set -e

  success "Relatório gerado em: $REPORT_FILE"
}

show_help() {
  cat <<EOF

Uso: ./project-tools.sh [comando]

Comandos disponíveis:

  check-env          -> Checa Node, npm, yarn, pnpm
  install            -> Instala dependências (npm/yarn/pnpm)
  outdated           -> Mostra pacotes desatualizados
  update-safe        -> Atualiza respeitando o package.json
  update-aggressive  -> Atualiza para últimas versões com npm-check-updates
  deep-clean         -> Remove node_modules + lockfile e reinstala
  depcheck           -> Verifica dependências não utilizadas
  git-default-branch -> Força git init.defaultBranch=main para evitar erros em scripts
  lint               -> Executa "npm run lint"
  test               -> Executa "npm run test"
  full               -> Rotina completa (check-env, lint, test, outdated, depcheck)
  report             -> Gera relatório completo em arquivo .txt para enviar à IA
  help               -> Mostra esta ajuda

Exemplos:
  ./project-tools.sh report
  ./project-tools.sh check-env
  ./project-tools.sh install
  ./project-tools.sh outdated
  ./project-tools.sh update-safe
  ./project-tools.sh update-aggressive
  ./project-tools.sh deep-clean
  ./project-tools.sh full

EOF
}

# --------------------------
# DISPATCH
# --------------------------

COMMAND="$1"

case "$COMMAND" in
  check-env)
    check_env
    ;;
  install)
    install_deps
    ;;
  outdated)
    check_outdated
    ;;
  update-safe)
    update_safe
    ;;
  update-aggressive)
    update_aggressive
    ;;
  deep-clean)
    deep_clean
    ;;
  depcheck)
    depcheck_run
    ;;
  git-default-branch)
    set_default_branch_main
    ;;
  lint)
    run_lint
    ;;
  test)
    run_tests
    ;;
  full)
    full_maintenance
    ;;
  report)
    generate_report
    ;;
  help|"")
    show_help
    ;;
  *)
    warn "Comando desconhecido: $COMMAND"
    show_help
    exit 1
    ;;
esac
