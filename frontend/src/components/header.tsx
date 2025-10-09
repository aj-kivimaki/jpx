import { useState } from 'react';
import './Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="header">
      <h1 className="title">J. Partynen</h1>
      <div className="nav">
        {/* Desktop Menu */}
        <nav className="desktop-menu">
          <a href="#gigs">Keikat</a>
          <a href="#contact">Yhteys</a>
          <a href="#promo">Promo</a>
        </nav>

        {/* Mobile Menu Button */}
        <div className="mobile-menu-button" onClick={toggleMenu}>
          {isOpen ? '✖' : '☰'}
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <nav className="mobile-menu">
            <a href="#gigs" onClick={toggleMenu}>
              Keikat
            </a>
            <a href="#contact" onClick={toggleMenu}>
              Yhteys
            </a>
            <a href="#promo" onClick={toggleMenu}>
              Promo
            </a>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
