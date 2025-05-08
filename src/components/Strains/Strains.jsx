import React, { useState, useEffect, useRef } from 'react';
import { 
  FaLeaf, FaCannabis, FaSeedling, FaHome, 
  FaJoint, FaCookie, FaOilCan, FaChevronDown, 
  FaChevronUp, FaInfoCircle, FaTimes
} from 'react-icons/fa';
import StrainCard from '../shared/components/StrainCard';
import { strains } from '../shared/constants/strainData';
import './Strains.css';

function Strains() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [showHint, setShowHint] = useState(true);
  const [hintFading, setHintFading] = useState(false);
  const categoryRefs = useRef({});

  const categories = [
    { id: 'indoor', name: 'Indoor Strains', icon: <FaHome />, description: 'Premium indoor-grown cannabis strains with exceptional potency and flavor profiles.' },
    { id: 'outdoor', name: 'Outdoor Strains', icon: <FaSeedling />, description: 'Naturally grown outdoor cannabis with rich terpene profiles and robust effects.' },
    { id: 'prerolled', name: 'Pre-Rolled', icon: <FaJoint />, description: 'Convenient, ready-to-enjoy pre-rolled joints with our premium strains.' },
    { id: 'edibles', name: 'Edibles', icon: <FaCookie />, description: 'Delicious cannabis-infused treats for an alternative consumption method.' },
    { id: 'concentrates', name: 'Concentrates', icon: <FaOilCan />, description: 'High-potency cannabis extracts for experienced consumers.' },
    { id: 'exotics', name: 'Exotic Strains', icon: <FaCannabis />, description: 'Rare and unique cannabis varieties with distinctive effects and flavors.' }
  ];

  // Get featured strains (first 3)
  const featuredStrains = strains.slice(0, 3);

  // Get strains by category
  const getStrainsByCategory = (categoryId) => {
    return strains.filter(strain => strain.category === categoryId);
  };

  useEffect(() => {
    // Auto-hide hint after 8 seconds
    const timer = setTimeout(() => {
      dismissHint();
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const dismissHint = () => {
    setHintFading(true);
    setTimeout(() => {
      setShowHint(false);
      setHintFading(false);
    }, 500); // Match this with the CSS animation duration
  };

  const toggleCategory = (categoryId) => {
    // If clicking the already active category, close it
    if (activeCategory === categoryId) {
      setActiveCategory(null);
    } else {
      setActiveCategory(categoryId);
      
      // Scroll the category into view
      setTimeout(() => {
        if (categoryRefs.current[categoryId]) {
          categoryRefs.current[categoryId].scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    }
  };

  return (
    <div className="strains">
      <header className="strains-header">
        <h1 className="strains-title">Our Products</h1>
        <p className="strains-paragraph">
          Explore our premium selection of cannabis products, from top-shelf strains to delicious edibles.
        </p>
      </header>

      {showHint && (
        <div className={`strains-hint ${hintFading ? 'fading' : ''}`}>
          <FaInfoCircle className="hint-icon" />
          <p>Tap on a category to expand and view products. Swipe horizontally to browse items.</p>
          <button className="hint-close" onClick={dismissHint}>
            <FaTimes />
          </button>
        </div>
      )}

      <section className="in-stock-section">
        <div className="section-header">
          <div className="section-title-container">
            <FaLeaf className="section-icon" />
            <h2 className="section-title">Currently In Stock</h2>
          </div>
        </div>
        <div className="section-content">
          <div className="horizontal-scroll-container">
            {featuredStrains.length > 0 ? (
              featuredStrains.map(strain => (
                <div key={strain.id} className="strain-card-wrapper">
                  <StrainCard strain={strain} />
                </div>
              ))
            ) : (
              <div className="placeholder-message">
                <p>No featured products available</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {categories.map((category) => {
        const categoryStrains = getStrainsByCategory(category.id);
        
        return (
          <section 
            key={category.id} 
            className={`category-section ${activeCategory === category.id ? 'active' : ''}`}
            ref={el => categoryRefs.current[category.id] = el}
          >
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
            
            {activeCategory === category.id && (
              <div className="section-content">
                <p className="category-description">{category.description}</p>
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
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}

export default Strains;