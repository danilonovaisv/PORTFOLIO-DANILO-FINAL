import { HOME_CONTENT } from '@/config/content';
import { FOOTER, NAV_LINKS } from '@/config/navigation';
import { BRAND } from '@/config/brand';

describe('global site links', () => {
  it('keeps navigation links consistent', () => {
    // Current NAV_LINKS should match the header specification
    expect(NAV_LINKS).toHaveLength(4);

    const hrefs = NAV_LINKS.map((l) => l.href);
    expect(hrefs).toContain('#hero');
    expect(hrefs).toContain('/sobre');
    expect(hrefs).toContain('#portfolio-showcase');
    expect(hrefs).toContain('#contact');
  });

  it('exposes the expected footer links matching the config', () => {
    expect(FOOTER.links).toHaveLength(4);
    const footerHrefs = FOOTER.links.map((l) => l.href);
    expect(footerHrefs).toContain('#hero');
    expect(footerHrefs).toContain('#portfolio-showcase');
    expect(footerHrefs).toContain('/sobre');
    expect(footerHrefs).toContain('#contact');
  });

  it('locates the manifesto video on Supabase storage', () => {
    const url = BRAND.video.manifesto;
    expect(url).toMatch(/supabase\.co\/storage\/v1\/object\/public\//);
    expect(url.endsWith('.mp4')).toBe(true);
  });

  it('has valid categories in home content', () => {
    expect(HOME_CONTENT.showcase.categories.length).toBeGreaterThan(0);
    HOME_CONTENT.showcase.categories.forEach((cat) => {
      expect(cat.thumb).toBeDefined();
    });
  });
});
