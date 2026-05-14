export const validateRegisterForm = (formData) => {

  const { fullName, phoneNumber, gender, email, language } = formData;

  if (!fullName || fullName.trim() === '') {
    return { isValid: false, error: 'Full name is required' };
  }
  if (fullName.trim().length > 50) {
    return { isValid: false, error: 'Full name must be less than 50 characters' };
  }

  if (!phoneNumber || phoneNumber.trim() === '') {
    return { isValid: false, error: 'Phone number is required' };
  }
  if (isNaN(phoneNumber)) {
    return { isValid: false, error: 'Phone number must contain only numbers' };
  }

  if (!gender || gender.trim() === '') {
    return { isValid: false, error: 'Gender is required' };
  }

  if (!email || email.trim() === '') {
    return { isValid: false, error: 'Email is required' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Email is not valid' };
  }

  if (!language || language.trim() === '') {
    return { isValid: false, error: 'Language is required' };
  }

  return { isValid: true, error: null };

};

export const validateLoginForm = (formData) => {

  const { email, password } = formData;

  if (!email || email.trim() === '') {
    return { isValid: false, error: 'Email is required' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Email is not valid' };
  }

  if (!password || password.trim() === '') {
    return { isValid: false, error: 'Password is required' };
  }
  if (password.length < 6) {
    return { isValid: false, error: 'Password must be at least 6 characters' };
  }

  return { isValid: true, error: null };

};