import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useIsScrolling from '../../hooks/useScrolling';
import LanguageSwitcher from '../LanguageSwitcher';
import { nav, site, ui } from 'shared/data';
import { sectionIds, type Language } from 'shared/schemas';
import styles from './Header.module.css';

const Header = () => {
  const isScrolling = useIsScrolling();
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();

  const lang = i18n.language as Language;

  const { layout, logos } = site;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsOpen(false);
  };

  const jpxLogo = logos.find((logo) => logo.id === 'jpx');
  const logoSrc = jpxLogo?.src ?? '';
  const logoAlt = jpxLogo?.alt?.[lang] ?? jpxLogo?.alt?.fi ?? '';

  const headerTitle = layout.header.title[lang] ?? layout.header.title.fi;

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
        {nav.map((item) => {
          const labelText =
            typeof item.label === 'string'
              ? item.label
              : (item.label?.[lang] ?? item.label?.['fi'] ?? '');

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
