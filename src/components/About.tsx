import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { SITE } from '../config';
import { fmtStat, prefersReducedMotion } from '../hooks/useScrollMotion';

interface Stat {
  n: number;
  suffix: string;
  label: string;
}

export default function About() {
  const { t } = useTranslation();
  const stats = t('about.stats', { returnObjects: true }) as Stat[];
  const portraitRef = useRef<HTMLDivElement>(null);

  // Portrait pointer effect (Tilt by default; see SITE.portraitEffect)
  useEffect(() => {
    const portrait = portraitRef.current;
    const fine = window.matchMedia('(pointer: fine)').matches;
    const effect = SITE.portraitEffect;
    if (!portrait || prefersReducedMotion() || !fine || effect === 'None') return;

    let onMove: ((e: PointerEvent) => void) | null = null;
    let onLeave: (() => void) | null = null;

    if (effect === 'Spotlight') {
      onMove = (e) => {
        const r = portrait.getBoundingClientRect();
        portrait.style.setProperty('--mx', (((e.clientX - r.left) / r.width) * 100).toFixed(2) + '%');
        portrait.style.setProperty('--my', (((e.clientY - r.top) / r.height) * 100).toFixed(2) + '%');
      };
      portrait.addEventListener('pointermove', onMove);
    } else if (effect === 'Tilt') {
      gsap.set(portrait, { transformPerspective: 700 });
      const rx = gsap.quickTo(portrait, 'rotationX', { duration: 0.45, ease: 'power2.out' });
      const ry = gsap.quickTo(portrait, 'rotationY', { duration: 0.45, ease: 'power2.out' });
      onMove = (e) => {
        const r = portrait.getBoundingClientRect();
        const dx = (e.clientX - r.left) / r.width - 0.5;
        const dy = (e.clientY - r.top) / r.height - 0.5;
        ry(dx * 9);
        rx(dy * -9);
        portrait.style.setProperty('--mx', ((dx + 0.5) * 100).toFixed(2) + '%');
      };
      onLeave = () => {
        rx(0);
        ry(0);
      };
      portrait.addEventListener('pointermove', onMove);
      portrait.addEventListener('pointerleave', onLeave);
    }

    return () => {
      if (onMove) portrait.removeEventListener('pointermove', onMove);
      if (onLeave) portrait.removeEventListener('pointerleave', onLeave);
      gsap.set(portrait, { clearProps: 'transform' });
    };
  }, []);

  return (
    <section className="section" id="sxetika" data-screen-label="About">
      <h2 className="display-l display-font" data-reveal="">{t('about.title')}</h2>
      <div className="about-card" data-reveal="">
        <div className="about-left">
          <div className="about-role">
            <img className="gya-logo" src="/assets/logos/gya-media-white.png" alt="GYA Media" />
            <span className="label role-label">{t('about.role')}</span>
            <span className="company display-font">{t('about.company')}</span>
          </div>
          <p className="about-bio">{t('about.bio')}</p>
          <a className="btn btn-ghost btn-sm" href="#epikoinonia">{t('about.cta')}</a>
        </div>
        <div className="portrait" data-effect={SITE.portraitEffect} ref={portraitRef}>
          <img className="base" src="/images/apollo.webp" alt={t('about.portraitAlt')} />
          <img className="reveal" src="/images/apollo.webp" alt="" aria-hidden="true" />
          <div className="sheen" aria-hidden="true"></div>
        </div>
        <div className="about-stats">
          {stats.map((st, i) => (
            <div className="stat" key={i}>
              <span className="stat-num display-font" data-count={st.n} data-suffix={st.suffix}>
                {fmtStat(st.n) + st.suffix}
              </span>
              <span className="stat-label">{st.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
