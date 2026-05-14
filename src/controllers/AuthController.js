import { validateRegisterForm, validateLoginForm } from '../services/AuthServices';
import { authMiddleware } from '../middlewares/authMiddleware';
import { useCallback } from 'react';
import { useAuth } from '../context/AuthContext';

export const useAuthController = () => {
const { login, logout } = useAuth();

  const registerController = useCallback((formData) => {

    const middleware = authMiddleware(formData);
    if (!middleware.passed) {
      return { success: false, message: middleware.error };
    }

    const validation = validateRegisterForm(formData);
    if (!validation.isValid) {
      return { success: false, message: validation.error };
    }

    login(formData);

    return { success: true, message: 'Register successful' };

  }, [login]);

  const loginController = useCallback((formData) => {

    const middleware = authMiddleware(formData);
    if (!middleware.passed) {
      return { success: false, message: middleware.error };
    }

    const validation = validateLoginForm(formData);
    if (!validation.isValid) {
      return { success: false, message: validation.error };
    }

    login(formData);

    return { success: true, message: 'Login successful' };

  }, [login]);

  const logoutController = useCallback(() => {
    logout();
    console.log('User logged out');
  }, [logout]);

  return { registerController, loginController, logoutController };

};