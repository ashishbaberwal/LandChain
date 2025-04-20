import React, { useState } from 'react';

const ExpressInterestForm = ({ property, onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    budget: property.attributes[0].value,
    message: `I'm interested in purchasing this property at ${property.address}.`
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
      
      console.log('Interest form submitted:', formData);
      setIsSubmitted(true);
    } catch (err) {
      setError('There was an error submitting your interest. Please try again.');
      console.error('Express interest form error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="interest-form interest-form--success">
        <h2>Interest Submitted!</h2>
        <p>Thank you for expressing interest in this property. Our team will review your submission and contact you shortly with next steps.</p>
        <button className="interest-form__back" onClick={onBack}>
          Back to Property
        </button>
      </div>
    );
  }

  return (
    <div className="interest-form">
      <h2>Express Interest</h2>
      <p className="interest-form__property">
        {property.name || `Property at ${property.address}`}
      </p>
      <p className="interest-form__price">
        {property.attributes[0].currency === 'INR' 
          ? `₹${property.attributes[0].value.toLocaleString('en-IN')}` 
          : `${property.attributes[0].value} ETH`}
      </p>
      
      {error && <div className="interest-form__error">{error}</div>}
      
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
          <label htmlFor="budget">Your Budget {property.attributes[0].currency === 'INR' ? '(₹)' : '(ETH)'}</label>
          <input
            type="number"
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            min={property.attributes[0].currency === 'INR' ? "100000" : "0.1"}
            step={property.attributes[0].currency === 'INR' ? "50000" : "0.1"}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="message">Additional Notes</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Share any specific requirements or questions about the property"
            rows={4}
          />
        </div>
        
        <div className="interest-form__actions">
          <button 
            type="button" 
            className="interest-form__back" 
            onClick={onBack}
          >
            Back
          </button>
          <button 
            type="submit" 
            className="interest-form__submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Interest'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpressInterestForm;
