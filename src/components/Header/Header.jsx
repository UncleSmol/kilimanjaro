import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaInfoCircle, FaSeedling, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { createAnimation } from '../shared/animations/animationFunctions';
import './Header.css';
import logo from '../../sig/dev-doc-logo.svg';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // 1. Logo animation
  const logoAnimation = createAnimation({
    type: 'scale',
    duration: 0.8,
    scale: 0.5,
  });

  // 2. Hamburger animation
  const hamburgerVariants = {
    closed: {
      rotate: 0,
      transition: {
        duration: 0.3,
      },
    },
    open: {
      rotate: 90,
      transition: {
        duration: 0.3,
      },
    },
  };

  // 3. Mobile nav animation
  const mobileNavAnimation = {
    open: {
      x: '0%',
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 30,
        duration: 0.5,
      },
    },
    closed: {
      x: '100%',
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  // 4. Staggered nav items and logo animation
    const staggeredList = {
        open: {
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        },
        closed: {
             transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
                staggerDirection: -1
            }
        }
    };

    const navItemVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0 }
    };

  return (
    <header className="header">
      <motion.div
        className="logo"
        variants={logoAnimation}
        initial="initial"
        animate="animate"
      >
        <span>KILIMANJARO</span>
      </motion.div>

      <motion.div
        className="hamburger"
        onClick={toggleMenu}
        variants={hamburgerVariants}
        animate={menuOpen ? 'open' : 'closed'}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </motion.div>

      <motion.nav
        className={`nav ${menuOpen ? 'active' : ''}`}
        variants={mobileNavAnimation}
        initial="closed"
        animate={menuOpen ? 'open' : 'closed'}
      >
        <motion.ul variants={staggeredList}>
          <motion.li variants={navItemVariants}>
            <Link to="/" onClick={() => setMenuOpen(false)}>
              <FaHome className="nav-icon" />
              <span>Home</span>
            </Link>
          </motion.li>
          <motion.li variants={navItemVariants}>
            <Link to="/about" onClick={() => setMenuOpen(false)}>
              <FaInfoCircle className="nav-icon" />
              <span>About Us</span>
            </Link>
          </motion.li>
          <motion.li variants={navItemVariants}>
            <Link to="/strains" onClick={() => setMenuOpen(false)}>
              <FaSeedling className="nav-icon" />
              <span>Strains</span>
            </Link>
          </motion.li>
          <motion.li variants={navItemVariants}>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>
              <FaEnvelope className="nav-icon" />
              <span>Contact Us</span>
            </Link>
          </motion.li>
        </motion.ul>
        <motion.div
          className="mobile-nav-logo"
          variants={staggeredList}
        >
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <img src={logo} alt="Dev Doc Logo" />
          </Link>
        </motion.div>
      </motion.nav>
    </header>
  );
}

export default Header;
