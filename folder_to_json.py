#!/usr/bin/env python3
"""
Script: folder_to_json.py
Description: Varre um diretório recursivamente e compila arquivos de texto em um JSON.
"""

import os
import json
import argparse
import mimetypes

def is_text_file(filepath):
    """
    Heurística dupla para garantir que o arquivo não é um binário que quebrará o JSON.
    """
    # 1. Ignorar links simbólicos para evitar loops infinitos
    if os.path.islink(filepath):
        return False
        
    # 2. Checagem via mimetype
    mime_type, _ = mimetypes.guess_type(filepath)
    if mime_type and not mime_type.startswith('text'):
        # Permite extensões que o mimetypes pode não classificar como texto, mas são úteis
        allowed_extensions = {'.md', '.json', '.csv', '.py', '.js', '.ts', '.sh'}
        _, ext = os.path.splitext(filepath)
        if ext.lower() not in allowed_extensions:
            return False

    # 3. Checagem via assinatura de bytes (null bytes)
    try:
        with open(filepath, 'rb') as f:
            chunk = f.read(1024)
            if b'\0' in chunk:
                return False
        return True
    except (OSError, IOError):
        return False

def build_json(input_dir, output_file):
    data = []
    
    if not os.path.isdir(input_dir):
        print(f"Erro: O diretório '{input_dir}' não existe.")
        return

    for root, _, files in os.walk(input_dir):
        for file in files:
            # Ignorar arquivos ocultos do sistema (ex: .DS_Store, .git)
            if file.startswith('.'):
                continue
                
            filepath = os.path.join(root, file)
            
            if is_text_file(filepath):
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    data.append({
                        "file_path": os.path.abspath(filepath),
                        "content": content
                    })
                except UnicodeDecodeError:
                    print(f"stderr: Falha de encoding UTF-8 (ignorado): {filepath}")
                except Exception as e:
                    print(f"stderr: Erro inesperado ao ler {filepath}: {e}")

    # I/O Escrita do JSON
    try:
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"stdout: Processo concluído. Arquivos agregados: {len(data)}. Saída: {output_file}")
    except Exception as e:
        print(f"stderr: Falha ao escrever o arquivo JSON: {e}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Agrega conteúdo de arquivos de texto em um arquivo JSON.")
    parser.add_argument("input_dir", help="Caminho para o diretório de origem (ex: ./minha_pasta)")
    parser.add_argument("output_file", help="Caminho para o arquivo JSON de destino (ex: output.json)")
    
    args = parser.parse_args()
    build_json(args.input_dir, args.output_file)