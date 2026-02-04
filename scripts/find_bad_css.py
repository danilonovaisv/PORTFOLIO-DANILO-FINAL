import os
import re

ROOT_DIR = "src"
# Look for bg-[...]
# We want to find cases where the content inside [] contains ! or other weird chars
# or just list them all to see if any are garbage.

regex = re.compile(r'bg-\[([^\]]*)\]')

print("Starting scan...")
for root, dirs, files in os.walk(ROOT_DIR):
    for file in files:
        if file.endswith(('.js', '.ts', '.jsx', '.tsx', '.mdx')):
            path = os.path.join(root, file)
            try:
                with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                    matches = regex.finditer(content)
                    for m in matches:
                        val = m.group(1)
                        # Check for suspicious characters: ! (unless it's !important at end?), or binary-looking stuff
                        # The error mentioned bg-[.4!] and bg-[f7...]
                        if '!' in val or 'f7' in val or '.' in val:
                            print(f"Found in {path}: bg-[{val}]")
                        
                        # also print if it looks very short or malformed
                        if len(val) < 2:
                             print(f"Short/Weird in {path}: bg-[{val}]")
            except Exception as e:
                print(f"Error reading {path}: {e}")
print("Scan complete.")
