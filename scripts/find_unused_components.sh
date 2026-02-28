#!/bin/bash

echo "🔍 Scanning checking for unused components in src/components..."

find src/components -name "*.tsx" | while read file; do
    filename=$(basename "$file")
    component_name="${filename%.*}"
    
    # Grep for the component name in src, excluding the file itself
    # We also exclude index.ts files that might just export it (we want actual usage, but for now export is usage)
    # Actually, let's just grep. If it only appears in its own file, it's unused.
    
    count=$(grep -r "$component_name" src --exclude="$filename" | wc -l)
    
    if [ "$count" -eq 0 ]; then
        echo "⚠️  [POTENTIAL ORPHAN] $file (No references found)"
    fi
done

echo "✅ Scan complete."
