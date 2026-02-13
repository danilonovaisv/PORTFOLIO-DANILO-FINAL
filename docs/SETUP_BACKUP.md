# 🔐 Como Configurar o Backup Automático para Google Drive

O script `smart_backup_daemon.py` e a biblioteca necessária já estão instalados.
Para que ele funcione, o Google precisa confirmar que você autoriza este script a enviar arquivos para o seu Drive.

## Passo Único: Obter a Chave de Acesso (client_secrets.json)

1. **Acesse o Google Cloud Console:**
   Clique neste link: [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

2. **Crie um Projeto (se não tiver):**
   - Clique em "Select a project" (topo esquerdo) > "New Project".
   - Dê o nome "Backup Portfolio" e clique em "Create".

3. **Ative a API do Google Drive:**
   - No menu lateral, vá em "Enabled APIs & services" > "+ ENABLE APIS AND SERVICES".
   - Busque por "Google Drive API".
   - Clique em "Enable".

4. **Crie a Credencial (O Passo Importante):**
   - Vá em "Credentials" (menu lateral).
   - Clique em "+ CREATE CREDENTIALS" > "OAuth client ID".
   - **Configure a Tela de Consentimento (se pedir):**
     - Escolha "External".
     - Preencha "App Name" (Backup), "User Support Email" (seu email) e "Developer Contact Info" (seu email).
     - Clique "Save and Continue" até o fim.
     - Volte para "Credentials" > "+ CREATE CREDENTIALS" > "OAuth client ID".
   - **Tipo de Aplicação:** Escolha **Desktop App**.
   - Clique em "Create".

5. **Baixe o Arquivo:**
   - Uma janela vai aparecer com "Your Client ID".
   - Clique no ícone de download (⬇️) para baixar o JSON.
   - **IMPORTANTE:** Renomeie o arquivo baixado para `client_secrets.json`.
   - Mova esse arquivo para a pasta do seu projeto: `/Users/danilonovais/PORTFOLIO-DANILO-FINAL/`.

## Testando

Assim que o arquivo `client_secrets.json` estiver na pasta, rode no terminal:

```bash
python3 smart_backup_daemon.py
```

Uma janela do navegador abrirá pedindo permissão. Aceite, e o backup começará!
