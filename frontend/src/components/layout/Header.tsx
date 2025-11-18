import { useState } from 'react';
import styles from './Header.module.css';
import useIsScrolling from '../../hooks/useScrolling';

const Header = () => {
  const isScrolling = useIsScrolling();
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
        <button className={styles.title} onClick={() => scrollToSection('top')}>
          <div className={styles.logo}>
            <img src="/images/logo.webp" width={'45px'} alt="Logo" />
          </div>
          <h1 className={styles.nametitle}>J. Partynen</h1>
        </button>
        {/* Mobile Menu Button */}
        <button
          className={`${styles.mobileMenuButton} ${isOpen ? styles.paddingTop : ''}`}
          onClick={toggleMenu}
        >
          {isOpen ? '✖' : '☰'}
        </button>
        {/* Mobile / Desktop Menu */}
        <nav className={isOpen ? styles.mobileMenu : styles.desktopMenu}>
          <button
            onClick={() => scrollToSection('gigs')}
            onKeyDown={() => scrollToSection('gigs')}
          >
            KEIKAT
          </button>
          <button
            onClick={() => scrollToSection('info')}
            onKeyDown={() => scrollToSection('info')}
          >
            INFO
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            onKeyDown={() => scrollToSection('contact')}
          >
            YHTEYS
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
