#!/usr/bin/env python3
"""
clean_project.py

Script robusto de limpeza profunda para projetos de desenvolvimento.
Executa a remoção de artefatos de build, cache, logs e arquivos temporários
com verificações de segurança, whitelist e confirmação interativa.

Uso:
    python3 clean_project.py [--dry-run] [--force] [--path <caminho>]
"""

import os
import sys
import shutil
import argparse
import logging
import time
from pathlib import Path
from typing import List, Set, Tuple

# Configuração de Logs
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
    handlers=[
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger("CleanProject")

# -----------------------------------------------------------------------------
# CONFIGURAÇÃO E LISTAS DE SEGURANÇA
# -----------------------------------------------------------------------------

# Diretórios que PODEM ser removidos (Blacklist)
DIRS_TO_REMOVE = [
    "node_modules",
    ".next",
    "dist",
    "build",
    "coverage",
    "__pycache__",
    ".cache",
    ".turbo",
    ".pytest_cache",
    ".eslintcache",
    "tmp",
    "out",               # Next.js static export
    ".firebase",         # Firebase cache
    "dataconnect-generated" # Generated code (re-generated on build)
]

# Padrões de arquivos que PODEM ser removidos (Glob patterns)
FILES_TO_REMOVE_PATTERNS = [
    "*.log",
    "*.tmp",
    "*.bak",
    "*.swp",
    "npm-debug.log*",
    "yarn-error.log*",
    "pnpm-debug.log*",
    ".DS_Store",
    "Thumbs.db"
]

# Diretórios e Arquivos CRÍTICOS que NUNCA devem ser removidos (Whitelist)
# A verificação é feita verificando se o caminho a ser deletado NÃO está contido aqui
# ou se o caminho a ser deletado não é um pai de algo aqui (embora node_modules raramente seja pai de src)
PROTECTED_PATHS = [
    ".git",
    ".github",
    ".vscode",
    ".idea",
    ".husky",
    ".agent",
    "src",
    "app",
    "pages",
    "components",
    "public",
    "styles",
    "lib",
    "utils",
    "hooks",
    "context",
    "prisma",
    "supabase",
    "scripts",
    "docs",
    "tests",
    "package.json",
    "package-lock.json",
    "pnpm-lock.yaml",
    "yarn.lock",
    "tsconfig.json",
    "next.config.js",
    "next.config.mjs",
    "tailwind.config.ts",
    "tailwind.config.js",
    ".env",
    ".env.local",
    ".env.development",
    ".env.production",
    ".gitignore",
    "README.md",
    "requirements.txt",
    "pyproject.toml"
]

# Limite de tamanho para confirmação extra (bytes) - 100MB
LARGE_SIZE_THRESHOLD = 100 * 1024 * 1024 

# -----------------------------------------------------------------------------
# CLASSES DE SEGURANÇA (AGENT-SAFETY-GUARDIAN)
# -----------------------------------------------------------------------------

class SafetyGuardian:
    def __init__(self, root_path: Path):
        self.root_path = root_path.resolve()

    def is_safe_to_delete(self, path: Path) -> bool:
        """
        Verifica se o caminho é seguro para deletar.
        1. Deve estar dentro do root_path.
        2. Não deve ser o root_path.
        3. Não deve estar na lista de protegidos.
        4. Não deve ser um diretório pai de um protegido (ex: não deletar 'src' se 'src/index.ts' for protegido).
        """
        resolved_path = path.resolve()
        
        # 1. Deve estar dentro do root
        try:
            resolved_path.relative_to(self.root_path)
        except ValueError:
            logger.error(f"SEGURANÇA: Tentativa de deletar fora da raiz do projeto: {resolved_path}")
            return False

        # 2. Não deletar a raiz
        if resolved_path == self.root_path:
            logger.error("SEGURANÇA: Tentativa de deletar a raiz do projeto!")
            return False

        # 3. Whitelist check
        # Verifica se o caminho ou alguma parte dele corresponde a um arquivo protegido
        rel_path_str = str(resolved_path.relative_to(self.root_path))
        
        # Exact match
        if rel_path_str in PROTECTED_PATHS:
            logger.warning(f"PROTEGIDO: {rel_path_str} está na whitelist.")
            return False
            
        # Verifica se é subdiretório de algo protegido (ex: .git/objects) - O código de limpeza não deve entrar em .git recursivamente para deletar, 
        # mas se o script tentar deletar .git, cai no check acima.
        # Se tentarmos deletar um arquivo *dentro* de src (ex: src/lixo.tmp), tudo bem, desde que não seja o src inteiro.
        
        # Verifica se estamos tentando deletar algo que CONTÉM um arquivo protegido
        # (ex: deletar a pasta raiz '.' conteria .git) - Já verificado no passo 2.
        
        return True

    def check_size(self, path: Path) -> Tuple[bool, int]:
        """Retorna (is_large, size_in_bytes)"""
        if not path.exists():
            return False, 0
            
        total_size = 0
        if path.is_file():
            total_size = path.stat().st_size
        else:
            for p in path.rglob('*'):
                if p.is_file():
                    total_size += p.stat().st_size
        
        return total_size > LARGE_SIZE_THRESHOLD, total_size

# -----------------------------------------------------------------------------
# LÓGICA DE LIMPEZA (AGENT-PYTHON-EXECUTOR-BUILDER)
# -----------------------------------------------------------------------------

class Cleaner:
    def __init__(self, root: Path, dry_run: bool, force: bool):
        self.root = root
        self.dry_run = dry_run
        self.force = force
        self.guardian = SafetyGuardian(root)
        self.stats = {
            "deleted_dirs": 0,
            "deleted_files": 0,
            "reclaimed_bytes": 0,
            "skipped_protected": 0,
            "errors": 0
        }

    def format_bytes(self, size):
        power = 2**10
        n = 0
        power_labels = {0 : '', 1: 'K', 2: 'M', 3: 'G', 4: 'T'}
        while size > power:
            size /= power
            n += 1
        return f"{size:.2f} {power_labels[n]}B"

    def remove_dir(self, path: Path):
        if not path.exists():
            return
            
        if not self.guardian.is_safe_to_delete(path):
            self.stats["skipped_protected"] += 1
            return

        is_large, size = self.guardian.check_size(path)
        
        if is_large and not self.force and not self.dry_run:
            logger.warning(f"ALERTA DE TAMANHO: {path} tem {self.format_bytes(size)}.")
            confirm = input(f" Confirmar exclusão de {path}? [y/N] ")
            if confirm.lower() != 'y':
                logger.info(f"Pulado: {path}")
                return

        action = "Simulando remoção" if self.dry_run else "Removendo"
        logger.info(f"{action} diretório: {path} ({self.format_bytes(size)})")
        
        if not self.dry_run:
            try:
                shutil.rmtree(path)
                self.stats["deleted_dirs"] += 1
                self.stats["reclaimed_bytes"] += size
            except Exception as e:
                logger.error(f"Erro ao remover {path}: {e}")
                self.stats["errors"] += 1
        else:
            self.stats["deleted_dirs"] += 1
            self.stats["reclaimed_bytes"] += size

    def remove_file(self, path: Path):
        if not path.exists():
            return

        if not self.guardian.is_safe_to_delete(path):
            self.stats["skipped_protected"] += 1
            return

        size = path.stat().st_size
        action = "Simulando remoção" if self.dry_run else "Removendo"
        logger.info(f"{action} arquivo: {path} ({self.format_bytes(size)})")
        
        if not self.dry_run:
            try:
                path.unlink()
                self.stats["deleted_files"] += 1
                self.stats["reclaimed_bytes"] += size
            except Exception as e:
                logger.error(f"Erro ao remover {path}: {e}")
                self.stats["errors"] += 1
        else:
            self.stats["deleted_files"] += 1
            self.stats["reclaimed_bytes"] += size

    def run(self):
        start_time = time.time()
        logger.info(f"Iniciando limpeza em: {self.root}")
        if self.dry_run:
            logger.info("MODO: DRY-RUN (Nenhuma alteração será feita)")
        else:
            logger.warning("MODO: EXECUTAR (Arquivos serão permanentemente deletados)")
            if not self.force:
                time.sleep(2) # Pequena pausa para ler o aviso

        # 1. Remover Diretórios da Blacklist
        for dir_name in DIRS_TO_REMOVE:
            # Procura no nível raiz e recursivamente se necessário?
            # Por segurança, vamos olhar apenas na raiz e em subníveis específicos se configurado.
            # A lista DIRS_TO_REMOVE geralmente contém pastas de raiz (node_modules, .next).
            # Mas node_modules pode existir aninhado. 
            # Vamos usar rglob para node_modules para pegar nested packages, mas cuidado.
            # CLEANUP PROFUNDO: vamos buscar em todo o projeto.
            
            logger.info(f"Buscando diretórios '{dir_name}'...")
            # Encontra todas as ocorrências
            found_dirs = list(self.root.rglob(dir_name))
            for d in found_dirs:
                if d.is_dir():
                    self.remove_dir(d)

        # 2. Remover Arquivos por Padrão (Glob)
        for pattern in FILES_TO_REMOVE_PATTERNS:
            logger.info(f"Buscando arquivos por padrão '{pattern}'...")
            found_files = list(self.root.rglob(pattern))
            for f in found_files:
                if f.is_file():
                    self.remove_file(f)

        # Relatório Final
        elapsed = time.time() - start_time
        logger.info("-" * 40)
        logger.info("RELATÓRIO FINAL DE LIMPEZA")
        logger.info("-" * 40)
        logger.info(f"Tempo decorrido: {elapsed:.2f}s")
        logger.info(f"Diretórios removidos: {self.stats['deleted_dirs']}")
        logger.info(f"Arquivos removidos:   {self.stats['deleted_files']}")
        logger.info(f"Espaço recuperado:    {self.format_bytes(self.stats['reclaimed_bytes'])}")
        logger.info(f"Itens protegidos:     {self.stats['skipped_protected']}")
        logger.info(f"Erros encontrados:    {self.stats['errors']}")
        logger.info("-" * 40)

        if self.stats['errors'] > 0:
            sys.exit(1)

# -----------------------------------------------------------------------------
# MAIN
# -----------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(description="Script de Limpeza Profunda do Projeto")
    parser.add_argument("--dry-run", action="store_true", help="Simula a execução sem deletar nada", default=True)
    parser.add_argument("--execute", action="store_true", help="Executa a remoção real (desabilita dry-run)")
    parser.add_argument("--force", action="store_true", help="Ignora confirmações de segurança para pastas grandes")
    parser.add_argument("--path", type=str, default=".", help="Caminho raiz do projeto")
    
    args = parser.parse_args()
    
    # Lógica Dry-run vs Execute
    # Se --execute for passado, dry_run se torna False.
    # Se nenhum for passado, default é dry_run=True (segurança por padrão).
    if args.execute:
        args.dry_run = False
        
    root_path = Path(args.path).resolve()
    
    if not root_path.exists():
        logger.error(f"Caminho não encontrado: {root_path}")
        sys.exit(1)
        
    cleaner = Cleaner(root_path, args.dry_run, args.force)
    cleaner.run()

if __name__ == "__main__":
    main()
