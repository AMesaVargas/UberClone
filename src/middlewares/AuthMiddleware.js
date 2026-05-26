const authMiddleware = formData => {
  if (!formData.paymentMethod) {
    return {
      passed: false,
      error: 'Payment method cannot be null',
    };
  }

  if (formData.paymentMethod === 'card') {
    if (!formData.cardNumber || formData.cardNumber.trim() === '') {
      return {
        passed: false,
        error: 'Card number cannot be null',
      };
    }
  }

  return {
    passed: true,
    error: null,
  };
};

export { authMiddleware };
