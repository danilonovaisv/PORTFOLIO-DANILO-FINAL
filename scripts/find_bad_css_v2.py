import os
import re

ROOT_DIR = "src"

# Regex to capture any usage of bg-[...]
regex_bg = re.compile(r'bg-\[([^\]]*)\]')
# Regex for the specific problematic case reported: .4!
regex_problem = re.compile(r'\.4!')

print("Starting deep scan...")
for root, dirs, files in os.walk(ROOT_DIR):
    for file in files:
        # Strict check on extensions included in globals.css
        if file.endswith(('.js', '.ts', '.jsx', '.tsx', '.mdx')):
            path = os.path.join(root, file)
            try:
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                    # 1. Search for bg-[...]
                    matches = regex_bg.finditer(content)
                    for m in matches:
                        val = m.group(1)
                        if '.4!' in val or 'f7' in val: # narrow down to suspects
                             print(f"MATCH: {path} -> bg-[{val}]")
                        # Catch weird chars
                        if any(ord(c) > 127 for c in val):
                            print(f"BINARY/WEIRD: {path} -> bg-[{val}]")

                    # 2. Search for just `.4!` anywhere
                    if regex_problem.search(content):
                        print(f"Possible .4! usage in {path}")
                        
            except UnicodeDecodeError:
                print(f"BINARY FILE DETECTED (with code extension): {path}")
            except Exception as e:
                print(f"Error reading {path}: {e}")

print("Deep scan complete.")
