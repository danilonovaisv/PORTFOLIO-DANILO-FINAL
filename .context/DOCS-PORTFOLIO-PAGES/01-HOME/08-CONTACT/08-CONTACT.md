# 07-CONTACT

## 0. Estrutura de arquivos da sessão

- Arquivos principais:
  - `src/components/home/contact/ContactSection.tsx`
  - `src/components/home/contact/ContactForm.tsx`
  - `src/components/home/contact/FormFields.tsx`
  - `src/config/navigation.ts` (`CONTACT_FORM`, `SOCIALS`)
  - `src/config/content.ts` (`HOME_CONTENT.contact`)
- Dependências:
  - Framer Motion
  - Form submission via FormSubmit (`formsubmit.co`)
  - Lucide icons
- Padrão arquitetural:
  - Layout split (informações + formulário), com priorização mobile.
- Observações sobre coesão e acoplamento:
  - Coeso e modular.
  - Acoplamento externo com endpoint FormSubmit.

## 1. Objetivo da Página/Sessão

Converter interesse em contato qualificado com múltiplos canais (telefone, email, redes sociais) e formulário de mensagem.

## 2. Estrutura de Conteúdo

- Headings:
  - `h2`: “contato”.
- Hierarquia semântica:
  - `section#contact` + bloco informacional + `form`.
- Textos principais:
  - Subtítulo de incentivo a colaboração.
- CTA’s:
  - Botão “Enviar Mensagem”.
- Fonts utilizadas:
  - Tipografia global, com pesos fortes em labels e heading.
- Peso das fontes:
  - Heading bold; labels uppercase bold.
- Tokens aplicados:
  - Fundo claro `backgroundLight` com acentos azuis.
- Densidade de informação:
  - Média/alta (dados de contato + formulário completo).

## 3. Identidade Visual

- Cores aplicadas:
  - Contraste claro/escuro com ênfase em azul.
- Gradientes:
  - Não relevantes.
- Backgrounds:
  - Sessão clara com card branco de formulário.
- Consistência com GHOST-DESIGN-SYSTEM:
  - Alinhada com blocos claros de conversão.
- Uso de contraste:
  - Bom no formulário e CTAs.
- Coerência tipográfica:
  - Adequada.

## 4. Interatividade & Animações

- Uso de Framer Motion:
  - Reveal da seção e do formulário.
- Variants:
  - Transições de entrada padrão.
- Scroll animations:
  - While-in-view.
- Microinterações:
  - Hover/active em links e botão de submit.
- Riscos de layout shift:
  - Baixo.
- Impacto em performance:
  - Baixo.

## 5. Responsividade

- Desktop:
  - Grid `5/7` com boa separação entre informação e form.
- Tablet:
  - Fluxo adaptável com empilhamento progressivo.
- Mobile:
  - Ordem otimizada: título > canais > formulário.
- Breakpoints:
  - `lg` para troca de layout.
- Grid/Flex:
  - Híbrido flex/grid bem definido.
- Overflow:
  - Controlado.
- CLS potencial:
  - Baixo.

## 6. Acessibilidade & SEO

- Estrutura semântica:
  - Boa estrutura de formulário, labels associadas (`htmlFor`).
- ARIA:
  - `aria-invalid`, `aria-describedby`, `aria-label` em ícones/links.
- Alt em imagens:
  - Não aplicável.
- Navegação por teclado:
  - Campos e botões navegáveis com foco visível.
- Contraste (WCAG):
  - Adequado na maioria dos elementos.
- Heading structure:
  - `h2` presente e coerente.
- Meta tags:
  - Não aplicável diretamente.
- SEO técnico:
  - Sessão de conversão não crítica para ranking, mas boa semântica ajuda crawlability.

## 7. Integrações ou Recursos Especiais

- Firebase:
  - Não utilizado.
- Supabase:
  - Não utilizado diretamente no envio do formulário.
- APIs externas:
  - `formsubmit.co` para envio de formulário.
- SSR/CSR:
  - Client-side.
- Lazy loading:
  - Não necessário.
- Suspense:
  - Não aplicado.

## 8. Considerações Técnicas

- Performance:
  - Seção leve.
- Bundle size:
  - Baixo impacto.
- Code splitting:
  - Não essencial.
- Reusabilidade:
  - Campos reutilizáveis via `FormFields`.
- Testabilidade:
  - Boa para testes de validação de formulário.
- Escalabilidade:
  - Boa; fácil extensão de campos.
- Débito técnico:
  - Animação do botão submit usa `whileHover` e `whileTap` com deslocamentos que podem divergir de regra Ghost estrita para conteúdo.
  - Dependência externa de FormSubmit limita observabilidade e controle de falhas.
- Recomendações arquiteturais:
  - Migrar envio para endpoint próprio (Next route handler/Firebase function/Supabase edge function) para governança completa.
  - Ajustar microanimações para conformidade total com regra “no bounce/scale/rotate” em conteúdo.

---

## 9. Componentes Interativos

🎨 **Biblioteca de Componentes:**

| Componente  | Descrição                           | Estados                                   | Interações               | Status                |
| ----------- | ----------------------------------- | ----------------------------------------- | ------------------------ | --------------------- |
| Botão CTA   | Botão de envio do formulário        | Default, Hover, Focus, Disabled, Loading  | Submit do formulário     | Implementado          |
| Modal       | Não há modal principal para contato | N/A                                       | N/A                      | Não se aplica         |
| Formulário  | Formulário de captação de contato   | Idle, Validating, Loading, Error, Success | Input, submit, validação | Implementado          |
| Slider      | Não aplicável                       | N/A                                       | N/A                      | Não se aplica         |
| Menu Mobile | Global via header                   | Closed/Open                               | Navegação global         | Implementado (global) |

🔄 **Estados e Transições:**

- Hover: Botão de envio e campos destacam estado interativo.
- Focus: Campos com foco visível e ordem lógica de navegação.
- Loading: Estado de envio com feedback de processamento.
- Error: Mensagens de erro de validação/envio com orientação de correção.
- Success: Confirmação explícita de envio bem-sucedido.

## 10. Estrutura de Páginas e Navegação

- Âncora final de conversão (`#contact`) acessada por header/CTAs da HOME.
- Encadeia submissão de lead sem redirecionamento obrigatório.

## 11. Informações Relevantes para Compreensão da Sessão

- Integração atual com endpoint externo de envio (FormSubmit).
- Recomendável endpoint próprio para observabilidade, rate-limit e segurança de produção.
