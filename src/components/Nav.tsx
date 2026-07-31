import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SITE } from '../config';
import { sectionHref, type Route } from '../router';

// Matches the width where the CSS swaps the inline links for the menu button.
const MOBILE = '(max-width: 720px)';

export default function Nav({ route }: { route: Route }) {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lang = i18n.language;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close on Escape, on a tap anywhere outside the bar, and on growing past the
  // breakpoint: the button that opened the panel is gone at that width, so an
  // open panel would otherwise have no way out.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement | null)?.closest?.('.nav')) setOpen(false);
    };
    const mq = window.matchMedia(MOBILE);
    const onChange = () => {
      if (!mq.matches) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onOutside);
    mq.addEventListener('change', onChange);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onOutside);
      mq.removeEventListener('change', onChange);
    };
  }, [open]);

  // The panel outlives the page it was opened on, so a navigation closes it.
  useEffect(() => setOpen(false), [route]);

  // The panel repeats the same three links. Only the bar copy carries the
  // data-edit-* attributes, so the Overlay CMS sees one target per key rather
  // than two nodes fighting over the same one.
  const links = (edit: boolean) => (
    <>
      {/* About is its own page now; the rest are sections of the home page, so
          off / they need the path in front of the hash. */}
      <a
        href="/about"
        className={route === '/about' ? 'active' : ''}
        {...(edit ? { 'data-edit-id': 'nav.links.about', 'data-edit-key': 'nav.about' } : {})}
      >
        {t('nav.about')}
      </a>
      <a
        href={sectionHref(route, 'diadromi')}
        {...(edit ? { 'data-edit-id': 'nav.links.journey', 'data-edit-key': 'nav.journey' } : {})}
      >
        {t('nav.journey')}
      </a>
      <a
        href={sectionHref(route, 'programmata')}
        {...(edit ? { 'data-edit-id': 'nav.links.programs', 'data-edit-key': 'nav.programs' } : {})}
      >
        {t('nav.programs')}
      </a>
    </>
  );

  return (
    <nav className={'nav js-nav' + (scrolled || open ? ' scrolled' : '')} data-edit-section="nav">
      <div className="nav-inner">
        <a className="nav-logo display-font" href="/" data-edit-id="nav.brand.name" data-edit-key="nav.name">{t('nav.name')}</a>
        <div className="nav-links">{links(true)}</div>
        <div className="nav-right">
          {/* Greek is paused, not removed: flip SITE.showLangToggle to bring it back. */}
          {SITE.showLangToggle ? (
            <div className="lang-toggle" role="group" aria-label="Language">
              <button type="button" className={lang === 'el' ? 'active' : ''} onClick={() => i18n.changeLanguage('el')} data-edit-id="nav.lang.el">EL</button>
              <button type="button" className={lang === 'en' ? 'active' : ''} onClick={() => i18n.changeLanguage('en')} data-edit-id="nav.lang.en">EN</button>
            </div>
          ) : null}
          <a className="btn btn-ghost btn-sm nav-cta" href={sectionHref(route, 'epikoinonia')} data-edit-id="nav.cta.contact" data-edit-key="nav.contact">{t('nav.contact')}</a>
          <button
            type="button"
            className={'nav-toggle' + (open ? ' open' : '')}
            aria-expanded={open}
            aria-controls="nav-panel"
            aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* `hidden` rather than a slide-down: it keeps the panel out of the tab
          order and the accessibility tree while closed, which a height
          transition would need extra work to match. */}
      <div className="nav-panel" id="nav-panel" hidden={!open}>
        {/* Every link either navigates or scrolls away, so the panel closes
            behind any tap inside it. */}
        <div className="nav-panel-inner" onClick={() => setOpen(false)}>
          {links(false)}
          <a className="btn btn-ghost nav-panel-cta" href={sectionHref(route, 'epikoinonia')}>{t('nav.contact')}</a>
        </div>
      </div>
    </nav>
  );
}
