import styles from './Info.module.css';

const Info = () => {
  return (
    <div id="info" className={styles.info}>
      <img src="/images/j-partynen-band-small.webp" alt="bändikuva" />
      <div className={styles.textContainer}>
        <div className={styles.members}>
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
        <div className={styles.descriptionContainer}>
          <p className={styles.descriptionText}>
            J. Partynen on kokenut esiintyjä. Keikoilla kuullaan J. Partysen
            omia kappaleita ja coverbiisejä vuosien varrelta. Olipa kyseessä
            intiimi soolokeikka tai energisempi bändispektaakkeli, aito läsnäolo
            tekee jokaisesta keikasta ainutlaatuisen!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Info;
