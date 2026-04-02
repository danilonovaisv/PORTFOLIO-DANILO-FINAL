/**
 * FILE: src/app/admin/(protected)/audit/page.tsx
 *
 * Revisão sênior (Frontend/UX/Perf/A11y) do painel de auditoria runtime.
 *
 * Principais problemas no código original (corrigidos aqui):
 * - A11y: <label> sem htmlFor/id (inputs sem nome programático); accordion sem aria-expanded/aria-controls.
 * - UX: ausência de estado de progresso, “cancelar”, “limpar resultados” e feedback não-bloqueante (evitar alert()).
 * - Confiabilidade: fetch sem AbortController (não dá para interromper execução); export de clipboard sem fallback.
 * - Robustez: checks usando CSS.escape sem fallback; rota protegida redirecionando para login gerava checks “errados” (agora sinaliza e atribui checks ao login).
 * - Performance: setState em loop sem controle (mantido progressivo, mas com throttling mínimo e opção de cancelar).
 * - A11y/Perf 3D: Canvas decorativo sem aria-hidden; OrbitControls sempre ativo (agora desabilitado em reduced motion).
 *
 * Obs.: Este painel NÃO substitui Lighthouse/Playwright/axe em CI, mas gera um artefato prático para issues/PRs.
 */

'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import * as THREE from 'three';

type Severity = 'blocker' | 'high' | 'medium' | 'low' | 'info';

type AuditItem = {
  id: string;
  title: string;
  severity: Severity;
  evidence: string;
  fix: string;
  validate: string;
};

type RouteKind =
  | 'public'
  | 'portfolio-item'
  | 'project-landing'
  | 'admin-login'
  | 'admin-protected'
  | 'special-not-found'
  | 'lab'
  | 'examples';

type RouteTarget = {
  /** Identificador estável para mapear resultados */
  id: string;
  /** Caminho relativo (mesmo origin) */
  path: string;
  /** Ajuda a classificar checks específicos */
  kind: RouteKind;
  /** Status esperado quando faz sentido (ex.: not-found) */
  expectedStatus?: number;
  /** Ajuda a validar redirects de rotas conhecidas */
  expectedRedirectIncludes?: string;
};

type RouteAuditResult = {
  target: RouteTarget;
  ok: boolean;
  score: number; // 0..100
  status: number | null;
  redirectedTo: string | null;
  durationMs: number;
  contentType: string | null;
  contentLength: number | null;
  items: AuditItem[];
  fetchedAtISO: string;
  notes?: string[];
};

const SEVERITY_WEIGHT: Record<Severity, number> = {
  blocker: 10,
  high: 7,
  medium: 4,
  low: 2,
  info: 1
};

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

function scoreFromItems(items: AuditItem[]) {
  const penalty = items.reduce((acc, it) => acc + SEVERITY_WEIGHT[it.severity], 0);
  return Math.max(0, Math.round(100 - penalty * 5));
}

function severityBadgeClasses(sev: Severity) {
  switch (sev) {
    case 'blocker':
      return 'bg-red-600/20 text-red-200 ring-1 ring-red-500/30';
    case 'high':
      return 'bg-orange-600/20 text-orange-200 ring-1 ring-orange-500/30';
    case 'medium':
      return 'bg-yellow-600/20 text-yellow-100 ring-1 ring-yellow-500/30';
    case 'low':
      return 'bg-sky-600/20 text-sky-200 ring-1 ring-sky-500/30';
    case 'info':
      return 'bg-zinc-600/20 text-zinc-200 ring-1 ring-zinc-500/30';
  }
}

function statusDotClasses(state: 'idle' | 'ok' | 'bad') {
  if (state === 'idle') return 'bg-zinc-500';
  return state === 'ok' ? 'bg-emerald-400' : 'bg-rose-400';
}

function safeUrlPathname(urlString: string) {
  try {
    const u = new URL(urlString);
    return u.pathname;
  } catch {
    // se vier relativo ou inválido, tenta fallback simplificado
    const q = urlString.split('?')[0] || urlString;
    return (q.split('#')[0] || q) as string;
  }
}

