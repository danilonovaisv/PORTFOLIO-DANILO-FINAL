import { Z_INDEX } from '@/constants/z-indices';

describe('Z_INDEX Constants Governance', () => {
  it('should define all canonical Ghost System layers with expected values', () => {
    expect(Z_INDEX.base).toBe(0);
    expect(Z_INDEX.glass).toBe(10);
    expect(Z_INDEX.content).toBe(20);
    expect(Z_INDEX['3d']).toBe(30);
    expect(Z_INDEX.cta).toBe(40);
    expect(Z_INDEX.overlay).toBe(50);
    expect(Z_INDEX.header).toBe(55);
    expect(Z_INDEX.mobileText).toBe(60);
    expect(Z_INDEX.lightbox).toBe(70);
    expect(Z_INDEX.mobileHeader).toBe(80);
    expect(Z_INDEX.mobilePre).toBe(85);
    expect(Z_INDEX.mobileMenu).toBe(90);
    expect(Z_INDEX.mobileMenuControl).toBe(92);
    expect(Z_INDEX.modalScrim).toBe(95);
    expect(Z_INDEX.modal).toBe(100);
    expect(Z_INDEX.modalClose).toBe(105);
    expect(Z_INDEX.cursor).toBe(110);
    expect(Z_INDEX.preloader).toBe(1000);
    expect(Z_INDEX.skipLink).toBe(1300);
    expect(Z_INDEX.debugTop).toBe(9999);
  });

  it('should guarantee that modals and scrims are layered above the header and 3D scenes', () => {
    expect(Z_INDEX.modal).toBeGreaterThan(Z_INDEX.header);
    expect(Z_INDEX.modal).toBeGreaterThan(Z_INDEX['3d']);
    expect(Z_INDEX.modalClose).toBeGreaterThan(Z_INDEX.modal);
  });

  it('should guarantee that skipLink is higher than preloader and modal', () => {
    expect(Z_INDEX.skipLink).toBeGreaterThan(Z_INDEX.preloader);
    expect(Z_INDEX.skipLink).toBeGreaterThan(Z_INDEX.modalClose);
  });
});

