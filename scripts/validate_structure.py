
import os
import sys
import re

# --- Configuration ---
RULES_FILE = '.context/DOCS-PORTFOLIO-PAGES/RULES-PORTFOLIO-STRUCTURE.md'
PROJECT_ROOT = os.getcwd()

# --- Colors ---
RED = '\033[91m'
GREEN = '\033[92m'
YELLOW = '\033[93m'
RESET = '\033[0m'
BOLD = '\033[1m'

def log_error(msg):
    print(f"{RED}✖ {msg}{RESET}", file=sys.stderr)

def log_success(msg):
    print(f"{GREEN}✔ {msg}{RESET}")

def log_info(msg):
    print(f"{YELLOW}ℹ {msg}{RESET}")

# --- Logic ---

def validate_structure():
    rules_path = os.path.join(PROJECT_ROOT, RULES_FILE)

    if not os.path.exists(rules_path):
        log_error(f"Rules file not found at: {rules_path}")
        sys.exit(1)

    with open(rules_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    lines = content.split('\n')
    
    errors = 0
    checks = 0

    print(f"{BOLD}Running Structure Validation against RULES-PORTFOLIO-STRUCTURE.md (Python){RESET}\n")

    # Regex patterns
    # - **Caminho absoluto:** `.context/...`
    path_regex = re.compile(r"- \*\*Caminho absoluto:\*\* `(.+?)`")
    # | **Page** | ... | `/path` |
    table_regex = re.compile(r"\| \*\*(.+?)\*\* \| .+? \| `(.+?)` \|")

    # 1. Validate Table Summary Paths (Page Level)
    print(f"{BOLD}Validating Page Routes...{RESET}")
    for line in lines:
        table_match = table_regex.search(line)
        if table_match:
            page_name = table_match.group(1)
            route_path = table_match.group(2)
            
            # Clean wildcard if present (e.g. admin/*)
            clean_path = route_path.replace('/*', '')
            
            # Check only /app routes
            if route_path.startswith('/app'):
                # Construct path: src/app/...
                # Note: clean_path starts with /, so join handles it or we strip it
                relative_path_src = os.path.join('src', clean_path.lstrip('/'))
                full_path_src = os.path.join(PROJECT_ROOT, relative_path_src)
                
                checks += 1
                if os.path.exists(full_path_src):
                    log_success(f"Page Found: {page_name} -> {relative_path_src}")
                else:
                    # Check parent dir if file doesn't exist (e.g. for dynamic routes or folders)
                    if os.path.exists(os.path.dirname(full_path_src)):
                         log_error(f"Missing Page File: {page_name} -> {relative_path_src}")
                         errors += 1
                    else:
                         log_error(f"Missing Page Route: {page_name} -> {relative_path_src}")
                         errors += 1

    print(f"\n{BOLD}Validating Documentation Structure...{RESET}")

    # 2. Validate Documentation Folder Paths (Session Level)
    for line in lines:
        path_match = path_regex.search(line)
        if path_match:
            declared_path = path_match.group(1)
            # declared_path usually starts with .context/...
            full_path = os.path.abspath(os.path.join(PROJECT_ROOT, declared_path))
            
            checks += 1
            if os.path.exists(full_path):
                log_success(f"Doc Folder Found: {declared_path}")
            else:
                log_error(f"Missing Documentation Folder: {declared_path}")
                errors += 1

    print(f"\n{BOLD}Summary:{RESET}")
    print(f"Total Checks: {checks}")
    print(f"Total Errors: {errors}")

    if errors > 0:
        print(f"\n{RED}{BOLD}Validation FAILED. Structure does not match Rules.{RESET}")
        sys.exit(1)
    else:
        print(f"\n{GREEN}{BOLD}Validation PASSED. Structure is compliant.{RESET}")
        sys.exit(0)

if __name__ == "__main__":
    validate_structure()
