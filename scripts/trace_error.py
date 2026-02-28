import os

root_dir = 'src'
target = '.4!'
for root, dirs, files in os.walk(root_dir):
    for name in files:
        if name.endswith(('.ts', '.tsx', '.js', '.jsx')):
            path = os.path.join(root, name)
            try:
                with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                    if target in content:
                        print(f"FOUND in {path}")
                        # Print context
                        lines = content.splitlines()
                        for i, line in enumerate(lines):
                            if target in line:
                                print(f"  Line {i+1}: {line.strip()[:100]}")
            except Exception as e:
                print(f"Error reading {path}: {e}")
print("Done.")
