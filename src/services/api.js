import axios from 'axios';

const API_BASE_URL_PHASE_ONE = 'https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseOne';
const API_BASE_URL_PHASE_TWO = 'https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo';

export const submitUserData = async (userData) => {
  try {
    const response = await axios.post(API_BASE_URL_PHASE_ONE, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('API Error:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to submit data'
    };
  }
};

export const submitImageData = async (imageData) => {
  try {
    const response = await axios.post(API_BASE_URL_PHASE_TWO, imageData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('API Error:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to submit image data'
    };
  }
};
