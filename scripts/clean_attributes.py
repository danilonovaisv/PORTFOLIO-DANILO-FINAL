import os
import subprocess

# Configurações
PROJECT_ROOT = "."
# Pastas que o script DEVE ignorar para evitar erros de permissão
IGNORE_DIRS = {'.git', 'node_modules', '.next', '.pnpm-store'}

def remove_xattrs(path):
    """Remove todos os atributos estendidos de um arquivo ou pasta."""
    try:
        # Comando nativo do macOS para limpar atributos
        subprocess.run(['xattr', '-c', path], check=True, capture_output=True)
    except subprocess.CalledProcessError:
        # Silencia erros de permissão em arquivos de sistema
        pass

def start_cleanup():
    print(f"🚀 Iniciando limpeza de atributos em: {os.path.abspath(PROJECT_ROOT)}")
    
    count = 0
    for root, dirs, files in os.walk(PROJECT_ROOT):
        # Filtra pastas ignoradas para performance e segurança
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
        
        for name in files + dirs:
            item_path = os.path.join(root, name)
            remove_xattrs(item_path)
            count += 1
            if count % 100 == 0:
                print(f"... {count} itens processados")

    print(f"✅ Limpeza concluída! {count} itens verificados.")

if __name__ == "__main__":
    start_cleanup()