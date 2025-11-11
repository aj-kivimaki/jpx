import { useState } from 'react';
import styles from './HeaderComponent.module.css';
import useIsScrolling from '../hooks/useIsScrolling';

const Header = () => {
  const isScrolling = useIsScrolling(100);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Scroll to a section by id and optionally close the mobile menu
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsOpen(false); // close mobile menu after scroll
  };

  return (
    <header className={`${styles.header} ${isScrolling && styles.scrolled}`}>
      <div className={styles.container}>
        <div className={styles.title} onClick={() => scrollToSection('top')}>
          <div className={styles.logo}>
            <img src="/images/logo.png" width={'50px'} alt="Logo" />
          </div>
          <h1 className={styles.title}>J. Partynen</h1>
        </div>
        {/* Mobile Menu Button */}
        <div className={styles.mobileMenuButton} onClick={toggleMenu}>
          {isOpen ? '✖' : '☰'}
        </div>
        {/* Mobile / Desktop Menu */}
        <nav className={isOpen ? styles.mobileMenu : styles.desktopMenu}>
          <button onClick={() => scrollToSection('gigs')}>KEIKAT</button>
          <button onClick={() => scrollToSection('info')}>INFO</button>
          <button onClick={() => scrollToSection('contact')}>YHTEYS</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
