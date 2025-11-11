import styles from './Info.module.css';

const Info = () => {
  return (
    <div id="info" className={styles.info}>
      <div className={styles.text}>
        <h2 className={styles.title}>BÄNDI</h2>
        <p>
          <span className={styles.member}>Olli Tanttu</span>,{' '}
          <span className={styles.instrument}>kitara</span>
        </p>
        <p>
          <span className={styles.member}>Atte Kivimäki</span>,{' '}
          <span className={styles.instrument}>koskettimet</span>
        </p>
        <p>
          <span className={styles.member}>Jani Partinen</span>,{' '}
          <span className={styles.instrument}>laulu & kitara</span>
        </p>
        <p>
          <span className={styles.member}>Touko Ruokolainen</span>,{' '}
          <span className={styles.instrument}>rummut</span>
        </p>
        <p>
          <span className={styles.member}>Visa Ruokolainen</span>,{' '}
          <span className={styles.instrument}>basso</span>
        </p>
      </div>
      <div className={styles.image}>
        <img src="/images/j-partynen-band-small.webp" alt="bändikuva" />
      </div>
    </div>
  );
};

export default Info;
