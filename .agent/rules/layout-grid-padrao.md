---
trigger: always_on
---

## Padrão de Layout e Grid (Rigoroso)

1.  **Classe Container Universal:**
    - Todo conteúdo principal da página deve ser envolvido pela classe `.std-grid`.
    - NUNCA crie paddings laterais manuais (ex: `px-4`, `pl-10`) em containers principais. Confie exclusivamente na `.std-grid`.

2.  **Responsividade Automática:**
    - A classe `.std-grid` já gerencia automaticamente as margens:
      - Mobile: 1.5rem (24px)
      - Tablet: 3rem (48px)
      - Desktop: 6rem (96px)
    - Não adicione media queries extras para margens laterais de container.

3.  **Estrutura HTML Padrão:**
    ```tsx
    // Exemplo CORRETO
    <section className="w-full">
      <div className="std-grid">{/* Conteúdo aqui */}</div>
    </section>
    ```
