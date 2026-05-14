const authMiddleware = (formData) => {

  const fields = Object.keys(formData);

  for (let field of fields) {
    if (formData[field] === null || formData[field] === undefined) {
      return {
        passed: false,
        error: `${field} cannot be null`,
      };
    }
  }

  return { passed: true, error: null };
};

export { authMiddleware };