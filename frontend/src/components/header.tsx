import { useState } from 'react';
import './Header.css';

const Header = () => {
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
    <header className="header">
      <div>
        <h1
          className="title"
          style={{ cursor: 'pointer' }}
          onClick={() => scrollToSection('top')}
        >
          J. Partynen
        </h1>
      </div>

      {/* Desktop Menu */}
      <nav className="desktop-menu">
        <button onClick={() => scrollToSection('gigs')}>Keikat</button>
        <button onClick={() => scrollToSection('news')}>Uutiset</button>
        <button onClick={() => scrollToSection('promo')}>Promo</button>
        <button onClick={() => scrollToSection('contact')}>Yhteys</button>
      </nav>

      {/* Mobile Menu Button */}
      <div className="mobile-menu-button" onClick={toggleMenu}>
        {isOpen ? '✖' : '☰'}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="mobile-menu">
          <button onClick={() => scrollToSection('gigs')}>Keikat</button>
          <button onClick={() => scrollToSection('news')}>Uutiset</button>
          <button onClick={() => scrollToSection('promo')}>Promo</button>
          <button onClick={() => scrollToSection('contact')}>Yhteys</button>
        </nav>
      )}
    </header>
  );
};

export default Header;
