import fs from 'node:fs';
import path from 'node:path';
import { parseLandingPageContent } from '@/lib/projects/template-schema';
import recoveredPortfolio from '@/config/recovered-portfolio.json';

describe('D1 Content & R2 Asset Recovery Bundle Integrity', () => {
  it('covers all 19 canonical published projects without placeholders or Supabase URLs', () => {
    expect(recoveredPortfolio).toHaveLength(19);

    const serialized = JSON.stringify(recoveredPortfolio);
    expect(serialized).not.toContain('supabase.co');
    expect(serialized).not.toContain('Projeto do Portfólio Ghost Era');
    expect(serialized).not.toContain('Cliente Confidencial');
    expect(serialized).not.toContain('Branding-Project.webp');
    expect(serialized).not.toContain('cartoon-network');

    const featuredHome = recoveredPortfolio.filter(
      (p) => Boolean(p.featured_on_home)
    );
    expect(featuredHome).toHaveLength(8);
  });

  it('produces valid MasterProjectTemplateV3Hero content parseable by template schema for every project', () => {
    for (const item of recoveredPortfolio) {
      const parsed = parseLandingPageContent(item.landing_page_content, {
        slug: item.slug,
        title: item.title,
        cover: item.hero_image_path,
      });
      expect(parsed.template).toBe('master-project-v3-alpa-hero');
      if (parsed.template === 'master-project-v3-alpa-hero') {
        expect(parsed.data.project_title).toBe(item.title);
        expect(parsed.data.hero_top_media?.src).toContain(
          'https://assets.portfoliodanilo.com/'
        );
      }
    }
  });

  it('relinks real R2 galleries & landing blocks for rich-media projects', () => {
    const bySlug = new Map(recoveredPortfolio.map((p) => [p.slug, p]));

    expect(
      bySlug.get('tcotton')?.landing_page_content.gallery_grid.length
    ).toBeGreaterThanOrEqual(20);
    expect(
      bySlug.get('nestle')?.landing_page_content.gallery_grid.length
    ).toBeGreaterThanOrEqual(10);
    expect(
      bySlug.get('swift-week')?.landing_page_content.gallery_grid.length
    ).toBeGreaterThanOrEqual(7);
    expect(
      bySlug.get('conid')?.landing_page_content.gallery_grid.length
    ).toBe(5);
    expect(bySlug.get('ambev-bees')?.gallery.length).toBe(13);
    expect(bySlug.get('campanhas-digitais')?.gallery.length).toBe(7);
    expect(bySlug.get('eudora')?.gallery.length).toBe(4);
    expect(bySlug.get('mercado-livre-ai-video-mp')?.gallery.length).toBe(3);
  });

  it('generates pure SQLite recovery & local seed SQL files without PostgreSQL syntax', () => {
    const root = process.cwd();
    const sql = fs.readFileSync(
      path.join(root, 'cloudflare/seeds/recover-portfolio-content.sql'),
      'utf8'
    );
    expect(sql).toContain('UPDATE portfolio_projects SET');
    expect(sql).toContain('UPDATE landing_pages SET');
    expect(sql).not.toMatch(/\b(DO \$\$|JSONB|NOTIFY pgrst|security_invoker)\b/i);
    expect(sql).not.toContain('supabase.co');
  });
});

