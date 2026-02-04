# Executar Testes e Deploy

Este documento explica como executar os testes e fazer o deploy do seu projeto portfolio.

## Scripts Criados

Foram criados dois scripts para facilitar o processo:

### 1. Script Shell: `test-and-deploy.sh`

Localização: `scripts/test-and-deploy.sh`

Este script:

- Executa os testes (`npm test`)
- Se os testes passarem, executa o build (`npm run build`)
- Se o build for bem-sucedido, executa o deploy (`npm run deploy`)

### 2. Script TypeScript: `run-full-test-and-deploy.ts`

Localização: `scripts/run-full-test-and-deploy.ts`

Este script:

- Testa o ambiente (variáveis de ambiente, conexão com Supabase)
- Executa lint (`npm run lint`)
- Executa typecheck (`npm run typecheck`)
- Executa testes (`npm test`)
- Executa build (`npm run build`)
- Executa deploy (`npm run deploy`)

## Como Executar

### Opção 1: Usando o script shell

```bash
cd /Users/danilonovais/_danilonov_portfolio
chmod +x scripts/test-and-deploy.sh
./scripts/test-and-deploy.sh
```

### Opção 2: Usando o script TypeScript

```bash
cd /Users/danilonovais/_danilonov_portfolio
npx tsx scripts/run-full-test-and-deploy.ts
```

## Sequência de Operações

Ambos os scripts seguirão esta sequência:

1. **Testes**: Executa `npm test` (que inclui lint, typecheck e testes unitários)
2. **Build**: Executa `npm run build` (gera os arquivos estáticos)
3. **Deploy**: Executa `npm run deploy` (faz o upload para o Firebase Hosting)

Se qualquer etapa falhar, o processo será interrompido e o deploy não ocorrerá.

## Importante

- Certifique-se de que está autenticado no Firebase antes de executar o deploy
- Verifique se todas as variáveis de ambiente necessárias estão configuradas
- O deploy só ocorrerá se todos os testes e build forem bem-sucedidos

## Scripts Originais

Os scripts criados se baseiam nos seguintes scripts definidos no `package.json`:

- `test`: Executa lint + typecheck + testes unitários
- `build`: Faz o build do projeto Next.js
- `deploy`: Executa o script de deploy com Firebase

Esses scripts automatizam o processo de CI/CD combinando os dois workflows que você solicitou.
