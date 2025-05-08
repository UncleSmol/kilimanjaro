import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StrainCard from '../shared/components/StrainCard';
import { strains } from '../shared/constants/strainData';
import { getWeeklySelections } from '../shared/functions/strainSelections';
import './Homepage.css';

function Homepage() {
  const [weeklySelections, setWeeklySelections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get weekly selections
    const selections = getWeeklySelections(strains, 3);
    setWeeklySelections(selections);
    setLoading(false);
  }, []);

  return (
    <div className="homepage">
      <header className="hero-section">
        <h1 className="hero-title">Welcome to Kilimanjaro</h1>
        <p className="hero-paragraph">
          Your destination for high-grade cannabis products in Witbank. We offer a
          curated selection of premium cannabis products.
        </p>
        <Link to="/strains" className="hero-button">
          Explore Our Products
        </Link>
      </header>

      <section className="intro-section">
        <h2 className="intro-title">About Kilimanjaro</h2>
        <p className="intro-paragraph">
          Kilimanjaro is your premier cannabis shop in Witbank, South Africa. We
          are dedicated to providing our customers with the highest quality
          cannabis products, exceptional service, and a welcoming atmosphere.
        </p>
      </section>

      <section className="selling-points-section">
        <h2 className="selling-points-title">Why Choose Kilimanjaro?</h2>
        <ul className="selling-points-list">
          <li className="selling-point-item">
            <h3>Premium Quality</h3>
            <p>We source only the finest cannabis products.</p>
          </li>
          <li className="selling-point-item">
            <h3>Expert Staff</h3>
            <p>Our knowledgeable staff is here to guide you.</p>
          </li>
          <li className="selling-point-item">
            <h3>Wide Selection</h3>
            <p>
              We offer a diverse range of products to meet every need.
            </p>
          </li>
        </ul>
      </section>

      <section className="weekly-selections-section">
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
          <div className="weekly-selections-container">
            {weeklySelections.length > 0 ? (
              weeklySelections.map(strain => (
                <div key={strain.id} className="weekly-selection-item">
                  <StrainCard strain={strain} />
                </div>
              ))
            ) : (
              <p className="no-selections-message">
                No selections available at the moment. Please check back later.
              </p>
            )}
          </div>
        )}
        
        <div className="view-all-container">
          <Link to="/strains" className="view-all-button">
            View All Products
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Homepage;
