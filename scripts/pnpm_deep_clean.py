import os
import shutil
import subprocess
import sys
import json
import re

def run_command(command_list, capture_output=False):
    """Função auxiliar para executar comandos e capturar erros."""
    try:
        if not capture_output:
            print(f"Executando: {' '.join(command_list)}...")
        result = subprocess.run(
            command_list, 
            check=False, 
            capture_output=capture_output, 
            text=True
        )
        return result
    except FileNotFoundError:
        print(f"❌ Erro: O comando '{command_list[0]}' não foi encontrado no sistema.")
        return None

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
    install_res = run_command(["pnpm", "install"])
    success = install_res and install_res.returncode == 0

    if success:
        # 4. Ecosystem Cleanup (Intersection logic)
        cleanup_unused_files()
        
        print("\n" + "="*40)
        print("✅ PROCESSO CONCLUÍDO COM SUCESSO!")
        print("O sistema está limpo e otimizado.")
        print("="*40)
    else:
        print("\n❌ Ocorreu um problema durante a reinstalação.")

def cleanup_unused_files():
    print("\n🔍 Analisando arquivos não utilizados (Knip + Unimported)...")
    
    # Run Knip
    knip_res = run_command(["npx", "knip", "--reporter", "json"], capture_output=True)
    knip_files = set()
    if knip_res and knip_res.stdout:
        try:
            knip_data = json.loads(knip_res.stdout)
            if "issues" in knip_data:
                knip_files = {issue["file"] for issue in knip_data["issues"] if "file" in issue}
            elif "files" in knip_data:
                knip_files = set(knip_data["files"])
        except Exception as e:
            print(f"⚠️ Erro ao processar Knip: {e}")

    # Run Unimported
    unimported_res = run_command(["pnpm", "dlx", "unimported", "--show-unused-files"], capture_output=True)
    unimported_files = set()
    if unimported_res and unimported_res.stdout:
        # Extract files from unimported output (usually one per line or in a list)
        lines = unimported_res.stdout.splitlines()
        for line in lines:
            line = line.strip()
            if line.startswith('src/') or line.startswith('scripts/'):
                unimported_files.add(line)

    # Intersection
    to_delete = knip_files.intersection(unimported_files)
    
    # Filter security patterns
    EXCLUDE_PATTERNS = ['.agent/', 'knip.config', 'package.json', '.env', 'node_modules', 'public/']
    to_delete = [f for f in to_delete if not any(p in f for p in EXCLUDE_PATTERNS)]

    if to_delete:
        print(f"🗑️ Encontrados {len(to_delete)} arquivos duplicadamente marcados como não usados.")
        for file_path in to_delete:
            if os.path.exists(file_path):
                try:
                    os.remove(file_path)
                    print(f"  ✅ Removido: {file_path}")
                except Exception as e:
                    print(f"  ❌ Falha ao remover {file_path}: {e}")
    else:
        print("✨ Nenhum arquivo não utilizado detectado na intersecção.")

if __name__ == "__main__":
    deep_clean_pnpm()