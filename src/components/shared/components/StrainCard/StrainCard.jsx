import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { FaLeaf, FaThermometerHalf, FaInfoCircle, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './StrainCard.css';

const StrainCard = ({ strain }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const cardRef = useRef(null);
  const controls = useAnimation();

  // Show hint on first render
  useEffect(() => {
    setShowHint(true);
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (event, info) => {
    setIsDragging(false);
    
    // If dragged left/right far enough, change image
    if (info.offset.x > 100 && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    } else if (info.offset.x < -100 && currentImageIndex < strain.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      // Reset position if not dragged far enough
      controls.start({ x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } });
    }
  };

  const toggleDescription = (e) => {
    e.stopPropagation(); // Prevent triggering drag events
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  // Create stack of cards with different indices
  const renderCardStack = () => {
    const cards = [];
    
    // We'll show max 3 cards in the stack
    const startIndex = Math.max(0, currentImageIndex - 2);
    const endIndex = Math.min(strain.images.length - 1, currentImageIndex + 2);
    
    for (let i = endIndex; i >= startIndex; i--) {
      // Only show 3 cards at most
      if (cards.length >= 3) break;
      
      const isCurrentCard = i === currentImageIndex;
      const distance = Math.abs(i - currentImageIndex);
      
      cards.push(
        <motion.div
          key={`card-${i}`}
          className={`strain-card-item ${isCurrentCard ? 'active' : ''}`}
          style={{
            zIndex: 10 - distance,
            filter: `blur(${distance * 2}px)`,
            opacity: 1 - (distance * 0.2)
          }}
          initial={false}
          animate={{
            scale: 1 - (distance * 0.05),
            y: distance * 10,
            x: distance * (i < currentImageIndex ? -20 : 20),
            rotateZ: distance * (i < currentImageIndex ? -1 : 1)
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30
          }}
        >
          <div className="strain-card-image-container">
            <img 
              src={strain.images[i]} 
              alt={`${strain.name} - view ${i+1}`} 
              className="strain-card-image"
            />
          </div>
          
          {isCurrentCard && (
            <div className="strain-card-content">
              <h3 className="strain-card-title">{strain.name}</h3>
              
              <div className="strain-card-type">
                <FaLeaf className="strain-card-icon" />
                <span>{strain.type}</span>
              </div>
              
              <div className="strain-card-thc">
                <FaThermometerHalf className="strain-card-icon" />
                <span>THC: {strain.thc}%</span>
              </div>
              
              <div className="strain-card-description-container">
                <p className={`strain-card-description ${isDescriptionExpanded ? 'expanded' : ''}`}>
                  {strain.description}
                </p>
                <button 
                  className="description-toggle-btn" 
                  onClick={toggleDescription}
                  aria-label={isDescriptionExpanded ? "Show less" : "Show more"}
                >
                  {isDescriptionExpanded ? <FaChevronUp /> : <FaChevronDown />}
                </button>
              </div>
              
              <div className="strain-card-price">R{strain.price}</div>
            </div>
          )}
        </motion.div>
      );
    }
    
    return cards;
  };

  return (
    <div className="strain-card-container" ref={cardRef}>
      <AnimatePresence>
        {showHint && (
          <motion.div 
            className="strain-card-hint"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <FaInfoCircle className="hint-icon" />
            <p>Swipe left or right to view more images</p>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div 
        className="strain-card-stack"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.7}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        animate={controls}
      >
        {renderCardStack()}
      </motion.div>
      
      <div className="strain-card-indicators">
        {strain.images.map((_, index) => (
          <div 
            key={`indicator-${index}`}
            className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default StrainCard;