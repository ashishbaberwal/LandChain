import React, { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Contact form submitted:', formData);
      setIsSubmitted(true);
    } catch (err) {
      setError('There was an error submitting your message. Please try again.');
      console.error('Contact form error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="container">
          <h1>Get in Touch</h1>
          <p>We'd love to hear from you. Contact us with any questions about our properties or services.</p>
        </div>
      </div>

      <div className="container">
        <div className="contact-wrapper">
          <div className="contact-info">
            <h2>Contact Information</h2>
            
            <div className="info-item">
              <h3>Address</h3>
              <p>123 Blockchain Boulevard</p>
              <p>New Delhi, 110001</p>
              <p>India</p>
            </div>
            
            <div className="info-item">
              <h3>Phone</h3>
              <p>+91 98765 43210</p>
              <p>Mon-Fri: 9:00 AM - 6:00 PM</p>
            </div>
            
            <div className="info-item">
              <h3>Email</h3>
              <p>info@landchain.com</p>
              <p>support@landchain.com</p>
            </div>
            
            <div className="social-links">
              <h3>Connect With Us</h3>
              <div className="social-icons">
                <a href="#facebook" className="social-icon">Facebook</a>
                <a href="#twitter" className="social-icon">Twitter</a>
                <a href="#instagram" className="social-icon">Instagram</a>
                <a href="#linkedin" className="social-icon">LinkedIn</a>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            {isSubmitted ? (
              <div className="form-success">
                <h2>Thank You!</h2>
                <p>Your message has been sent successfully. We'll get back to you as soon as possible.</p>
                <button 
                  onClick={() => setIsSubmitted(false)} 
                  className="btn-primary"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2>Send Us a Message</h2>
                {error && <div className="form-error">{error}</div>}
                
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What is this regarding?"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Type your message here"
                      required
                      rows={6}
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    className="btn-primary btn-submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
