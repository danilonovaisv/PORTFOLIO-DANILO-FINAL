# Plan: Refinar Ghost Model (@src/components/sobre/GhostModel.tsx)

## 🎼 Orchestration Details

- **Task**: Ajustar o modelo 3D do Ghost na seção Sobre para usar a nova URL e coordenadas exatas fornecidas pelo usuário.
- **Agents**:
  - `project-planner`: Planejamento e decomposição.
  - `@spectral_artist`: Implementação técnica R3F/Three.js.
  - `test-engineer`: Verificação de carregamento e lint.

---

## 📅 Phases

### Phase 1: Planning & Analysis

1. [x] Analisar o código fornecido pelo usuário vs código existente.
2. [x] Identificar discrepâncias (URL, Posições, Estrutura de Tipos).
3. [ ] Criar este documento de plano.

### Phase 2: Implementation (After Approval)

1. **Model Loading Update**:
   - Atualizar a URL do GLB para `https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/beliefs/ghost-transformed.glb/ghost-transformed.glb`.
   - Atualizar o Preload correspondente.
2. **Coordinate & Rotation Refinement**:
   - Ajustar as posições dos meshes baseadas no código fornecido:
     - `Body_Ghost_White_0`: `[0, 1.56, 0]`
     - `Eyes_Eyes_0`: `[0, 1.56, 0]`
     - `Hat_Hat_Black_0`: `[0, 2.99, 0]`
     - `Rim_Rim_Red_0`: `[0, 2.35, 0]`
   - Garantir que as rotações `[-Math.PI / 2, 0, 0]` estejam consistentes.
3. **Ghost System Retention**:
   - Preservar a lógica de animação `useFrame` (mouse follow, scroll zoom, float) que já existe no componente original, integrando-a com a nova estrutura.
4. **Type Safety**:
   - Refinar a interface `GLTFResult` para garantir que o casting seja limpo e sem erros de lint.

### Phase 3: Verification

1. [ ] Executar `lint_runner.py` para verificar integridade do código.
2. [ ] (Simulado) Verificar se o modelo carrega sem erros de 404/500 no console.

---

## 🛠️ Verification Scripts

```bash
python .agent/skills/lint-and-validate/scripts/lint_runner.py src/components/sobre/GhostModel.tsx
```

---

## ⚠️ Approval Required

**@USER**: O plano acima refina o modelo 3D mantendo as animações premiun do Ghost System v3, mas usando a nova URL e coordenadas que você forneceu. Podemos prosseguir com a implementação?
