import styles from './Banner.module.css';

const Banner = () => {
  return (
    <div id="top" className={styles.banner}>
      <img
        src="/images/j-partynen-band-small.webp"
        alt="Banner"
        className={styles.bannerImg}
      />
    </div>
  );
};

export default Banner;
