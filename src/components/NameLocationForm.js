import React, { useState, useEffect } from 'react';
import { validateForm } from '../utils/validation';
import { saveUserData, getUserData } from '../utils/storage';
import { ReactComponent as Rombuses } from '../svg/rombuses.svg';
import BackIcon from '../svg/button-icon-text-shrunk (3).svg';
import './NameLocationForm.css';

const NameLocationForm = ({ onSubmit, onBack }) => {
  const [formData, setFormData] = useState({
    location: ''
  });
  const [errors, setErrors] = useState({
    location: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const savedData = getUserData();
    if (savedData) {
      setFormData({
        location: savedData.location || ''
      });
    }
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    setFormData({ location: value });
    if (errors.location) {
      setErrors({ location: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validateForm('', formData.location);
    if (!validation.isValid) {
      setErrors({ location: validation.locationError });
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
    <div className="name-location-form diamond-page">
      <div className="rombuses-wrapper">
        <Rombuses className="rombuses-svg" />
        <form onSubmit={handleSubmit} className="form-container">
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Where are you from?"
            className={`location-input ${errors.location ? 'error' : ''}`}
            maxLength={100}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmit(e);
              }
            }}
          />
        </form>
      </div>
      <button className="back-button" onClick={onBack} aria-label="Back">
        <img src={BackIcon} alt="Back" />
      </button>
    </div>
  );
};

export default NameLocationForm;
