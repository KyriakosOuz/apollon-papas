import { useTranslation } from 'react-i18next';

interface JourneyItem {
  year: string;
  title: string;
  body: string;
}

export default function Journey() {
  const { t } = useTranslation();
  const items = t('journey.items', { returnObjects: true }) as JourneyItem[];

  return (
    <section className="section" id="diadromi" data-screen-label="Journey">
      <h2 className="display-l display-font" data-reveal="">{t('journey.title')}</h2>
      <div className="journey-list">
        <div className="journey-progress js-journey-progress" aria-hidden="true"></div>
        {items.map((j, i) => (
          <article className="journey-item" data-reveal="" key={i}>
            <span className="journey-year">{j.year}</span>
            <h3 className="journey-title">{j.title}</h3>
            <p className="journey-body">{j.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
