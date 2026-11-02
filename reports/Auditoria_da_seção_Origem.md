# ## Auditoria da seção Origem

A seção tem uma base conceitual boa e já possui uma assinatura visual própria: quatro capítulos, quatro imagens e uma narrativa que progride da sensibilidade inicial até a integração entre criação, estratégia e IA. No site publicado, essa progressão aparece como **O que permanece**, **Do traço à intenção**, **A descoberta do invisível** e **Expansão com propósito**. ([Danilo Novais][1])

O problema principal não está na ideia. Está na relação entre **densidade narrativa, evidência e ritmo de scroll**. Hoje a seção funciona mais como manifesto poético do que como história profissional. Isso produz atmosfera, mas deixa uma oportunidade importante de lado: fazer o visitante entender rapidamente de onde vieram seu olhar, seu método e sua posição atual como Diretor de Criação.

### Diagnóstico

| Dimensão       | Estado atual                                          | Problema observado                                                                                | Prioridade |
| -------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ---------- |
| Conceito       | Narrativa A/B/C/D coerente                            | Os quatro capítulos têm cadência e abstração muito parecidas                                      | Alta       |
| Storytelling   | Forte componente autoral                              | Faltam marcos concretos que ancorem a história                                                    | Alta       |
| Hierarquia     | `ORIGEM` + títulos grandes                            | Falta uma proposição que explique o significado da seção antes do primeiro capítulo               | Alta       |
| Layout desktop | Texto à esquerda + imagem sticky à direita            | Boa assinatura, mas quatro blocos `min-h-screen` alongam muito uma quantidade pequena de conteúdo | Alta       |
| Imagens        | Quatro imagens sincronizadas com scroll               | A imagem funciona como atmosfera, mas seu papel narrativo não fica explícito                      | Média      |
| Mobile         | Imagem inserida dentro de cada capítulo               | Mais compreensível que desktop, porém o corpo centralizado reduz escaneabilidade                  | Média      |
| Motion         | Transições controladas via `motion/react`             | A infraestrutura é boa, mas o efeito está comandando mais a seção do que o conteúdo               | Média      |
| Acessibilidade | Existe `prefers-reduced-motion` via `useMotionGate()` | A arquitetura desktop/mobile merece revisão para garantir uma única narrativa semântica           | Alta       |
| Conversão      | Conecta posteriormente com “Do insight ao impacto”    | Não existe uma ponte explícita entre origem e prática profissional                                | Alta       |

A implementação confirma que não é necessário reconstruir tudo. `AboutOrigin.tsx` já separa conteúdo, assets e animação, enquanto `OriginComponents.tsx` encapsula texto e sticky gallery. Isso torna a seção especialmente adequada para uma refatoração localizada em vez de um redesign destrutivo.

Há ainda um sinal técnico importante no HTML publicado: outras áreas da página já apresentam conteúdo duplicado entre representações responsivas, como a sequência numerada logo após Origem. Isso merece ser tratado junto com a revisão semântica para que versões visualmente alternativas não multipliquem conteúdo rastreável ou acessível desnecessariamente. ([Danilo Novais][1])

## O que as referências fazem melhor

### Loehx

A referência da Loehx é valiosa menos pelo estilo visual isolado e mais pela maneira como transforma biografia em **evidência profissional**. O site sai rapidamente da apresentação pessoal para experiência, duração, tecnologias e trabalhos concretos. “Web Development” recebe anos de experiência; React, Vue, AI e outros domínios também recebem contexto e tempo de prática. ([loehx.com][2])

Isso produz uma combinação que sua Origem ainda não explora plenamente:

**personalidade + trajetória + evidência.**

O usuário entende quem é Alex, como chegou ali e por que deve acreditar no posicionamento apresentado. Mais adiante, projetos ganham período, duração, função, setor e stack, transformando narrativa em credibilidade verificável. ([loehx.com][2])

O princípio que vale importar é: **não deixar o texto autoral carregar sozinho a responsabilidade de provar a trajetória.**

### Arcoglobal

A Arco usa uma estrutura ainda mais direta. A página abre com uma ideia dominante, “Built on Precision”, explica imediatamente o que a empresa é e depois converte a narrativa em fatos: origem, quatro escritórios, 150 pessoas e mais de 200 projetos. Depois entram presença global, liderança, produção e company profile. ([arcoglobal][3])

