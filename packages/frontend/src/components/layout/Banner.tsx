import React from 'react';
import styles from './Banner.module.css';
import { sectionIds } from 'shared/config/sectionIds';
import { site } from 'shared/data';
import type { SiteImage, SiteSection } from 'shared/types/site';
import { useTranslation } from 'react-i18next';
import type { Language } from 'shared/types';

const Banner: React.FC = () => {
  const { i18n } = useTranslation();

  const lang = i18n.language as Language;
  const { sections, images } = site;

  const bannerSection = sections.find((s: SiteSection) => s.id === 'banner');
  const adjectives = bannerSection?.adjectives?.[lang] ?? [];
  const soloImage = images.find((img: SiteImage) => img.id === 'solo');
  const src = soloImage?.src ?? '';
  const alt = soloImage?.alt?.[lang] ?? soloImage?.alt?.fi ?? '';

  return (
    <div id={sectionIds.top} className={styles.banner}>
      <img src={src} alt={alt} className={styles.bannerImg} />
      <div className={styles.overlay}>
        <div className={styles.adjectives}>
          {adjectives.map((adj: string, index: number) => (
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
