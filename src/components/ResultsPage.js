import React, { useState } from 'react';

const ResultsPage = ({ results, userData, onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState('race');
  const [selectedOption, setSelectedOption] = useState(null);

  const demographicsData = {
    race: {
      title: 'RACE',
      options: [
        { label: 'East Asian', confidence: 96 },
        { label: 'White', confidence: 6 },
        { label: 'Black', confidence: 3 },
        { label: 'South Asian', confidence: 2 },
        { label: 'Latino Hispanic', confidence: 0 },
        { label: 'South East Asian', confidence: 0 },
        { label: 'Middle Eastern', confidence: 0 }
      ],
    },
    age: {
      title: 'AGE',
      options: [
        { label: '20-29', confidence: 45 },
        { label: '30-39', confidence: 35 },
        { label: '40-49', confidence: 15 },
        { label: '50+', confidence: 5 }
      ],
    },
    sex: {
      title: 'SEX',
      options: [
        { label: 'Female', confidence: 88 },
        { label: 'Male', confidence: 12 }
      ],
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedOption(null);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleReset = () => {
    setSelectedOption(null);
  };

  const handleConfirm = () => {
    alert(`Confirmed selection: ${selectedOption?.label || 'None'}`);
  };

  // Helper function to render pie chart using SVG
  const renderPieChart = (percentage) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <svg width="120" height="120" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#eee"
          strokeWidth="15"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#000"
          strokeWidth="15"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
        />
        <text
          x="60"
          y="65"
          textAnchor="middle"
          fontSize="24"
          fontWeight="bold"
          fill="#000"
        >
          {percentage}%
        </text>
      </svg>
    );
  };

  return (
    <div className="results-page minimal-layout" style={{ color: 'black', backgroundColor: 'white', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ padding: '20px 40px', borderBottom: '1px solid #ccc' }}>
        <h2 style={{ fontWeight: 'bold', fontSize: '24px', letterSpacing: '0.1em' }}>SKINSTRIC &nbsp;&nbsp;|&nbsp;&nbsp; ANALYSIS</h2>
      </header>

      <main style={{ display: 'flex', height: 'calc(100vh - 80px)', padding: '20px 40px' }}>
        {/* Left vertical menu */}
        <nav style={{ width: '15%', borderRight: '1px solid #ccc', display: 'flex', flexDirection: 'column' }}>
          {Object.keys(demographicsData).map((category) => (
            <button
              key={category}
              onClick={() => handleCategorySelect(category)}
              style={{
                backgroundColor: selectedCategory === category ? 'black' : 'white',
                color: selectedCategory === category ? 'white' : 'black',
                border: 'none',
                padding: '15px',
                textAlign: 'left',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '14px',
                letterSpacing: '0.05em',
                borderBottom: '1px solid #ccc'
              }}
            >
              {demographicsData[category].title}
            </button>
          ))}
        </nav>

        {/* Middle selected analysis chart or text */}
        <section style={{ flex: 1, padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {selectedOption ? (
            <div onClick={() => setSelectedOption(null)} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
              {renderPieChart(selectedOption.confidence, 200)}
              <span style={{ fontSize: '24px', fontWeight: 'bold' }}>{selectedOption.label}</span>
            </div>
          ) : null}
        </section>

        {/* Right confidence breakdown list as text with highlight */}
        <aside style={{ width: '25%', borderLeft: '1px solid #ccc', paddingLeft: '20px', backgroundColor: '#f9f9f9' }}>
          <h3 style={{ fontWeight: 'bold', fontSize: '14px', padding: '10px 15px', borderBottom: '1px solid #ccc', backgroundColor: '#e0e0e0', letterSpacing: '0.1em' }}>
            {demographicsData[selectedCategory].title.toUpperCase()} &nbsp;&nbsp; A.I. CONFIDENCE
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {demographicsData[selectedCategory].options.map((option) => (
              <li
                key={option.label}
                onClick={() => handleOptionSelect(option)}
                style={{
                  padding: '10px 15px',
                  cursor: 'pointer',
                  backgroundColor: selectedOption?.label === option.label ? '#000' : 'transparent',
                  color: selectedOption?.label === option.label ? '#fff' : '#000',
                  fontWeight: selectedOption?.label === option.label ? 'bold' : 'normal',
                  borderBottom: '1px solid #ddd',
                  display: 'flex',
                  justifyContent: 'space-between',
                  userSelect: 'none'
                }}
              >
                <span>{option.label}</span>
                <span>{option.confidence} %</span>
              </li>
            ))}
          </ul>
        </aside>
      </main>

      {/* Footer buttons */}
      <footer style={{ padding: '10px 40px', borderTop: '1px solid #ccc', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
        <button onClick={onBack} style={{ padding: '10px 20px', fontWeight: 'bold', cursor: 'pointer' }}>BACK</button>
        <button onClick={handleReset} style={{ padding: '10px 20px', fontWeight: 'bold', cursor: 'pointer' }}>RESET</button>
        <button onClick={handleConfirm} disabled={!selectedOption} style={{ padding: '10px 20px', fontWeight: 'bold', cursor: selectedOption ? 'pointer' : 'not-allowed' }}>CONFIRM</button>
      </footer>
    </div>
  );
};

export default ResultsPage;
