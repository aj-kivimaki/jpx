import styles from './Footer.module.css';

const Footer = () => {
  return (
    <div id="contact" className={styles.footer}>
      <div className={styles.stagentLogo}>
        <img
          src="./images/stagent-logo.webp"
          height="160px"
          width="154px"
          alt="stagent-logo"
        />
      </div>
      <div>
        <h4>KEIKKAMYYNTI:</h4>
        <p>Juuso Eloranta</p>
        <p>0400-550463</p>
        <p>stagent@stagent.fi</p>
      </div>
    </div>
  );
};

export default Footer;
