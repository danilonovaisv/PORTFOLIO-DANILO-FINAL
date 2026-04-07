import os
import ast
import sys

# ==========================================
# 1. Configuração das Regras de Arquitetura
# ==========================================
# Defina aqui quais pastas (sessões) podem importar quais outras.
# Exemplo: 'services' só pode importar de 'utils' e 'db'.
ARQUITETURA_PERMITIDA = {
    "controllers": ["services", "utils", "models"],
    "services": ["models", "utils", "db"],
    "models": ["db", "utils"],
    "utils": [], # Utils não deve depender de ninguém
    "db": []
}

class AntigravityAuditor:
    def __init__(self, projeto_root):
        self.root = projeto_root
        self.violation_report = []

    def get_imports(self, file_path):
        """Lê o arquivo e retorna uma lista de módulos importados."""
        imports = set()
        try:
            with open(file_path, "r", encoding="utf-8") as file:
                tree = ast.parse(file.read())
            
            for node in ast.walk(tree):
                # Captura 'import x'
                if isinstance(node, ast.Import):
                    for alias in node.names:
                        imports.add(alias.name.split('.')[0])
                # Captura 'from x import y'
                elif isinstance(node, ast.ImportFrom):
                    if node.module:
                        imports.add(node.module.split('.')[0])
        except Exception as e:
            print(f"Erro ao ler {file_path}: {e}")
        return imports

    def check_rules(self, current_session, imported_module):
        """Verifica se a importação é permitida pelas regras."""
        # Se o módulo importado não faz parte da nossa arquitetura monitorada, ignoramos (ex: bibliotecas externas)
        if imported_module not in ARQUITETURA_PERMITIDA:
            return True
        
        # Se a regra existe, verificamos se o import está na lista permitida
        allowed = ARQUITETURA_PERMITIDA.get(current_session, [])
        if imported_module in allowed:
            return True
        
        return False

    def audit_session(self, session_name):
        """Audita todos os arquivos de uma sessão (pasta) específica."""
        session_path = os.path.join(self.root, session_name)
        
        if not os.path.exists(session_path):
            print(f"Erro: A sessão '{session_name}' não foi encontrada.")
            return

        print(f"\n--- Iniciando Auditoria na Sessão: {session_name} ---")
        files_checked = 0
        
        for root, _, files in os.walk(session_path):
            for file in files:
                if file.endswith(".py"):
                    files_checked += 1
                    full_path = os.path.join(root, file)
                    imported_modules = self.get_imports(full_path)
                    
                    for mod in imported_modules:
                        if not self.check_rules(session_name, mod):
                            violation = f"[VIOLAÇÃO] Arquivo '{file}' na sessão '{session_name}' importou '{mod}' indevidamente."
                            self.violation_report.append(violation)
                            print(violation)

        if not self.violation_report:
            print(f"✅ Sucesso! {files_checked} arquivos analisados. Nenhuma violação encontrada.")
        else:
            print(f"⚠️ Atenção! Foram encontradas {len(self.violation_report)} violações.")

    def audit_page(self, session_name, page_name):
        """Audita um arquivo específico (Página)."""
        file_path = os.path.join(self.root, session_name, page_name)
        
        if not os.path.exists(file_path):
            print(f"Erro: O arquivo '{page_name}' não existe em '{session_name}'.")
            return

        print(f"\n--- Auditando Página Única: {page_name} ---")
        imported_modules = self.get_imports(file_path)
        violations = []

        for mod in imported_modules:
            if not self.check_rules(session_name, mod):
                violations.append(mod)

        if violations:
            print(f"❌ A página '{page_name}' tem chamadas incorretas para: {violations}")
        else:
            print(f"✅ A página '{page_name}' está limpa.")

# ==========================================
# 4. Interface do Usuário (CLI)
# ==========================================
if __name__ == "__main__":
    # Define o diretório raiz do projeto (ajuste conforme necessário)
    ROOT_DIR = os.getcwd() 
    
    auditor = AntigravityAuditor(ROOT_DIR)

    print("🚀 Bem-vindo ao Antigravity Auditor")
    print("Sessões disponíveis (configuradas):", list(ARQUITETURA_PERMITIDA.keys()))
    
    sessao_escolhida = input("Qual sessão você deseja auditar? (ex: services): ").strip()
    
    tipo_auditoria = input("Digite '1' para auditar a sessão inteira ou '2' para um arquivo específico: ").strip()

    if tipo_auditoria == '1':
        auditor.audit_session(sessao_escolhida)
    elif tipo_auditoria == '2':
        arquivo_escolhido = input("Qual o nome do arquivo? (ex: user_service.py): ").strip()
        auditor.audit_page(sessao_escolhida, arquivo_escolhido)
    else:
        print("Opção inválida.")
