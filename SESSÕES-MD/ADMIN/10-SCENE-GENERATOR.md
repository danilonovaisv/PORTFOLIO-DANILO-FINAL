# 10-SCENE-GENERATOR

## 0. Estrutura de arquivos da sessão
- `src/app/admin/(protected)/scene-generator/page.tsx`
- `src/app/admin/(protected)/scene-generator/actions.ts`
- `src/app/admin/(protected)/scene-generator/types.ts`

## 1. Objetivo da sessão
Apoiar criação de material visual com batch, presets e múltiplos modelos para fluxo criativo do portfólio.

## 2. Funcionalidades
- multi-upload de referências.
- seleção de modelo.
- batch controlado.
- presets de proporção (`1:1`, `16:9`, `9:16`, `4:5`).

## 3. Observações técnicas
- validações de payload e arquivos bem definidas.
- UI orientada a produtividade (download e preview).

## 4. Inconformidades observadas
- Inconformidade média: alinhar disponibilidade real dos modelos listados com providers ativos para evitar expectativa incorreta.
