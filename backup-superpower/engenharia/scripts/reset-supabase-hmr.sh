#!/usr/bin/env bash
# ============================================================
# scripts/reset-supabase-hmr.sh
# Ghost System — Supabase HMR Stabilizer
#
# Executa a sequência COMPLETA de reset para resolver:
# "module factory is not available after HMR update" (@supabase/ssr)
#
# EXECUTAR APÓS FECHAR O DEV SERVER (pnpm run dev)
# ============================================================
set -e

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$PROJECT_DIR"

echo ""
echo "🔄 Ghost System — Supabase HMR Stabilizer"
echo "============================================================"

# ── 1. MATAR processos Next.js residuais ────────────────────
echo ""
echo "⚡ [1/5] Encerrando processos Next.js residuais..."
pkill -f "next-server" 2>/dev/null || true
pkill -f "next dev" 2>/dev/null || true
sleep 1
echo "   ✅ Processos encerrados."

# ── 2. LIMPAR .next ──────────────────────────────────────────
echo ""
echo "🗑️  [2/5] Limpando cache .next..."
if [ -d ".next" ]; then
  # Tenta remoção normal primeiro
  rm -rf .next 2>/dev/null || {
    # Se falhar, usa find para remover arquivo por arquivo
    echo "   ⚠️  rm -rf falhou, usando find..."
    find .next -type f -delete 2>/dev/null || true
    find .next -type l -delete 2>/dev/null || true
    find .next -type d -empty -delete 2>/dev/null || true
    rm -rf .next 2>/dev/null || true
  }
fi
echo "   ✅ Cache .next limpo."

# ── 3. LIMPAR Turbopack cache ────────────────────────────────
echo ""
echo "🗑️  [3/5] Limpando caches do Turbopack/pnpm..."
rm -rf "$HOME/.cache/turbopack" 2>/dev/null || true
rm -rf "$HOME/Library/Caches/turbopack" 2>/dev/null || true
rm -f .eslintcache 2>/dev/null || true
echo "   ✅ Caches auxiliares limpos."

# ── 4. REINSTALAR dependências (pnpm) ───────────────────────
echo ""
echo "📦 [4/5] Reinstalando dependências (pnpm install)..."
# Usa --no-frozen-lockfile porque pode não haver pnpm-lock.yaml
pnpm install --no-frozen-lockfile 2>&1 | tail -5 || {
  echo "   ❌ pnpm install falhou. Tente: pnpm install --force"
  exit 1
}
echo "   ✅ Dependências reinstaladas."

# ── 5. VALIDAÇÃO de saúde dos módulos Supabase ──────────────
echo ""
echo "🔍 [5/5] Validando módulos Supabase..."

# Checa se @supabase/ssr existe no node_modules
if [ -d "node_modules/@supabase/ssr" ]; then
  echo "   ✅ @supabase/ssr encontrado"
  echo "   📌 Versão: $(cat node_modules/@supabase/ssr/package.json | grep '"version"' | head -1)"
else
  echo "   ❌ @supabase/ssr não encontrado após install"
fi

if [ -d "node_modules/server-only" ]; then
  echo "   ✅ server-only encontrado"
else
  echo "   ⚠️  server-only não encontrado — verifique package.json"
fi

echo ""
echo "============================================================"
echo "✅ Reset completo! Agora execute:"
echo "   pnpm run dev"
echo ""
echo "🧪 Teste de regressão HMR:"
echo "   1. Abra http://localhost:3000"
echo "   2. Edite qualquer componente client"
echo "   3. Verifique: console NÃO deve mostrar 'module factory is not available'"
echo "   4. Navegue entre páginas — não deve haver hard reload"
echo "============================================================"
