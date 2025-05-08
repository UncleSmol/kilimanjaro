import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import StrainCard from '../shared/components/StrainCard';
import { strains } from '../shared/constants/strainData';
import { getWeeklySelections } from '../shared/functions/strainSelections';
import './Homepage.css';

// Reusable animation variants
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeInOut' } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeInOut' } },
};

const Homepage = () => {
  const [weeklySelections, setWeeklySelections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get weekly selections
    const selections = getWeeklySelections(strains, 3);
    setWeeklySelections(selections);
    setLoading(false);
  }, []);

  return (
    <motion.div
      className="homepage"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2, // Stagger the sections
          },
        },
      }}
    >
      <motion.header
        className="hero-section"
        variants={sectionVariants}
      >
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Welcome to Kilimanjaro
        </motion.h1>
        <motion.p
          className="hero-paragraph"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Your destination for high-grade cannabis products in Witbank. We
          offer a curated selection of premium cannabis products.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link to="/strains" className="hero-button">
            Explore Our Products
          </Link>
        </motion.div>
      </motion.header>

      <motion.section
        className="intro-section"
        variants={sectionVariants}
      >
        <h2 className="intro-title">About Kilimanjaro</h2>
        <p className="intro-paragraph">
          Kilimanjaro is your premier cannabis shop in Witbank, South Africa.
          We are dedicated to providing our customers with the highest
          quality cannabis products, exceptional service, and a welcoming
          atmosphere.
        </p>
      </motion.section>

      <motion.section
        className="selling-points-section"
        variants={sectionVariants}
      >
        <h2 className="selling-points-title">Why Choose Kilimanjaro?</h2>
        <motion.ul
          className="selling-points-list"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.3, // Stagger the list items
              },
            },
          }}
          initial="hidden"
          animate="visible"
        >
          <motion.li className="selling-point-item" variants={cardVariants}>
            <h3>Premium Quality</h3>
            <p>We source only the finest cannabis products.</p>
          </motion.li>
          <motion.li className="selling-point-item" variants={cardVariants}>
            <h3>Expert Staff</h3>
            <p>Our knowledgeable staff is here to guide you.</p>
          </motion.li>
          <motion.li className="selling-point-item" variants={cardVariants}>
            <h3>Wide Selection</h3>
            <p>
              We offer a diverse range of products to meet every need.
            </p>
          </motion.li>
        </motion.ul>
      </motion.section>

      <motion.section
        className="weekly-selections-section"
        variants={sectionVariants}
      >
        <h2 className="weekly-selections-title">Weekly Selections</h2>
        <p className="weekly-selections-subtitle">
          Our featured strains, refreshed every 3 days
        </p>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading selections...</p>
          </div>
        ) : (
          <motion.div
            className="weekly-selections-container"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2, // Stagger the cards
                },
              },
            }}
            initial="hidden"
            animate="visible"
          >
            {weeklySelections.length > 0 ? (
              weeklySelections.map((strain) => (
                <motion.div
                  key={strain.id}
                  className="weekly-selection-item"
                  variants={cardVariants}
                >
                  <StrainCard strain={strain} />
                </motion.div>
              ))
            ) : (
              <p className="no-selections-message">
                No selections available at the moment. Please check back
                later.
              </p>
            )}
          </motion.div>
        )}

        <div className="view-all-container">
          <Link to="/strains" className="view-all-button">
            View All Products
          </Link>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Homepage;
