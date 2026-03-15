import { render } from '@testing-library/react';
import JsonLd from '@/components/ui/JsonLd';
import { BRAND } from '@/config/brand';

// Mock getCanonicalSiteUrl to avoid window dependency in tests
jest.mock('@/lib/seo', () => ({
  ...jest.requireActual('@/lib/seo'),
  getCanonicalSiteUrl: () => `https://${BRAND.domain}`,
}));

describe('JsonLd Component', () => {
  it('should render the Person schema by default', () => {
    const { container } = render(<JsonLd pageType="home" />);
    const script = container.querySelector(
      'script[type="application/ld+json"]'
    );
    expect(script).toBeDefined();

    if (script) {
      const data = JSON.parse(script.innerHTML);
      const person = data['@graph'].find(
        (item: any) => item['@type'] === 'Person'
      );
      expect(person).toBeDefined();
      expect(person.name).toBe(BRAND.name);
      expect(person.jobTitle).toContain('Head de Criação');
    }
  });

  it('should include CollectionPage for home page', () => {
    const { container } = render(<JsonLd pageType="home" />);
    const scripts = container.querySelectorAll(
      'script[type="application/ld+json"]'
    );

    let foundCollection = false;
    scripts.forEach((script) => {
      const data = JSON.parse(script.innerHTML);
      const collection = data['@graph']?.find(
        (item: any) => item['@type'] === 'CollectionPage'
      );
      if (collection) {
        foundCollection = true;
      }
    });
    expect(foundCollection).toBe(true);
  });
});
