import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ResultsPage from './ResultsPage';
import Camera from './Camera';
import { submitImageData } from '../services/api';
import { getUserData } from '../utils/storage';
import cameraIcon from '../svg/camera.svg';
import galleryIcon from '../svg/gallery-icon.svg';
import { ReactComponent as Header } from '../svg/header.svg';
import { ReactComponent as Rombuses } from '../svg/rombuses.svg';
import { ReactComponent as Rectangle } from '../svg/Rectangle 2779.svg';
import { ReactComponent as AIIcon } from '../svg/Group 39959.svg';

const ImageUpload = () => {
  const navigate = useNavigate();
  const userData = getUserData() || {};
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const fileInputRef = useRef(null);

  const onBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = (imageData) => {
    setSelectedImage(imageData);
    setShowCamera(false);
  };

  const handleAnalyze = async () => {
    if (!selectedImage) {
      alert('Please select or take a photo first');
      return;
    }

    setShowLoading(true);
    setIsLoading(true);

    try {
      const base64Data = selectedImage.split(',')[1];
      const payload = {
        ...userData,
        image: base64Data
      };

      const response = await submitImageData(payload);

      if (response.success) {
        // Mock results for demonstration
        const mockResults = {
          age: 25,
          gender: 'Male',
          ethnicity: 'Asian',
          emotion: 'Happy',
          skinType: 'Normal'
        };

        setResults(mockResults);
        setShowResults(true);
      } else {
        alert(response.error || 'Analysis failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to analyze image');
    } finally {
      setIsLoading(false);
      setShowLoading(false);
    }
  };

  if (showLoading) {
    return (
      <div className="name-location-form diamond-page">
        <Header style={{ width: '100%', height: 'auto', marginBottom: '20px' }} />
        <div className="rombuses-wrapper" style={{ position: 'relative' }}>
          <Rombuses className="rombuses-svg" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }} />
          <Rectangle style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 0, opacity: 0.1 }} />
          <div className="loading-content" style={{ marginTop: '40px', position: 'relative', zIndex: 2, textAlign: 'center' }}>
            <AIIcon style={{ width: '100px', height: '100px', marginBottom: '20px' }} />
            <h1 style={{ fontFamily: 'Roobert TRIAL', fontWeight: 400, fontStyle: 'normal', fontSize: '48px', lineHeight: '52px', letterSpacing: '-2%', textAlign: 'center', marginBottom: '20px' }}>Preparing your analysis</h1>
            <p style={{ fontFamily: 'Roobert TRIAL', fontWeight: 400, fontStyle: 'normal', fontSize: '24px', lineHeight: '28px', letterSpacing: '-2%', textAlign: 'center', marginBottom: '40px' }}>Please wait while our AI analyzes your photo...</p>
            <div className="loading-dots" style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
              <div className="dot" style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#007bff', animation: 'bounce 1.4s ease-in-out infinite both' }}></div>
              <div className="dot" style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#007bff', animation: 'bounce 1.4s ease-in-out 0.2s infinite both' }}></div>
              <div className="dot" style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#007bff', animation: 'bounce 1.4s ease-in-out 0.4s infinite both' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    return <ResultsPage results={results} userData={userData} onBack={() => setShowResults(false)} />;
  }

  if (showCamera) {
    return (
      <Camera
        onCapture={handleCameraCapture}
        onBack={() => setShowCamera(false)}
      />
    );
  }

  return (
    <div className="name-location-form diamond-page">
      <Header style={{ width: '100%', height: 'auto', marginBottom: '20px' }} />
      <div className="rombuses-wrapper" style={{ position: 'relative' }}>
        <Rombuses className="rombuses-svg" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }} />
        <Rectangle style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 0, opacity: 0.1 }} />
        <div className="upload-content" style={{ marginTop: '40px', position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'Roobert TRIAL', fontWeight: 400, fontStyle: 'normal', fontSize: '60px', lineHeight: '64px', letterSpacing: '-7%', textAlign: 'center', marginBottom: '20px' }}>📸 Start Analysis</h1>
          <p className="subtitle" style={{ fontFamily: 'Roobert TRIAL', fontWeight: 400, fontStyle: 'normal', fontSize: '24px', lineHeight: '28px', letterSpacing: '-2%', textAlign: 'center', marginBottom: '40px' }}>Upload a clear photo of your face for AI analysis</p>

          <div className="upload-options" style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginBottom: '40px' }}>
            <div className="upload-box">
              <button
                className="upload-btn"
                onClick={() => fileInputRef.current?.click()}
                style={{ background: 'none', border: '2px solid #ddd', borderRadius: '15px', padding: '30px', cursor: 'pointer', transition: 'all 0.3s ease', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', minWidth: '150px' }}
              >
                <img src={galleryIcon} alt="Choose Image" style={{ width: '50px', height: '50px' }} />
                <p style={{ margin: 0, fontSize: '16px', color: '#333' }}>Choose Image</p>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                style={{ display: 'none' }}
              />
            </div>

            <button
              className="selfie-btn"
              onClick={() => setShowCamera(true)}
              style={{ background: 'none', border: '2px solid #ddd', borderRadius: '15px', padding: '30px', cursor: 'pointer', transition: 'all 0.3s ease', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', minWidth: '150px' }}
            >
              <img src={cameraIcon} alt="Take Selfie" style={{ width: '50px', height: '50px' }} />
              <p style={{ margin: 0, fontSize: '16px', color: '#333' }}>Take Selfie</p>
            </button>
          </div>

          {selectedImage && (
            <div className="preview-container" style={{ marginBottom: '30px' }}>
              <h3 style={{ marginBottom: '15px', color: '#333' }}>Preview</h3>
              <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)' }} />
            </div>
          )}

          <div className="upload-actions" style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <button onClick={onBack} className="btn btn-secondary" style={{ padding: '12px 30px', border: 'none', borderRadius: '25px', fontSize: '16px', cursor: 'pointer', transition: 'all 0.3s ease', background: '#6c757d', color: 'white' }}>
              Back
            </button>
            <button
              onClick={handleAnalyze}
              disabled={isLoading || !selectedImage}
              className="btn btn-primary"
              style={{ padding: '12px 30px', border: 'none', borderRadius: '25px', fontSize: '16px', cursor: 'pointer', transition: 'all 0.3s ease', background: isLoading || !selectedImage ? '#ccc' : '#007bff', color: 'white' }}
            >
              {isLoading ? 'Analyzing...' : 'Analyze Image'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
