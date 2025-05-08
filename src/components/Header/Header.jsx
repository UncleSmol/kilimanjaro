import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaInfoCircle, FaSeedling, FaEnvelope } from 'react-icons/fa';
import './Header.css';
import logo from '../../sig/dev-doc-logo.svg';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="logo">
        <span>KILIMANJARO</span>
      </div>
      
      <div className="hamburger" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
      
      <nav className={`nav ${menuOpen ? 'active' : ''}`}>
        <ul>
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>
              <FaHome className="nav-icon" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setMenuOpen(false)}>
              <FaInfoCircle className="nav-icon" />
              <span>About Us</span>
            </Link>
          </li>
          <li>
            <Link to="/strains" onClick={() => setMenuOpen(false)}>
              <FaSeedling className="nav-icon" />
              <span>Strains</span>
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>
              <FaEnvelope className="nav-icon" />
              <span>Contact Us</span>
            </Link>
          </li>
        </ul>
        
        <div className="mobile-nav-logo">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <img src={logo} alt="Dev Doc Logo" />
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;