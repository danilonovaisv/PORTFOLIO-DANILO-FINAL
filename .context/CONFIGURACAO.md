# Configuração do Agent - Portfolio Danilo Novais

## ✅ Configuração Completa

Este documento descreve a configuração do sistema de Agent/AI para o projeto.

## 📁 Estrutura de Pastas

```
.agent/
├── rules/              ✅ VERSIONADO (Git)
│   ├── README.md
│   ├── coding-standards.md    # Padrões de código
│   └── architecture.md         # Diretrizes de arquitetura
│
├── workflows/          ✅ VERSIONADO (Git)
│   ├── README.md
│   ├── build-and-deploy.md    # Workflow de build e deploy
│   └── [30+ workflows existentes]
│
├── customizations/     ❌ Ignorado (Git)
├── agent/             ❌ Ignorado (Git)
└── README.md          ✅ VERSIONADO (Git)
```

```
.context/               ✅ VERSIONADO (Git)
├── GHOST-DESIGN-SYSTEM.md          # Design system e regras visuais
├── *-PROTOTIPO-INTERATIVO.md       # Detalhamento das páginas
├── *-PORTFOLIO-*.jpg / *.png       # Referências de layout
├── *-MOBILE-*.jpg                  # Referências mobile
└── ghost.mp4                       # Referência de motion
```

## 🔧 Configurações Aplicadas

### 1. `.gitignore` Atualizado

```gitignore
# AI/Agent Tooling
.agent/*              # Ignora tudo em .agent/
!.agent/rules/        # EXCETO rules/
!.agent/workflows/    # EXCETO workflows/
```

**Resultado:**
- ✅ `rules/` e `workflows/` são versionados
- ❌ Outros arquivos em `.agent/` são ignorados
- ✅ `.context/` é versionado (fonte de verdade visual e protótipos)

### 2. SWEEP.md Criado

Arquivo principal de configuração do agente localizado na raiz do projeto:
- Comandos principais do projeto
- Stack tecnológica
- Padrões de código
- Problemas conhecidos e soluções
- Referência aos diretórios `.agent/rules/` e `.agent/workflows/`

### 3. Rules (Regras)

**Localização:** `.agent/rules/`

**Arquivos criados:**
- `README.md` - Documentação da pasta
- `coding-standards.md` - Padrões TypeScript, React, CSS, nomenclatura
- `architecture.md` - Next.js App Router, state management, data fetching

**Como usar:**
- O agente AI carrega automaticamente as regras
- Adicione novos arquivos `.md` para novas regras
- Commit e push para compartilhar com a equipe

### 4. Workflows

**Localização:** `.agent/workflows/`

**Arquivos criados:**
- `README.md` - Documentação da pasta
- `build-and-deploy.md` - Processo completo de build e deploy
- **30+ workflows existentes** (já presentes no projeto)

**Como usar:**
- Workflows descrevem processos passo-a-passo
- Adicione novos arquivos `.md` para novos workflows
- Commit e push para compartilhar com a equipe

## 📋 Regras Disponíveis

### coding-standards.md
- ✅ TypeScript strict mode
- ✅ React functional components
- ✅ Tailwind CSS first
- ✅ Nomenclatura padronizada
- ✅ Boas práticas de código

### architecture.md
- ✅ Next.js App Router (Server vs Client Components)
- ✅ State Management (Zustand, React Hooks)
- ✅ Data Fetching patterns
- ✅ Firebase & Supabase integration
- ✅ 3D e Animações (Three.js, GSAP, Framer Motion)
- ✅ Performance optimization

## 🔄 Workflows Disponíveis

### build-and-deploy.md
- ✅ Pré-deploy checklist
- ✅ Comandos de build
- ✅ Validações pré-build
- ✅ Deploy para produção
- ✅ Preparação de assets
- ✅ Troubleshooting

### Workflows Existentes (30+)
- hero-section.md
- portfolio-page.md
- seo-optimization.md
- performance-audit.md
- code-quality-refactor.md
- E muitos outros...

## 🎯 Como Adicionar Novas Regras/Workflows

### Adicionar Nova Regra

1. Criar arquivo em `.agent/rules/nome-da-regra.md`
2. Documentar a regra em markdown
3. Commit e push

```bash
# Exemplo
touch .agent/rules/testing-standards.md
# Editar o arquivo
git add .agent/rules/testing-standards.md
git commit -m "docs: adiciona regras de testes"
git push
```

### Adicionar Novo Workflow

1. Criar arquivo em `.agent/workflows/nome-do-workflow.md`
2. Documentar o processo passo-a-passo
3. Commit e push

```bash
# Exemplo
touch .agent/workflows/database-migration.md
# Editar o arquivo
git add .agent/workflows/database-migration.md
git commit -m "docs: adiciona workflow de migração de banco"
git push
```

## 📝 Formato Recomendado

### Para Rules

```markdown
# Nome da Regra

## Descrição
Breve descrição da regra

## Diretrizes
- ✅ Fazer isso
- ❌ Não fazer aquilo

## Exemplos
\`\`\`typescript
// Código de exemplo
\`\`\`
```

### Para Workflows

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

## Troubleshooting
Problemas comuns e soluções
```

## ✨ Benefícios

1. **Consistência** - Todos seguem as mesmas regras
2. **Documentação** - Processos documentados e versionados
3. **Onboarding** - Novos membros têm acesso às regras
4. **Automação** - Agente AI aplica regras automaticamente
5. **Evolução** - Regras evoluem com o projeto

## 🔗 Referências

- **SWEEP.md** - Configuração principal na raiz do projeto
- **.agent/README.md** - Documentação da pasta .agent
- **.agent/rules/README.md** - Documentação das regras
- **.agent/workflows/README.md** - Documentação dos workflows
- **.context/** - Fonte de verdade com protótipos e referências visuais

---

**Data de Configuração:** 29 de Janeiro de 2025
**Status:** ✅ Configurado e Ativo
