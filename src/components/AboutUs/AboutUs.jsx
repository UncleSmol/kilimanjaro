import React from 'react';
import { FaMountain, FaLeaf, FaUsers, FaHandshake } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { createAnimation } from '../shared/animations/animationFunctions';
import './AboutUs.css';

// 1. Section animation (reused)
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeInOut' } },
};

// 2. Story content animation (custom)
const storyVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeInOut', delay: 0.3 } },
};

// 3. Team members animation (custom)
const teamVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeInOut', delay: 0.5, staggerChildren: 0.2 } },
};

// 4. Individual member animation
const memberVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

function AboutUs() {
  // 5. Header title animation (custom - fade and slide)
    const headerTitleAnimation = {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } }
    };

    // 6. Header paragraph animation (custom - fade and slide)
    const headerParagraphAnimation = {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.4 } }
    };


  return (
    <motion.div
      className="about-us"
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
        className="about-header"
        variants={sectionVariants} // Use the shared section variant
      >
        <motion.h1
          className="about-title"
          variants={headerTitleAnimation}
          initial="initial"
          animate="animate"
        >
          About Us
        </motion.h1>
        <motion.p
          className="about-paragraph"
          variants={headerParagraphAnimation}
          initial="initial"
          animate="animate"
        >
          Learn more about Kilimanjaro and our mission to provide the highest
          quality cannabis products.
        </motion.p>
      </motion.header>

      <motion.div
        className="about-container"
        variants={sectionVariants} // Use the shared section variant
      >
        <motion.section
          className="about-story"
          variants={storyVariants} // Use the custom story variant
        >
          <h2 className="section-title">Our Story</h2>
          <motion.div
            className="story-content"
             variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.3,
                  },
                },
              }}
              initial="hidden"
              animate="visible"
          >
            <motion.div className="story-image" variants={memberVariants}>
              <FaMountain className="story-icon" />
            </motion.div>
            <motion.div className="story-text" variants={memberVariants}>
              <p>
                Founded in 2020, Kilimanjaro began with a simple mission: to
                provide the Witbank community with access to premium quality
                cannabis products in a safe, welcoming environment.
              </p>
              <p>
                Our name, inspired by Africa's highest peak, represents our
                commitment to reaching the highest standards in everything we
                do - from product quality to customer service.
              </p>
              <p>
                What started as a small operation has grown into a trusted name
                in the local cannabis community, serving hundreds of satisfied
                customers each month.
              </p>
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section
          className="about-team"
          variants={teamVariants} // Use the custom team variant
        >
          <h2 className="section-title">Meet the Team</h2>
          <p className="team-intro">
            Our knowledgeable staff is passionate about cannabis and dedicated
            to providing exceptional service.
          </p>
          <motion.div
            className="team-members"
             variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.3,
                  },
                },
              }}
              initial="hidden"
              animate="visible"
          >
            <motion.div className="team-member" variants={memberVariants}>
              <div className="member-photo member-photo-1"></div>
              <h3>John Doe</h3>
              <p className="member-title">Founder & CEO</p>
              <p className="member-bio">
                With over 10 years of experience in the cannabis industry, John
                ensures that Kilimanjaro maintains the highest standards.
              </p>
            </motion.div>
            <motion.div className="team-member" variants={memberVariants}>
              <div className="member-photo member-photo-2"></div>
              <h3>Jane Smith</h3>
              <p className="member-title">Product Specialist</p>
              <p className="member-bio">
                Jane's extensive knowledge of cannabis strains and products
                helps our customers find exactly what they need.
              </p>
            </motion.div>
            <motion.div className="team-member" variants={memberVariants}>
              <div className="member-photo member-photo-3"></div>
              <h3>David Johnson</h3>
              <p className="member-title">Customer Relations</p>
              <p className="member-bio">
                David ensures that every customer has a positive experience
                when visiting Kilimanjaro.
              </p>
            </motion.div>
          </motion.div>
        </motion.section>
      </motion.div>
    </motion.div>
  );
}

export default AboutUs;
