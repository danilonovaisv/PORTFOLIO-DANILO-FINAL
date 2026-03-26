# 📘 Guia do Usuário do Sistema de Fluxo de Trabalho

> **O Antigravity IDE** oferece **21 fluxos de trabalho especializados**, ativados automaticamente com base no **Setor** selecionado durante a instalação.

---

## 1. Grupo Principal (Todos têm acesso a ele)
*Para todos os projetos, do básico ao avançado.*

### `/brainstorm` - Geração de Ideias
- **Quando usar**: Quando você tem uma ideia vaga e precisa que a IA sugira como implementá-la.

- **Como usar**: `/brainstorm [ideia]`

- **Exemplo**: `/brainstorm aplicativo de pedidos de comida saudável`

### `/plan` - Planejamento
- **Quando usar**: Antes de codificar um novo recurso. A IA irá dividir a tarefa e estimar o tempo necessário.

- **Como usar**: `/plan [nome do recurso]`

### `/status` - Painel de Status
- **Quando usar**: Visualize o "status" do projeto e o progresso das tarefas.

- **Como usar**: `/status`

### `/debug` - Depuração Inteligente
- **Quando usar**: Ao encontrar erros confusos ou para otimizar o código.

- **Como usar**: `/debug [descrição do erro ou cole o log de erros]`

---
## 2. Grupo de Construção (Builder - Para Desenvolvedores)
*Ativado automaticamente para os grupos de setores: Geral, Logística, Outros.*

### `/create` - Criar novas funcionalidades

- **Quando usar**: Construir um módulo completo (Frontend + Backend + Banco de Dados).

- **Uso**: `/create [nome do módulo]`
- **Exemplo**: `/create user-authentication`

### `/enhance` - Atualizar, Modificar
- **Quando usar**: Adicionar botões, alterar cores, corrigir pequenas alterações de lógica.

- **Uso**: `/enhance [solicitar alteração]`

### `/orchestrate` - Coordenação Multiagente (Avançado)

- **Quando usar**: Para trabalhar em funcionalidades extremamente grandes que exigem 3 a 4 especialistas (Frontend, Backend, Segurança) trabalhando simultaneamente.

- **Uso**: `/orchestrate [solicitação complexa]`

---
## 3. Grupo de Qualidade e Segurança (Empresarial)
*Ativado automaticamente para grupos setoriais: Finanças, Saúde.*

### `/audit` - Auditoria Total
- **Quando usar**: Antes da entrega. Verificação abrangente de Segurança, SEO e Desempenho.

- **Uso**: `/audit`

### `/security` - Segurança Avançada
- **Quando usar**: Reforço da segurança do sistema, varredura de vulnerabilidades, verificação de chaves de API expostas.

- **Uso**: `/security scan`

### `/test` - Testes Automatizados
- **Quando usar**: Para escrever testes unitários e testes de ponta a ponta (E2E) para projetos.

- **Uso**: `/test [nome do arquivo/módulo]`

---
## 4. Grupo de Crescimento e Design
*Ativado automaticamente para os grupos de setores: Alimentos e Bebidas, Pessoal e Educação.*

### `/ui-ux-pro-max` - Design de Alta Qualidade
- **Quando usar**: Para uma interface bonita e efeitos deslumbrantes (Linear UI/Magic UI).

- **Como usar**: `/ui-ux-pro-max [descrição da tela]`

### `/seo` - Otimização para Mecanismos de Busca (SEO)
- **Quando usar**: Para posicionar seu site no topo do Google. Crie um Sitemap e um Schema JSON-LD.

- **Como usar**: `/seo audit`

---
## 5. Operações e Recursos Humanos (Ops e Equipe)
*Para Líder Técnico ou DevOps.*

### `/onboard` - Integração de Novos Membros

- **Quando usar**: Quando a equipe recebe novos membros. A IA os guiará na configuração e explicará o código.

- **Como usar**: `/onboard`

### `/document` - Escrita de Documentação
- **Quando usar**: Atualiza automaticamente o README e a documentação da API a partir do código.

- **Como usar**: `/document all`

### `/monitor` - Monitoramento
- **Quando usar**: Configurar logs e monitorar erros em Produção.

- **Como usar**: `/monitor setup`

### `/deploy` - Implantação

- **Quando usar**: Implantar em Vercel, VPS ou Docker.

- **Como usar**: `/deploy`

---
## 💡 Dicas de uso
- Você pode **combinar** comandos. Por exemplo: use `/plan` primeiro e depois use `/orchestrate` para executar o plano.

- Não se lembra do comando? Basta digitar `/help` ou perguntar à IA em vietnamita, e ela encontrará o fluxo de trabalho adequado para você.
