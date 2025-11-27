import React, { useState } from 'react';
import styles from './Header.module.css';
import useIsScrolling from '../../hooks/useScrolling';
import nav from 'shared/data/nav.json';
import { logos, layout } from 'shared/data/site.json';
import ui from 'shared/data/ui.json';
import { sectionIds } from 'shared/config/sectionIds';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher';

interface Logo {
  id: string;
  src: string;
  alt: { [lang: string]: string };
}

interface Layout {
  header: { title: { [lang: string]: string } };
}

interface NavItem {
  id: string;
  label?: { [lang: string]: string | null } | null;
}

const Header: React.FC = () => {
  const isScrolling = useIsScrolling();
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsOpen(false);
  };

  const jpxLogo = (logos as Logo[]).find((logo) => logo.id === 'jpx');
  const logoSrc = jpxLogo?.src ?? '';
  const logoAlt = jpxLogo?.alt?.[i18n.language] ?? jpxLogo?.alt?.['fi'] ?? '';

  const headerTitle =
    (layout as Layout).header.title[i18n.language] ??
    (layout as Layout).header.title['fi'];

  return (
    <header
      className={`${styles.header} ${isScrolling ? styles.scrolled : ''}`}
    >
      <button
        className={styles.titleContainer}
        onClick={() => scrollToSection(sectionIds.top)}
      >
        <div className={styles.logo}>
          <img src={logoSrc} alt={logoAlt} />
        </div>
        <h1 className={styles.title}>{headerTitle}</h1>
      </button>

      {/* Mobile / Desktop Menu */}
      <nav className={isOpen ? styles.mobileMenu : styles.desktopMenu}>
        {(nav as unknown as NavItem[]).map((item) => {
          const labelText =
            typeof item.label === 'string'
              ? item.label
              : (item.label?.[i18n.language] ?? item.label?.['fi'] ?? '');

          return (
            labelText && (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                onKeyDown={() => scrollToSection(item.id)}
              >
                {labelText}
              </button>
            )
          );
        })}
      </nav>

      <div className={styles.rightSection}>
        <LanguageSwitcher />
        {/* Mobile Menu Button */}
        <button
          className={`${styles.mobileMenuButton} ${isOpen ? '' : styles.paddingBottom}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? ui.mobileMenuOpenIcon : ui.mobileMenuClosedIcon}
        </button>
      </div>
    </header>
  );
};

export default Header;
