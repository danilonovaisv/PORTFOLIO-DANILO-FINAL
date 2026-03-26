# Guia de Solução de Problemas

Uma compilação de problemas comuns encontrados ao usar o Antigravity IDE e como resolvê-los.

## 🛠️ Erros de Instalação

### `comando não encontrado: antigravity`
- **Causa**: Versão global não instalada ou erro no PATH.

- **Solução**:

- Execute `npm install -g antigravity-ide` novamente.

- Ou use `npx antigravity-ide` diretamente (nenhuma instalação é necessária).

### `EACCES: permissão negada`

- **Causa**: Permissões de gravação de arquivo de sistema insuficientes.

- **Solução**:

- Mac/Linux: Adicione `sudo` antes do comando.

- Windows: Execute o CMD/PowerShell como administrador.

## 🤖 Erros de IA e de Tempo de Execução

### "O agente não está respondendo"
- **Verificação**: O arquivo `.env` contém a chave da API?

- **Solução**:

- Verifique `GEMINI_API_KEY`.

- Verifique sua conexão com a internet.

### "Limite de tokens excedido"

- **Causa**: A conversa é muito longa, causando um estouro de memória de contexto.

- **Solução**:

- Feche o chat e abra uma nova conversa.

- Use um modelo melhor (Gemini 1.5 Pro), se possível.

## 📦 Erros de Biblioteca (Dependências)

### `npm ERR! legacy-peer-deps`

- **Causa**: Conflito de versões (comum em versões antigas/novas do React).

- **Como corrigir**:

- Adicione a flag: `npm install --legacy-peer-deps`

---

## 🆘 Ainda não está corrigido?

Por favor, crie uma Issue no [GitHub](https://github.com/Dokhacgiakhoa/google-antigravity/issues) para obter suporte da equipe!

## 🐛 Bugs conhecidos

### `ReferenceError: commonRules is not defined`
- **Causa**: Sua máquina possui uma versão antiga (v3.5.54 ou anterior) instalada no modo Global, causando um conflito com o comando `npx`.

- **Solução completa**: Desinstale a versão Global antiga para que o npx baixe a versão mais recente.

``bash

npm uninstall -g antigravity-ide

npx antigravity-ide@latest

```
