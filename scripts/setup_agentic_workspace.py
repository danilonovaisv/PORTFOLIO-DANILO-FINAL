import os

def create_file(path, content):
    """Cria o diretório se não existir e escreve o conteúdo no arquivo."""
    dir_name = os.path.dirname(path)
    if dir_name:
        os.makedirs(dir_name, exist_ok=True)
    # Se o arquivo já existe, não o sobrescrevemos para evitar perda de dados do usuário
    if not os.path.exists(path):
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content.strip() + '\n')
        print(f"✅ Criado: {path}")
    else:
        print(f"⚠️ Ignorado (já existe): {path}")

def append_to_file(path, content):
    """Adiciona conteúdo ao arquivo ou cria se não existir."""
    dir_name = os.path.dirname(path)
    if dir_name:
        os.makedirs(dir_name, exist_ok=True)
    with open(path, 'a', encoding='utf-8') as f:
        f.write('\n' + content.strip() + '\n')
    print(f"✅ Atualizado: {path}")

def main():
    print("🚀 Iniciando a configuração do Workspace Agentic-Native...\n")

    # 1. A Camada de Identidade e Governança (Regras Passivas)
    create_file("AGENTS.md", """
# Regras Base do Agente (Universal Cheat Sheet)
- Siga as convenções de código definidas na pasta `.context/`.
- Antes de qualquer alteração estrutural, gere um plano em `artifacts/`.
- Denylist de Comandos: `rm -rf`, `sudo`, `wget` (Requerem revisão humana).
    """)
    create_file(".cursorrules", "Include `AGENTS.md` and follow `.context/conventions.md` strictly.")
    create_file("CLAUDE.md", "Follow guidelines in `AGENTS.md` and `.context/`.")
    create_file("GEMINI.md", "Follow guidelines in `AGENTS.md` and `.context/`.")
    
    create_file(".context/structure.md", "# Mapa de Estrutura do Projeto\n[Defina aqui a arquitetura de pastas do seu projeto]")
    create_file(".context/conventions.md", "# Convenções da Equipe\n- Use tipagem estrita.\n- Documente as funções públicas.")

    # 2. A Biblioteca de Habilidades (Agent Skills)
    skill_dir = ".agent/skills/example-review-skill"
    os.makedirs(f"{skill_dir}/scripts", exist_ok=True)
    os.makedirs(f"{skill_dir}/references", exist_ok=True)
    os.makedirs(f"{skill_dir}/assets", exist_ok=True)
    
    create_file(f"{skill_dir}/SKILL.md", """
---
name: code-review-expert
description: Use esta skill para realizar auditorias e revisões profundas de código.
---
# Goal
Analisar código em busca de vulnerabilidades, code smells e problemas de performance.

# Instructions
1. Analise o arquivo solicitado.
2. Compare com as regras em `.context/conventions.md`.
3. Gere um relatório na pasta `artifacts/`.

# Examples
- Usuário: "Revise o arquivo auth.ts" -> Agente ativa a skill `code-review-expert`.

# Constraints
- Não modifique o código diretamente, apenas gere o relatório de sugestões.
    """)

    # 3. Orquestração Ativa (Workflows)
    create_file(".agent/workflows/brainstorm.md", "# Workflow: /brainstorm\n**Ação:** Analisar os requisitos e gerar um 'Implementation Plan' em `artifacts/` antes de codificar.")
    create_file(".agent/workflows/test.md", "# Workflow: /test\n**Ação:** Ler a implementação e gerar suítes de testes automatizados para a feature.")
    create_file(".agent/workflows/deploy.md", "# Workflow: /deploy\n**Ação:** Executar lints, build e preparar os scripts de CI/CD.")

    # 4. Personas e Agentes Especialistas (Multi-Agent Swarm)
    create_file(".agent/agents/frontend-specialist.md", "# Persona: Frontend Specialist\n**Foco:** React, TailwindCSS, Acessibilidade, UI/UX.")
    create_file(".agent/agents/security-auditor.md", "# Persona: Security Auditor\n**Foco:** Prevenção de OWASP Top 10, sanitização de inputs, vazamento de dados.")
    create_file(".agent/agents/architect.md", "# Persona: Systems Architect\n**Foco:** Design de banco de dados, escalabilidade, escolhas de infraestrutura.")

    # 5. Conectividade com o Mundo Exterior (MCP)
    create_file("mcp_servers.json", """
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "<YOUR_TOKEN>" }
    }
  }
}
    """)

    # 6. Sistema de Artefatos e Transparência
    os.makedirs("artifacts", exist_ok=True)
    create_file("artifacts/README.md", """
# Sistema de Artefatos
Esta pasta armazena:
- **Implementation Plans:** Planos gerados antes do código.
- **Walkthroughs:** Resumos gerados pós-execução.
- **Visual Evidence:** Screenshots e relatórios de testes.
    """)

    # 7. Isolamento de Execução (Sandbox) e Segurança
    append_to_file(".env", """
# Configurações de Sandbox do Agente
SANDBOX_TYPE=local
SANDBOX_TIMEOUT_SEC=300
    """)

    # 8. Gestão de Versionamento (Ocultar .agent localmente)
    git_exclude_path = ".git/info/exclude"
    if os.path.exists(".git"):
        append_to_file(git_exclude_path, "\n# Ignorar configurações do Agente localmente\n.agent/")
        print("✅ Pasta `.agent/` adicionada ao .git/info/exclude para manter suas skills privadas localmente.")
    else:
        print("⚠️ Repositório Git não detectado. Lembre-se de adicionar `.agent/` ao seu .gitignore se quiser ocultar suas skills da equipe.")

    print("\n🎉 Scaffold Cognitivo concluído! Sua IDE agora está configurada para operar como um Sistema Agêntico.")

if __name__ == "__main__":
    main()