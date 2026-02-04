import os
import re
import sys

# Rules mapping: Path Fragment -> Allowed Dependencies fragments
# If a key matches the file path, the imports must match allowed list (or not match forbidden).
# This is a simplified architecture enforcement.
ARCHITECTURE_RULES = {
    "src/components/ui": {
        "forbidden": ["src/components/home", "src/components/portfolio", "src/components/sobre", "src/app"],
        "description": "UI components should not import feature-specific components."
    },
    "src/hooks": {
        "forbidden": ["src/components", "src/app"],
        "description": "Hooks should be business logic or utilities, avoiding UI component coupling."
    },
    "src/config": {
        "forbidden": ["src/components", "src/app", "src/hooks"],
        "description": "Config should be static constants."
    }
}

class TSAuditor:
    def __init__(self, project_root):
        self.root = project_root
        self.violations = []

    def resolve_import(self, file_path, import_path):
        # Handle path aliases
        if import_path.startswith("@/"):
            return os.path.join(self.root, "src", import_path[2:])
        
        # Handle relative paths
        if import_path.startswith("."):
            base_dir = os.path.dirname(file_path)
            return os.path.normpath(os.path.join(base_dir, import_path))
        
        return import_path # External or absolute (node_modules)

    def get_imports(self, file_path):
        imports = []
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                # Regex for "import ... from '...'"
                # Handles single/double quotes, newlines, etc. simplified
                matches = re.findall(r'from\s+[\'"]([^\'"]+)[\'"]', content)
                matches += re.findall(r'import\s+[\'"]([^\'"]+)[\'"]', content) # Side effect imports
                
                # Filter out distinct
                return list(set(matches))
        except Exception as e:
            print(f"Error reading {file_path}: {e}")
            return []

    def check_file(self, file_path):
        rel_path = os.path.relpath(file_path, self.root)
        
        # Determine rules for this file
        current_rule = None
        for path_key, rule in ARCHITECTURE_RULES.items():
            if path_key in rel_path: # simplified matching
                current_rule = rule
                break
        
        if not current_rule:
            return

        imports = self.get_imports(file_path)
        for imp in imports:
            resolved_path = self.resolve_import(file_path, imp)
            
            # Check forbidden
            for forbidden in current_rule.get("forbidden", []):
                # Check if resolved path contains forbidden segment
                # We compare absolute paths or relative key paths
                resolved_rel = os.path.relpath(resolved_path, self.root) if os.path.isabs(resolved_path) else resolved_path
                
                # If the import resolves to something inside a forbidden path
                if forbidden in resolved_rel and not "node_modules" in resolved_rel:
                     self.violations.append(f"[VIOLATION] File '{rel_path}' imports '{imp}' ({resolved_rel}) which is forbidden by rule: {current_rule['description']}")

    def audit_directory(self, target_dir):
        msg = []
        for root, _, files in os.walk(target_dir):
            for file in files:
                if file.endswith(('.ts', '.tsx')):
                    self.check_file(os.path.join(root, file))
        
        if not self.violations:
            print(f"✅ Audit passed for {target_dir}")
        else:
            print(f"⚠️ Found {len(self.violations)} violations in {target_dir}:")
            for v in self.violations:
                print(v)

if __name__ == "__main__":
    target = sys.argv[1] if len(sys.argv) > 1 else "src"
    root = os.getcwd()
    auditor = TSAuditor(root)
    full_target = os.path.join(root, target)
    print(f"Auditing {full_target}...")
    auditor.audit_directory(full_target)
