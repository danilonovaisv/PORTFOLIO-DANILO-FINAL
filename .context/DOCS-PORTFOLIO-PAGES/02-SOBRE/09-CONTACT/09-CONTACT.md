# 09-CONTACT

## 0. Estrutura de arquivos da sessão

- Arquivos principais:
  - `src/components/home/contact/ContactSection.tsx`
  - `src/components/home/contact/ContactForm.tsx`
  - `src/components/home/contact/FormFields.tsx`
- Encadeamento:
  - Usado na Sobre via `SiteClosure`.
- Dependências:
  - Framer Motion
  - `CONTACT_FORM.action` (`/api/contact`)

## 1. Objetivo da Página/Sessão

Converter intenção em contato real, mantendo clareza e confiabilidade da interface.

## 2. Estrutura de Conteúdo

- Título:
  - “contato”.
- Subtítulo:
  - “Tem uma pergunta ou quer trabalhar junto?”
- Bloco de canais diretos:
  - telefone e e-mails.
- Formulário:
  - nome, email, telefone, mensagem.

## 3. Identidade Visual

- Fundo claro (`backgroundLight`) como contraponto ao escuro anterior.
- Form card branco com borda suave.

## 4. Interatividade & Animações

- Reveal de coluna e form card por viewport.
- Botão submit com micro deslocamento vertical (`whileHover`/`whileTap`).

## 5. Responsividade

- Mobile:
  - Ordem título -> canais -> socials -> formulário.
- Desktop:
  - Grid 5/7 (informações e formulário).

## 6. Acessibilidade & SEO

- Labels explícitas nos campos.
- `aria-invalid` e `aria-describedby` para erros.
- Touch targets >= 48px nos elementos clicáveis.

## 7. Integrações ou Recursos Especiais

- POST para `/api/contact`.
- Mensagem de sucesso com reset do formulário.

## 8. Considerações Técnicas

- Boa base de validação client-side.
- Falta de validação server-side documentada nesta sessão (depende da rota API).

## 9. Componentes Interativos

| Componente     | Descrição                | Estados                          | Interações         | Status       |
| -------------- | ------------------------ | -------------------------------- | ------------------ | ------------ |
| Canais diretos | Telefone/email clicáveis | Default, Hover, Active           | Clique/tap         | Implementado |
| Ícones sociais | Links externos           | Default, Hover/Active            | Clique/tap         | Implementado |
| Formulário     | Captura de lead          | Idle, Error, Submitting, Success | Digitação e submit | Implementado |

## 10. Estrutura de Páginas e Navegação

- Seção de conversão principal da área de fechamento do site.

## 11. Informações Relevantes para Compreensão da Sessão

- Header da Sobre aponta para `#contact`, e esta seção expõe `id="contact"`.

## 12. Análise de Inconformidades (Sessão vs Protótipo)

- Inconformidade 1 (Baixa): linguagem dos CTAs periféricos
  - O protótipo enfatiza tom minimal e direto.
  - Há variedade maior de canais sociais, o que pode aumentar ruído cognitivo.
- Inconformidade 2 (Baixa): spring em botão de submit
  - Protótipo recomenda evitar estética de bounce; embora sem scale, o spring pode dar sensação mais “elástica” do que o esperado.
- Conformidade forte:
  - Estrutura semântica, contraste e acessibilidade dos campos estão bem executados.
