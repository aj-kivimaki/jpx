import { sectionIds, site, makeError, logger } from '@jpx/shared';
import useLocalized, { useLocalizedArray } from '../../hooks/useLocalized';
import styles from './Banner.module.css';

const Banner: React.FC = () => {
  const { sections, images } = site;
  const localize = useLocalized();
  const localizeArray = useLocalizedArray();

  const bannerSection = sections.find((s) => s.id === 'banner');
  if (!bannerSection) {
    const err = makeError(
      'Banner section not found in site configuration',
      'NOT_FOUND'
    );
    err.__logged = true;
    logger.error(err);
    return null;
  }

  const adjectives = localizeArray(bannerSection.adjectives);

  const soloImage = images.find((img) => img.id === 'solo');
  const soloPortraitImage = images.find((img) => img.id === 'solo-portrait');

  if (!soloImage) {
    const err = makeError('Solo image not found', 'NOT_FOUND');
    err.__logged = true;
    logger.error(err);
  }

  if (!soloPortraitImage) {
    const err = makeError('Solo portrait image not found', 'NOT_FOUND');
    err.__logged = true;
    logger.error(err);
  }

  const src = soloImage?.src ?? '';
  const soloPortraitSrc = soloPortraitImage?.src ?? '';
  const alt = localize(soloImage?.alt);

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
