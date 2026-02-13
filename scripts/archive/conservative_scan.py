import os
import re
import sys

def get_all_files(root_dir, extensions):
    file_list = []
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if any(file.endswith(ext) for ext in extensions):
                file_list.append(os.path.join(root, file))
    return file_list

def is_likely_used(target_file, all_files):
    target_filename = os.path.basename(target_file)
    target_name_no_ext = os.path.splitext(target_filename)[0]
    
    # If the filename is generic like 'index' or 'styles', use the parent folder name too
    search_term = target_name_no_ext
    if target_name_no_ext in ['index', 'styles', 'types', 'page', 'layout']:
        search_term = os.path.basename(os.path.dirname(target_file))

    # Very conservative check: if the filename appears in ANY file's content, keep it.
    for source_file in all_files:
        if source_file == target_file:
            continue
            
        try:
            with open(source_file, 'r', encoding='utf-8') as f:
                content = f.read()
                if search_term in content:
                    return True
        except Exception:
            continue
            
    return False

def main():
    root_src = os.path.join(os.getcwd(), 'src')
    extensions = {'.ts', '.tsx', '.js', '.jsx', '.css', '.scss'}
    
    all_files = get_all_files(root_src, extensions)
    
    # Safe list (patterns to never delete)
    keep_patterns = [
        r'/app/.*',  # Keep entire App router for safety (Next.js magic)
        r'middleware\.',
        r'firebase', 
        r'instrumentation',
        r'generated', # Keep generated code
        r'\.d\.ts$' # Keep type definitions
    ]
    
    candidates = []
    
    print(f"Scanning {len(all_files)} files in src/ (CONSERVATIVE MODE)...")
    
    for string_file in all_files:
        # Check explicit keep patterns
        must_keep = False
        for pattern in keep_patterns:
            if re.search(pattern, string_file):
                must_keep = True
                break
        if must_keep:
            continue

        # Check references
        if not is_likely_used(string_file, all_files):
            candidates.append(string_file)
            
    print(f"Found {len(candidates)} unused files.")
    for c in candidates:
        print(os.path.relpath(c, os.getcwd()))

if __name__ == "__main__":
    main()
