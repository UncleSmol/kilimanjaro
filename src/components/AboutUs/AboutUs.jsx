import React from 'react';
import { FaMountain, FaLeaf, FaUsers, FaHandshake } from 'react-icons/fa';
import './AboutUs.css';

function AboutUs() {
  return (
    <div className="about-us">
      <header className="about-header">
        <h1 className="about-title">About Us</h1>
        <p className="about-paragraph">
          Learn more about Kilimanjaro and our mission to provide the highest quality cannabis products.
        </p>
      </header>

      <div className="about-container">
        <section className="about-story">
          <h2 className="section-title">Our Story</h2>
          <div className="story-content">
            <div className="story-image">
              <FaMountain className="story-icon" />
            </div>
            <div className="story-text">
              <p>
                Founded in 2020, Kilimanjaro began with a simple mission: to provide the Witbank community with access to premium quality cannabis products in a safe, welcoming environment.
              </p>
              <p>
                Our name, inspired by Africa's highest peak, represents our commitment to reaching the highest standards in everything we do - from product quality to customer service.
              </p>
              <p>
                What started as a small operation has grown into a trusted name in the local cannabis community, serving hundreds of satisfied customers each month.
              </p>
            </div>
          </div>
        </section>

        <section className="about-values">
          <h2 className="section-title">Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <FaLeaf className="value-icon" />
              <h3>Quality</h3>
              <p>We source only the finest cannabis products, ensuring everything we sell meets our rigorous standards.</p>
            </div>
            <div className="value-card">
              <FaUsers className="value-icon" />
              <h3>Community</h3>
              <p>We're proud to be part of the Witbank community and strive to create a welcoming space for all.</p>
            </div>
            <div className="value-card">
              <FaHandshake className="value-icon" />
              <h3>Integrity</h3>
              <p>We operate with transparency and honesty in all our business practices.</p>
            </div>
          </div>
        </section>

        <section className="about-team">
          <h2 className="section-title">Our Team</h2>
          <p className="team-intro">
            Our knowledgeable staff is passionate about cannabis and dedicated to providing exceptional service.
          </p>
          <div className="team-members">
            <div className="team-member">
              <div className="member-photo member-photo-1"></div>
              <h3>John Doe</h3>
              <p className="member-title">Founder & CEO</p>
              <p className="member-bio">
                With over 10 years of experience in the cannabis industry, John ensures that Kilimanjaro maintains the highest standards.
              </p>
            </div>
            <div className="team-member">
              <div className="member-photo member-photo-2"></div>
              <h3>Jane Smith</h3>
              <p className="member-title">Product Specialist</p>
              <p className="member-bio">
                Jane's extensive knowledge of cannabis strains and products helps our customers find exactly what they need.
              </p>
            </div>
            <div className="team-member">
              <div className="member-photo member-photo-3"></div>
              <h3>David Johnson</h3>
              <p className="member-title">Customer Relations</p>
              <p className="member-bio">
                David ensures that every customer has a positive experience when visiting Kilimanjaro.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AboutUs;