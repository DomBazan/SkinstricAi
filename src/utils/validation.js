export const validateName = (name) => {
  if (!name || typeof name !== 'string') {
    return 'Name is required';
  }
  if (/\d/.test(name)) {
    return 'Name should not contain numbers';
  }
  if (name.trim().length < 2) {
    return 'Name should be at least 2 characters';
  }
  return null;
};

export const validateLocation = (location) => {
  if (!location || typeof location !== 'string') {
    return 'Location is required';
  }
  if (/\d/.test(location)) {
    return 'Location should not contain numbers';
  }
  if (location.trim().length < 2) {
    return 'Location should be at least 2 characters';
  }
  return null;
};

export const validateForm = (name, location) => {
  const nameError = validateName(name);
  const locationError = validateLocation(location);
  
  return {
    isValid: !nameError && !locationError,
    nameError,
    locationError
  };
};
