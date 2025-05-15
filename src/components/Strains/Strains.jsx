import React, { useState, useEffect, useRef } from 'react';
import { 
  FaLeaf, FaCannabis, FaSeedling, FaHome, 
  FaJoint, FaCookie, FaOilCan, FaChevronDown, 
  FaChevronUp, FaInfoCircle, FaTimes
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion'; // Import Framer Motion
// import { createAnimation } from '../shared/animations/animationFunctions'; // createAnimation might not be needed for these variants
import StrainCard from '../shared/components/StrainCard';
import { strains } from '../shared/constants/strainData';
import './Strains.css';

function Strains() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [showHint, setShowHint] = useState(true);
  const [hintFading, setHintFading] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 376);
  const categoryRefs = useRef({});

  // Check screen size on mount and resize
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 376);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const categories = [
    { id: 'indoor', name: 'Indoor Strains', icon: <FaHome />, description: 'Premium indoor-grown cannabis strains with exceptional potency and flavor profiles.' },
    { id: 'outdoor', name: 'Outdoor Strains', icon: <FaSeedling />, description: 'Naturally grown outdoor cannabis with rich terpene profiles and robust effects.' },
    { id: 'prerolled', name: 'Pre-Rolled', icon: <FaJoint />, description: 'Convenient, ready-to-enjoy pre-rolled joints with our premium strains.' },
    { id: 'edibles', name: 'Edibles', icon: <FaCookie />, description: 'Delicious cannabis-infused treats for an alternative consumption method.' },
    { id: 'concentrates', name: 'Concentrates', icon: <FaOilCan />, description: 'High-potency cannabis extracts for experienced consumers.' },
    { id: 'exotics', name: 'Exotics', icon: <FaLeaf />, description: 'Rare and unique strains with distinctive characteristics.' },
  ];

  // Define animation variants for the accordion sections
  const sectionVariants = {
    open: {
      opacity: 1,
      height: 'auto', // Crucial: Allows content to determine height
      // y: 0,        // Optional: if you want a slide-in effect
      transition: {
        duration: 0.4, // Adjust duration as needed
        ease: "easeInOut",
      }
    },
    closed: {
      opacity: 0,
      height: 0,
      // y: 20,       // Optional: if you want a slide-out effect
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setHintFading(true);
      setTimeout(() => setShowHint(false), 500);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const toggleCategory = (categoryId) => {
    setActiveCategory(prevCategory => prevCategory === categoryId ? null : categoryId);
  };

  // Function to truncate description for small screens
  const getTruncatedDescription = (description) => {
    if (isSmallScreen && description.length > 80) {
      return `${description.substring(0, 80)}...`;
    }
    return description;
  };

  return (
    <div className="strains">
      <header className="strains-header">
        <h1 className="strains-title">Our Strains</h1>
        <p className="strains-paragraph">
          Explore our wide selection of premium cannabis strains, each carefully cultivated and selected for your enjoyment.
        </p>
        <AnimatePresence>
          {showHint && (
            <motion.div
              className={`strains-hint ${hintFading ? 'fading' : ''}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <FaInfoCircle className="hint-icon" />
              <p>Click to view strains</p>
              <button className="hint-close" onClick={() => { setHintFading(true); setTimeout(() => setShowHint(false), 500); }}>
                <FaTimes />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <div className="categories-container">
        {categories.map(category => {
          const categoryStrains = strains.filter(strain => strain.category === category.id);
          return (
            <section key={category.id} className="category-section">
              <div 
                className="section-header"
                onClick={() => toggleCategory(category.id)}
              >
                <div className="section-title-container">
                  <span className="section-icon">{category.icon}</span>
                  <h2 className="section-title">{category.name}</h2>
                </div>
                <span className="toggle-icon">
                  {activeCategory === category.id ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </div>
              
              <AnimatePresence>
                {activeCategory === category.id && (
                  <motion.div
                    className="section-content"
                    ref={el => categoryRefs.current[category.id] = el}
                    variants={sectionVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    style={{ overflow: 'hidden' }} // Ensure content doesn't overflow during animation
                  >
                    <p className="category-description">
                      {getTruncatedDescription(category.description)}
                    </p>
                    <div className="horizontal-scroll-container">
                      {categoryStrains.length > 0 ? (
                        categoryStrains.map(strain => (
                          <div key={strain.id} className="strain-card-wrapper">
                            <StrainCard strain={strain} />
                          </div>
                        ))
                      ) : (
                        <div className="placeholder-message">
                          <p>No {category.name.toLowerCase()} currently available</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>
          );
        })}
      </div>
    </div>
  );
}

export default Strains;
