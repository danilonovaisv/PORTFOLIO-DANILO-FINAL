# 🗑️ Guia de Desinstalação

Este documento orienta você sobre como remover completamente o **AntiGravity IDE** do seu sistema, incluindo arquivos de configuração e cache.

---

## 1. Remover Configuração Global
O AntiGravity armazena a configuração global (nome do agente, idioma padrão) no diretório Home do usuário. Para limpar:

### Windows (PowerShell)
```powershell
Remove-Item -Recurse -Force "$HOME\.antigravity"
```

### MacOS / Linux
```bash
rm -rf ~/.antigravity
```

---
## 2. Remover o cache do NPX (Opcional)
Se você não quiser que o `npx` mantenha uma cópia do AntiGravity:

```bash
npm cache clean --force
```
*Observação: Este comando limpará todo o cache do npm, não apenas o do AntiGravity.*

Se você quiser remover este pacote separadamente (se instalado globalmente):

```bash
npm uninstall -g antigravity-ide
```

---
## 3. Remover do Projeto (Projeto Local)
Se você inicializou o projeto e deseja "começar do zero":

1. **Exclua o arquivo `.agent` Pasta:**

É aqui que se encontram o "cérebro", as habilidades e as regras do Agente.

```bash

rm -rf .agent

```

2. **Exclua os arquivos de configuração:**

```bash

rm GEMINI.md README.md .gitignore .editorconfig .gitattributes package.json

```

---
## 4. Verifique
Digite o seguinte comando para garantir que o sistema não reconheça mais o AntiGravity:
```bash
antigravity --version
```
Se a mensagem exibida for "comando não encontrado" ou similar, você desinstalou o programa com sucesso.
