import { validateProfileForm } from '../services/userService';
import { authMiddleware } from '../middlewares/authMiddleware';
import { useCallback } from 'react';
import { useUser } from '../context/UserContext';

export const useUserController = () => {

  const { profile, updateProfile } = useUser();

  const updateProfileController = useCallback((formData) => {

    const middleware = authMiddleware(formData);
    if (!middleware.passed) {
      return { success: false, message: middleware.error };
    }

    const validation = validateProfileForm(formData);
    if (!validation.isValid) {
      return { success: false, message: validation.error };
    }

    updateProfile(formData);

    return { success: true, message: 'Profile updated successfully' };

  }, [updateProfile]);

  const getProfileController = useCallback(() => {
    console.log('Getting profile:', profile);
    return profile;
  }, [profile]);

  return { updateProfileController, getProfileController };

};