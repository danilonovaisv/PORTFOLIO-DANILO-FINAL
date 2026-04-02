# 📦 Guia de Instalação do Node.js e Guia de Uso do NPX

> **Ambiente tranquilo, código fácil. Um comando para governar todos.** 🛰️🚀

O comando `npx` é a maneira mais rápida e segura de experimentar o **AntiGravity IDE** sem instalação permanente em sua máquina. Este documento irá guiá-lo na configuração do ambiente do zero.

---

## 1. O que é NPX?

`npx` (Node Package Runner) é uma ferramenta incluída no **npm** (v5.2.0+). Ele permite:

- Executar pacotes sem instalá-los globalmente (`-g`).

- Garantir que você sempre use a versão mais recente.

- Evitar conflitos entre versões antigas e novas do software.

---

## 2. Etapas de Instalação (Passo a Passo)

### Etapa 1: Baixe e Instale o Node.js
Para obter o `npx`, você precisa instalar o **Node.js** (incluindo o npm).

1. Acesse a página inicial: [nodejs.org](https://nodejs.org/)
2. Selecione a versão **LTS** (Recomendada para a maioria dos usuários) - Esta é a versão mais estável.

3. Execute o arquivo de instalação (`.msi` no Windows, `.pkg` no Mac) e clique em **Avançar** até concluir.

### Etapa 2: Verificar a Instalação
Abra o Terminal (Prompt de Comando ou PowerShell no Windows) e digite:
```bash
node -v
npm -v
npx -v
```
> [!DICA]
> Se os comandos acima retornarem o número da versão (por exemplo, `v20.x.x`), significa que você instalou com sucesso!

### Etapa 3: Instalar o Python (Opcional - Para IA/Dados)
Se você planeja usar recursos avançados (IA Avançada, Ciência de Dados, Scanner de Segurança), você deve instalar o **Python**.

1. Acesse: [python.org](https://www.python.org/downloads/)
2. Baixe a versão mais recente e instale-a.

3. **Importante**: Marque a opção "Adicionar Python ao PATH" durante a instalação.

---

## 3. Iniciando o AntiGravity IDE (Comando Universal)
Você só precisa de um comando para lidar com todas as situações (Criar, Atualizar, Corrigir, Sincronizar):

```bash
npx antigravity-ide [nome_do_projeto]
```
- **Se o diretório estiver vazio**: O sistema criará um novo (Criar).

- **Se já for um projeto do AntiGravity IDE**: O sistema verificará automaticamente, corrigirá erros (Reparar), atualizará as regras mais recentes (Atualizar) e sincronizará o DNA (Corrigir).

---
## 4. Referência Rápida da CLI

| Situação | Comando | Significado |

| :--- | :--- | :--- |

| **Primeira Instalação** | `npx antigravity-ide .` | Inicializa no diretório atual. |

| **Corrigir/Atualizar** | `npx antigravity-ide` | Analisa e corrige erros automaticamente (Reparar e Atualizar).

| **Sobrescrever** | `npx antigravity-ide --force` | Força a restauração das regras ao seu estado original.

| **Verificar versão da IDE** | `npx antigravity-ide --version` | Verifica a versão do mecanismo.

### Parâmetros comuns:
- **`-s, --skip-prompts`**: Inicializa rapidamente usando os valores padrão.

- **`-t, --template <tipo>`**: Seleciona o modelo do projeto (`minimal`, `standard`, `full`).

- **`-f, --force`**: Força a sobrescrita ao corrigir erros no projeto antigo.

---

## 5. Resolução de Arquivos Duplicados
Se você instalar em um diretório que já contém arquivos de configuração (como `GEMINI.md`, `package.json`), o sistema perguntará como proceder para proteger os dados antigos.

### 🛡️ Mecanismo Interativo (Padrão)
O sistema irá parar e perguntar sobre cada arquivo:
```bash
⚠️ O arquivo "GEMINI.md" já existe. Sobrescrever? / O arquivo já existe. Sobrescrever? [s/N]
```
- **Sim (s)**: Sobrescrever o arquivo antigo com o arquivo mais recente.

- **Não (n)**: Criar um arquivo de backup seguro (por exemplo, `GEMINI.novo.md`) e manter o arquivo antigo.

### 🔥 Forçar Sobrescrita
Se você deseja redefinir o projeto e aceitar a perda da configuração antiga, use a flag `--force`:
```bash
npx antigravity-ide . --force
```
> **Efeito**: Ignora todos os avisos e sobrescreve todos os arquivos duplicados para retornar o projeto ao seu estado mais preciso.

---

## 🛠️ Erros Comuns (Solução de Problemas)

### 1. `comando não encontrado: npx`
- **Causa**: O Node.js não está instalado ou não foi adicionado à variável de ambiente (PATH).

- **Solução**: Reinicie o computador após instalar o Node.js. Se o problema persistir, reinstale o Node.js e adicione a opção "Adicionar ao PATH".

### 2. Erro de Controle de Acesso (`EACCES` ou `Permissão Negada`)
- **Windows**: Execute o Terminal como **Administrador**.

- **Mac/Linux**: Pode ser necessário adicionar `sudo` antes do comando: `sudo npx antigravity-ide`.

### 3. Versão Desatualizada do Node.js

- **Requisito**: O AntiGravity IDE funciona melhor com o Node.js **v18** ou posterior.

---

## 💡 Sempre atualizado?

Você não precisa mais digitar `@latest`. Sempre que executar `npx antigravity-ide`, o sistema verificará e atualizará automaticamente para a versão mais recente do NPM, garantindo que você sempre tenha as Skills e os Agents mais recentes.
