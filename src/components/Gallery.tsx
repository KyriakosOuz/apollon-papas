import { useTranslation } from 'react-i18next';
import { GALLERY } from '../config';

// Scattered snapshot wall. Sits between the Journey heading and the timeline as
// a visual overture: the photos are the evidence, the timeline is the account.
// Rotations and offsets are fixed per photo rather than random so the
// composition is the same on every load.
export default function Gallery() {
  const { t } = useTranslation();
  const alts = t('journey.galleryAlts', { returnObjects: true }) as string[];

  return (
    <div className="gallery" data-reveal="" data-edit-id="home.journey.gallery">
      <div className="gallery-scatter">
        {GALLERY.map((g, i) => (
          <figure
            className="gallery-shot"
            key={g.src}
            style={{ '--rot': g.rot, '--lift': g.lift, '--w': g.w, zIndex: g.z } as React.CSSProperties}
          >
            <img
              src={g.src}
              alt={alts[i] ?? ''}
              style={{ objectPosition: g.focus }}
              loading="lazy"
              decoding="async"
              data-edit-id={`home.journey.gallery-${i + 1}`}
              data-edit-key={`journey.galleryAlts.{i}`}
              data-edit-type="image"
            />
          </figure>
        ))}
      </div>
    </div>
  );
}
