# 🐛 Error Log - PORTFOLIO-DANILO-FINAL

> Tập hợp tất cả lỗi xảy ra trong quá trình phát triển (Auto-generated).

---

## Thống kê nhanh

- **Tổng lỗi**: 2
- **Đã sửa**: 2

---

<!-- Errors sẽ được agent tự động ghi vào đây -->

## [2026-03-06 05:22] - Invalid ARIA attribute values in React TSX

- **Type**: Syntax / Linter
- **Severity**: Low
- **File**: `src/components/home/hero/VideoManifesto.tsx`, `src/components/portfolio/ProjectsGallery.tsx`
- **Agent**: Antigravity / Sentinel Prime
- **Root Cause**: O linter acusava erro `Invalid ARIA attribute value: aria-pressed="{expression}"` pois em React com strict checking, dependendo da configuração e parser (Edge Tools), certas inferências booleanas em atributos ARIA dão match diferente.
- **Error Message**:

  ```text
  ARIA attributes must conform to valid values: Invalid ARIA attribute value: aria-[attr]="{expression}"
  ```

- **Fix Applied**: Removida a aspas e string interpolation dos booleanos dentro de parâmetros ARIA; alterado de `aria-selected={condition ? 'true' : 'false'}` e afins de volta para a avaliação pura `aria-selected={condition}`.
- **Prevention**: Prestar atenção às interpretações mais estritas dos parsers de A11y / ARIA vs React Types.
- **Status**: Fixed

## [2026-03-03 04:42] - PNPM Outdated Lockfile for Sharp

- **Type**: Integration
- **Severity**: High
- **File**: `package.json` / `pnpm-lock.yaml`
- **Agent**: The Commander
- **Root Cause**: Inconsistência entre a versão do `sharp` no `package.json` (0.33.5) e no `pnpm-lock.yaml` (0.34.5). No CI `pnpm install --frozen-lockfile` falha com essa divergência.
- **Error Message**:

  ```text
  ERR_PNPM_OUTDATED_LOCKFILE Cannot install with "frozen-lockfile" because pnpm-lock.yaml is not up to date with <ROOT>/package.json
  ```

- **Fix Applied**: Atualizada a versão do `sharp` no `package.json` para `0.34.5` garantindo sincronia com o `pnpm-lock.yaml`.
- **Prevention**: Sempre rodar `pnpm install` localmente ao modificar o package.json antes de commitar para o CI.
- **Status**: Fixed
