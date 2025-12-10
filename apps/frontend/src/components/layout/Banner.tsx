import { sectionIds, siteJson, SiteSchema } from '@jpx/shared';

import useLocalized, { useLocalizedArray } from '../../hooks/useLocalized';
import { parseRequired, warnIfMissing } from '../../utils';

import styles from './Banner.module.css';

const Banner: React.FC = () => {
  const localize = useLocalized();
  const localizeArray = useLocalizedArray();

  const { sections, images } = parseRequired(SiteSchema, siteJson, 'Site');

  const bannerSection = sections.find((s) => s.id === sectionIds.banner);
  warnIfMissing(bannerSection, 'Banner section missing', 'NOT_FOUND');

  const adjectives = localizeArray(bannerSection?.adjectives);
  const soloImage = images.find((img) => img.id === 'solo');
  const soloPortraitImage = images.find((img) => img.id === 'solo-portrait');
  const src = soloImage?.src ?? '';
  const soloPortraitSrc = soloPortraitImage?.src ?? '';
  const alt = localize(soloImage?.alt);

  warnIfMissing(soloImage?.src, 'Solo image source missing', 'NOT_FOUND');
  warnIfMissing(
    soloPortraitImage?.src,
    'Solo portrait image source missing',
    'NOT_FOUND'
  );
  warnIfMissing(alt, 'Solo image alt text missing', 'NOT_FOUND');

  return (
    <section id={sectionIds.top} className={styles.banner}>
      <picture>
        <source
          srcSet={soloPortraitSrc}
          media="(orientation: portrait) and (max-width: 560px)"
        />
        <img src={src} alt={alt} className={styles.bannerImg} />
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
