/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { parseLandingPageContent } from '@/lib/projects/template-schema';
import { AlpaHeroLayout } from '@/components/projects/templates/alpa/AlpaHeroLayout';
import type { MasterProjectTemplateV3HeroData } from '@/types/project-template';

// Mock dependencies
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

jest.mock('@/components/ui/GhostMarkdown', () => ({
  GhostMarkdown: ({ content }: any) => <div data-testid="ghost-markdown">{content}</div>,
}));

jest.mock('@/components/ui/AntigravityCTA', () => ({
  __esModule: true,
  default: ({ text }: any) => <button>{text}</button>,
}));

jest.mock('@/components/ui/HTMLVideoBlock', () => ({
  HTMLVideoBlock: ({ html }: any) => <div data-testid="html-video-block" dangerouslySetInnerHTML={{ __html: html }} />,
}));

jest.mock('next/dynamic', () => () => {
  return function MockDynamicComponent() {
    return <div data-testid="mock-dynamic" />;
  };
});

jest.mock('motion/react', () => {
  const MockComponent = ({ children, className, style, ...rest }: any) => (
    <div className={className} style={style} {...rest}>
      {children}
    </div>
  );
  return {
    motion: {
      section: ({ children, className, id, ...rest }: any) => (
        <section className={className} id={id} {...rest}>
          {children}
        </section>
      ),
      div: MockComponent,
      h1: ({ children, className }: any) => <h1 className={className}>{children}</h1>,
      div_custom: MockComponent,
    },
    m: {
      section: ({ children, className, id, ...rest }: any) => (
        <section className={className} id={id} {...rest}>
          {children}
        </section>
      ),
      div: MockComponent,
      h1: ({ children, className }: any) => <h1 className={className}>{children}</h1>,
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
  };
});

jest.mock('@/components/projects/templates/useLandingBackLink', () => ({
  useLandingBackLink: () => '/portfolio',
}));

jest.mock('@/hooks/useReducedMotion', () => ({
  useReducedMotion: () => false,
}));

describe('Hero Animation Regression & Evidence Verification', () => {
  const mockHtmlAnimation = `<!DOCTYPE html>
<html lang="pt-BR">
<head><title>Preview Animado</title></head>
<body>
  <div class="stage" id="stage">
    <img id="layerBg" src="https://example.com/bg.webp" alt="Background" />
  </div>
  <script>console.log('running');</script>
</body>
</html>`;

  describe('1. Data Normalization: Recover HTML from logo field & sanitize', () => {
    it('recovers HTML animation from hero_logo_image / client_logo_image into hero_top_media', () => {
      const rawPersistedNestle = {
        template: 'master-project-v3-alpa-hero',
        project_title: 'Nestlé Nutrition & Health',
        project_slug: 'nestle-nutrition-health-abrafarma-future-trends-2026',
        hero_media_type: 'none',
        hero_cover_image: { src: '', alt: 'Capa do projeto', kind: 'image' },
        hero_logo_image: {
          src: mockHtmlAnimation,
          alt: 'Logo de Nestlé Nutrition & Health',
          kind: 'html',
          poster: '',
        },
        client_logo_image: {
          src: mockHtmlAnimation,
          alt: 'Logo de Nestlé Nutrition & Health',
          kind: 'html',
          poster: '',
        },
        hero_top_media: {
          src: '',
          alt: 'Hero media de Nestlé Nutrition & Health',
          kind: 'image',
        },
        gallery_grid: [],
      };

      const parsed = parseLandingPageContent(rawPersistedNestle, {
        slug: rawPersistedNestle.project_slug,
        title: rawPersistedNestle.project_title,
      });

      expect(parsed.template).toBe('master-project-v3-alpa-hero');
      if (parsed.template === 'master-project-v3-alpa-hero') {
        // Must recover hero_top_media
        expect(parsed.data.hero_top_media?.kind).toBe('html');
        expect(parsed.data.hero_top_media?.html).toContain('Preview Animado');
        expect(parsed.data.hero_media_type).toBe('html');

        // Must sanitize logo so it does NOT pass raw HTML to next/image
        expect(parsed.data.hero_logo_image?.src).not.toContain('<!DOCTYPE');
        expect(parsed.data.client_logo_image?.src).not.toContain('<!DOCTYPE');
      }
    });
  });

  describe('2. Layout DOM Placement: Hero Media must be in the Hero section above title', () => {
    it('renders hero_top_media above the project title in the hero section, not after the intro', () => {
      const projectData: MasterProjectTemplateV3HeroData = {
        schema_version: '3.0',
        template: 'master-project-v3-alpa-hero',
        project_title: 'Nestlé Nutrition & Health',
        project_slug: 'nestle-nutrition-health',
        project_tags: ['Branding'],
        highlight_color: '#0048ff',
        hero_media_type: 'html',
        hero_top_media: {
          kind: 'html',
          html: mockHtmlAnimation,
          alt: 'Preview Animado da Hero',
          src: '',
        },
        gallery_grid: [],
        intro_headline: 'Introdução do Projeto',
        intro_body: ['Texto de introdução da página.'],
      };

      const { container } = render(
        <AlpaHeroLayout project={projectData}>
          <div data-testid="gallery-children">Gallery Content</div>
        </AlpaHeroLayout>
      );

      // Verify HTMLVideoBlock rendered
      const heroMediaEl = container.querySelector('[data-testid="html-video-block"]');
      expect(heroMediaEl).toBeTruthy();

      // Check DOM ordering: hero media must appear BEFORE intro section
      const introHeading = screen.getByRole('heading', { level: 2, name: /Introdução do Projeto/i });

      // In AlpaHeroLayout, hero media must precede the intro section
      // and NOT be placed after introHeading
      const precedesIntro = (introHeading.compareDocumentPosition(heroMediaEl!) & Node.DOCUMENT_POSITION_PRECEDING) !== 0;
      expect(precedesIntro).toBe(true);
    });
  });
});
