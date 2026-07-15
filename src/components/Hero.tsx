import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SITE, AURORA_PALETTE, TOKEN_TEXT, TOKEN_DIM, TOKEN_FAINT, TRUSTED_LOGOS } from '../config';
import { prefersReducedMotion } from '../hooks/useScrollMotion';

function Aurora() {
  return (
    <div className="aurora-wrap js-aurora" aria-hidden="true">
      <div className="aurora-blob b-gold"></div>
      <div className="aurora-blob b-orange"></div>
      <div className="aurora-blob b-magenta"></div>
      <div className="aurora-blob b-blue"></div>
      <div className="aurora-blob b-teal"></div>
      <div className="aurora-grain"></div>
    </div>
  );
}

// Logo alt text lives in TRUSTED_LOGOS (src/config.ts), not the locale files, so
// the call site overrides the inherited data-edit-source.
function LogoSet({
  hidden = false,
  editId,
  editKey,
  editSource,
}: {
  hidden?: boolean;
  editId?: string;
  editKey?: string;
  editSource?: string;
}) {
  return (
    <div className="trusted-set" aria-hidden={hidden ? 'true' : undefined}>
      {TRUSTED_LOGOS.map((l, i) => (
        <img
          key={i}
          className={('trusted-logo ' + l.cls).trim()}
          src={l.src}
          alt={hidden ? '' : l.alt}
          data-edit-id={editId}
          data-edit-key={editKey}
          data-edit-source={editSource}
          data-edit-type={editId ? 'image' : undefined}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const { t, i18n } = useTranslation();
  const words = t('hero.headTail').split(' ');
  const tailColor = SITE.tailEnd === 'white' ? 'var(--text)' : 'var(--text-dim)';

  // Orchestrated hero load + ambient aurora drift and color cycling.
  // Skipped under reduced motion: base CSS is the final visible state,
  // so nothing is ever hidden.
  useGSAP(() => {
    if (prefersReducedMotion()) return;

    const wordEls = gsap.utils.toArray<HTMLElement>('.js-headline .tw');
    const endHex = SITE.tailEnd === 'white' ? TOKEN_TEXT : TOKEN_DIM;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.7 } });
    tl.from('.js-aurora', { opacity: 0, duration: 1.8, ease: 'power2.out' }, 0)
      .from('.js-nav', { y: -14, opacity: 0 }, 0.05)
      .from('.js-eyebrow', { y: 18, opacity: 0 }, 0.1)
      .from('.js-headline .head-line', { y: 36, opacity: 0, duration: 0.85, stagger: 0.14 }, 0.22)
      .from('.js-sub', { y: 18, opacity: 0 }, 0.6)
      .from('.js-ctas .btn', { y: 14, opacity: 0, stagger: 0.08 }, 0.74)
      .from('.js-trusted', { y: 12, opacity: 0 }, 0.9);

    // Tail reveal: a white fill front sweeps word by word, then settles
    if (wordEls.length) {
      tl.set(wordEls, { color: TOKEN_FAINT }, 0)
        .to(wordEls, { color: TOKEN_TEXT, duration: 0.28, ease: 'none', stagger: 0.055 }, 0.62)
        .to(wordEls, { color: endHex, duration: 0.6, ease: 'power1.out', stagger: 0.055 }, 1.0);
    }

    // Ambient flow: blobs travel side to side across the band, plus a slow
    // sway of the whole wrap so the color field visibly migrates
    gsap.to('.hero .js-aurora', { xPercent: 7, duration: 26, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.hero .b-gold', { xPercent: 40, yPercent: 12, scale: 1.12, duration: 18, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.hero .b-orange', { xPercent: -44, yPercent: -9, scale: 1.16, duration: 21, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.hero .b-magenta', { xPercent: -36, yPercent: 13, scale: 1.09, duration: 17, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.hero .b-blue', { xPercent: 40, yPercent: -12, scale: 1.14, duration: 23, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.hero .b-teal', { xPercent: 38, yPercent: -14, scale: 1.08, duration: 19, repeat: -1, yoyo: true, ease: 'sine.inOut' });

    // Color cycling: each blob slowly walks through the aurora palette (offset
    // per blob so the composition always holds all five hues, just in motion)
    gsap.utils.toArray<HTMLElement>('.hero .aurora-blob').forEach((blob, i) => {
      const cycle = gsap.timeline({ repeat: -1 });
      for (let k = 1; k <= AURORA_PALETTE.length; k++) {
        cycle.to(blob, {
          '--c': AURORA_PALETTE[(i + k) % AURORA_PALETTE.length],
          duration: 6,
          ease: 'sine.inOut',
        });
      }
    });
  }, []);

  return (
    <header className="hero" data-screen-label="Hero" data-edit-section="hero">
      <Aurora />
      <div className="hero-inner">
        <div className="eyebrow label js-eyebrow">
          <span className="dot"></span>
          <span data-edit-id="home.hero.eyebrow" data-edit-key="hero.eyebrow">{t('hero.eyebrow')}</span>
        </div>

        <h1 className="display-xl display-font js-headline">
          <span className="head-line" data-edit-id="home.hero.headline-lead" data-edit-key="hero.headLead">
            {t('hero.headLead')}
            <span className={'gold-dot' + (SITE.goldDot ? '' : ' off')} data-edit-id="home.hero.headline-dot" data-edit-source="src/components/Hero.tsx">.</span>
          </span>
          <span className="head-line head-tail" style={{ color: tailColor }} data-edit-id="home.hero.headline-tail" data-edit-key="hero.headTail">
            {words.map((w, i) => (
              <Fragment key={i18n.language + '-' + i}>
                <span className="tw">{w}</span>
                {i < words.length - 1 ? ' ' : ''}
              </Fragment>
            ))}
          </span>
        </h1>

        <p className="hero-sub body-l js-sub" data-edit-id="home.hero.sub" data-edit-key="hero.sub">{t('hero.sub')}</p>

        <div className="ctas js-ctas">
          <a className="btn btn-primary" href="#programmata" data-edit-id="home.hero.cta-primary" data-edit-key="hero.ctaPrimary">{t('hero.ctaPrimary')}</a>
          <a className="btn btn-ghost" href="#epikoinonia" data-edit-id="home.hero.cta-secondary" data-edit-key="hero.ctaSecondary">{t('hero.ctaSecondary')}</a>
        </div>

        <div className="trusted js-trusted">
          <span className="trusted-label label" data-edit-id="home.hero.trusted-label" data-edit-key="hero.trusted">{t('hero.trusted')}</span>
          <div className="trusted-slots">
            <div className="trusted-track">
              <LogoSet
                editId="home.hero.trusted-logo"
                editKey="TRUSTED_LOGOS.{i}.alt"
                editSource="src/config.ts"
              />
              <LogoSet hidden />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
