import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__section">
          <h4>LandChain</h4>
          <p>Revolutionizing real estate with blockchain technology. Secure, transparent, and efficient property transactions.</p>
        </div>
        
        <div className="footer__section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/properties">Properties</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        
        <div className="footer__section">
          <h4>Contact Us</h4>
          <p>Email: info@landchain.com</p>
          <p>Phone: +1 (123) 456-7890</p>
          <div className="footer__social">
            <a href="#twitter" className="social-icon">Twitter</a>
            <a href="#linkedin" className="social-icon">LinkedIn</a>
            <a href="#github" className="social-icon">GitHub</a>
          </div>
        </div>
      </div>
      
      <div className="footer__bottom">
        <p>&copy; {new Date().getFullYear()} LandChain. All rights reserved.</p>
        <p>
          <a href="#privacy">Privacy Policy</a> | 
          <a href="#terms">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
