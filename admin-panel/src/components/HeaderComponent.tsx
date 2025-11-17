import styles from "./HeaderComponent.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <button className={styles.title}>
          <h1 className={styles.nametitle}>J. Partynen : CMS</h1>
        </button>
      </div>
    </header>
  );
};

export default Header;
