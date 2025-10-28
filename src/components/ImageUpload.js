import React, { useState, useRef } from 'react';
import './ImageUpload.css';

const ImageUpload = ({ onImageSelect, onBack }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    setError('');

    // Convert to base64
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Data = e.target.result;
      setSelectedImage(base64Data);
      if (onImageSelect) {
        onImageSelect(base64Data);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="image-upload-container">
      <div className="image-upload-header">
        <h2>Upload Image</h2>
        <button className="back-btn" onClick={onBack}>← Back</button>
      </div>

      <div className="image-upload-content">
        {!selectedImage ? (
          <div className="upload-area">
            <div className="upload-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                <polyline points="14,2 14,8 20,8"/>
              </svg>
            </div>
            <p className="upload-text">Click to select an image from your device</p>
            <button className="upload-btn" onClick={handleUploadClick}>
              Choose Image
            </button>
            {error && <p className="error-text">{error}</p>}
          </div>
        ) : (
          <div className="preview-area">
            <h3>Image Preview</h3>
            <img src={selectedImage} alt="Selected" className="preview-image" />
            <div className="preview-actions">
              <button className="change-btn" onClick={handleUploadClick}>
                Change Image
              </button>
              <button className="remove-btn" onClick={handleRemoveImage}>
                Remove
              </button>
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
};

export default ImageUpload;
