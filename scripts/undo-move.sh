#!/bin/bash
# undo-move.sh
# Restores files from the backup directory.
# Usage: ./undo-move.sh [backup_dir]

BACKUP_DIR=${1:-_backup_clean}

if [ ! -d "$BACKUP_DIR" ]; then
    echo "❌ Backup directory not found: $BACKUP_DIR"
    exit 1
fi

echo "⏪ Restoring files from $BACKUP_DIR..."

# rsync back to current directory
rsync -av "$BACKUP_DIR/" .

if [ $? -eq 0 ]; then
    echo "✅ Restore successful."
    echo "🗑️  Removing backup directory..."
    rm -rf "$BACKUP_DIR"
    echo "✨ Undo complete."
else
    echo "❌ Restore failed. Backup directory kept."
    exit 1
fi
