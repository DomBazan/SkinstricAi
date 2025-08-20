import React, { useState, useEffect } from 'react';
import { validateForm } from '../utils/validation';
import { saveUserData, getUserData } from '../utils/storage';

const NameLocationForm = ({ onSubmit, onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    location: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const savedData = getUserData();
    if (savedData) {
      setFormData({
        name: savedData.name || '',
        location: savedData.location || ''
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validation = validateForm(formData.name, formData.location);
    
    if (!validation.isValid) {
      setErrors({
        name: validation.nameError,
        location: validation.locationError
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      await saveUserData(formData);
      onSubmit(formData);
    } catch (error) {
      console.error('Error saving data:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="name-location-form">
      <h2>Let's get to know you</h2>
      <p className="subtitle">Tell us your name and location to personalize your experience</p>
      
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className={errors.name ? 'error' : ''}
            maxLength={50}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="location">Your Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter your location"
            className={errors.location ? 'error' : ''}
            maxLength={100}
          />
          {errors.location && <span className="error-message">{errors.location}</span>}
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            onClick={onBack}
            className="btn btn-secondary"
          >
            Back
          </button>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="btn btn-primary"
          >
            {isSubmitting ? 'Saving...' : 'Proceed'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NameLocationForm;
