import React from 'react';
import styles from './Banner.module.css';
import { sectionIds } from 'shared/config/sectionIds';
import { images, sections } from 'shared/data/site.json';
import { useTranslation } from 'react-i18next';

interface Section {
  id: string;
  adjectives?: { [lang: string]: string[] };
}

interface Image {
  id: string;
  src: string;
  alt: { [lang: string]: string };
}

const Banner: React.FC = () => {
  const { i18n } = useTranslation();

  // sections and images are typed as arrays of Section/Image
  const bannerSection = (sections as Section[]).find((s) => s.id === 'banner');
  const adjectives = bannerSection?.adjectives?.[i18n.language] ?? [];

  const soloImage = (images as Image[]).find((img) => img.id === 'solo');
  const src = soloImage?.src ?? '';
  const alt = soloImage?.alt?.[i18n.language] ?? soloImage?.alt?.['fi'] ?? '';

  return (
    <div id={sectionIds.top} className={styles.banner}>
      <img src={src} alt={alt} className={styles.bannerImg} />
      <div className={styles.overlay}>
        <div className={styles.adjectives}>
          {adjectives.map((adj, index) => (
            <div key={index} className={styles.adjective}>
              {adj}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