function cssEscapeSafe(value: string) {
  // @ts-expect-error - CSS.escape pode não existir em TS lib atual do projeto
  const esc: ((s: string) => string) | undefined = typeof CSS !== 'undefined' ? CSS.escape : undefined;
  if (esc) return esc(value);
  // fallback simples: escapa aspas e backslashes
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function guessLanguageFromDocument(doc: Document) {
  const lang = doc.documentElement?.getAttribute?.('lang')?.trim();
  return lang || null;
}

function textContentNormalized(el: Element | null) {
  if (!el) return '';
  return (el.textContent || '').replace(/\s+/g, ' ').trim();
}

function getMeta(doc: Document, nameOrProp: string) {
  const byName = doc.querySelector(`meta[name="${cssEscapeSafe(nameOrProp)}"]`);
  if (byName) return byName.getAttribute('content')?.trim() || null;
  const byProp = doc.querySelector(`meta[property="${cssEscapeSafe(nameOrProp)}"]`);
  if (byProp) return byProp.getAttribute('content')?.trim() || null;
  return null;
}

function getCanonical(doc: Document) {
  const link = doc.querySelector('link[rel="canonical"]');
  const href = link?.getAttribute('href')?.trim();
  return href || null;
}

function hasViewportMeta(doc: Document) {
  return Boolean(doc.querySelector('meta[name="viewport"]'));
}

function countBadImages(doc: Document) {
  const imgs = Array.from(doc.querySelectorAll('img'));
  let missingAlt = 0;
  let emptyAlt = 0;

  for (const img of imgs) {
    const alt = img.getAttribute('alt');
    if (alt === null) missingAlt++;
    else if (alt.trim() === '') emptyAlt++;
  }

  return { total: imgs.length, missingAlt, emptyAlt };
}

function countNamelessInteractive(doc: Document) {
  const links = Array.from(doc.querySelectorAll('a'));
  const buttons = Array.from(doc.querySelectorAll('button'));

  const hasAnyName = (el: Element) => {
    const aria = el.getAttribute('aria-label')?.trim();
    const title = el.getAttribute('title')?.trim();
    const txt = textContentNormalized(el);
    // Algumas libs colocam sr-only; ainda conta como texto (textContent).
    return Boolean(aria || title || txt);
  };

  const namelessLinks = links.filter((a) => !hasAnyName(a)).length;
  const namelessButtons = buttons.filter((b) => !hasAnyName(b)).length;

  return { namelessLinks, namelessButtons };
}

function countFormLabelIssues(doc: Document) {
  const controls = Array.from(doc.querySelectorAll('input, select, textarea'));
  let missingLabel = 0;

  for (const el of controls) {
    const tag = el.tagName.toLowerCase();
    const type = (el.getAttribute('type') || '').toLowerCase();

    if (tag === 'input' && ['hidden', 'submit', 'button', 'reset'].includes(type)) continue;

    const aria =
      el.getAttribute('aria-label')?.trim() || el.getAttribute('aria-labelledby')?.trim();
    if (aria) continue;

    const id = el.getAttribute('id')?.trim();
    if (id) {
      const label = doc.querySelector(`label[for="${cssEscapeSafe(id)}"]`);
      if (label) continue;
    }

    const parentLabel = el.closest('label');
    if (parentLabel) continue;

    missingLabel++;
  }

  return { total: controls.length, missingLabel };
}

function countHeadings(doc: Document) {
  const h1 = doc.querySelectorAll('h1').length;
  const h2 = doc.querySelectorAll('h2').length;
  return { h1, h2 };
}

function hasMainLandmark(doc: Document) {
  return Boolean(doc.querySelector('main, [role="main"]'));
}

function hasSkipLink(doc: Document) {
  const links = Array.from(doc.querySelectorAll('a[href^="#"]'));
  return links.some((a) => {
    const href = a.getAttribute('href') || '';
    const txt = textContentNormalized(a).toLowerCase();
    return (
      href.length > 1 &&
      (txt.includes('pular') ||
        txt.includes('skip') ||
        txt.includes('conteúdo') ||
        txt.includes('conteudo') ||
        txt.includes('content'))
    );
  });
}

function adminNoIndexSignals(doc: Document) {
  const metaRobots = getMeta(doc, 'robots'); // e.g. "noindex,nofollow"
  const hasNoIndex = metaRobots?.toLowerCase().includes('noindex') ?? false;
  const hasNoFollow = metaRobots?.toLowerCase().includes('nofollow') ?? false;
  return { metaRobots, hasNoIndex, hasNoFollow };
}

function parseHtmlToDocument(html: string) {
  const parser = new DOMParser();
  return parser.parseFromString(html, 'text/html');
}

function buildTargets(params: { portfolioSlug: string; projectSlug: string; trabalhoId: string }) {
  const portfolioSlug = params.portfolioSlug.trim();
  const projectSlug = params.projectSlug.trim();
  const trabalhoId = params.trabalhoId.trim();

  const targets: RouteTarget[] = [
    // Globais / Públicas principais
    { id: 'home', path: '/', kind: 'public' },
    { id: 'sobre', path: '/sobre', kind: 'public' },
    { id: 'portfolio', path: '/portfolio', kind: 'public' },
    { id: 'contato', path: '/contato', kind: 'public' },
    { id: 'privacidade', path: '/privacidade', kind: 'public' },

    // Dinâmicas críticas
    ...(portfolioSlug
      ? [
          {
            id: 'portfolio-item',
            path: `/portfolio/${encodeURIComponent(portfolioSlug)}`,
            kind: 'portfolio-item'
          } satisfies RouteTarget
        ]
      : []),
    ...(projectSlug
      ? [
          {
            id: 'project-landing',
            path: `/projects/${encodeURIComponent(projectSlug)}`,
            kind: 'project-landing'
          } satisfies RouteTarget
        ]
      : []),

    // Rotas laboratório (citadas no escopo)
    { id: 'lab-portfolio-showcase', path: '/portfolio-showcase', kind: 'lab' },
    { id: 'lab-floating-cards', path: '/floating-cards', kind: 'lab' },
    { id: 'lab-playground', path: '/playground', kind: 'lab' },

    // Exemplos/Instrumentos
    { id: 'examples-supabase', path: '/examples/supabase', kind: 'examples' },
    { id: 'instruments', path: '/instruments', kind: 'examples' },

    // Admin
    { id: 'admin-login', path: '/admin/login', kind: 'admin-login' },
    { id: 'admin-dashboard', path: '/admin', kind: 'admin-protected' },
    { id: 'admin-trabalhos', path: '/admin/trabalhos', kind: 'admin-protected' },
    { id: 'admin-trabalhos-new', path: '/admin/trabalhos/new', kind: 'admin-protected' },
    ...(trabalhoId
      ? [
          {
            id: 'admin-trabalhos-edit',
            path: `/admin/trabalhos/${encodeURIComponent(trabalhoId)}`,
            kind: 'admin-protected'
          } satisfies RouteTarget
        ]
      : []),
    { id: 'admin-tags', path: '/admin/tags', kind: 'admin-protected' },
    { id: 'admin-midia', path: '/admin/midia', kind: 'admin-protected' },
    { id: 'admin-settings', path: '/admin/settings', kind: 'admin-protected' },
    { id: 'admin-landing-pages', path: '/admin/landing-pages', kind: 'admin-protected' },
    { id: 'admin-copy-agent', path: '/admin/copy-agent', kind: 'admin-protected' },
    { id: 'admin-scene-generator', path: '/admin/scene-generator', kind: 'admin-protected' },
    {
      id: 'admin-config-redirect',
      path: '/admin/config',
      kind: 'admin-protected',
      expectedRedirectIncludes: '/admin/settings'
    },

    // not-found (heurística): rota impossível para forçar 404
    {
      id: 'special-not-found',
      path: '/__audit__route__does__not__exist__',
      kind: 'special-not-found',
      expectedStatus: 404
    }
  ];

  // Remove duplicadas por segurança
  const seen = new Set<string>();
  return targets.filter((t) => {
    if (seen.has(t.path)) return false;
    seen.add(t.path);
    return true;
  });
}

function buildChecksFromHtml(doc: Document, target: RouteTarget): AuditItem[] {
  const items: AuditItem[] = [];

  const lang = guessLanguageFromDocument(doc);
  if (!lang) {
    items.push({
      id: 'global-lang-missing',
      title: 'Acessibilidade: atributo lang ausente no <html>',
      severity: 'high',
      evidence:
        'Documento HTML sem lang (ex.: <html lang="pt-BR">). Isso prejudica leitores de tela e SEO.',
      fix: 'Defina lang no Root Layout (ex.: pt-BR) e garanta consistência entre rotas.',
      validate: 'Recarregar a rota e confirmar <html lang="..."> no HTML retornado.'
    });
  }

  if (!hasViewportMeta(doc)) {
    items.push({
      id: 'seo-viewport-missing',
      title: 'SEO/UX Mobile: meta viewport ausente',
      severity: 'high',
      evidence:
        'Sem <meta name="viewport">, layout pode quebrar em mobile e Lighthouse penaliza.',
      fix: 'Adicione <meta name="viewport" content="width=device-width, initial-scale=1"> via metadata/Head (App Router).',
      validate: 'Verificar se meta viewport aparece no HTML e se o layout responde corretamente em mobile.'
    });
  }

  const title = doc.querySelector('title')?.textContent?.trim() || '';
  if (!title) {
    items.push({
      id: 'seo-title-missing',
      title: 'SEO: <title> ausente ou vazio',
      severity: 'blocker',
      evidence: 'Documento sem title. Isso degrada CTR e indexação.',
      fix: 'Defina metadata.title global e, para rotas dinâmicas, use generateMetadata com fallback.',
      validate: 'Abrir HTML e confirmar <title> preenchido.'
    });
  } else if (title.length < 10) {
    items.push({
      id: 'seo-title-too-short',
      title: 'SEO: <title> muito curto',
      severity: 'medium',
      evidence: `title atual parece curto: "${title}".`,
      fix: 'Inclua contexto (nome, função, tipo de página) mantendo clareza.',
      validate: 'Conferir se título final é descritivo e consistente entre rotas.'
    });
  }

  const description = getMeta(doc, 'description');
  if (!description) {
    items.push({
      id: 'seo-description-missing',
      title: 'SEO: meta description ausente',
      severity: 'high',
      evidence: 'Sem description, motores de busca podem gerar snippet ruim.',
      fix: 'Defina metadata.description global e, para rotas dinâmicas, gere com base no conteúdo (com fallback).',
      validate: 'Verificar <meta name="description" content="..."> no HTML.'
    });
  } else if (description.length < 50 || description.length > 170) {
    items.push({
      id: 'seo-description-length',
      title: 'SEO: meta description com tamanho fora do ideal',
      severity: 'low',
      evidence: `description length=${description.length}.`,
      fix: 'Ajustar para ~80–160 caracteres (aprox.) mantendo propósito e palavras-chave.',
      validate: 'Conferir snippet e Lighthouse SEO.'
    });
  }

  const canonical = getCanonical(doc);
  if (!canonical) {
    items.push({
      id: 'seo-canonical-missing',
      title: 'SEO: canonical ausente',
      severity: 'medium',
      evidence:
        'Sem canonical, rotas dinâmicas e variações podem gerar risco de duplicidade.',
      fix: 'Adicionar link rel="canonical" via metadata.alternates.canonical (App Router).',
      validate: 'Confirmar canonical no HTML e se aponta para URL final pública.'
    });
  }

  const ogTitle = getMeta(doc, 'og:title');
  const ogImage = getMeta(doc, 'og:image');
  if (!ogTitle || !ogImage) {
    items.push({
      id: 'seo-og-missing',
      title: 'SEO/Social: Open Graph incompleto',
      severity: 'medium',
      evidence: `og:title=${String(Boolean(ogTitle))} og:image=${String(Boolean(ogImage))}.`,
      fix: 'Defina metadata.openGraph com título/descrição/imagem e garanta para rotas /portfolio/[slug] e /projects/[slug].',
      validate: 'Validar em debugger de Open Graph e conferir tags no HTML.'
    });
  }

  const headings = countHeadings(doc);
  if (headings.h1 === 0) {
    items.push({
      id: 'a11y-h1-missing',
      title: 'Acessibilidade/SEO: página sem H1',
      severity: 'high',
      evidence:
        'Nenhum <h1> encontrado no HTML. Isso prejudica hierarquia semântica.',
      fix: 'Garanta 1 H1 por página, representando o principal conteúdo/entidade.',
      validate: 'Inspecionar HTML e confirmar presença de um H1.'
    });
  } else if (headings.h1 > 1) {
    items.push({
      id: 'a11y-multiple-h1',
      title: 'Acessibilidade/SEO: múltiplos H1',
      severity: 'low',
      evidence: `Encontrados ${headings.h1} H1.`,
      fix: 'Mantenha 1 H1 (ou use múltiplos apenas com justificativa clara, normalmente evitando).',
      validate: 'Revalidar contagem de headings.'
    });
  }

  if (!hasMainLandmark(doc)) {
    items.push({
      id: 'a11y-main-missing',
      title: 'Acessibilidade: landmark <main> ausente',
      severity: 'high',
      evidence:
        'Sem <main> (ou role="main"), navegação por leitores de tela fica pior.',
      fix: 'Envolver o conteúdo principal em <main> e garantir que existe em todas as rotas.',
      validate: 'Verificar <main> no HTML e testar navegação por landmarks.'
    });
  }

  if (!hasSkipLink(doc)) {
    items.push({
      id: 'a11y-skip-link-missing',
      title: 'Acessibilidade: skip link não encontrado (heurística)',
      severity: 'medium',
      evidence:
        'Não foi detectado link para pular para o conteúdo principal (pode existir mas não foi identificado).',
      fix: 'Adicionar um skip link no topo (visível ao foco) apontando para o id do <main>.',
      validate:
        'Tab no topo da página e confirmar que aparece “Pular para conteúdo”.'
    });
  }

  const img = countBadImages(doc);
  if (img.missingAlt > 0) {
    items.push({
      id: 'a11y-img-alt-missing',
      title: 'Acessibilidade: imagens sem alt',
      severity: img.missingAlt >= 3 ? 'high' : 'medium',
      evidence: `Imagens: total=${img.total} missingAlt=${img.missingAlt}.`,
      fix: 'Para imagens informativas: adicione alt descritivo. Para decorativas: alt="".',
      validate: 'Revalidar contagem e testar com leitor de tela/axe.'
    });
  }

  const interactive = countNamelessInteractive(doc);
  if (interactive.namelessLinks > 0 || interactive.namelessButtons > 0) {
    items.push({
      id: 'a11y-nameless-interactive',
      title: 'Acessibilidade: links/botões sem nome acessível',
      severity: 'high',
      evidence: `namelessLinks=${interactive.namelessLinks} namelessButtons=${interactive.namelessButtons}.`,
      fix: 'Garanta texto visível ou aria-label/title coerente (principalmente em botões com ícone).',
      validate:
        'Rodar axe e navegar via teclado conferindo foco e nomes.'
    });
  }

  const forms = countFormLabelIssues(doc);
  if (forms.total > 0 && forms.missingLabel > 0) {
    items.push({
      id: 'a11y-form-labels',
      title: 'Acessibilidade: campos de formulário sem label',
      severity: 'high',
      evidence: `Campos: total=${forms.total} sem label detectável=${forms.missingLabel}.`,
      fix: 'Use <label for="id">, label envolvendo o input, ou aria-label/aria-labelledby.',
      validate: 'Verificar foco/announce em leitor de tela e revalidar contagem.'
    });
  }

  // Admin: não indexar
  if (target.kind === 'admin-login' || target.kind === 'admin-protected') {
    const noIndex = adminNoIndexSignals(doc);
    if (!noIndex.hasNoIndex) {
      items.push({
        id: 'admin-noindex-missing',
        title: 'SEO/Security: Admin sem noindex (meta robots)',
        severity: 'high',
        evidence: `meta robots atual: ${noIndex.metaRobots ?? '(ausente)'}`,
        fix: 'Adicionar meta robots "noindex,nofollow" (e/ou headers X-Robots-Tag) em /admin/*.',
        validate: 'Verificar meta robots no HTML e rodar Lighthouse SEO.'
      });
    }
  }

  // Rotas especiais: 404 semântico
  if (target.kind === 'special-not-found') {
    const h1Text = textContentNormalized(doc.querySelector('h1'));
    if (!h1Text) {
      items.push({
        id: 'not-found-h1-missing',
        title: 'Confiabilidade/A11y: not-found sem heading principal',
        severity: 'medium',
        evidence: '404 retornou HTML mas não foi detectado H1 (heurística).',
        fix: 'Garanta um H1 claro na página de 404 e mensagens acionáveis (voltar, home, busca).',
        validate:
          'Abrir rota inexistente e conferir heading e navegação por teclado.'
      });
    }
  }

  // Rotas dinâmicas: exigir robustez de metadata (sinal)
  if (target.kind === 'portfolio-item' || target.kind === 'project-landing') {
    const ogType = getMeta(doc, 'og:type');
    if (!ogType) {
      items.push({
        id: 'dynamic-og-type-missing',
        title: 'SEO: og:type ausente em rota dinâmica',
        severity: 'low',
        evidence: 'Não foi encontrado og:type (heurística).',
        fix: 'Defina og:type ("website" ou específico) e complete OG/Twitter para cada slug.',
        validate:
          'Confirmar tags OG completas no HTML da rota dinâmica.'
      });
    }
  }

  return items;
}

async function auditRoute(target: RouteTarget, signal?: AbortSignal): Promise<RouteAuditResult> {
  const t0 = performance.now();
  const fetchedAtISO = new Date().toISOString();

  try {
    const res = await fetch(target.path, {
      method: 'GET',
      credentials: 'include',
      redirect: 'follow',
      cache: 'no-store',
      signal
    });

    const durationMs = Math.round(performance.now() - t0);

    const status = res.status;
    const redirectedTo = res.redirected ? res.url : null;

    const contentType = res.headers.get('content-type');
    const contentLengthRaw = res.headers.get('content-length');
    const contentLength = contentLengthRaw ? Number(contentLengthRaw) : null;

    const isHtml = (contentType || '').toLowerCase().includes('text/html');
    const html = isHtml ? await res.text() : '';

    const items: AuditItem[] = [];
    const notes: string[] = [];

    if (typeof target.expectedStatus === 'number' && status !== target.expectedStatus) {
      items.push({
        id: 'http-status-unexpected',
        title: 'Confiabilidade: status HTTP inesperado',
        severity: 'high',
        evidence: `Esperado=${target.expectedStatus} recebido=${status}.`,
        fix: 'Revisar roteamento/handlers de erro para garantir status correto.',
        validate: 'Refazer requisição e confirmar status esperado.'
      });
    }

    if (target.expectedRedirectIncludes) {
      if (!redirectedTo || !safeUrlPathname(redirectedTo).includes(target.expectedRedirectIncludes)) {
        items.push({
          id: 'redirect-unexpected',
          title: 'Confiabilidade: redirect esperado não ocorreu (ou destino inesperado)',
          severity: 'medium',
          evidence: `Esperado incluir "${target.expectedRedirectIncludes}". redirectedTo=${redirectedTo ?? '(sem redirect)'}.`,
          fix: 'Revisar redirect/route handler/middleware do /admin/config.',
          validate: 'Acessar /admin/config e confirmar redirect para a rota correta.'
        });
      }
    }

    if (!isHtml) {
      items.push({
        id: 'content-type-not-html',
        title: 'Confiabilidade: resposta não parece HTML',
        severity: 'high',
        evidence: `content-type="${contentType ?? '(ausente)'}".`,
        fix: 'Verificar se a rota está retornando HTML corretamente ou se houve redirect/erro.',
        validate: 'Conferir headers e conteúdo retornado.'
      });
    } else {
      // Se uma rota protegida redireciona para login, o HTML retornado é o login.
      // Para evitar falsos-positivos, atribuímos os checks ao "admin-login" e registramos nota.
      const redirectedPath = redirectedTo ? safeUrlPathname(redirectedTo) : null;

      const effectiveTarget =
        target.kind === 'admin-protected' && redirectedPath?.includes('/admin/login')
          ? ({ ...target, kind: 'admin-login', path: redirectedPath } satisfies RouteTarget)
          : target;

      const doc = parseHtmlToDocument(html);
      items.push(...buildChecksFromHtml(doc, effectiveTarget));

      if (effectiveTarget.kind === 'admin-login' && target.kind === 'admin-protected') {
        notes.push('A rota protegida foi auditada com HTML do login (você provavelmente estava deslogado).');
        items.push({
          id: 'admin-redirected-to-login',
          title: 'Autenticação: rota protegida redirecionou para /admin/login',
          severity: 'info',
          evidence: `A rota ${target.path} redirecionou para ${redirectedTo}.`,
          fix: 'Se você estava deslogado, isso é esperado. Se estava logado, revisar sessão/cookies e middleware.',
          validate: 'Logar no admin e reexecutar o audit para confirmar status 200 sem redirect.'
        });
      }
    }

    let ok = true;
    if (items.some((it) => it.severity === 'blocker' || it.severity === 'high')) ok = false;

    const score = scoreFromItems(items);

    return {
      target,
      ok,
      score,
      status,
      redirectedTo,
      durationMs,
      contentType,
      contentLength,
      items,
      fetchedAtISO,
      notes: notes.length ? notes : undefined
    };
  } catch (err) {
    const durationMs = Math.round(performance.now() - t0);

    const aborted = err instanceof DOMException && err.name === 'AbortError';
    return {
      target,
      ok: false,
      score: 0,
      status: null,
      redirectedTo: null,
      durationMs,
      contentType: null,
      contentLength: null,
      items: [
        {
          id: aborted ? 'fetch-aborted' : 'fetch-failed',
          title: aborted ? 'Execução cancelada' : 'Confiabilidade: falha ao buscar rota',
          severity: aborted ? 'info' : 'blocker',
          evidence: aborted ? 'AbortController interrompeu a execução.' : err instanceof Error ? err.message : String(err),
          fix: aborted ? 'Nenhuma ação necessária.' : 'Verificar se o servidor está rodando, se a rota existe e se há bloqueio de rede/CORS.',
          validate: aborted ? 'Reexecutar auditoria.' : 'Reexecutar com DevTools aberto e confirmar response/headers.'
        }
      ],
      fetchedAtISO: new Date().toISOString()
    };
  }
}

function StatusScene({ score, reducedMotion }: { score: number; reducedMotion: boolean }) {
  const color = useMemo(() => {
    const t = clamp01(score / 100);
    const c = new THREE.Color();
    if (t < 0.5) {
      c.setRGB(1, t * 1.2, 0.2);
    } else {
      c.setRGB(1 - (t - 0.5) * 1.8, 1, 0.25);
    }
    return c;
  }, [score]);

  return (
    <Canvas
      dpr={1}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      camera={{ position: [0, 0, 3.2], fov: 45 }}
      className="h-24 w-24"
      aria-hidden="true"
      tabIndex={-1}
    >
      <ambientLight intensity={0.85} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} />
      <gridHelper args={[6, 12, '#222', '#151515']} />

      {!reducedMotion ? (
        <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.6} enableDamping />
      ) : null}

      <StatusOrb color={color} reducedMotion={reducedMotion} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.25, 0]}>
        <circleGeometry args={[1.2, 64]} />
        <meshStandardMaterial color="#0b0b0f" roughness={1} metalness={0} />
      </mesh>
    </Canvas>
  );
}

