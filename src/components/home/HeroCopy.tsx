import { CTAButton } from '@/components/ui/CTAButton';
import styles from './HeroCopy.module.css';

type CopyVariant = 'base' | 'highlight';

function CopyContent({
  variant,
  showCta,
}: {
  variant: CopyVariant;
  showCta: boolean;
}) {
  const isBase = variant === 'base';

  return (
    <div className="flex flex-col items-center text-center space-y-12">
      {/* Tag */}
      <span
        className={`font-mono text-[12px] uppercase tracking-[0.4em] ${
          isBase ? styles.tag : 'text-white'
        }`}
      >
        [BRAND AWARENESS]
      </span>

      {/* Main Headlines */}
      <div className="flex flex-col items-center leading-none">
        <h1
          className={`text-[clamp(5rem,12vw,8rem)] font-black tracking-tight ${
            isBase ? styles.baseText : styles.maskText
          }`}
        >
          Você não vê <br /> o design.
        </h1>
        <h2
          className={`text-[clamp(4rem,10vw,6rem)] font-black tracking-tight mt-4 ${
            isBase ? styles.subText : styles.maskText
          }`}
        >
          Mas ele vê você.
        </h2>
      </div>

      {/* CTA Button */}
      {showCta ? (
        <div className="pt-8">
          <CTAButton href="/sobre" variant="primary">
            step inside
          </CTAButton>
        </div>
      ) : (
        <div className={styles.ctaSpacer} aria-hidden />
      )}
    </div>
  );
}

export function HeroCopy() {
  const maskStyle = {
    clipPath:
      'circle(var(--ghost-radius, 240px) at var(--ghost-x, 50vw) var(--ghost-y, 50vh))',
    WebkitClipPath:
      'circle(var(--ghost-radius, 240px) at var(--ghost-x, 50vw) var(--ghost-y, 50vh))',
  } as const;

  return (
    <div className={styles.root}>
      <CopyContent variant="base" showCta />

      <div className={styles.maskLayer} style={maskStyle} aria-hidden>
        <CopyContent variant="highlight" showCta={false} />
      </div>
    </div>
  );
}

export default HeroCopy;
