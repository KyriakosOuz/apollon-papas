import { useTranslation } from 'react-i18next';
import { SITE } from '../config';

export default function Contact() {
  const { t } = useTranslation();

  return (
    <section className="section contact" id="epikoinonia" data-screen-label="Contact" data-edit-section="contact">
      <div className="aurora-wrap contact-aurora" aria-hidden="true">
        <div className="aurora-blob b-gold"></div>
        <div className="aurora-blob b-orange"></div>
        <div className="aurora-grain"></div>
      </div>
      <div className="contact-inner" data-reveal="">
        <span className="label contact-label" data-edit-id="home.contact.label" data-edit-key="contact.title">{t('contact.title')}</span>
        <h2 className="contact-heading display-l display-font" data-edit-id="home.contact.heading" data-edit-key="contact.heading">{t('contact.heading')}</h2>
        <div className="contact-actions">
          {/* Falls back to the contact anchor until SITE.calendlyUrl is set, so it never dead-links. */}
          <a className="btn btn-primary" href={SITE.calendlyUrl || '#epikoinonia'} target={SITE.calendlyUrl ? '_blank' : undefined} rel={SITE.calendlyUrl ? 'noopener noreferrer' : undefined} data-edit-id="home.contact.book" data-edit-key="contact.book">{t('contact.book')}</a>
          <a className="btn btn-ghost" href={SITE.linkedinUrl} target="_blank" rel="noopener noreferrer" data-edit-id="home.contact.linkedin" data-edit-key="contact.linkedin">{t('contact.linkedin')}</a>
        </div>
        {/* Email is not locale-scoped: it lives in SITE (src/config.ts) and also feeds the mailto href */}
        <a className="contact-email" href={'mailto:' + SITE.email} data-edit-id="home.contact.email" data-edit-key="SITE.email" data-edit-source="src/config.ts">{SITE.email}</a>
      </div>
    </section>
  );
}
