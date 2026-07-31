import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SITE } from '../config';

export default function Nav() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const lang = i18n.language;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={'nav js-nav' + (scrolled ? ' scrolled' : '')} data-edit-section="nav">
      <div className="nav-inner">
        <a className="nav-logo display-font" href="#" data-edit-id="nav.brand.name" data-edit-key="nav.name">{t('nav.name')}</a>
        <div className="nav-links">
          <a href="#sxetika" data-edit-id="nav.links.about" data-edit-key="nav.about">{t('nav.about')}</a>
          <a href="#diadromi" data-edit-id="nav.links.journey" data-edit-key="nav.journey">{t('nav.journey')}</a>
          <a href="#programmata" data-edit-id="nav.links.programs" data-edit-key="nav.programs">{t('nav.programs')}</a>
        </div>
        <div className="nav-right">
          {/* Greek is paused, not removed: flip SITE.showLangToggle to bring it back. */}
          {SITE.showLangToggle ? (
            <div className="lang-toggle" role="group" aria-label="Language">
              <button type="button" className={lang === 'el' ? 'active' : ''} onClick={() => i18n.changeLanguage('el')} data-edit-id="nav.lang.el">EL</button>
              <button type="button" className={lang === 'en' ? 'active' : ''} onClick={() => i18n.changeLanguage('en')} data-edit-id="nav.lang.en">EN</button>
            </div>
          ) : null}
          <a className="btn btn-ghost btn-sm nav-cta" href="#epikoinonia" data-edit-id="nav.cta.contact" data-edit-key="nav.contact">{t('nav.contact')}</a>
        </div>
      </div>
    </nav>
  );
}
