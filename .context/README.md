# Agent Configuration

Esta pasta contém configurações, regras e workflows para o agente AI do projeto.

## Estrutura

```
.agent/
├── rules/              # Regras e diretrizes (VERSIONADO)
│   ├── README.md
│   ├── coding-standards.md
│   └── architecture.md
├── workflows/          # Workflows automatizados (VERSIONADO)
│   ├── README.md
│   └── build-and-deploy.md
├── customizations/     # Customizações específicas
├── agent/             # Scripts do agente
└── README.md          # Este arquivo
```

```
.context/               # Fonte de verdade do projeto (VERSIONADO)
├── GHOST-DESIGN-SYSTEM.md
├── *-PROTOTIPO-INTERATIVO.md
├── imagens de layout (desktop e mobile)
└── ghost.mp4
```

## Pastas Versionadas

As seguintes pastas são **versionadas no Git** e compartilhadas com a equipe:

- ✅ **`rules/`** - Regras de desenvolvimento, padrões de código e arquitetura
- ✅ **`workflows/`** - Workflows para tarefas comuns (build, deploy, testes)
- ✅ **`.context/`** - Protótipos interativos e referências visuais (desktop/mobile)

## Pastas Ignoradas

As seguintes pastas são **ignoradas no Git** (`.gitignore`):

- ❌ Outros arquivos em `.agent/` (logs, cache, configurações locais)

## Como Usar

### Rules (Regras)

As regras são automaticamente carregadas pelo agente AI. Para adicionar novas regras:

1. Crie um arquivo `.md` em `.agent/rules/`
2. Documente as regras de forma clara e objetiva
3. Commit e push para compartilhar com a equipe

**Exemplo:**
```markdown
# Nome da Regra

## Descrição
...

## Exemplos
...
```

### Workflows

Os workflows descrevem processos passo-a-passo. Para adicionar novos workflows:

1. Crie um arquivo `.md` em `.agent/workflows/`
2. Descreva o processo com comandos e checklist
3. Commit e push para compartilhar com a equipe

**Exemplo:**
```markdown
# Nome do Workflow

## Pré-requisitos
- Item 1
- Item 2

## Passos
1. Passo 1
2. Passo 2

## Comandos
\`\`\`bash
comando aqui
\`\`\`
```

## Regras Disponíveis

- **`coding-standards.md`** - Padrões de código TypeScript, React, CSS
- **`architecture.md`** - Diretrizes de arquitetura Next.js, state management, data fetching

## Workflows Disponíveis

- **`build-and-deploy.md`** - Processo completo de build e deploy

## Contribuindo

Para adicionar novas regras ou workflows:

1. Crie o arquivo na pasta apropriada
2. Siga o formato markdown
3. Seja claro e objetivo
4. Inclua exemplos quando possível
5. Commit com mensagem descritiva

## Notas

- Arquivos markdown (`.md`) são preferidos para melhor legibilidade
- Use português para documentação
- Use inglês para código e comandos
- Mantenha os arquivos organizados e atualizados
