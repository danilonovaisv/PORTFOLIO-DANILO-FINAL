import subprocess
import os
import getpass

def run_pnpm_cmd(cmd_list):
    """Executa comando pnpm e retorna o resultado limpo."""
    try:
        result = subprocess.check_output(cmd_list, stderr=subprocess.STDOUT)
        return result.decode('utf-8').strip()
    except:
        return None

def audit_and_fix():
    user = getpass.getuser()
    print(f"--- 🔍 Auditoria Global PNPM (macOS) para: {user} ---")

    # 1. Localizar a Store Global
    store_path = run_pnpm_cmd(['pnpm', 'store', 'path'])
    
    if not store_path:
        print("❌ Não foi possível localizar a store do pnpm. O pnpm está instalado?")
        return

    print(f"📍 Store detectada em: {store_path}")

    # 2. Pastas críticas para o erro EPERM no Mac
    # Incluímos a store, a cache do pnpm e a pasta de logs do sistema
    critical_paths = [
        store_path,
        os.path.expanduser("~/.local/share/pnpm"),
        os.path.expanduser("~/Library/Caches/pnpm"),
        os.getcwd() # Pasta atual do projeto
    ]

    print("\nStep 1: Corrigindo permissões das pastas de sistema...")
    for path in critical_paths:
        if os.path.exists(path):
            try:
                print(f"🔓 Reparando: {path}")
                # 'chown' garante que tu és o dono
                subprocess.run(['sudo', 'chown', '-R', f'{user}:staff', path], check=True)
                # 'chmod' garante acesso de leitura/escrita
                subprocess.run(['chmod', '-R', '755', path], check=True)
            except Exception as e:
                print(f"⚠️ Aviso: Falha ao reparar {path}. (Pode ser uma pasta de sistema protegida)")

    # 3. Limpeza profunda da store (remove links quebrados)
    print("\nStep 2: Otimizando a base de dados do pnpm...")
    subprocess.run(['pnpm', 'store', 'prune'], check=True)

    print("\n--- ✅ Auditoria Finalizada ---")
    print("Agora, tente rodar os testes novamente:")
    print("1. pnpm install")
    print("2. pnpm run test")

if __name__ == "__main__":
    audit_and_fix()