import { sectionIds, siteJson, SiteSchema } from '@jpx/shared';

import { useLocalized, useLocalizedArray } from '../../hooks';
import { errorIfMissing, parseRequired, warnIfMissing } from '../../utils';

import styles from './Banner.module.css';

const Banner: React.FC = () => {
  const localize = useLocalized();
  const localizeArray = useLocalizedArray();

  const { sections, images } = parseRequired(SiteSchema, siteJson, 'Site');

  const bannerSection = errorIfMissing(
    sections.find((s) => s.id === sectionIds.banner),
    'Banner section'
  );
  const soloImage = errorIfMissing(
    images.find((i) => i.id === 'solo'),
    'Solo image'
  );
  const soloPortraitImage = errorIfMissing(
    images.find((i) => i.id === 'solo-portrait'),
    'Solo portrait image'
  );
  const soloImageSrc = errorIfMissing(soloImage.src, 'Solo image source');
  const soloPortraitSrc = errorIfMissing(
    soloPortraitImage.src,
    'Solo portrait image source'
  );

  const localizedAlt = localize(
    warnIfMissing(soloImage.alt, 'Solo image alt text') ?? {
      fi: '',
      en: '',
    }
  );
  const adjectives =
    warnIfMissing(
      localizeArray(bannerSection.adjectives),
      'Banner adjectives'
    ) ?? [];

  return (
    <section id={sectionIds.top} className={styles.banner}>
      <picture>
        <source
          srcSet={soloPortraitSrc}
          media="(orientation: portrait) and (max-width: 560px)"
        />
        <img
          src={soloImageSrc}
          alt={localizedAlt}
          className={styles.bannerImg}
        />
      </picture>
      <div className={styles.overlay}>
        <div className={styles.adjectives}>
          {adjectives.map((adj: string) => (
            <div key={adj} className={styles.adjective}>
              {adj}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;
