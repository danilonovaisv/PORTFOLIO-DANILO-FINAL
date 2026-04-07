# M1 Antigravity Shell Healer — Implementation Plan + Artifacts

## Contexto e bloqueios de fonte

- **Repositório obrigatório informado:** `https://github.com/danilonovaisv/DATABASE_AGENT_NEXT`.
- **Resultado da verificação:** acesso não disponível neste ambiente (repositório privado/autenticação exigida).
- **Vector Store obrigatório informado:** `vs_69520b1fb834819197e445db9aab8d69`.
- **Resultado da verificação:** nenhum recurso MCP/vector store exposto na sessão atual.

> **Bloqueio parcial declarado:** sem acesso às duas fontes externas obrigatórias, a solução abaixo segue práticas padrão para macOS Apple Silicon e prioriza alterações seguras/reversíveis.

---

## Fase 1 — Agent A (M1 Shell Profiler)

### Objetivo

Identificar gargalos exatos do startup do Zsh sem alterar permanentemente o `~/.zshrc` do usuário.

### Artifact: script de profiling (somente diagnóstico)

```bash
#!/usr/bin/env bash
set -euo pipefail

LOG_DIR="$HOME/.antigravity-shell-healer"
LOG_FILE="$LOG_DIR/zsh-profile-$(date +%Y%m%d-%H%M%S).log"
mkdir -p "$LOG_DIR"

TMP_ZDOTDIR="$(mktemp -d)"
trap 'rm -rf "$TMP_ZDOTDIR"' EXIT

if [[ -f "$HOME/.zshrc" ]]; then
  {
    echo 'zmodload zsh/zprof'
    cat "$HOME/.zshrc"
    echo 'zprof'
  } > "$TMP_ZDOTDIR/.zshrc"
else
  echo "ERRO: ~/.zshrc não encontrado" >&2
  exit 1
fi

if [[ -f "$HOME/.zprofile" ]]; then
  cp "$HOME/.zprofile" "$TMP_ZDOTDIR/.zprofile"
fi

echo "[INFO] Running zsh profile..."
/usr/bin/time ZDOTDIR="$TMP_ZDOTDIR" /bin/zsh -i -c exit > "$LOG_FILE" 2>&1 || true

echo "[INFO] Full log: $LOG_FILE"

echo

echo "[TOP OFFENDERS > 200ms]"
awk '
  $0 ~ /[0-9]+\.[0-9]+%/ && $0 ~ /[0-9]+\.[0-9]+$/ {
    self_ms = $(NF) * 1000;
    if (self_ms > 200) print
  }
' "$LOG_FILE" || true

echo

echo "[HINTS]"
if grep -q "/opt/homebrew/bin/brew shellenv" "$HOME/.zshrc" 2>/dev/null; then
  echo "- Homebrew shellenv detectado em ~/.zshrc"
fi
if grep -q "nvm.sh" "$HOME/.zshrc" 2>/dev/null; then
  echo "- NVM detectado em ~/.zshrc"
fi
if grep -q "oh-my-zsh" "$HOME/.zshrc" 2>/dev/null; then
  echo "- Oh My Zsh detectado em ~/.zshrc"
fi
```

### Interpretação esperada

Marcar como ofensores principais qualquer bloco acima de **200ms**, tipicamente:

- `eval "$(/opt/homebrew/bin/brew shellenv)"`
- carga de `nvm.sh`
- plugins/autocomplete do Oh My Zsh

---

## Fase 2 — Agent B (Lazy-Load Optimizer)

### Objetivo

Inserir bypass para shells não-interativos e lazy-load para NVM, reduzindo timeout da IDE.

### Artifact: script de correção para o usuário executar no macOS

```bash
#!/usr/bin/env bash
set -euo pipefail

ZSHRC="$HOME/.zshrc"
BACKUP="$HOME/.zshrc.backup.antigravity.$(date +%Y%m%d-%H%M%S)"

if [[ ! -f "$ZSHRC" ]]; then
  echo "ERRO: ~/.zshrc não encontrado"
  exit 1
fi

cp "$ZSHRC" "$BACKUP"
echo "Backup criado em: $BACKUP"

if ! grep -q "Antigravity IDE Fix: Exit early for non-interactive shells" "$ZSHRC"; then
  tmpfile="$(mktemp)"
  {
    echo "# Antigravity IDE Fix: Exit early for non-interactive shells"
    echo '[[ $- != *i* ]] && return'
    echo
    cat "$ZSHRC"
  } > "$tmpfile"
  mv "$tmpfile" "$ZSHRC"
  echo "Early Exit inserido no topo do ~/.zshrc"
else
  echo "Early Exit já presente, nada a inserir"
fi

if grep -q "nvm.sh" "$ZSHRC"; then
  if ! grep -q "Antigravity Lazy NVM" "$ZSHRC"; then
    cat >> "$ZSHRC" <<'NVM_LAZY'

# Antigravity Lazy NVM
export NVM_DIR="$HOME/.nvm"
load_nvm() {
  unset -f nvm node npm npx
  [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
}
nvm() { load_nvm; nvm "$@"; }
node() { load_nvm; node "$@"; }
npm() { load_nvm; npm "$@"; }
npx() { load_nvm; npx "$@"; }
NVM_LAZY
    echo "Lazy NVM adicionado ao ~/.zshrc"
  else
    echo "Lazy NVM já presente, sem alterações adicionais"
  fi
else
  echo "NVM não detectado, bloco lazy não foi adicionado"
fi

echo "\nValidação rápida (deve ser <2s idealmente):"
echo "  /usr/bin/time /bin/zsh -i -c exit"
```

---

## Checklist de execução

1. Executar o script da **Fase 1** e coletar offenders >200ms.
2. Se confirmar gargalo (NVM/Oh My Zsh/Homebrew), executar script da **Fase 2**.
3. Validar com:

```bash
/usr/bin/time /bin/zsh -i -c exit
/bin/zsh -lc 'echo OK_NON_INTERACTIVE'
```

4. Em caso de regressão:

```bash
cp ~/.zshrc.backup.antigravity.* ~/.zshrc
```

## Notas de segurança

- Não expor conteúdo completo de variáveis sensíveis no log.
- Scripts geram backup antes de qualquer modificação.
