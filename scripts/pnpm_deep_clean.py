import os
import shutil
import subprocess
import sys

def run_command(command_list):
    """Função auxiliar para executar comandos e capturar erros."""
    try:
        print(f"Executando: {' '.join(command_list)}...")
        subprocess.run(command_list, check=True)
        return True
    except subprocess.CalledProcessError as e:
        print(f"⚠️ Falha ao executar {command_list[0]}: {e}")
        return False
    except FileNotFoundError:
        print(f"❌ Erro: O comando '{command_list[0]}' não foi encontrado no sistema.")
        return False

def deep_clean_pnpm():
    # Caminhos relativos ao local onde o script é executado
    targets = ['node_modules', 'pnpm-lock.yaml', '.pnpm-debug.log']
    
    print("="*40)
    print("🚀 PNPM DEEP REPAIR TOOL")
    print("="*40)
    print("Nota: Certifica-te que fechaste o VS Code ou IntelliJ antes de continuar.\n")

    # 1. Limpeza de Ficheiros Locais
    for target in targets:
        if os.path.exists(target):
            try:
                if os.path.isdir(target):
                    print(f"🗑️ Removendo pasta: {target}")
                    shutil.rmtree(target)
                else:
                    print(f"📄 Removendo ficheiro: {target}")
                    os.remove(target)
            except PermissionError:
                print(f"❌ ERRO DE PERMISSÃO: O sistema impede o acesso a '{target}'.")
                print("Tenta fechar todos os programas ou corre o Python como Administrador.")
                return

    # 2. Limpeza da Cache Global do PNPM
    # O comando 'store prune' remove pacotes não utilizados da store global
    print("\n🧹 A limpar a store global do pnpm...")
    run_command(["pnpm", "store", "prune"])

    # 3. Reinstalação Forçada
    print("\n📦 A reinstalar dependências...")
    success = run_command(["pnpm", "install"])

    if success:
        print("\n" + "="*40)
        print("✅ PROCESSO CONCLUÍDO COM SUCESSO!")
        print("O erro EPERM deve ter desaparecido.")
        print("="*40)
    else:
        print("\n❌ Ocorreu um problema durante a reinstalação.")

if __name__ == "__main__":
    deep_clean_pnpm()