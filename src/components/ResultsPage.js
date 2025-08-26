import React, { useState } from 'react';
import './ResultsPage.css';

// Category icons (using emojis for simplicity - can be replaced with SVG icons)
const categoryIcons = {
  age: '👤',
  gender: '⚧️',
  ethnicity: '🌍',
  emotion: '😊',
  skinType: '✨'
};

// Category colors for better visual distinction
const categoryColors = {
  age: { primary: '#4CAF50', secondary: '#E8F5E8' },
  gender: { primary: '#2196F3', secondary: '#E3F2FD' },
  ethnicity: { primary: '#9C27B0', secondary: '#F3E5F5' },
  emotion: { primary: '#FF9800', secondary: '#FFF3E0' },
  skinType: { primary: '#795548', secondary: '#EFEBE9' }
};

const ResultsPage = ({ results, userData, onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Mock detailed AI results with percentages
  const detailedResults = {
    age: {
      title: 'Age Analysis',
      prediction: results?.age || 25,
      confidence: 92,
      breakdown: [
        { range: '18-25', percentage: 45 },
        { range: '26-35', percentage: 35 },
        { range: '36-45', percentage: 15 },
        { range: '46+', percentage: 5 }
      ]
    },
    gender: {
      title: 'Gender Analysis',
      prediction: results?.gender || 'Male',
      confidence: 88,
      breakdown: [
        { label: 'Male', percentage: 88 },
        { label: 'Female', percentage: 10 },
        { label: 'Non-binary', percentage: 2 }
      ]
    },
    ethnicity: {
      title: 'Ethnicity Analysis',
      prediction: results?.ethnicity || 'Asian',
      confidence: 85,
      breakdown: [
        { label: 'Asian', percentage: 85 },
        { label: 'Caucasian', percentage: 8 },
        { label: 'African', percentage: 4 },
        { label: 'Hispanic', percentage: 2 },
        { label: 'Mixed', percentage: 1 }
      ]
    },
    emotion: {
      title: 'Emotion Analysis',
      prediction: results?.emotion || 'Happy',
      confidence: 90,
      breakdown: [
        { label: 'Happy', percentage: 90 },
        { label: 'Neutral', percentage: 6 },
        { label: 'Surprised', percentage: 3 },
        { label: 'Confident', percentage: 1 }
      ]
    },
    skinType: {
      title: 'Skin Type Analysis',
      prediction: results?.skinType || 'Normal',
      confidence: 87,
      breakdown: [
        { label: 'Normal', percentage: 87 },
        { label: 'Oily', percentage: 8 },
        { label: 'Dry', percentage: 3 },
        { label: 'Combination', percentage: 2 }
      ]
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedCategory(null);
  };

  const renderProgressBar = (percentage) => {
    return (
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ 
            width: `${percentage}%`,
            minWidth: percentage > 0 ? '20px' : '0px',
            background: percentage >= 50 
              ? 'linear-gradient(90deg, #4CAF50, #45a049)' 
              : percentage >= 20 
              ? 'linear-gradient(90deg, #FF9800, #f57c00)' 
              : 'linear-gradient(90deg, #f44336, #d32f2f)'
          }}
        />
      </div>
    );
  };

  return (
    <div className="results-page">
      <div className="results-header">
        <h1>AI Analysis Results</h1>
        <p>Hello {userData?.name} from {userData?.location}</p>
      </div>

      <div className="results-grid">
        {Object.entries(detailedResults).map(([key, data]) => {
          const colors = categoryColors[key];
          return (
            <div 
              key={key} 
              className="result-card clickable"
              onClick={() => handleCategoryClick(key)}
              style={{ 
                '--primary-color': colors.primary,
                '--secondary-color': colors.secondary,
                borderLeft: `4px solid ${colors.primary}`
              }}
            >
              <div className="icon">{categoryIcons[key]}</div>
              <h3>{data.title}</h3>
              <p className="prediction">{data.prediction}</p>
              <div className="confidence-badge">
                <span className="confidence-value">{data.confidence}%</span>
                <span className="confidence-label">Confidence</span>
              </div>
              <button className="view-details-btn">View Analysis</button>
            </div>
          );
        })}
      </div>

      {showDetails && selectedCategory && (
        <div className="details-modal">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title-container">
                <span className="modal-icon">{categoryIcons[selectedCategory]}</span>
                <h2>{detailedResults[selectedCategory].title}</h2>
              </div>
              <button className="close-btn" onClick={handleCloseDetails}>×</button>
            </div>
            
            <div className="modal-body">
              <div 
                className="prediction-summary"
                style={{ 
                  background: categoryColors[selectedCategory].secondary,
                  borderLeft: `4px solid ${categoryColors[selectedCategory].primary}`
                }}
              >
                <div className="summary-content">
                  <h3>AI Prediction</h3>
                  <p className="main-prediction">{detailedResults[selectedCategory].prediction}</p>
                  <div className="confidence-meter">
                    <span className="meter-label">Confidence Level</span>
                    <div className="meter-bar">
                      <div 
                        className="meter-fill"
                        style={{ 
                          width: `${detailedResults[selectedCategory].confidence}%`,
                          minWidth: detailedResults[selectedCategory].confidence > 0 ? '20px' : '0px',
                          background: detailedResults[selectedCategory].confidence >= 80 
                            ? 'linear-gradient(90deg, #4CAF50, #45a049)' 
                            : detailedResults[selectedCategory].confidence >= 60 
                            ? 'linear-gradient(90deg, #FF9800, #f57c00)' 
                            : 'linear-gradient(90deg, #f44336, #d32f2f)'
                        }}
                      />
                      <span className="meter-value">{detailedResults[selectedCategory].confidence}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="breakdown-section">
                <h4 className="breakdown-title">
                  <span className="title-icon">📊</span>
                  Detailed Analysis Breakdown
                </h4>
                <div className="breakdown-list">
                  {detailedResults[selectedCategory].breakdown.map((item, index) => (
                    <div key={index} className="breakdown-item">
                      <div className="breakdown-info">
                        <span className="breakdown-label">{item.label || item.range}</span>
                        <span className="breakdown-percentage">{item.percentage}%</span>
                      </div>
                      <div className="progress-container">
                        {renderProgressBar(item.percentage)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button onClick={handleCloseDetails} className="btn btn-primary">
                Close Analysis
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="navigation-buttons">
        <button onClick={onBack} className="btn btn-secondary">
          Back
        </button>
      </div>
    </div>
  );
};

export default ResultsPage;
