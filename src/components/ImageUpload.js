import React, { useState, useRef } from 'react';
import ResultsPage from './ResultsPage';
import Camera from './Camera';
import { submitImageData } from '../services/api';

const ImageUpload = ({ userData, onBack }) => {
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const fileInputRef = useRef(null);

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
    }
  };

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
    <div className="image-upload">
      <h2>Upload Your Image</h2>
      <p className="subtitle">Upload a clear photo of your face for AI analysis</p>

      <div className="upload-container">
        <div className="upload-options">
          <div className="upload-box">
            <button 
              className="upload-btn"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="upload-icon">📁</div>
              <p>Choose Image</p>
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
          >
            <div className="camera-icon">📸</div>
            <p>Take Selfie</p>
          </button>
        </div>

        {selectedImage && (
          <div className="preview-container">
            <h3>Preview</h3>
            <img src={selectedImage} alt="Selected" className="preview-image" />
          </div>
        )}

        <div className="upload-actions">
          <button onClick={onBack} className="btn btn-secondary">
            Back
          </button>
          <button 
            onClick={handleAnalyze}
            disabled={isLoading || !selectedImage}
            className="btn btn-primary"
          >
            {isLoading ? 'Analyzing...' : 'Analyze Image'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
