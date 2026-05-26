export const validateTripHistory = trips => {
  if (!trips || trips.length === 0) {
    return { isValid: false, error: 'No trips found' };
  }

  return { isValid: true, error: null };
};

export const filterTripsByStatus = (trips, status) => {
  if (!trips || trips.length === 0) {
    return { success: false, error: 'No trips found' };
  }
  const Valid_status = ['completed', 'cancelled'];
  if (!Valid_status.includes(status)) {
    return { success: false, error: 'Invalid status filter' };
  }

  if (status == 'all') {
    return { success: true, trips };
  }

  const filteredTrips = trips.filter(trip => trip.status === status);
  return { success: true, trips: filteredTrips };
};

export const calculateTotalSpent = trips => {
  if (!trips || trips.length === 0) {
    return { success: false, error: 'No trips found' };
  }

  const total = trips.reduce((acc, trip) => acc + trip.fare, 0);

  return { success: true, total };
};
