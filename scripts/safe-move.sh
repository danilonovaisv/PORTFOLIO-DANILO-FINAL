#!/bin/bash
# safe-move.sh
# Lê lista de arquivos do stdin e move para pasta de backup

BACKUP_ROOT="${1:-_archive/backup_$(date +%Y%m%d_%H%M%S)}"
MANIFEST="$BACKUP_ROOT/manifest.txt"

mkdir -p "$BACKUP_ROOT"
echo "Criando backup em: $BACKUP_ROOT"

# Lê a lista de arquivos linha por linha
while read -r file; do
    # Trim whitespace
    file=$(echo "$file" | xargs)
    if [ -f "$file" ]; then
        # Usa rsync para mover mantendo a estrutura de diretórios relativa
        # --remove-source-files: deleta o original apenas após cópia bem sucedida
        # --relative (-R): preserva o caminho completo (ex: src/comps/Button.ts -> backup/src/comps/Button.ts)
        rsync -avR --remove-source-files "$file" "$BACKUP_ROOT/" >> "$MANIFEST" 2>&1
    else
        echo "Aviso: Arquivo $file não encontrado (pode ter sido deletado recentemente)." >> "$MANIFEST"
    fi
done

# Limpeza de diretórios vazios
# find src -type d -empty -delete 2>/dev/null || true
echo "Operação concluída. Verifique $MANIFEST para detalhes."
