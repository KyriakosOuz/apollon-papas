import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer" data-screen-label="Footer" data-edit-section="footer">
      <div className="footer-inner">
        <span className="footer-copy" data-edit-id="footer.legal.copyright" data-edit-key="footer.rights">{t('footer.rights')}</span>
        <div className="footer-links">
          <a href="#" data-edit-id="footer.legal.privacy" data-edit-key="footer.privacy">{t('footer.privacy')}</a>
          <a href="#" data-edit-id="footer.legal.terms" data-edit-key="footer.terms">{t('footer.terms')}</a>
        </div>
      </div>
    </footer>
  );
}
