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

def is_file_referenced(target_file, all_files, root_src):
    # Strategy: Checking if the file is imported in any other file
    target_filename = os.path.basename(target_file)
    target_name_no_ext = os.path.splitext(target_filename)[0]
    
    # Relative path from src for alias checking (e.g., components/portfolio/modal/variants)
    rel_path = os.path.relpath(target_file, root_src)
    rel_path_no_ext = os.path.splitext(rel_path)[0]
    
    # Regex to capture import paths
    import_pattern = re.compile(r'(?:import|export|require)\s+(?:.*?from\s+)?[\'"]([^\'"]+)[\'"]')

    for source_file in all_files:
        if source_file == target_file:
            continue
            
        try:
            with open(source_file, 'r', encoding='utf-8') as f:
                content = f.read()
                
            # specific optimization: check if filename exists in content at all before regex
            if target_name_no_ext not in content:
                continue

            matches = import_pattern.findall(content)
            for match in matches:
                # Check for exact path match (relative or alias)
                if rel_path_no_ext in match: # e.g. "@/components/.../variants" contains "components/.../variants"
                    return True
                
                # Check for filename match if it's a direct relative import
                # e.g. import ... from "./variants"
                if match.endswith(f"/{target_name_no_ext}") or match == target_name_no_ext or match == f"./{target_name_no_ext}":
                    return True
                    
        except Exception:
            continue
            
    return False

def main():
    root_src = os.path.join(os.getcwd(), 'src')
    extensions = {'.ts', '.tsx', '.js', '.jsx', '.css', '.scss'}
    
    all_files = get_all_files(root_src, extensions)
    
    # Special files to always keep (Next.js App Router & Configs)
    # Added variants.ts specifically since regex might struggle with it if aliases are tricky
    keep_patterns = [
        r'/app/.*(?:page|layout|template|loading|error|not-found|global-error|route|default|middleware|opengraph|twitter|sitemap|robots)\.(tsx|ts|js|jsx)$',
        r'middleware\.(ts|js)$',
        r'firebase/config',
        r'instrumentation\.(ts|js)$', 
        r'variants\.ts$' 
    ]
    
    candidates = []
    
    print(f"Scanning {len(all_files)} files in src/...")
    
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
        if not is_file_referenced(string_file, all_files, root_src):
            candidates.append(string_file)
            
    print(f"Found {len(candidates)} unused files.")
    for c in candidates:
        print(os.path.relpath(c, os.getcwd()))

if __name__ == "__main__":
    main()
