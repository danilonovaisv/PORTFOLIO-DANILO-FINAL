# 🛡️ AUDITOR PROTOCOL (Context Guardian)

> **REGRA SUPREMA**: Nenhuma linha de código de layout ou lógica é alterada sem antes validar contra a documentação em `.context/`.

## 1. INTEGRAÇÃO DE SKILLS

Este protocolo exige o uso ativo das seguintes skills em todas as iterações:

- **`skill-planning-with-files`**: Para ler o estado atual da documentação antes de planejar e para escrever as atualizações após a aprovação.
- **`skill-frontend-design`**: Para avaliar se a solicitação visual quebra o Design System (`GHOST-DESIGN-SYSTEM.md`) ou a UX definida nos protótipos.

## 2. O FLUXO DE AUDITORIA (The Audit Loop)

Todo request de alteração de código deve passar por este fluxo:

### FASE A: Pré-Validação (Antes de codar)

1. **Identificar Alvo**: Se o usuário quer alterar a "Home", localize `.context/HOME - PROTOTIPO INTERATIVO.md`.
2. **Cross-Check**: Compare o prompt do usuário com a descrição na documentação.
   - *Exemplo*: O doc diz "Fundo Escuro". Usuário pede "Fundo Branco".
3. **BLOCKING ACTION**: Se houver divergência, **PARE**.
   - Pergunte ao usuário: *"Isso contradiz a regra 'X' no documento 'Y'. Deseja proceder e atualizar a documentação, ou manter o padrão?"*

### FASE B: Sincronização (Após aprovação)

1. Se o usuário confirmar a mudança (ex: "Sim, mude para fundo branco"):
2. **Execute o Código**: Faça a alteração no `.tsx`.
3. **ATUALIZE O DOC**: Imediatamente reescreva o arquivo em `.context/` refletindo a nova realidade.
   - *Ação*: Use `skill-planning-with-files` para editar o markdown.
4. **Log**: Adicione uma nota no histórico de mudanças do arquivo.

## 3. CHECKLIST DE VALIDAÇÃO POR PÁGINA

Ao tocar nestes arquivos, valide contra estes documentos:

| Rota (`src/app`) | Documento Obrigatório (`.context/`) |
| :--- | :--- |
| `/` (Home) | `HOME - PROTOTIPO INTERATIVO.md` |
| `/sobre` | `SOBRE-PROTOTIPO-INTERATIVO.md` |
| `/portfolio` | `PORTFOLIO-PROTOTIPO-INTERATIVO.md` |
| `/admin` | `ADMIN - PROTOTIPO INTERATIVO.md` |
| `/projects/[slug]` | `PROTOTIPO INTERATIVO DA LANDING PAGE.md` |
| `global.css` / `tailwind` | `GHOST-DESIGN-SYSTEM.md` |

## 4. MODO DE RESPOSTA

Se você identificar uma inconsistência, sua resposta deve começar com:
> 🕵️ **AUDITOR ALERT**: Detectei um desvio do documento [NOME_DO_DOC].
> **Original**: [O que diz o doc]
> **Solicitado**: [O que o usuário pediu]
> *Deseja aplicar a mudança e atualizar a documentação?*
