import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

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
    <nav className={'nav js-nav' + (scrolled ? ' scrolled' : '')}>
      <div className="nav-inner">
        <a className="nav-logo display-font" href="#">{t('nav.name')}</a>
        <div className="nav-links">
          <a href="#sxetika">{t('nav.about')}</a>
          <a href="#diadromi">{t('nav.journey')}</a>
          <a href="#programmata">{t('nav.programs')}</a>
        </div>
        <div className="nav-right">
          <div className="lang-toggle" role="group" aria-label="Language">
            <button type="button" className={lang === 'el' ? 'active' : ''} onClick={() => i18n.changeLanguage('el')}>EL</button>
            <button type="button" className={lang === 'en' ? 'active' : ''} onClick={() => i18n.changeLanguage('en')}>EN</button>
          </div>
          <a className="btn btn-primary btn-sm nav-cta" href="#epikoinonia">{t('nav.contact')}</a>
        </div>
      </div>
    </nav>
  );
}
