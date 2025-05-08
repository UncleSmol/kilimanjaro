import React, { useState, useEffect } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './ContactUs.css';

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
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setFormStatus('sending');
    
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setFormStatus(null);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="contact-us">
      <header className="contact-header">
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-paragraph">
          We'd love to hear from you. Reach out to us with any questions or feedback.
        </p>
      </header>

      <div className="contact-container">
        <div className="contact-info">
          <h2 className="info-title">Get In Touch</h2>
          
          <div className="info-item">
            <FaPhone className="info-icon" />
            <div className="info-content">
              <h3>Phone</h3>
              <p>+27 76 123 4567</p>
            </div>
          </div>
          
          <div className="info-item">
            <FaEnvelope className="info-icon" />
            <div className="info-content">
              <h3>Email</h3>
              <p>info@kilimanjaro.co.za</p>
            </div>
          </div>
          
          <div className="info-item">
            <FaMapMarkerAlt className="info-icon" />
            <div className="info-content">
              <h3>Location</h3>
              <p>Klipfontein, Witbank, South Africa</p>
            </div>
          </div>
          
          <div className="business-hours">
            <h3>Business Hours</h3>
            <ul>
              <li><span>Monday - Friday:</span> 9:00 AM - 6:00 PM</li>
              <li><span>Saturday:</span> 10:00 AM - 4:00 PM</li>
              <li><span>Sunday:</span> Closed</li>
            </ul>
          </div>
          
          <div className="social-links">
            <h3>Connect With Us</h3>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebook />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://wa.me/27761234567" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>

        <div className="contact-form-container">
          <h2 className="form-title">Send Us a Message</h2>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
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
              <label htmlFor="email">Your Email</label>
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
              <label htmlFor="message">Your Message</label>
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
        </div>
      </div>
      
      <div className="map-container">
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
      </div>
    </div>
  );
}

export default ContactUs;