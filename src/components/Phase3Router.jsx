import React, { useState } from 'react';
import ResultsPage from './ResultsPage';

const Phase3Router = ({ demographicData, onBack, onComplete }) => {
  const [currentPage, setCurrentPage] = useState('results');
  const [confirmedDemographics, setConfirmedDemographics] = useState(null);

  console.log('Phase3Router received demographicData:', demographicData);

  const handleDemographicsClick = () => {
    console.log('Demographics section clicked - completing phase');
    console.log('Current demographicData:', demographicData);
    onComplete(demographicData);
  };

  const handleResultsBack = () => {
    console.log('Back from results page');
    onBack();
  };

  const handleGetSummary = () => {
    console.log('Get Summary clicked - completing phase');
    onComplete(demographicData);
  };

  const renderCurrentPage = () => {
    return (
      <ResultsPage
        results={demographicData}
        onDemographicsClick={handleDemographicsClick}
        onBack={handleResultsBack}
        onGetSummary={handleGetSummary}
      />
    );
  };

  return (
    <div className="phase3-router">
      {renderCurrentPage()}
    </div>
  );
};

export default Phase3Router;
