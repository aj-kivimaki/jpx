import styles from './Footer.module.css';

const Footer = () => {
  return (
    <div id="contact" className={styles.footer}>
      <div>
        <p>Keikkamyynti:</p>
        <p>Juuso Eloranta</p>
        <p>0400-550463</p>
        <p>stagent@stagent.fi</p>
      </div>
    </div>
  );
};

export default Footer;
