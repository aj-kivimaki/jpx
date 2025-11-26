import styles from './Banner.module.css';
import { sectionIds } from 'shared/config/sectionIds';
import { images, sections } from 'shared/data/site.json';

const Banner = () => {
  return (
    <div id={sectionIds.top} className={styles.banner}>
      <img
        src={images.solo.src}
        alt={images.solo.alt}
        className={styles.bannerImg}
      />
      <div className={styles.overlay}>
        <div className={styles.adjectives}>
          {sections.banner.adjectives.map((adj, index) => (
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
