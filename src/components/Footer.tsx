import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer" data-screen-label="Footer" data-edit-section="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-name display-font" data-edit-id="footer.brand.name" data-edit-key="nav.name">{t('nav.name')}</span>
          <span className="footer-tagline" data-edit-id="footer.brand.tagline" data-edit-key="footer.tagline">{t('footer.tagline')}</span>
        </div>
        <nav className="footer-nav" aria-label="Footer">
          <a href="#sxetika" data-edit-id="footer.nav.about" data-edit-key="nav.about">{t('nav.about')}</a>
          <a href="#diadromi" data-edit-id="footer.nav.journey" data-edit-key="nav.journey">{t('nav.journey')}</a>
          <a href="#programmata" data-edit-id="footer.nav.programs" data-edit-key="nav.programs">{t('nav.programs')}</a>
          <a href="#epikoinonia" data-edit-id="footer.nav.contact" data-edit-key="nav.contact">{t('nav.contact')}</a>
        </nav>
        <div className="footer-legal">
          <span className="footer-copy" data-edit-id="footer.legal.copyright" data-edit-key="footer.rights">{t('footer.rights')}</span>
          <div className="footer-links">
            <a href="#" data-edit-id="footer.legal.privacy" data-edit-key="footer.privacy">{t('footer.privacy')}</a>
            <a href="#" data-edit-id="footer.legal.terms" data-edit-key="footer.terms">{t('footer.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
