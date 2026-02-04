import { HOME_CONTENT } from '@/config/content';
import { NAVIGATION } from '@/config/navigation';
import { BRAND } from '@/config/brand';

describe('global site links', () => {
  it('keeps navigation links consistent', () => {
    // Current NAV_LINKS should match the header specification
    expect(NAVIGATION.header).toHaveLength(4);

    const hrefs = NAVIGATION.header.map((l: { href: string }) => l.href);
    expect(hrefs).toContain('/');
    expect(hrefs).toContain('/sobre');
    expect(hrefs).toContain('/portfolio');
    expect(hrefs).toContain('#contact');
  });

  it('exposes the expected footer links matching the config', () => {
    expect(NAVIGATION.footer.links).toHaveLength(5);
    const footerHrefs = NAVIGATION.footer.links.map(
      (l: { href: string }) => l.href
    );
    expect(footerHrefs).toContain('#hero');
    expect(footerHrefs).toContain('/sobre');
    expect(footerHrefs).toContain('/portfolio');
    expect(footerHrefs).toContain('/contato');
    expect(footerHrefs).toContain('/privacidade');
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
