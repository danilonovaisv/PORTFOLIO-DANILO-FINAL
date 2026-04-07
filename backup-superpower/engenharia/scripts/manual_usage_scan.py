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

def resolve_import(import_path, current_file_path, root_dir):
    # Handle alias @/ -> src/
    if import_path.startswith('@/'):
        target = os.path.join(root_dir, import_path[2:])
    elif import_path.startswith('.'):
        target = os.path.normpath(os.path.join(os.path.dirname(current_file_path), import_path))
    else:
        return None # node_modules or absolute/unresolved

    # Try exact match or extensions
    extensions = ['.ts', '.tsx', '.js', '.jsx', '/index.ts', '/index.tsx', '/index.js', '/index.jsx']
    
    if os.path.exists(target) and os.path.isfile(target):
         return target
    
    for ext in extensions:
        target_ext = target + ext
        if os.path.exists(target_ext) and os.path.isfile(target_ext):
            return target_ext
            
    return None

def main():
    root_src = os.path.join(os.getcwd(), 'src')
    extensions = {'.ts', '.tsx', '.js', '.jsx'}
    
    if not os.path.exists(root_src):
        print("src directory not found")
        return

    all_files = get_all_files(root_src, extensions)
    unused_files = set(all_files)
    
    # Identify Next.js special files
    nextjs_special = {'page', 'layout', 'template', 'loading', 'error', 'not-found', 'global-error', 'route', 'default', 'middleware', 'opengraph-image', 'twitter-image', 'sitemap', 'robots'}
    
    to_remove = set()
    for f in unused_files:
        filename = os.path.basename(f)
        name_no_ext = os.path.splitext(filename)[0]
        
        # Check special files in src/app
        if '/app/' in f and name_no_ext in nextjs_special:
            to_remove.add(f)
        if filename == 'middleware.ts' or filename == 'middleware.js':
            to_remove.add(f)

    unused_files -= to_remove

    # Heuristic regex for imports
    # Captures: import x from "path", export x from "path", require("path"), import("path"), dynamic(() => import("path"))
    import_pattern = re.compile(r'(?:import|export)\s+(?:.*?from\s+)?[\'"]([^\'"]+)[\'"]|require\([\'"]([^\'"]+)[\'"]\)|import\([\'"]([^\'"]+)[\'"]\)')
    
    for current_file in all_files:
        try:
            with open(current_file, 'r', encoding='utf-8') as f:
                content = f.read()
                matches = import_pattern.findall(content)
                for match in matches:
                    # Flatten the groups
                    for path in match:
                        if not path:
                            continue
                        resolved = resolve_import(path, current_file, root_src)
                        if resolved and resolved in unused_files:
                            unused_files.remove(resolved)
        except Exception as e:
            pass # Ignore read errors

    print(f"Found {len(unused_files)} potential unused files in src/ (Heuristic Scan):")
    for f in sorted(unused_files):
        print(os.path.relpath(f, os.getcwd()))

if __name__ == "__main__":
    main()
