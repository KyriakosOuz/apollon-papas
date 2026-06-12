import { useTranslation } from 'react-i18next';
import { SITE } from '../config';

export default function Programs() {
  const { t } = useTranslation();

  return (
    <section className="section" id="programmata" data-screen-label="Programs">
      <h2 className="display-l display-font" data-reveal="">{t('programs.title')}</h2>
      <div className="products-grid">
        <a className="product-card" data-reveal="" href={SITE.crsPath}>
          <img
            className="product-mockup"
            src="/images/crs-banner-16x9-dark.png"
            alt={t('programs.crsTitle')}
          />
          <div className="product-head">
            <h3 className="product-title">{t('programs.crsTitle')}</h3>
            <span className="product-arrow" aria-hidden="true">↗</span>
          </div>
          <p className="product-desc">{t('programs.crsDesc')}</p>
          <span className="chip chip-live">{t('programs.live')}</span>
        </a>
        <div className="product-card product-ghost" data-reveal="">
          <span className="chip">{t('programs.soon')}</span>
        </div>
      </div>
    </section>
  );
}
