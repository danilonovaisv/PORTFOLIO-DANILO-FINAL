---
trigger: always_on
---

# 🛡️ 02. Rule de Verificação Contínua: Integridade de Assets e Dados Globais

Esta regra garante que o agente nunca "quebre" os links ou invente dados falsos ao editar componentes.

## O Mandamento

**Nunca use dados, URLs ou textos "hardcoded" dentro de componentes (`.tsx`).** Sempre importe de `src/config/`.

---

## Checklist de Verificação Automática

Sempre que você editar uma seção (Hero, Footer, Showcase, etc), você deve validar:

1.  **Validação de URLs:**
    - Verifique se as imagens estão apontando para o domínio `aymuvxysygrwoicsjgxj.supabase.co`.
    - Se encontrar um placeholder (ex: `via.placeholder.com` ou `/img.jpg`), **PARE** e substitua pela constante correta definida em `src/config/`.

2.  **Consistência de Marca:**
    - O logotipo está usando a versão correta (Light vs Dark) para o fundo da seção?
    - O Copyright do footer está atualizado para **2025**? (Conforme regra global).

3.  **Links e Ações:**
    - O formulário de contato aponta EXATAMENTE para `https://formsubmit.co/danilo@portfoliodanilo.com`?
    - Os links sociais estão corretos (ex: Instagram termina em `_novais`, Twitter termina em `_novais`)?

4.  **Imutabilidade do Vídeo:**
    - A seção Hero e Manifesto compartilham a **MESMA URL** de vídeo? Elas devem consumir a mesma constante `BRAND.video.manifesto` para garantir cache eficiente.

---

## Ação em caso de Erro

Se você detectar um componente com string hardcoded (ex: `<img src="logo.png" />`):

1.  **Não edite o componente visualmente ainda.**
2.  Refatore o código para importar de `src/config/brand.ts` ou `src/config/content.ts`.
3.  Só prossiga com o ajuste visual após garantir a fonte de dados.