A sequência é especialmente útil para seu caso:

**claim → contexto → prova → escala → próximo capítulo.**

Essa arquitetura mantém o tom premium sem exigir parágrafos longos nem excesso de efeitos.

## Direção recomendada

Eu manteria o conceito **Origem** e a sticky gallery, mas transformaria a seção em uma espécie de **editorial timeline**, combinando a carga emocional atual com a clareza factual das duas referências.

A ideia central seria:

> **Da intuição ao método.**

“ORIGEM” passa a ser o eyebrow. “Da intuição ao método” vira a tese. Em uma linha curta abaixo, a seção explica ao visitante por que está lendo aquilo: como observação, desenho, comunicação, design, branding e tecnologia foram se transformando no método criativo atual.

Isso resolve um problema de arquitetura de informação: atualmente o visitante entra direto em “O que permanece” e precisa inferir sozinho qual é a função da seção. ([Danilo Novais][1])

## Nova arquitetura proposta

| Cena   | Função                        | Conteúdo recomendado                                                     | Tratamento visual                        |
| ------ | ----------------------------- | ------------------------------------------------------------------------ | ---------------------------------------- |
| Intro  | Dar contexto                  | `ORIGEM` + “Da intuição ao método.” + 1 frase de orientação              | Grande respiro, typography-led           |
| 01     | Sensibilidade                 | **O que permanece** + essência/observação                                | Imagem 1 + índice `01 / 04`              |
| 02     | Criação                       | **Do traço à intenção** + passagem do improviso para direção             | Imagem 2 + microtag `CRIAÇÃO`            |
| 03     | Design                        | **A descoberta do invisível** + design como instrumento de transformação | Imagem 3 + microtag `DESIGN`             |
| 04     | Expansão                      | **Expansão com propósito** + Comunicação, branding, estratégia e IA      | Imagem 4 + microtag `MÉTODO`             |
| Bridge | Conectar história ao presente | “O que começou como olhar virou método.”                                 | Link/scroll para `Do insight ao impacto` |

Não colocaria datas inventadas. Os marcadores podem representar **fases conceituais**, e não anos, até existirem datas que você queira tornar públicas.

## Mudança mais importante no conteúdo

Hoje quase todos os parágrafos respondem “como eu penso”. Eles precisam passar a responder também “como isso se manifestou”.

Por exemplo, a quarta cena já oferece a matéria-prima correta: formação em Comunicação, design, branding e IA. O site também já afirma publicamente `12+ anos` de atuação e liderança criativa, então existe prova suficiente em outras partes da página para tornar a Origem mais concreta sem perder o tom autoral. ([Danilo Novais][1])

A composição ideal de cada cena seria:

**headline curta → frase autoral → evidência concreta → imagem.**

É exatamente o ponto de encontro entre Loehx e Arco.

## Layout desktop proposto

Eu preservaria o split assimétrico, mas mudaria sua função.

Em vez de quatro blocos de texto ocupando aproximadamente uma viewport inteira cada, usaria uma coluna narrativa de cerca de `5/12` e um media stage de `7/12`. O media stage continua sticky. A coluna textual recebe os quatro capítulos em uma sequência mais compacta, aproximadamente `70–80vh` por capítulo, dependendo dos testes reais de viewport.

Dentro do stage visual:

`01 / 04`
imagem
caption pequena
barra de progresso vertical

Conforme o usuário atravessa um capítulo, a imagem anterior deixa o palco e a nova entra. O número, a caption e o progresso mudam juntos.

Isso dá significado ao scroll. Hoje a troca de imagem é perceptível, mas não existe uma representação clara de **onde estou na história**.

## Motion

A própria base do projeto já usa `motion/react`, refs dedicados e `useMotionGate()`, então eu não adicionaria uma segunda biblioteca.

A nova animação deve funcionar como feedback da narrativa. Uma transição de imagem, uma leve mudança de escala, o progresso e o reveal do título bastam. Evitaria parallax independente em textos, máscaras simultâneas, blur prolongado e múltiplos movimentos concorrentes.

