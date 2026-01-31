# scripts/audit_assets.py
import os
import re
import urllib.request
import urllib.error
import json
import sys

# Config
ROOT_DIR = "src"
# Regex to capture Supabase URLs
PATTERN = r"https?://[a-zA-Z0-9.-]*supabase\.co/storage/v1/object/public/[^\s\"')]+"

def find_links():
    links = []
    print(f"🔍 Varrendo {ROOT_DIR} por links Supabase...")
    
    for root, _, files in os.walk(ROOT_DIR):
        for file in files:
            if file.endswith(('.ts', '.tsx', '.css', '.js', '.json')):
                path = os.path.join(root, file)
                try:
                    with open(path, 'r', encoding='utf-8') as f:
                        content = f.read()
                        matches = re.finditer(PATTERN, content)
                        for m in matches:
                            links.append({
                                "url": m.group(),
                                "file": path
                            })
                except Exception as e:
                    print(f"Erro ao ler {path}: {e}")
    return links

def check_status(links):
    print(f"🔗 Verificando {len(links)} links encontrados...")
    broken = []
    checked_cache = {}

    for item in links:
        url = item['url']
        
        # Cache results
        if url in checked_cache:
            status = checked_cache[url]
        else:
            try:
                # Use HEAD request
                req = urllib.request.Request(url, method='HEAD')
                # Simple User-Agent to avoid some blocklists
                req.add_header('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36')
                
                with urllib.request.urlopen(req, timeout=5) as response:
                    status = response.getcode()
            except urllib.error.HTTPError as e:
                status = e.code
                # If Method Not Allowed (405) or Forbidden (403), try GET
                if status == 405 or status == 403:
                    try:
                        req_get = urllib.request.Request(url, method='GET')
                        req_get.add_header('User-Agent', 'Mozilla/5.0')
                        with urllib.request.urlopen(req_get, timeout=5) as response:
                             status = response.getcode()
                    except urllib.error.HTTPError as e2:
                        status = e2.code
                    except Exception:
                        status = "ERROR"
            except Exception as e:
                # print(f"Error accessing {url}: {e}")
                status = "ERROR"
            
            checked_cache[url] = status

        if status != 200:
            print(f"❌ [BROKEN] {status} - {url} \n   L-> {item['file']}")
            broken.append({**item, "status": status})
        else:
            print(f"✅ [OK] {url}")

    return broken

if __name__ == "__main__":
    found_links = find_links()
    broken_links = check_status(found_links)
    
    print("-" * 30)
    print(f"RELATÓRIO FINAL: {len(broken_links)} links quebrados encontrados.")
    
    # Save report
    try:
        with open(".agent/broken_links_report.json", "w") as f:
            json.dump(broken_links, f, indent=2)
        print("Detalhes salvos em .agent/broken_links_report.json")
    except PermissionError:
        print("⚠️ Não foi possível salvar o relatório em .agent/broken_links_report.json (Permissão negada).")
    except Exception as e:
        print(f"⚠️ Erro ao salvar relatório: {e}")

    # Exit with error if links are broken
    if broken_links:
        sys.exit(1)