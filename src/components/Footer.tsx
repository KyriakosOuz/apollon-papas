import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer" data-screen-label="Footer">
      <div className="footer-inner">
        <span className="footer-copy">{t('footer.rights')}</span>
        <div className="footer-links">
          <a href="#">{t('footer.privacy')}</a>
          <a href="#">{t('footer.terms')}</a>
        </div>
      </div>
    </footer>
  );
}
