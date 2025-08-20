import axios from 'axios';

const API_BASE_URL = 'https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseOne';

export const submitUserData = async (userData) => {
  try {
    const response = await axios.post(API_BASE_URL, userData, {
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
