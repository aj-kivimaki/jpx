import styles from './Banner.module.css';

const Banner = () => {
  return (
    <div id="top" className={styles.banner}>
      <img
        src="/images/soolokuva.webp"
        alt="Banner"
        className={styles.bannerImg}
      />
      <div className={styles.overlay}>
        <div className={styles.adjectives}>
          <div>Artisti</div>
          <div>Tulkitsija</div>
          <div>Musiikintekijä</div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
