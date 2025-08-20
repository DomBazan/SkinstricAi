import React, { useState } from 'react';
import NameLocationForm from './NameLocationForm';

const OnboardingSlide = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState(null);

  const handleFormSubmit = (data) => {
    setUserData(data);
    setCurrentStep(2);
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleProceed = () => {
    console.log('Proceeding to Level 2 with data:', userData);
    // Here you would navigate to Level 2
  };

  return (
    <div className="onboarding-slide">
      <div className="slide-container">
        <div className="slide-header">
          <h1>Skinstric</h1>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${(currentStep / 2) * 100}%` }}></div>
          </div>
        </div>

        <div className="slide-content">
          {currentStep === 1 && (
            <NameLocationForm 
              onSubmit={handleFormSubmit}
              onBack={() => console.log('Cannot go back from first step')}
            />
          )}
          
          {currentStep === 2 && (
            <div className="confirmation-step">
              <h2>Welcome, {userData?.name}!</h2>
              <p>From {userData?.location}</p>
              <p>Your information has been saved successfully.</p>
              
              <div className="form-actions">
                <button 
                  onClick={handleBack}
                  className="btn btn-secondary"
                >
                  Back
                </button>
                <button 
                  onClick={handleProceed}
                  className="btn btn-primary"
                >
                  Continue to Level 2
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingSlide;
