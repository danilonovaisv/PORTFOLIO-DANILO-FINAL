import os
import re

def scan_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            # Look for tokens starting with bg-[
            tokens = re.findall(r'bg-\[[^\]\s]*', content)
            for t in tokens:
                if '.4' in t or '!' in t or 'f7' in t:
                    print(f"SUSPICIOUS: {filepath}: {t}")
            
            # Also catch literal .4!
            if '.4!' in content:
                print(f"LITERAL .4!: {filepath}")
    except Exception as e:
        pass

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.startswith('.'): continue
        scan_file(os.path.join(root, file))
