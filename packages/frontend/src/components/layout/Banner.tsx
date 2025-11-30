import { sectionIds, site } from 'shared';
import useLocalized, { useLocalizedArray } from '../../hooks/useLocalized';
import styles from './Banner.module.css';

const Banner: React.FC = () => {
  const { sections, images } = site;
  const localize = useLocalized();
  const localizeArray = useLocalizedArray();

  const bannerSection = sections.find((s) => s.id === 'banner');
  const adjectives = localizeArray(bannerSection?.adjectives);
  const soloImage = images.find((img) => img.id === 'solo');
  const src = soloImage?.src ?? '';
  const alt = localize(soloImage?.alt);

  return (
    <div id={sectionIds.top} className={styles.banner}>
      <img src={src} alt={alt} className={styles.bannerImg} />
      <div className={styles.overlay}>
        <div className={styles.adjectives}>
          {adjectives.map((adj: string) => (
            <div key={adj} className={styles.adjective}>
              {adj}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
