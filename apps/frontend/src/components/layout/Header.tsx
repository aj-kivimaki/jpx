import { useState } from 'react';
import {
  errorIfMissing,
  navJson,
  NavSchema,
  parseRequired,
  sectionIds,
  siteJson,
  SiteSchema,
  uiJson,
  UISchema,
  warnIfMissing,
} from '@jpx/shared';

import useLocalized from '../../hooks/useLocalized';
import useIsScrolling from '../../hooks/useScrolling';

import styles from './Header.module.css';

const Header = () => {
  const isScrolling = useIsScrolling();
  const [isOpen, setIsOpen] = useState(false);
  const localize = useLocalized();

  const { layout, logos } = parseRequired(SiteSchema, siteJson, 'Site');
  const nav = parseRequired(NavSchema, navJson, 'Nav');
  const ui = parseRequired(UISchema, uiJson, 'UI');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsOpen(false);
  };

  const jpxLogo = errorIfMissing(
    logos.find((logo) => logo.id === 'jpx'),
    'JPX logo'
  );
  const logoSrc = errorIfMissing(jpxLogo.src, 'JPX logo source');

  const logoAlt = localize(
    warnIfMissing(jpxLogo.alt, 'JPX alt text') ?? { fi: '', en: '' }
  );
  const headerTitle = localize(
    warnIfMissing(layout.header.title, 'Header title') ?? { fi: '', en: '' }
  );

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
            typeof item.label === 'string' ? item.label : localize(item.label);

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
        {/* Mobile Menu Button */}
        <button
          className={`${styles.mobileMenuButton} ${isOpen ? '' : styles.paddingBottom}`}
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={() => setIsOpen(!isOpen)}
        >
          {isOpen ? ui.mobileMenuOpenIcon : ui.mobileMenuClosedIcon}
        </button>
      </div>
    </header>
  );
};

export default Header;
