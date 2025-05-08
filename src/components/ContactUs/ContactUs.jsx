import React, { useState, useEffect } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { motion } from 'framer-motion';
import { createAnimation } from '../shared/animations/animationFunctions';
import './ContactUs.css';

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeInOut' } },
};

const contactInfoVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeInOut', delay: 0.2 } },
};

const formVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeInOut', delay: 0.2 } },
};

const mapVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeInOut', delay: 0.4 } },
};

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Klipfontein, Witbank coordinates
  const position = [-25.8719, 29.2553];

  useEffect(() => {
    // Load Leaflet CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
    link.integrity = 'sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==';
    link.crossOrigin = '';
    document.head.appendChild(link);
    
    // Set map as loaded after a short delay to ensure CSS is applied
    setTimeout(() => {
      setMapLoaded(true);
    }, 300);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');

    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' }); // Clear form
      // In a real app, you'd send data to a server here
    }, 2000);
  };

  return (
    <motion.div
      className="contact-us"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.3, // Stagger the main sections
          },
        },
      }}
    >
      <motion.header
        className="contact-header"
        variants={sectionVariants}
      >
        <motion.h1
          className="contact-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Contact Us
        </motion.h1>
        <motion.p
          className="contact-paragraph"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Get in touch with us for any inquiries or feedback.
        </motion.p>
      </motion.header>

      <motion.div
        className="contact-container"
        variants={sectionVariants}
      >
        <motion.div
          className="contact-info"
          variants={contactInfoVariants}
        >
          <h2 className="info-title">Contact Information</h2>
          <div className="info-item">
            <FaPhone className="info-icon" />
            <span>Phone: +27 (12) 345 6789</span>
          </div>
          <div className="info-item">
            <FaEnvelope className="info-icon" />
            <span>Email: info@kilimanjaro.co.za</span>
          </div>
          <div className="info-item">
            <FaMapMarkerAlt className="info-icon" />
            <span>Address: 123 Cannabis Street, Klipfontein, Witbank</span>
          </div>
          <div className="info-item">
            <FaFacebook className="info-icon" />
            <span>Facebook: /KilimanjaroCannabis</span>
          </div>
          <div className="info-item">
            <FaTwitter className="info-icon" />
            <span>Twitter: @KilimanjaroCanna</span>
          </div>
          <div className="info-item">
            <FaInstagram className="info-icon" />
            <span>Instagram: @kilimanjaro_canna</span>
          </div>
          <div className="info-item">
            <FaWhatsapp className="info-icon" />
            <span>WhatsApp: +27 60 123 4567</span>
          </div>
        </motion.div>

        <motion.div
          className="form-container"
          variants={formVariants}
        >
          <h2 className="form-title">Send us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="submit-button"
              disabled={formStatus === 'sending'}
            >
              {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
              <FaPaperPlane className="button-icon" />
            </button>
            
            {formStatus === 'success' && (
              <div className="form-success">
                Message sent successfully! We'll get back to you soon.
              </div>
            )}
          </form>
        </motion.div>
      </motion.div>

      <motion.div
        className="map-container"
        variants={mapVariants}
      >
        <h2 className="map-title">Find Us</h2>
        {mapLoaded && (
          <MapContainer
            center={position}
            zoom={14}
            scrollWheelZoom={false}
            className="leaflet-map"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                Kilimanjaro Cannabis Shop <br /> Klipfontein, Witbank
              </Popup>
            </Marker>
          </MapContainer>
        )}
      </motion.div>
    </motion.div>
  );
}

export default ContactUs;
