---
description: Atualização automatizada de versão e sincronização de estatísticas no README e documentação.
---

# /release - Pipeline de Lançamento e Sincronização Automatizada

Este workflow utiliza o motor "Auto-Release Engine" para garantir que todas as novas versões sejam sincronizadas com 100% de consistência entre todos os arquivos do repositório.

## 📋 Quando Utilizar

- Quando desejar incrementar a versão do projeto (ex: v4.0.3 -> v4.0.4).
- Quando quiser certificar que a contagem de habilidades (Skills) e fluxos (Workflows) no README corresponda exatamente à realidade.
- Antes de realizar o push de alterações críticas para o repositório remoto.

## ⚙️ Fluxo de Execução

### Passo 1: Definir a Nova Versão
Definir a versão subsequente seguindo o padrão de Versionamento Semântico (Major.Minor.Patch).

### Passo 2: Executar o Auto-Release Engine
// turbo
O agente executará o seguinte comando (substituindo "<version>" pelo número da nova versão):
```bash
node .agent/scripts/auto-release.js <version>
```

**Este script executará de forma automatizada:**
1. ✅ Localizar e atualizar referências da versão anterior em "package.json", "VERSION" e "MASTER_GUIDE.md".
2. ✅ Recalcular o inventário real de Skills, Workflows, Rules e Agents do repositório.
3. ✅ Atualizar as contagens e tabelas nos arquivos "README.md", "README.vi.md" e "SKILLS.md".
4. ✅ Escanear commits/arquivos adicionados no Git para sugerir novidades no changelog.

### Passo 3: Atualizar o Changelog (Semimanual)
O script imprimirá uma listagem de arquivos adicionados. Com base nisso, o agente atualizará o arquivo "CHANGELOG.md":
- Copiar e estruturar a lista de novas funcionalidades sob a seção "### Added".
- Adicionar observações sobre alterações críticas ou quebras de compatibilidade.

### Passo 4: Revisão e Confirmação (Commit)
Após a execução do script, o agente deve:
1. Analisar as alterações com "git diff" para atestar a correção.
2. Criar um commit com mensagem padronizada: `release: v<version>`.
3. Gerar a tag correspondente e efetuar o push para o Git remoto.

## 💡 Exemplo Prático

> **User**: "Release bản 4.1.0 cho tớ"
>
> **Agent**:
> 1. Executar `node .agent/scripts/auto-release.js 4.1.0`
> 2. Retorno do script: "Updated 4 files. Stats synced: 28 Skills."
> 3. Lista de novos recursos identificados: `malware-analyst`, `/release`.
> 4. O agente adiciona os itens ao "CHANGELOG.md".
> 5. Commit e push das alterações.

---
**Vantagem**: Nunca mais esqueça de atualizar a versão em arquivos secundários do projeto!
