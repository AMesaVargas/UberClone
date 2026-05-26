import {
  validateTripHistory,
  filterTripsByStatus,
  calculateTotalSpent,
} from '../services/tripHistoryService';
import { useCallback, useState } from 'react';

export const useTripHistoryController = () => {
  const [trips, setTrips] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const getTripsController = useCallback(tripsData => {
    const validation = validateTripHistory(tripsData);
    if (!validation.isValid) {
      return { success: false, message: validation.error };
    }

    setTrips(tripsData);
    console.log('Trips loaded:', tripsData);

    return { success: true, trips: tripsData };
  }, []);

  const filterTripsController = useCallback(
    status => {
      const result = filterTripsByStatus(trips, status);

      if (!result.success) {
        return { success: false, message: result.error };
      }

      console.log('Trips filtered:', result.trips);

      return { success: true, trips: result.trips };
    },
    [trips],
  );

  const calculateTotalSpentController = useCallback(() => {
    const result = calculateTotalSpent(trips);

    if (!result.success) {
      return { success: false, message: result.error };
    }

    setTotalSpent(result.total);
    console.log('Total spent:', result.total);

    return { success: true, total: result.total };
  }, [trips]);

  return {
    trips,
    totalSpent,
    getTripsController,
    filterTripsController,
    calculateTotalSpentController,
  };
};
