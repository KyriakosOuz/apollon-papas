import { useTranslation } from 'react-i18next';
import { SITE } from '../config';

export default function Programs() {
  const { t } = useTranslation();

  return (
    <section className="section" id="programmata" data-screen-label="Programs" data-edit-section="programs">
      <h2 className="display-l display-font" data-reveal="" data-edit-id="home.programs.title" data-edit-key="programs.title">{t('programs.title')}</h2>
      <div className="products-grid">
        <a className="product-card" data-reveal="" href={SITE.crsPath}>
          {/* alt shares programs.crsTitle with the product-title below: editing either rewrites both */}
          <img
            className="product-mockup"
            src="/images/crs-banner-16x9-dark.png"
            alt={t('programs.crsTitle')}
            data-edit-id="home.programs.crs-image"
            data-edit-key="programs.crsTitle"
            data-edit-type="image"
          />
          <div className="product-head">
            <h3 className="product-title" data-edit-id="home.programs.crs-title" data-edit-key="programs.crsTitle">{t('programs.crsTitle')}</h3>
            <span className="product-arrow" aria-hidden="true" data-edit-id="home.programs.crs-arrow" data-edit-source="src/components/Programs.tsx">↗</span>
          </div>
          <p className="product-desc" data-edit-id="home.programs.crs-desc" data-edit-key="programs.crsDesc">{t('programs.crsDesc')}</p>
          <span className="chip chip-live" data-edit-id="home.programs.crs-badge-live" data-edit-key="programs.live">{t('programs.live')}</span>
        </a>
        <div className="product-card product-ghost" data-reveal="">
          <span className="chip" data-edit-id="home.programs.soon-badge" data-edit-key="programs.soon">{t('programs.soon')}</span>
        </div>
      </div>
    </section>
  );
}
