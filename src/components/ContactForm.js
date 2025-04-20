import React, { useState } from 'react';

const ContactForm = ({ property, onBack, isOffchain }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: `Hi, I'm interested in this ${isOffchain ? 'property' : 'blockchain property'} at ${property.address}.`
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
      // Here you would normally send the form data to your backend
      // For this example, we'll simulate a successful submission after a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
    } catch (err) {
      setError('There was an error submitting your request. Please try again.');
      console.error('Contact form error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="contact-form contact-form--success">
        <h2>Thank You!</h2>
        <p>Your inquiry has been sent successfully. A property agent will contact you shortly.</p>
        <button className="contact-form__back" onClick={onBack}>
          Back to Property
        </button>
      </div>
    );
  }

  return (
    <div className="contact-form">
      <h2>Contact Agent</h2>
      <p className="contact-form__property">
        {property.name || `Property at ${property.address}`}
      </p>
      <p className="contact-form__price">{property.attributes[0].currency === 'INR' 
        ? `₹${property.attributes[0].value.toLocaleString('en-IN')}` 
        : `${property.attributes[0].value} ETH`}
      </p>
      
      {error && <div className="contact-form__error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
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
            placeholder="Your message to the agent"
            required
            rows={5}
          />
        </div>
        
        <div className="contact-form__actions">
          <button 
            type="button" 
            className="contact-form__back" 
            onClick={onBack}
          >
            Back
          </button>
          <button 
            type="submit" 
            className="contact-form__submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
