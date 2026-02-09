#!/bin/bash
# git-aging.sh
# Finds files that haven't been modified in the last N months.
# Usage: ./git-aging.sh [months]
# Default: 6 months

MONTHS=${1:-6}
SECONDS_PER_MONTH=2592000 # 30 days
CUTOFF_SECONDS=$(($MONTHS * $SECONDS_PER_MONTH))
CURRENT_TIME=$(date +%s)
THRESHOLD_TIME=$(($CURRENT_TIME - $CUTOFF_SECONDS))

echo "🔎 Analyzing git history for files older than $MONTHS months..." >&2

# Get all Git-tracked files
git ls-files | while read file; do
    # Skip if file doesn't exist (deleted but in git index?)
    if [ ! -f "$file" ]; then continue; fi
    
    # Get last commit timestamp for the file
    LAST_COMMIT_TS=$(git log -1 --format=%ct "$file" 2>/dev/null)
    
    if [ -z "$LAST_COMMIT_TS" ]; then continue; fi
    
    if [ "$LAST_COMMIT_TS" -lt "$THRESHOLD_TIME" ]; then
        echo "$file"
    fi
done
