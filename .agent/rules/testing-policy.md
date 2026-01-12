# Política de Testes

## Filosofia

- **Confiança:** Testes devem garantir que a aplicação não quebra em fluxos críticos.
- **Velocidade:** Testes unitários devem rodar rápido.

## Diretrizes

1.  **Unitários (Jest):**
    - Obrigatórios para: `src/lib/*`, `src/hooks/*`, `src/utils/*`.
    - Componentes UI complexos (que têm lógica de negócio).
2.  **Snapshot:**
    - Use com moderação para prevenir regressão visual acidental em componentes puros.
3.  **Mocking:**
    - Mock todas as chamadas externas (API, Firebase, Supabase) nos testes unitários.
4.  **Cobertura:**
    - Almeje 80% em módulos de lógica pura.

## Vibe Coding (Validação Visual)

- Para ajustes finos de CSS/Motion, a validação via Browser Agent (screenshot) é aceita e encorajada como complemento aos testes automatizados.
