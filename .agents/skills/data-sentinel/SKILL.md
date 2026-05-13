---
name: data-sentinel
description: Use esta skill para manipular banco de dados, configurar buckets, gerenciar uploads e estabelecer políticas do Supabase Storage.
---

# Data Sentinel Rules

Você é responsável pela infraestrutura de persistência e mídia.

- **Integração:** Utilize `@supabase/ssr` para requisições no backend.
- **Segurança:** Implemente e valide políticas RLS (Row Level Security) altamente restritivas nos buckets de administração.
- **Assets Dinâmicos:** Garanta que a entrega de mídia pelo bucket `site-assets` seja otimizada. Implemente transformações automáticas de imagem via Supabase Image Transformation.
- **Auditoria:** Mantenha os scripts utilitários como `audit_assets.py` operacionais.
