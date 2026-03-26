# 📚 Guia para a "Biblioteca Compartilhada" (.shared)

> **.shared** é o "tesouro de técnicas" do Antigravity. Contém arquivos de exemplo, configurações padrão e listas de verificação de validação.

---

## 1. Por que você precisa do .shared?

Em vez de ter que configurar cada projeto do zero (copiando o arquivo `.eslintrc`, reconfigurando o Docker, reescrevendo arquivos auxiliares...), o Antigravity armazena todas as **Melhores Práticas** aqui.

Quando necessário, o Agente simplesmente "copia e cola" e usa. Rápido e preciso.

---

## 2. Lista de 17 Repositórios (Módulos)

### 🧠 Core e AI
* **`ai-master`**: Contém prompts de exemplo e configurações do sistema RAG.

* **core`**: Estrutura de projeto de exemplo.

### 🛡️ Segurança e Conformidade
* **`security-armor`**: Código anti-hacking (OWASP), scripts de varredura de vulnerabilidades.

* **`compliance`**: Modelos legais (Política de Privacidade, Checklists GDPR).

* **`api-standards`**: Padrões de design de API (RESTful, Códigos de Erro).

### 🎨 Interface e Experiência do Usuário
* **`design-system`**: Tokens de cores e tipografia padrão.

* **`ui-ux-pro-max`**: Efeitos de animação avançados (Motion Presets).

* **design-philosophy`**: Filosofia de design (Linear, Magic UI).

### 🏗️ Infraestrutura e Operações
* **`infra-blueprints`**: Arquivos de configuração de Docker, Terraform e CI/CD.

* **`database-master`**: Modelos de esquema de banco de dados (E-commerce, Social, SaaS).

* **`metrics`**: Configuração de monitoramento (Registro, Telemetria).

* **`resilience-patterns`**: Padrões de projeto tolerantes a falhas (Disjuntor).

### 📈 Crescimento e Qualidade
* **`seo-master`**: Lista de verificação de SEO, modelo JSON-LD.

* **testing-master`**: Scripts de teste de exemplo (E2E, Teste Unitário).

* **vitals-templates`**: Benchmarks de desempenho (Configuração do Lighthouse).

* **i18n-master`**: Arquivos de idioma de exemplo (Multilíngue).

* **dx-toolkit`**: Ferramentas de suporte ao desenvolvimento (Configurações do VSCode, Linting).

---

## 3. Como usar

Você **não** precisa editar esta pasta diretamente.

O agente irá automaticamente:
1. **Ler** o arquivo de exemplo daqui quando você solicitar a criação de um recurso correspondente.

2. **Copie** o arquivo para o seu projeto (caso ele ainda não exista).

3. **Valide** seu código com base na lista de verificação aqui (ao executar `/audit`).

> **Exemplo**: Quando você diz *"Criar um banco de dados para um site de e-commerce"*, o agente irá para `database-master` e recuperará o arquivo `ecommerce.sql` como base.
