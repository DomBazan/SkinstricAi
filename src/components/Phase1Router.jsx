import React, { useState } from 'react';
import LandingPage from './LandingPage';
import IntroName from './IntroName';
import IntroLocation from './IntroLocation';
import CameraSelectionPage from './ImageUpload';
import ImageUpload from './ImageUpload';
import Phase2Router from './Phase2Router';
import Phase3Router from './Phase3Router';

const Phase1Router = () => {
  const [currentScreen, setCurrentScreen] = useState('intro');
  const [currentPhase, setCurrentPhase] = useState('phase1');
  const [phase2Mode, setPhase2Mode] = useState('camera'); // Track which mode Phase 2 should use
  const [userData, setUserData] = useState({
    name: '',
    city: '',
    image: null,
    demographics: null
  });

  const navigateTo = (screen) => {
    setCurrentScreen(screen);
  };

  const updateUserData = (field, value) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTakeTest = () => {
    navigateTo('enter-name');
  };

  const handleNameSubmit = () => {
    navigateTo('enter-city');
  };

  const handleCitySubmit = () => {
    navigateTo('camera-selection');
  };

  const handleCameraSelect = () => {
    console.log('Camera selected, setting mode to camera');
    setPhase2Mode('camera');
    setCurrentPhase('phase2');
  };

  const handleGallerySelect = () => {
    console.log('Gallery selected, showing image upload');
    navigateTo('gallery-upload');
  };

  const handleImageSelected = (base64Image) => {
    console.log('Image selected, going directly to processing');
    updateUserData('image', base64Image);
    setCurrentPhase('phase2');
    setPhase2Mode('processing'); // Skip camera/gallery, go straight to processing
  };

  const handlePhase2Complete = (demographicData) => {
    console.log('Phase1Router received demographicData from Phase2Router:', demographicData);
    console.log('Updating userData.demographics to:', demographicData);
    updateUserData('demographics', demographicData);
    setCurrentPhase('phase3');
  };

  const handlePhase3Complete = (confirmedData) => {
    console.log('All phases complete with data:', { ...userData, demographics: confirmedData });
    // Here you could navigate to future phases or show completion
  };

  const handleBackToPhase1 = () => {
    setCurrentPhase('phase1');
    navigateTo('camera-selection');
  };

  const handleBack = () => {
    switch (currentScreen) {
      case 'enter-name':
        navigateTo('intro');
        break;
      case 'enter-city':
        navigateTo('enter-name');
        break;
      case 'camera-selection':
        navigateTo('enter-city');
        break;
      case 'camera-capture':
        navigateTo('camera-selection');
        break;
      case 'gallery-upload':
        navigateTo('camera-selection');
        break;
      case 'image-upload':
        navigateTo('camera-selection');
        break;
      case 'processing':
        navigateTo('camera-selection');
        break;
      default:
        navigateTo('intro');
    }
  };

  // Handle phase transitions
  if (currentPhase === 'phase2') {
    return (
      <Phase2Router
        mode={phase2Mode}
        imageData={userData.image}
        onBack={handleBackToPhase1}
        onComplete={handlePhase2Complete}
      />
    );
  }

  if (currentPhase === 'phase3') {
    return (
      <Phase3Router
        demographicData={userData.demographics}
        onBack={() => setCurrentPhase('phase2')}
        onComplete={handlePhase3Complete}
      />
    );
  }

  // Phase 1 screens
  switch (currentScreen) {
    case 'intro':
      return (
        <LandingPage onTakeTest={handleTakeTest} />
      );

    case 'enter-name':
      return (
        <IntroName onNext={handleNameSubmit} />
      );

    case 'enter-city':
      return (
        <IntroLocation onNext={handleCitySubmit} />
      );

    case 'camera-selection':
      return (
        <CameraSelectionPage
          onCameraSelect={handleCameraSelect}
          onGallerySelect={handleGallerySelect}
          onBack={handleBack}
        />
      );

    case 'gallery-upload':
      return (
        <ImageUpload
          onImageSelect={handleImageSelected}
          onBack={handleBack}
        />
      );

    default:
      return <LandingPage onTakeTest={handleTakeTest} />;
  }
};

export default Phase1Router;
