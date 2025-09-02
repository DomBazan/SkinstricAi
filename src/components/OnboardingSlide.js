import React, { useState } from 'react';
import IntroName from './IntroName';
import IntroLocation from './IntroLocation';
import NameLocationForm from './NameLocationForm';
import PhotoRequirements from './PhotoRequirements';
import ImageUpload from './ImageUpload';

const OnboardingSlide = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState(null);
  const [animation, setAnimation] = useState(null);

  const handleIntroNameNext = (direction) => {
    setAnimation(direction);
    setTimeout(() => {
      setAnimation(null);
      setCurrentStep(2);
    }, 500); // animation duration
  };

  const handleIntroLocationNext = (direction) => {
    setAnimation(direction);
    setTimeout(() => {
      setAnimation(null);
      setCurrentStep(3);
    }, 500);
  };

  const handleIntroLocationBack = (direction) => {
    setAnimation(direction);
    setTimeout(() => {
      setAnimation(null);
      setCurrentStep(1);
    }, 500);
  };

  const handleFormSubmit = (data) => {
    setUserData(data);
    setCurrentStep(4);
  };

  const handleRequirementsAgree = () => {
    setCurrentStep(5);
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  return (
    <div className={`onboarding-slide ${animation ? `animate-${animation}` : ''}`}>
      <div className="slide-container">
      <div className="slide-header">
        <img src="../svg/header.svg" alt="Skinstric AI Header" className="header-image" />
        <div className="progress-bar">
          <div className="progress" style={{ width: `${(currentStep / 5) * 100}%` }}></div>
        </div>
      </div>

        <div className="slide-content">
          {currentStep === 1 && (
            <IntroName onNext={handleIntroNameNext} />
          )}

          {currentStep === 2 && (
            <IntroLocation onNext={handleIntroLocationNext} onBack={handleIntroLocationBack} />
          )}

          {currentStep === 3 && (
            <NameLocationForm 
              onSubmit={handleFormSubmit}
              onBack={() => setCurrentStep(2)}
            />
          )}
          
          {currentStep === 4 && (
            <PhotoRequirements 
              onAgree={handleRequirementsAgree}
              onBack={handleBack}
            />
          )}

          {currentStep === 5 && (
            <ImageUpload 
              userData={userData}
              onBack={handleBack}
            />
          )}
        </div>

        <div className="bottom-left-text">
          Skinstric developed an A.I. that creates <br />
          a highly-personalised routine tailored to <br />
          what your skin needs.
        </div>

        <div className="side-buttons">
          <button className="btn btn-left">Discover AI</button>
          <button className="btn btn-right">Take Test</button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingSlide;
