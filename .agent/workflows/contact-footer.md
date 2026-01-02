---
description:
---

# Workflow: Contact Form & Footer

**Contexto:**
As duas últimas secções da Home. Uma focada em conversão (Contact) e outra em navegação/legal (Footer).

---

## Parte A: Secção de Contacto

**Design Specs:**

- Layout: 2 Colunas (Desktop) - Info à Esquerda, Form à Direita.
- Fundo: Branco (`bg-white`).
- Cores: Título `#0057FF`, Texto `#111111`.

**Passo a Passo:**

1.  **Formulário (`ContactForm.tsx`):**
    - **Endpoint:** `https://formsubmit.co/danilo@portfoliodanilo.com` (Action).
    - **Campos:** Nome, Email, Mensagem.
    - **Estilo Inputs:** Borda simples, Focus `ring-2 ring-blue-500`.
    - **Botão:** Azul, largura total em mobile. Hover: `translateY(-1px)`.

2.  **Info Lateral:**
    - Título: "Contato".
    - Subtítulo: "Tem uma pergunta ou quer trabalhar junto?"
    - Links Sociais: Ícones (Instagram, LinkedIn, etc.) apontando para as URLs especificadas.
    - Dados: Telefone e Emails (`mailto:`).

---

## Parte B: Footer

**Design Specs:**

- **Posição:** Fixo no fundo (`fixed bottom-0`). _Nota: Verificar se "Fixed" não tapa o conteúdo. Se for fixo, adicionar padding-bottom ao `body` igual à altura do footer._
- **Fundo:** Azul (`#0057FF`).
- **Texto:** Branco.

**Passo a Passo:**

1.  **Componente `Footer.tsx`:**
    - Estrutura Flex: Copyright à esquerda, Links/Social à direita.
    - **Links de Navegação:** Home (`#hero`), Portfolio (`#portfolio-showcase`), Sobre (`#clients`), Contato (`#contact`).
    - **Copyright:** "© 2025 Danilo Novais Vilela — todos os direitos reservados".

2.  **Interações:**
    - Links: Hover muda para tom de azul mais claro ou sublinhado animado.
    - Entrada: FadeIn simples (`opacity: 0 -> 1`).

**Validação (@TechLead):**

- Testar envio do formulário.
- Verificar se o Footer Fixo não sobrepõe o botão de envio do formulário em ecrãs pequenos.
- Verificar tags ARIA nos inputs.
