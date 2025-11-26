import { useState } from 'react';
import styles from './Header.module.css';
import useIsScrolling from '../../hooks/useScrolling';
import nav from 'shared/data/nav.json';
import { logos, layout } from 'shared/data/site.json';
import ui from 'shared/data/ui.json';
import { sectionIds } from 'shared/config/sectionIds';

const Header = () => {
  const isScrolling = useIsScrolling();
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsOpen(false);
  };

  return (
    <header className={`${styles.header} ${isScrolling && styles.scrolled}`}>
      <div className={styles.container}>
        <button
          className={styles.titleContainer}
          onClick={() => scrollToSection(sectionIds.top)}
        >
          <div className={styles.logo}>
            <img src={logos.jpx.src} alt={logos.jpx.alt} />
          </div>
          <h1 className={styles.title}>{layout.header.title}</h1>
        </button>
        {/* Mobile Menu Button */}
        <button
          className={`${styles.mobileMenuButton} ${isOpen ? '' : styles.paddingBottom}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? ui.mobileMenuOpenIcon : ui.mobileMenuClosedIcon}
        </button>
        {/* Mobile / Desktop Menu */}
        <nav className={isOpen ? styles.mobileMenu : styles.desktopMenu}>
          {nav.map(
            (item) =>
              item.label && (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  onKeyDown={() => scrollToSection(item.id)}
                >
                  {item.label}
                </button>
              )
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
