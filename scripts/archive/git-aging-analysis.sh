#!/bin/bash
# git-aging-analysis-optimized.sh
# Uso: ./git-aging-analysis-optimized.sh [meses]
# Saída: Lista de arquivos (caminhos relativos)

MONTHS=${1:-3}

if [[ "$OSTYPE" == "darwin"* ]]; then
    # MacOS date
    CUTOFF_DATE=$(date -v-${MONTHS}m +%Y-%m-%d)
else
    # Linux date
    CUTOFF_DATE=$(date -d "$MONTHS months ago" +%Y-%m-%d)
fi

echo "Iniciando análise temporal OTIMIZADA. Data de corte: $CUTOFF_DATE" >&2

# Diretório de cache local
CACHE_DIR=".cache"
mkdir -p "$CACHE_DIR"

# 1. Lista todos os arquivos atualmente rastreados (ordenados)
git ls-files | sort > "$CACHE_DIR/all_files.txt"

# 2. Lista arquivos modificados DESDE a data de corte (ordenados e unicos)
# --format="" suprime metadados do commit, mostrando apenas nomes de arquivos
git log --since="$CUTOFF_DATE" --name-only --format="" | sort | uniq > "$CACHE_DIR/recent_files.txt"

# 3. Diferença: Arquivos em 'all' que NÃO estão em 'recent'
# comm -23: suprime col 2 (recent) e col 3 (comuns), sobrando apenas col 1 (únicos em all)
comm -23 "$CACHE_DIR/all_files.txt" "$CACHE_DIR/recent_files.txt"

# Limpeza opcional (comentada para debug)
# rm "$CACHE_DIR/all_files.txt" "$CACHE_DIR/recent_files.txt"
