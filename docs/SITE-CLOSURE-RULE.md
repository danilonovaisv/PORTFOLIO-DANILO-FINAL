# Regras de Estrutura e Fechamento de Página (Site Closure)

Este documento define a regra absoluta para o encerramento de todas as páginas do portfólio Danilo Novais (Ghost Era).

## A Regra Absoluta

Toda página principal (`HomePage`, `AboutPage`, `PortfolioPage`) **DEVE** terminar obrigatoriamente com o componente unificado `<SiteClosure />`.

### Componentes Integrados no SiteClosure:
1.  **ClientsBrandsSection**: Grid de logotipos em fundo azul (`bg-section-clients`).
2.  **ContactSection**: Seção de contato com formulário em fundo claro (`bg-section-contact`).
3.  **SiteFooter**: Rodapé institucional em fundo azul (`bg-section-footer`).

## Especificações Mobile (Ajustadas via Auditoria)

Para garantir a fidelidade ao protótipo e à imagem de referência:

### 1. ClientsBrandsSection
- **Layout**: Grid de 2 colunas (`grid-cols-2`) no mobile.
- **Visual**: Logotipos invertidos (branco) sobre fundo azul, centralizados.

### 2. ContactSection
- **Hierarquia**: Título "CONTATO" (Azul, Uppercase) -> Subtítulo -> Links de Contato -> Redes Sociais -> Formulário.
- **Elementos**: 
    - Links de contato em círculos brancos com ícones azuis.
    - Redes sociais em círculos brancos com ícones escuros.
    - Card de formulário branco com sombra sutil.
- **Ergonomia**: Inputs com altura mínima de 48px (`py-3.5`).

### 3. SiteFooter
- **Layout**: Fundo azul sólido ocupando toda a largura.
- **Navegação**: Links em minúsculas, centralizados horizontalmente. O link "sobre" deve estar sublinhado.
- **Redes Sociais**: Círculos brancos com ícones azuis.
- **Copyright**: Texto em caixa alta (`uppercase`), centralizado no final.

## Manutenção

- **NUNCA** duplique a lógica destas seções em componentes locais de página.
- Qualquer alteração global no rodapé deve ser feita diretamente nos componentes filhos de `SiteClosure`.
- A ordem das seções no Closure é imutável: **Marcas -> Contato -> Footer**.
