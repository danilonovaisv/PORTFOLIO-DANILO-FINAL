import json
import os

ASSETS_FILE = 'assets.json'
OUTPUT_FILE = '.context/knowledge/KI-005-Asset-Map.md'

def generate_map():
    if not os.path.exists(ASSETS_FILE):
        print(f"Error: {ASSETS_FILE} not found")
        return

    with open(ASSETS_FILE, 'r') as f:
        data = json.load(f)

    # Structure seems to be a list containing an object with 'export_json'
    items = data[0]['export_json'] if isinstance(data, list) and 'export_json' in data[0] else []

    with open(OUTPUT_FILE, 'w') as f:
        f.write("# Asset Map (KI-005)\n\n")
        f.write("> **Source**: `assets.json` (Root)\n")
        f.write("> **Sync**: `npm run assets:sync` updates `src/config/site-assets.json`\n\n")
        f.write("## Supabase Storage Assets\n\n")
        f.write("| Key (Agent ID) | File Path | Bucket |\n")
        f.write("| :--- | :--- | :--- |\n")
        
        for item in items:
            key = item.get('key', 'N/A')
            path = item.get('file_path', 'N/A')
            bucket = item.get('bucket', 'N/A')
            f.write(f"| `{key}` | `{path}` | `{bucket}` |\n")

    print(f"Generated {OUTPUT_FILE} with {len(items)} assets.")

if __name__ == "__main__":
    generate_map()
