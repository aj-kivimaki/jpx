import { useState } from 'react';
import './Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="header">
      <div>
        <a href="#top">
          <h1 className="title">J. Partynen</h1>
        </a>
      </div>
      <div>
        <nav className="desktop-menu">
          <a href="#gigs">Keikat</a>
          <a href="#news">Uutiset</a>
          <a href="#promo">Promo</a>
          <a href="#contact">Yhteys</a>
        </nav>
      </div>
      <div className="mobile-menu-button" onClick={toggleMenu}>
        {isOpen ? '✖' : '☰'}
      </div>
      {isOpen && (
        <nav className="mobile-menu">
          <a href="#gigs" onClick={toggleMenu}>
            Keikat
          </a>
          <a href="#news" onClick={toggleMenu}>
            Uutiset
          </a>
          <a href="#promo" onClick={toggleMenu}>
            Promo
          </a>
          <a href="#contact" onClick={toggleMenu}>
            Yhteys
          </a>
        </nav>
      )}
    </header>
  );
};

export default Header;
