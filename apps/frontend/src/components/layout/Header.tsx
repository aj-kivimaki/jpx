import { useState } from 'react';
import {
  logger,
  makeError,
  navJson,
  NavSchema,
  sectionIds,
  siteJson,
  SiteSchema,
  uiJson,
  UISchema,
} from '@jpx/shared';

import useLocalized from '../../hooks/useLocalized';
import useIsScrolling from '../../hooks/useScrolling';
import { parseRequired } from '../../utils';

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

  const jpxLogo = logos.find((logo) => logo.id === 'jpx');
  if (!jpxLogo) {
    const err = makeError(
      'JPX logo not found in site configuration',
      'NOT_FOUND'
    );
    err.__logged = true;
    logger.error(err);
  }

  const logoSrc = jpxLogo?.src ?? '';
  const logoAlt = localize(jpxLogo?.alt);
  if (!logoAlt) {
    const err = makeError('Alt text missing for JPX logo', 'NOT_FOUND');
    err.__logged = true;
    logger.warn(err);
  }

  const headerTitle = localize(layout.header.title);

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
