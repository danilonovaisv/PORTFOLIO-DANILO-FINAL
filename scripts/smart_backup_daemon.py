#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
=============================================================================
SMART BACKUP DAEMON V2 - Cloud Edition (Google Drive API)
=============================================================================
Objetivo:
    Monitorar a pasta atual do projeto e realizar backups incrementais
    diretamente para a nuvem (Google Drive), sem duplicar localmente.
    
Funcionamento:
    1. Monitora modificações locais.
    2. Se alterado: Compacta o projeto em .zip (exceto ignores).
    3. Faz upload do .zip para a pasta do Drive especificada.
    4. Remove o .zip local temporário.

Requisitos:
    pip install PyDrive2

Uso:
    python3 smart_backup_daemon.py          (Inicia o loop de monitoramento)
    python3 smart_backup_daemon.py --force  (Upload imediato)

Autor: Antigravity AI (Ghost Commander)
Data: 2025-02-07
=============================================================================
"""

import os
import sys
import time
import shutil
import argparse
import fnmatch
from datetime import datetime
from pathlib import Path
import zipfile

# --- CONFIGURAÇÃO DA NUVEM ---
# ID da pasta compartilhada fornecida: 1Gm5hNVwKOx2FdRiG77FB9_nmcc5botpd
TARGET_FOLDER_ID = '1Gm5hNVwKOx2FdRiG77FB9_nmcc5botpd'
PROJECT_NAME = "MEU-PORTFOLIO"
CHECK_INTERVAL_SECONDS = 3600  # 60 minutos

# Tenta importar PyDrive2
try:
    from pydrive2.auth import GoogleAuth
    from pydrive2.drive import GoogleDrive
except ImportError:
    print("\033[91m[ERRO] PyDrive2 não instalado. Rode: pip install PyDrive2\033[0m")
    sys.exit(1)

# Lista de padrões Glob para ignorar
IGNORE_PATTERNS = [
    # Dependências e Build
    "node_modules", "venv", ".venv", "dist", "build", ".next", "coverage", "out", ".turbo",
    # Sistema e IDEs
    ".git", ".idea", ".vscode", "__pycache__", ".DS_Store", "smart_backup_daemon.py",
    ".qwen", # Ignorando pasta problemática reportada
    # Logs e Temp
    "*.log", "*.tmp",  "*.zip", "credentials.json", "client_secrets.json",
    f"backup_{PROJECT_NAME}_*.zip" # Ignorar explicitamente os zips gerados
]

# Cores ANSI
class Colors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'

def log(message, type="INFO"):
    timestamp = datetime.now().strftime("%H:%M:%S")
    color = Colors.OKBLUE
    prefix = "[INFO]"
    if type == "SUCCESS": color, prefix = Colors.OKGREEN, "[SUCCESS]"
    elif type == "WARN": color, prefix = Colors.WARNING, "[WARN]"
    elif type == "ERROR": color, prefix = Colors.FAIL, "[ERROR]"
    elif type == "WORK": color, prefix = Colors.OKCYAN, "[...]"
    print(f"{Colors.HEADER}{timestamp}{Colors.ENDC} {color}{prefix}{Colors.ENDC} {message}")

def cleanup_old_zips(src_dir):
    """Remove arquivos zip antigos deixados por execuções falhas."""
    pattern = f"backup_{PROJECT_NAME}_*.zip"
    count = 0
    for filename in os.listdir(src_dir):
        if fnmatch.fnmatch(filename, pattern):
            try:
                os.remove(os.path.join(src_dir, filename))
                count += 1
            except Exception as e:
                log(f"Não foi possível remover {filename}: {e}", "WARN")
    if count > 0:
        log(f"Limpeza inicial: {count} arquivos zip residuais removidos.", "WARN")

def get_gdrive_service():
    """Autentica no Google Drive usando PyDrive2."""
    gauth = GoogleAuth()
    
    # Tenta carregar credenciais salvas
    gauth.LoadCredentialsFile("mycreds.txt")
    
    if gauth.credentials is None:
        # Autenticação via browser local
        log("Iniciando autenticação via navegador...", "WARN")
        gauth.LocalWebserverAuth() 
    elif gauth.access_token_expired:
        # Refresh token
        gauth.Refresh()
    else:
        # Token válido
        gauth.Authorize()
        
    gauth.SaveCredentialsFile("mycreds.txt")
    return GoogleDrive(gauth)

def should_ignore(path, root_dir):
    rel_path = os.path.relpath(path, root_dir)
    # Se for o próprio diretório raiz, não ignorar
    if rel_path == ".": return False
        
    parts = rel_path.split(os.sep)
    for part in parts:
        for pattern in IGNORE_PATTERNS:
            if fnmatch.fnmatch(part, pattern):
                return True
    return False

def get_latest_modification_time(root_dir):
    max_mtime = 0.0
    for dirpath, dirnames, filenames in os.walk(root_dir):
        # Filtra diretórios in-place
        dirnames[:] = [d for d in dirnames if not should_ignore(os.path.join(dirpath, d), root_dir)]
        
        for filename in filenames:
            full_path = os.path.join(dirpath, filename)
            if should_ignore(full_path, root_dir): continue
            try:
                mtime = os.path.getmtime(full_path)
                if mtime > max_mtime: max_mtime = mtime
            except: pass
    return max_mtime

def create_zip_archive(src_dir):
    """Cria um arquivo ZIP temporário do projeto, respeitando ignores."""
    timestamp = datetime.now().strftime("%Y-%m-%d_%Hh%Mm")
    zip_filename = f"backup_{PROJECT_NAME}_{timestamp}.zip"
    zip_path = os.path.join(src_dir, zip_filename)
    
    log(f"Compactando projeto em {zip_filename}...", "WORK")
    
    try:
        with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
            for dirpath, dirnames, filenames in os.walk(src_dir):
                dirnames[:] = [d for d in dirnames if not should_ignore(os.path.join(dirpath, d), src_dir)]
                
                for filename in filenames:
                    full_path = os.path.join(dirpath, filename)
                    if should_ignore(full_path, src_dir): continue
                    
                    # Evita incluir o próprio zip que está sendo criado (caso should_ignore falhe)
                    if filename == zip_filename: continue

                    # Adiciona ao zip com caminho relativo
                    rel_path = os.path.relpath(full_path, src_dir)
                    try:
                        zipf.write(full_path, rel_path)
                    except FileNotFoundError:
                        # Arquivo sumiu durante o processo (comum em pastas temporárias)
                        log(f"Arquivo ignorado (não encontrado): {rel_path}", "WARN")
                    except OSError as e:
                         log(f"Erro ao ler arquivo {rel_path}: {e}", "WARN")
                        
        return zip_path, zip_filename
    except Exception as e:
        log(f"Falha crítica ao criar zip: {e}", "ERROR")
        if os.path.exists(zip_path):
            os.remove(zip_path) # Remove zip corrompido/incompleto
        raise e

def upload_to_drive(drive_service, local_file_path, file_name, folder_id):
    """Faz upload do arquivo para a pasta específica do Drive."""
    log(f"Iniciando upload para pasta ID: {folder_id}...", "WORK")
    
    try:
        file_drive = drive_service.CreateFile({
            'title': file_name,
            'parents': [{'id': folder_id}]
        })
        file_drive.SetContentFile(local_file_path)
        file_drive.Upload() # Envia para a nuvem
        log(f"Upload concluído! ID do arquivo: {file_drive['id']}", "SUCCESS")
        return True
    except Exception as e:
        log(f"Erro no upload: {e}", "ERROR")
        return False

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--force", "--now", action="store_true", help="Força backup imediato")
    args = parser.parse_args()
    
    SOURCE_DIR = os.getcwd()

    log("=== ☁️  SMART CLOUD BACKUP (PYDRIVE) ===", "SUCCESS")
    log(f"Monitorando: {SOURCE_DIR}")
    
    # Limpeza inicial de zips antigos
    cleanup_old_zips(SOURCE_DIR)

    # Verifica client_secrets.json (necessário para OAuth)
    if not os.path.exists("client_secrets.json"):
        log("Arquivo 'client_secrets.json' NÃO encontrado!", "ERROR")
        log("1. Crie credenciais OAuth no Google Cloud Console.", "WARN")
        log("2. Baixe o JSON e renomeie para 'client_secrets.json' nesa pasta.", "WARN")
        log("Sem isso, o script não pode autenticar.", "WARN")
        # Não encerramos abruptamente para permitir que o usuário coloque o arquivo e tente de novo
    
    last_backup_time = time.time() # Começa considerando 'agora' como base para evitar backup imediato desnecessário se não for --force
    if args.force: last_backup_time = 0 
    
    while True:
        try:
            current_time = time.time()
            latest_mod = get_latest_modification_time(SOURCE_DIR)
            
            needs_backup = False
            
            if args.force:
                needs_backup = True
                args.force = False
                log("Forçando backup manual...", "WARN")
            elif latest_mod > last_backup_time:
                needs_backup = True
                ReadableTime = datetime.fromtimestamp(latest_mod).strftime('%H:%M:%S')
                log(f"Alteração detectada ({ReadableTime}). Preparando backup...", "INFO")
            else:
                # log("Sem alterações recentes. Nuvens tranquilas.", "INFO")
                pass # Silencia log de 'sem alterações' para não poluir
                
            if needs_backup:
                # 1. Autenticar (Lazy Load para evitar travar no inicio se der erro)
                drive = get_gdrive_service()
                
                # 2. Compactar
                zip_path, zip_name = create_zip_archive(SOURCE_DIR)
                
                # 3. Upload
                if upload_to_drive(drive, zip_path, zip_name, TARGET_FOLDER_ID):
                    last_backup_time = time.time()
                    # 4. Limpeza (Só limpa se upload for sucesso)
                    if os.path.exists(zip_path):
                        os.remove(zip_path)
                        log("Arquivo temporário removido.", "INFO")
                else:
                    log("Upload falhou. Mantendo arquivo local para tentativa futura ou manual.", "WARN")
                    # Atualiza time para não tentar criar NOVO zip imediatamente, mas manterá o antigo aqui
                    last_backup_time = time.time() 

            time.sleep(CHECK_INTERVAL_SECONDS)
            
        except KeyboardInterrupt:
            log("Parando daemon...", "WARN")
            # Tenta limpar zips residuais ao sair
            cleanup_old_zips(SOURCE_DIR)
            sys.exit(0)
        except Exception as e:
            log(f"Erro no loop: {e}", "ERROR")
            time.sleep(60)

if __name__ == "__main__":
    main()
