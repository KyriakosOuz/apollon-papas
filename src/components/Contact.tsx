import { useTranslation } from 'react-i18next';
import { SITE } from '../config';

export default function Contact() {
  const { t } = useTranslation();

  return (
    <section className="section contact" id="epikoinonia" data-screen-label="Contact">
      <div className="aurora-wrap contact-aurora" aria-hidden="true">
        <div className="aurora-blob b-gold"></div>
        <div className="aurora-blob b-orange"></div>
        <div className="aurora-grain"></div>
      </div>
      <div className="contact-inner" data-reveal="">
        <span className="label contact-label">{t('contact.title')}</span>
        <a className="contact-email display-xl display-font" href={'mailto:' + SITE.email}>{SITE.email}</a>
        <div className="contact-actions">
          <a className="btn btn-ghost" href={SITE.linkedinUrl} target="_blank" rel="noopener noreferrer">{t('contact.linkedin')}</a>
        </div>
      </div>
    </section>
  );
}
