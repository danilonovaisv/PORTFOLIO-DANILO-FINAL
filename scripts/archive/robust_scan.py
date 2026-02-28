import os
import re
import sys

# Configuration
ROOT_DIR = os.path.abspath(os.getcwd())
SRC_DIR = os.path.join(ROOT_DIR, 'src')
EXTENSIONS = {'.ts', '.tsx', '.js', '.jsx', '.css', '.scss', '.json'}

def resolve_path(import_path, current_file):
    """
    Resolves an import path to a concrete file on disk.
    Returns the absolute path if found, or None.
    """
    # 1. Handle Alias @/
    if import_path.startswith('@/'):
        # @/ -> src/
        candidate_base = os.path.join(ROOT_DIR, 'src', import_path[2:])
    elif import_path.startswith('.'):
        # Relative path
        candidate_base = os.path.normpath(os.path.join(os.path.dirname(current_file), import_path))
    else:
        # Node modules or absolute system paths (ignore)
        return None

    # 2. Try variations
    # Exact match (file exists?)
    if os.path.isfile(candidate_base):
        return candidate_base
    
    # Try extensions
    for ext in EXTENSIONS:
        candidate = candidate_base + ext
        if os.path.isfile(candidate):
            return candidate
            
    # Try directory index
    if os.path.isdir(candidate_base):
        for ext in EXTENSIONS:
            candidate = os.path.join(candidate_base, 'index' + ext)
            if os.path.isfile(candidate):
                return candidate
    
    return None

def get_all_src_files():
    files_list = []
    for root, dirs, files in os.walk(SRC_DIR):
        for f in files:
            if any(f.endswith(ext) for ext in EXTENSIONS):
                files_list.append(os.path.join(root, f))
    return set(files_list)

def scan_references(files_set):
    """
    Scans all files for imports/exports and returns a set of referenced files.
    """
    referenced = set()
    
    # Regex to capture content inside quotes for import/export/require
    # Captures:
    # import x from "path"
    # export x from "path"
    # require("path")
    # import("path")
    # background: url("path") (css)
    # @import "path" (css)
    
    # Broad patterns for JS/TS
    js_pattern = re.compile(r'(?:from|import|require|include)\s*[\(]?\s*[\'"]([^\'"]+)[\'"]')
    
    # Broad pattern for dynamic import strings - catches almost anything in quotes that looks like a path
    # e.g. import('./foo')
    path_like_pattern = re.compile(r'[\'"](@\/[\w\-\.\/]+|\.[\w\-\.\/]+)[\'"]')

    for f in files_set:
        try:
            with open(f, 'r', encoding='utf-8', errors='ignore') as file_obj:
                content = file_obj.read()
                
            # Find all path-like strings
            # This is "loose" but safe (we prefer false negatives - keeping unused files - over false positives - deleting used ones)
            matches = path_like_pattern.findall(content)
            
            # Use specific CSS logic if CSS
            if f.endswith('.css') or f.endswith('.scss'):
                # Look for @import or url()
                # Simplified: standard path finder works for relative paths usually
                pass

            for import_path in matches:
                resolved = resolve_path(import_path, f)
                if resolved and resolved in files_set:
                    referenced.add(resolved)
                    
        except Exception as e:
            # Permission error or read error - skip file, assume it references nothing
            continue
            
    return referenced

def main():
    print(f"Starting Robust Scan in {SRC_DIR}...")
    
    all_files = get_all_src_files()
    referenced_files = scan_references(all_files)
    
    # Explicit entry points (files Next.js uses automagically)
    entry_patterns = [
        r'src/app/.*', # Keep everything in app dir to be safe (pages, layouts, apis)
        r'src/middleware\.',
        r'src/instrumentation\.',
        r'src/lib/firebase/config\.ts', # User requested keep
        r'src/lib/supabase/types\.ts',
        r'.*\.d\.ts' # Keep type definitions
    ]
    
    unused_files = []
    
    for f in all_files:
        # Check if matched by referenced
        if f in referenced_files:
            continue
            
        # Check if matched by entry patterns
        rel_path = os.path.relpath(f, ROOT_DIR)
        is_entry = False
        for p in entry_patterns:
            if re.search(p, rel_path) or re.search(p, f):
                is_entry = True
                break
        
        if is_entry:
            continue
            
        # Heuristic: If file is named 'index.ts' and parent folder was referenced?
        # (Handled by resolve_path logic, but double check)
        
        unused_files.append(rel_path)

    unused_files.sort()
    
    print(f"Total files: {len(all_files)}")
    print(f"Unused candidates: {len(unused_files)}")
    
    # Ensure artifacts exits
    if not os.path.exists('artifacts'):
        os.makedirs('artifacts')

    with open('artifacts/robust_unused.txt', 'w') as out:
        for f in unused_files:
            print(f, file=out) # Print to file
            
            # Print to stdout only if list is short, else summary
            # print(f)

if __name__ == "__main__":
    main()
