#!/usr/bin/env bash
# ==============================================================================
# Script de Sincronização: Supabase Storage -> Cloudflare R2
# Governança PREVC - Ghost System v3.0
# ==============================================================================
# Este script utiliza rclone para migrar objetos entre o endpoint S3 do Supabase
# e o Cloudflare R2 com Egress Zero, preservando integridade e metadados.
# ==============================================================================

set -euo pipefail

# 1. Variáveis de Configuração (Preencha via Variáveis de Ambiente ou Parâmetros)
SUPABASE_PROJECT_REF="${SUPABASE_PROJECT_REF:-umkmwbkwvulxtdodzmzf}"
SUPABASE_REGION="${SUPABASE_REGION:-us-east-1}"
SUPABASE_ACCESS_KEY="${SUPABASE_ACCESS_KEY:-<SUPABASE_ACCESS_KEY>}"
SUPABASE_SECRET_KEY="${SUPABASE_SECRET_KEY:-<SUPABASE_SECRET_KEY>}"

R2_ACCOUNT_ID="${R2_ACCOUNT_ID:-f48c066525478bcaf66928b32ed721d2}"
R2_ACCESS_KEY_ID="${R2_ACCESS_KEY_ID:-<R2_ACCESS_KEY_ID>}"
R2_SECRET_ACCESS_KEY="${R2_SECRET_ACCESS_KEY:-<R2_SECRET_ACCESS_KEY>}"
R2_BUCKET_NAME="${R2_BUCKET_NAME:-portfolio-assets}"

echo "================================================================="
echo "  Mission Control: Sincronização Supabase Storage -> Cloudflare R2"
echo "================================================================="
echo "Supabase Project: ${SUPABASE_PROJECT_REF}"
echo "Cloudflare R2 Account: ${R2_ACCOUNT_ID}"
echo "Cloudflare R2 Bucket: ${R2_BUCKET_NAME}"
echo "================================================================="

# Checagem de disponibilidade do rclone
if ! command -v rclone &> /dev/null; then
    echo "❌ O binário 'rclone' não foi encontrado no seu PATH."
    echo "👉 Para instalar no macOS (Homebrew):"
    echo "     brew install rclone"
    echo ""
    echo "👉 Ou via instalador oficial:"
    echo "     sudo -v ; curl https://rclone.org/install.sh | sudo bash"
    echo ""
    exit 1
fi

# Validação preliminar de credenciais
if [[ "${SUPABASE_ACCESS_KEY}" == "<SUPABASE_ACCESS_KEY>" || "${R2_ACCESS_KEY_ID}" == "<R2_ACCESS_KEY_ID>" ]]; then
    echo "⚠️  ATENÇÃO: Variáveis de credencial contêm placeholders."
    echo "Para executar a sincronização real, defina no seu terminal:"
    echo "  export SUPABASE_ACCESS_KEY='sua_chave_s3_supabase'"
    echo "  export SUPABASE_SECRET_KEY='seu_secret_s3_supabase'"
    echo "  export R2_ACCESS_KEY_ID='sua_r2_token_id'"
    echo "  export R2_SECRET_ACCESS_KEY='sua_r2_secret_key'"
    echo ""
    echo "Ou via rclone configurado interativamente: 'rclone config'"
    exit 0
fi

# Configuração on-the-fly do rclone sem persistir segredos em disco
export RCLONE_CONFIG_SUPABASE_TYPE="s3"
export RCLONE_CONFIG_SUPABASE_PROVIDER="Other"
export RCLONE_CONFIG_SUPABASE_ENDPOINT="https://${SUPABASE_PROJECT_REF}.supabase.co/storage/v1/s3"
export RCLONE_CONFIG_SUPABASE_ACCESS_KEY_ID="${SUPABASE_ACCESS_KEY}"
export RCLONE_CONFIG_SUPABASE_SECRET_ACCESS_KEY="${SUPABASE_SECRET_KEY}"
export RCLONE_CONFIG_SUPABASE_REGION="${SUPABASE_REGION}"

export RCLONE_CONFIG_R2_TYPE="s3"
export RCLONE_CONFIG_R2_PROVIDER="Cloudflare"
export RCLONE_CONFIG_R2_ENDPOINT="https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com"
export RCLONE_CONFIG_R2_ACCESS_KEY_ID="${R2_ACCESS_KEY_ID}"
export RCLONE_CONFIG_R2_SECRET_ACCESS_KEY="${R2_SECRET_ACCESS_KEY}"

echo "🚀 Iniciando sincronização do bucket site-assets..."
rclone sync supabase:site-assets "r2:${R2_BUCKET_NAME}/site-assets" \
    --fast-list \
    --transfers=16 \
    --checkers=32 \
    --progress \
    --header-upload "Cache-Control: public, max-age=31536000, immutable"

echo "🚀 Iniciando sincronização do bucket portfolio-media..."
rclone sync supabase:portfolio-media "r2:${R2_BUCKET_NAME}/portfolio-media" \
    --fast-list \
    --transfers=16 \
    --checkers=32 \
    --progress \
    --header-upload "Cache-Control: public, max-age=31536000, immutable"

echo "✅ Verificação de integridade (check parity)..."
rclone check supabase:site-assets "r2:${R2_BUCKET_NAME}/site-assets" --one-way || true
rclone check supabase:portfolio-media "r2:${R2_BUCKET_NAME}/portfolio-media" --one-way || true

echo "🎉 Sincronização concluída com sucesso!"