Essa direção também coincide com o recurso `ui-ux-designer` que existe no baseline fixado do seu Agent Skills Knowledge Hub: motion deve ter propósito, layouts precisam permanecer legíveis, `prefers-reduced-motion` é obrigatório e a originalidade não deve sacrificar escaneabilidade. É uma adaptação direta desses princípios ao seu portfolio.

## Mobile

No mobile eu não tentaria reproduzir a experiência sticky do desktop. A versão correta é editorial e linear:

**01 + título → copy → imagem → caption → próximo capítulo.**

Mudaria principalmente o corpo para alinhamento à esquerda e limitaria a largura efetiva das linhas. O grande título pode continuar expressivo, mas não usaria `text-h3` como equivalente visual de um parágrafo inteiro.

O resultado seria mais próximo de uma publicação editorial e menos próximo de quatro posters empilhados.

## Plano de implementação

| Fase               | Arquivos                                  | Trabalho                                                                                           | Critério de conclusão                                                     |
| ------------------ | ----------------------------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| P0, semântica      | `AboutOrigin.tsx`, `OriginComponents.tsx` | Garantir uma única narrativa textual canônica e separar elementos puramente visuais                | Um único heading/texto significativo por capítulo na árvore semântica     |
| P1, conteúdo       | `origin/data.ts`                          | Evoluir os quatro objetos para suportar `chapter`, `phase`, `lead`, `body`, `highlight`, `caption` | Cada capítulo comunica ideia + manifestação concreta                      |
| P2, hierarchy      | `AboutOrigin.tsx`                         | Adicionar intro editorial “Da intuição ao método”                                                  | Função da seção compreensível antes do capítulo 01                        |
| P3, desktop        | `OriginComponents.tsx`                    | Evoluir sticky gallery para media stage com contador, caption e progresso                          | Usuário identifica cena atual e progresso                                 |
| P4, ritmo          | `OriginComponents.tsx`                    | Reduzir verticalidade artificial dos quatro capítulos                                              | Nenhum bloco ocupa uma viewport inteira apenas para sustentar pouco texto |
| P5, motion         | `useOriginAnimations.ts`                  | Simplificar para active chapter + transição da imagem + indicador                                  | Nenhuma animação compete com leitura                                      |
| P6, mobile         | `OriginComponents.tsx`                    | Criar leitura editorial left-aligned com imagem contextual                                         | Narrativa funciona integralmente sem sticky                               |
| P7, acessibilidade | seção + imagens                           | Rever `aria`, headings, alt, reduced motion e focus behavior                                       | Experiência completa com teclado e motion reduzido                        |
| P8, validação      | Playwright + build                        | Criar cobertura específica para Origem e revisar `e2e/about-beliefs.spec.ts`                       | Build, lint/typecheck e E2E verdes; desktop e mobile inspecionados        |

O repositório já tem Playwright e um teste dedicado à área About, `e2e/about-beliefs.spec.ts`, então eu aproveitaria a infraestrutura existente em vez de introduzir outra camada de QA.

## Resultado visual esperado

A identidade deve continuar sendo a sua. Não copiaria a estética de Loehx nem da Arco. Da Loehx, absorveria **densidade de evidência e clareza de trajetória**. Da Arco, **hierarquia editorial e sequência claim/proof**. Da implementação atual, preservaria **dark canvas, bluePrimary, imagens grandes, narrativa contemplativa e sticky media**.

O efeito final seria uma seção menos “galeria com manifesto” e mais **história profissional dirigida como experiência editorial**.

A mudança de maior impacto é esta: **transformar cada capítulo de uma reflexão abstrata em uma reflexão acompanhada por uma evidência concreta da evolução profissional**. Isso mantém sua voz, mas faz Origem trabalhar também para posicionamento, autoridade e conversão.

Essa é a direção que eu implementaria antes de mexer em cor, fonte ou adicionar novos efeitos. ([loehx.com][2])

[1]: https://portfoliodanilo.com/sobre "Sobre — Trajetória e Visão | Danilo Novais"
[2]: https://loehx.com/ "Alexander Löhn — Web & AI Developer (freelance)"
[3]: https://arcoglobal.com/about "About | arcoglobal"
