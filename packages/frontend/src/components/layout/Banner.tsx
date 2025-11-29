import { useTranslation } from 'react-i18next';
import { sectionIds, site, getLang } from 'shared';
import styles from './Banner.module.css';

const Banner: React.FC = () => {
  const { i18n } = useTranslation();

  const lang = getLang(i18n);
  const { sections, images } = site;

  const bannerSection = sections.find((s) => s.id === 'banner');
  const adjectives = bannerSection?.adjectives?.[lang] ?? [];
  const soloImage = images.find((img) => img.id === 'solo');
  const src = soloImage?.src ?? '';
  const alt = soloImage?.alt?.[lang] ?? soloImage?.alt?.fi ?? '';

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
