import {
  validateTripForm,
  calculateFare,
  getVehicleCategories,
} from '../services/tripServices.';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import { useCallback, useState } from 'react';

export const useTripController = () => {
  const [currentTrip, setCurrentTrip] = useState(null);

  const [fare, setFare] = useState(null);

  const requestTripController = useCallback(formData => {
    const middleware = authMiddleware(formData);
    if (!middleware.passed) {
      return { success: false, message: middleware.error };
    }

    const validation = validateTripForm(formData);
    if (!validation.isValid) {
      return { success: false, message: validation.error };
    }

    setCurrentTrip(formData);
    console.log('Trip requested:', formData);

    return { success: true, message: 'Trip requested successfully' };
  }, []);

  const calculateFareController = useCallback((vehicleCategory, distanceKm) => {
    const result = calculateFare(vehicleCategory, distanceKm);

    if (!result.success) {
      return { success: false, message: result.error };
    }

    setFare(result.fare);
    console.log('Fare calculated:', result);

    return {
      success: true,
      fare: result.fare,
      vehicleName: result.vehicleName,
    };
  }, []);

  const getVehicleCategoriesController = useCallback(() => {
    const categories = getVehicleCategories();
    console.log('Vehicle categories:', categories);
    return categories;
  }, []);

  return {
    currentTrip,
    fare,
    requestTripController,
    calculateFareController,
    getVehicleCategoriesController,
  };
};
