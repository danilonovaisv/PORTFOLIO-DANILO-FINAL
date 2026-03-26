# 🔄 Guia de Atualização

O AntiGravity IDE possui um mecanismo de atualização "duplo" exclusivo. É necessário compreendê-lo para escolher o método apropriado.

---

## 1. Atualização do Núcleo (CLI e Regras do Sistema)
Isso envolve a atualização da própria ferramenta `npx antigravity-ide`.

### Como fazer:
Basta executar o comando "universal" no diretório do seu projeto:
```bash
npx antigravity-ide
```
O sistema iniciará automaticamente o **Modo de Reparo e Atualização**:

1. **Verificar**: Verifica a integridade do projeto.

2. **Atualizar**: Atualiza o Engine e as Regras mais recentes do NPM.

3. **Reparar**: Restaura arquivos de sistema corrompidos ou perdidos.

4. **Sincronizar**: Sincroniza o DNA padrão mais recente, versão 4.0.8.

### Verificar versão atual:
```bash
npx antigravity-ide --version
```

---
## 2. Atualizar Habilidades e Fluxo de Trabalho (Autoatualização)
Isso atualiza o **conteúdo interno** do seu projeto (Habilidades, Prompts, Fluxos de Trabalho) sem alterar a estrutura do projeto.

### Usando o Fluxo de Trabalho:
Durante o chat com a IA, você pode executar o comando:
```
/update
```
A IA verificará as alterações na base de conhecimento central e as sincronizará com o seu projeto.

### Usando a CLI:
```bash
npx antigravity-ide update
```
Este comando recarregará a lista mais recente de `Habilidades Globais` em sua máquina.

---

## 3. Estratégia de Atualização Segura

Ao atualizar um projeto em execução (Produção), siga estas regras:

1. **Backup**: Sempre faça commit do código no Git antes de atualizar.

2. **Revisão**: Ao executar `init` novamente, o sistema perguntará "Sobrescrever?".

- Selecione **Não** para criar um arquivo `.new`.

- Use a ferramenta Diff (como no VS Code) para comparar o arquivo antigo com o arquivo `.new`.

- Copie manualmente as novas melhorias para o arquivo antigo.

3. **Teste**: Execute o fluxo de trabalho `/test` após a atualização para garantir que nada esteja quebrado.

---

## 4. Solução de Problemas Após Atualizações

Se o Agente apresentar comportamento estranho após a atualização:

1. Exclua a pasta `.agent/skills` e execute `init` novamente.

2. Verifique o arquivo `GEMINI.md` para ver se alguma regra importante está faltando.

3. Consulte [TROUBLESHOOTING.vi.md](./TROUBLESHOOTING.vi.md).