function StatusOrb({ color, reducedMotion }: { color: THREE.Color; reducedMotion: boolean }) {
  const ref = React.useRef<THREE.Mesh | null>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    if (!reducedMotion) {
      ref.current.rotation.y = t * 0.75;
      ref.current.rotation.x = Math.sin(t * 0.6) * 0.2;
    } else {
      ref.current.rotation.y = 0.35;
      ref.current.rotation.x = 0.15;
    }
  });

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <sphereGeometry args={[0.9, 64, 64]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.35}
        metalness={0.2}
        roughness={0.25}
      />
    </mesh>
  );
}

async function copyToClipboardWithFallback(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback: textarea + execCommand (pode falhar em browsers modernos, mas ajuda em contextos sem permissão)
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', 'true');
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      ta.style.top = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}

export default function AdminAuditPage() {
  const reducedMotion = useReducedMotion();

  const [portfolioSlug, setPortfolioSlug] = useState('');
  const [projectSlug, setProjectSlug] = useState('');
  const [trabalhoId, setTrabalhoId] = useState('');

  const targets = useMemo(
    () => buildTargets({ portfolioSlug, projectSlug, trabalhoId }),
    [portfolioSlug, projectSlug, trabalhoId]
  );

  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState<{ current: number; total: number; path?: string } | null>(
    null
  );
  const [results, setResults] = useState<Record<string, RouteAuditResult>>({});
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [uiMessage, setUiMessage] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  const summary = useMemo(() => {
    const list = Object.values(results);
    if (list.length === 0) {
      return { avgScore: 0, okCount: 0, total: 0, blockerHighCount: 0 };
    }
    const avgScore = Math.round(list.reduce((acc, r) => acc + r.score, 0) / list.length);
    const okCount = list.filter((r) => r.ok).length;
    const blockerHighCount = list.reduce((acc, r) => {
      const n = r.items.filter((it) => it.severity === 'blocker' || it.severity === 'high').length;
      return acc + n;
    }, 0);
    return { avgScore, okCount, total: list.length, blockerHighCount };
  }, [results]);

  const clearResults = useCallback(() => {
    setResults({});
    setExpandedId(null);
    setUiMessage(null);
    setProgress(null);
  }, []);

  const cancel = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setRunning(false);
    setProgress(null);
    setUiMessage('Execução cancelada.');
  }, []);

  const runAll = useCallback(async () => {
    setUiMessage(null);
    setRunning(true);
    setExpandedId(null);

    abortRef.current?.abort();
    abortRef.current = new AbortController();

    const { signal } = abortRef.current;

    try {
      setProgress({ current: 0, total: targets.length });

      // Execução sequencial proposital (controle/observabilidade e menor stress no servidor)
      for (let i = 0; i < targets.length; i++) {
        const t = targets[i];
        setProgress({ current: i + 1, total: targets.length, path: t.path });

        // eslint-disable-next-line no-await-in-loop
        const r = await auditRoute(t, signal);

        setResults((prev) => ({ ...prev, [t.id]: r }));
      }

      setUiMessage('Auditoria concluída.');
    } finally {
      setRunning(false);
      setProgress(null);
    }
  }, [targets]);

  const exportJson = useCallback(async () => {
    setUiMessage(null);

    const payload = {
      generatedAtISO: new Date().toISOString(),
      origin: typeof window !== 'undefined' ? window.location.origin : null,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
      prefersReducedMotion: Boolean(reducedMotion),
      inputs: { portfolioSlug, projectSlug, trabalhoId },
      targets,
      results: Object.values(results)
    };

    const text = JSON.stringify(payload, null, 2);
    const ok = await copyToClipboardWithFallback(text);

    setUiMessage(ok ? 'Audit JSON copiado para a área de transferência.' : 'Falha ao copiar JSON. Verifique permissões do navegador.');
  }, [portfolioSlug, projectSlug, trabalhoId, reducedMotion, results, targets]);

  const list = useMemo(() => {
    return targets
      .map((t) => ({ t, r: results[t.id] ?? null }))
      .sort((a, b) => {
        // Prioriza rotas com falhas (score menor primeiro). "Não rodado" fica no topo para chamar atenção.
        const as = a.r?.score ?? -1;
        const bs = b.r?.score ?? -1;
        return as - bs;
      });
  }, [targets, results]);

  return (
    <div className="min-h-dvh bg-zinc-950 text-zinc-100">
      <div className="mx-auto w-full max-w-6xl px-4 py-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h1 className="text-balance text-2xl font-semibold tracking-tight">
              Auditoria (runtime) — Admin & Rotas Críticas
            </h1>
            <p className="text-sm text-zinc-400">
              Este painel faz fetch do HTML das rotas e aplica checks objetivos de acessibilidade, SEO
              técnico e confiabilidade (status/redirect). Use como artefato para issue/PR.
            </p>

            {progress ? (
              <p className="text-xs text-zinc-400">
                Executando {progress.current}/{progress.total}
                {progress.path ? (
                  <>
                    {' '}
                    — <span className="font-mono text-zinc-300">{progress.path}</span>
                  </>
                ) : null}
              </p>
            ) : null}

            {uiMessage ? (
              <div className="mt-2 rounded-md bg-white/5 px-3 py-2 text-xs text-zinc-300 ring-1 ring-white/10">
                {uiMessage}
              </div>
            ) : null}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <StatusScene score={summary.avgScore} reducedMotion={Boolean(reducedMotion)} />
            </div>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={runAll}
                disabled={running}
                className="inline-flex items-center justify-center rounded-md bg-white/10 px-4 py-2 text-sm font-medium text-zinc-100 ring-1 ring-white/10 transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {running ? 'Executando...' : 'Executar auditoria'}
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={exportJson}
                  disabled={running || Object.keys(results).length === 0}
                  className="inline-flex items-center justify-center rounded-md bg-white/5 px-4 py-2 text-sm font-medium text-zinc-200 ring-1 ring-white/10 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Exportar JSON
                </button>

                <button
                  type="button"
                  onClick={running ? cancel : clearResults}
                  className="inline-flex items-center justify-center rounded-md bg-black/30 px-4 py-2 text-sm font-medium text-zinc-200 ring-1 ring-white/10 transition hover:bg-black/40"
                >
                  {running ? 'Cancelar' : 'Limpar'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 rounded-xl bg-white/5 p-4 ring-1 ring-white/10 md:grid-cols-3">
          <Field
            label="portfolio slug"
            placeholder="ex.: meu-projeto"
            value={portfolioSlug}
            onChange={setPortfolioSlug}
            help="Usado para auditar /portfolio/[slug]"
          />
          <Field
            label="projects slug"
            placeholder="ex.: landing-x"
            value={projectSlug}
            onChange={setProjectSlug}
            help="Usado para auditar /projects/[slug]"
          />
          <Field
            label="trabalho id"
            placeholder="ex.: 123"
            value={trabalhoId}
            onChange={setTrabalhoId}
            help="Usado para auditar /admin/trabalhos/[id]"
          />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
          <Stat label="Média do score" value={summary.total ? `${summary.avgScore}/100` : '—'} />
          <Stat label="Rotas OK" value={summary.total ? `${summary.okCount}/${summary.total}` : '—'} />
          <Stat
            label="Blocker/High (total)"
            value={summary.total ? String(summary.blockerHighCount) : '—'}
          />
          <Stat label="Reduced motion" value={reducedMotion ? 'Ativo (respeitado)' : 'Desativado'} />
        </div>

        <div className="mt-8 space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">Resultados por rota</h2>

          <div className="space-y-2">
            {list.map(({ t, r }) => {
              const isExpanded = expandedId === t.id;
              const cardScore = r?.score ?? null;

              const state: 'idle' | 'ok' | 'bad' = !r ? 'idle' : r.ok ? 'ok' : 'bad';

              const motionProps = reducedMotion
                ? {}
                : {
                    initial: { opacity: 0, y: 8 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.18 }
                  };

              const panelId = `audit-panel-${t.id}`;

              return (
                <motion.div
                  key={t.id}
                  {...motionProps}
                  className="rounded-xl bg-white/5 ring-1 ring-white/10"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedId((prev) => (prev === t.id ? null : t.id))}
                    aria-expanded={isExpanded}
                    aria-controls={panelId}
                    className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${statusDotClasses(state)}`}
                        aria-hidden="true"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="truncate font-medium">{t.path}</span>
                          <span className="rounded-md bg-black/30 px-2 py-0.5 text-xs text-zinc-300 ring-1 ring-white/10">
                            {t.kind}
                          </span>
                        </div>

                        <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-400">
                          <span>Status: {r ? r.status ?? '—' : '—'}</span>
                          <span>Tempo: {r ? `${r.durationMs}ms` : '—'}</span>
                          {r?.redirectedTo ? (
                            <span className="truncate">Redirect: {safeUrlPathname(r.redirectedTo)}</span>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-3">
                      <div
                        className="h-2 w-24 overflow-hidden rounded bg-black/30 ring-1 ring-white/10"
                        aria-hidden="true"
                      >
                        <div
                          className="h-full bg-emerald-400/80"
                          style={{ width: `${cardScore ?? 0}%`, opacity: r ? 1 : 0.25 }}
                        />
                      </div>
                      <div className="w-16 text-right text-sm tabular-nums text-zinc-200">
                        {r ? `${r.score}` : '—'}
                      </div>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded ? (
                      <motion.div
                        id={panelId}
                        initial={reducedMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
                        animate={reducedMotion ? { opacity: 1 } : { opacity: 1, height: 'auto' }}
                        exit={reducedMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
                        transition={{ duration: reducedMotion ? 0 : 0.18 }}
                        className="border-t border-white/10 px-4 py-3"
                      >
                        {!r ? (
                          <div className="text-sm text-zinc-400">
                            Ainda não executado. Clique em “Executar auditoria”.
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                              <Meta label="Content-Type" value={r.contentType ?? '—'} />
                              <Meta
                                label="Content-Length"
                                value={typeof r.contentLength === 'number' ? String(r.contentLength) : '—'}
                              />
                              <Meta label="Fetched at" value={r.fetchedAtISO} mono />
                            </div>

                            {r.notes?.length ? (
                              <div className="rounded-lg bg-white/5 p-3 ring-1 ring-white/10">
                                <p className="text-xs font-semibold tracking-tight text-zinc-200">Notas</p>
                                <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-zinc-300">
                                  {r.notes.map((n) => (
                                    <li key={n}>{n}</li>
                                  ))}
                                </ul>
                              </div>
                            ) : null}

                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <h3 className="text-sm font-semibold tracking-tight">Itens encontrados</h3>
                                <span className="text-xs text-zinc-400">{r.items.length} item(s)</span>
                              </div>

                              {r.items.length === 0 ? (
                                <div className="rounded-lg bg-emerald-500/10 p-3 text-sm text-emerald-200 ring-1 ring-emerald-500/20">
                                  Nenhum problema detectado pelos checks atuais (isso não substitui um audit completo
                                  com Lighthouse + Playwright/axe).
                                </div>
                              ) : (
                                <div className="space-y-2">
                                  {r.items.map((it) => (
                                    <div
                                      key={it.id}
                                      className="rounded-lg bg-black/20 p-3 ring-1 ring-white/10"
                                    >
                                      <div className="flex flex-wrap items-start justify-between gap-2">
                                        <div className="min-w-0">
                                          <div className="flex items-center gap-2">
                                            <span
                                              className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${severityBadgeClasses(
                                                it.severity
                                              )}`}
                                            >
                                              {it.severity.toUpperCase()}
                                            </span>
                                            <p className="text-sm font-medium text-zinc-100">{it.title}</p>
                                          </div>

                                          <p className="mt-1 text-xs text-zinc-400">
                                            <span className="font-semibold text-zinc-300">Evidência:</span>{' '}
                                            {it.evidence}
                                          </p>
                                        </div>
                                      </div>

                                      <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-2">
                                        <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                                          <p className="text-xs font-semibold text-zinc-200">Correção</p>
                                          <p className="mt-1 text-xs text-zinc-300">{it.fix}</p>
                                        </div>
                                        <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                                          <p className="text-xs font-semibold text-zinc-200">Validação</p>
                                          <p className="mt-1 text-xs text-zinc-300">{it.validate}</p>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mt-10 rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
          <h2 className="text-sm font-semibold tracking-tight">Checklist final de validação (recomendado)</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-300">
            <li>Rodar Lighthouse (Mobile + Desktop) nas rotas públicas e registrar CWV (LCP/CLS/INP).</li>
            <li>Rodar Playwright + axe no fluxo /admin/login → /admin (autorização + estados de erro).</li>
            <li>Testar navegação por teclado (Tab/Shift+Tab) e foco visível (principalmente em botões com ícone).</li>
            <li>Validar reduced motion (prefers-reduced-motion: reduce) e garantir que Lenis/motions respeitam.</li>
            <li>Validar metadata por slug (/portfolio/[slug], /projects/[slug]) com fallback e canonical correto.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  placeholder,
  value,
  onChange,
  help
}: {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  help?: string;
}) {
  const idRef = useRef<string | null>(null);
  if (!idRef.current) {
    idRef.current = `field-${label.toLowerCase().replace(/\s+/g, '-')}-${Math.random().toString(16).slice(2)}`;
  }

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label
          htmlFor={idRef.current}
          className="text-xs font-medium uppercase tracking-wide text-zinc-400"
        >
          {label}
        </label>
      </div>

      <input
        id={idRef.current}
        type="text"
        inputMode="text"
        autoComplete="off"
        spellCheck={false}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md bg-black/30 px-3 py-2 text-sm text-zinc-100 ring-1 ring-white/10 outline-none placeholder:text-zinc-600 focus:ring-2 focus:ring-emerald-500/40"
      />

      {help ? <p className="text-xs text-zinc-500">{help}</p> : null}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">{label}</p>
      <p className="mt-2 text-xl font-semibold tabular-nums text-zinc-100">{value}</p>
    </div>
  );
}

function Meta({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="rounded-lg bg-white/5 p-3 ring-1 ring-white/10">
      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">{label}</p>
      <p className={`mt-1 text-sm text-zinc-200 ${mono ? 'font-mono text-xs' : ''}`}>{value}</p>
    </div>
  );
}
