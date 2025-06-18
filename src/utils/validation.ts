// validation.js

// Email Validation Function
export const validateEmail = (email:string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return 'Email is required.';
  } else if (!emailRegex.test(email)) {
    return 'Please enter a valid email.';
  }
  return '';
};


export const validatePassword = (password: string) => {
  if (!password) {
    return 'Password is required.';
  } else if (password.length < 6) {
    return 'Password must be at least 6 characters.';
  }
  return '';
};

export const validateConfirmPassword = (password:string, confirmPassword:string) => {
  if (password !== confirmPassword) {
    return 'Passwords do not match.';
  }
  return '';
};