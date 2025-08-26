import React, { useState } from 'react';
import NameLocationForm from './NameLocationForm';
import PhotoRequirements from './PhotoRequirements';
import ImageUpload from './ImageUpload';

const OnboardingSlide = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState(null);

  const handleFormSubmit = (data) => {
    setUserData(data);
    setCurrentStep(2);
  };

  const handleRequirementsAgree = () => {
    setCurrentStep(3);
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  return (
    <div className="onboarding-slide">
      <div className="slide-container">
      <div className="slide-header">
        <h1>Skinstric AI</h1>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${(currentStep / 3) * 100}%` }}></div>
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
            <PhotoRequirements 
              onAgree={handleRequirementsAgree}
              onBack={handleBack}
            />
          )}

          {currentStep === 3 && (
            <ImageUpload 
              userData={userData}
              onBack={handleBack}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingSlide;
