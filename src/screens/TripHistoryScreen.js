import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';

import { useAuth } from '../context/AuthContext';
import { getUserTrips } from '../storage/FirestoreService';
import styles from '../styles/TripHistoryStyles';

const VEHICLE_EMOJIS = {
  economic: '🚗',
  xl: '🚙',
  premium: '✨',
};

const STATUS_COLORS = {
  pending: '#F59E0B',
  completed: '#22C55E',
  cancelled: '#EF4444',
};

const TripHistoryScreen = () => {
  const { user } = useAuth();

  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadTrips = useCallback(async () => {
    if (!user?.uid) return;

    const result = await getUserTrips(user.uid);

    if (result.success) {
      setTrips(result.trips);
    }

    setLoading(false);
    setRefreshing(false);
  }, [user]);

  useEffect(() => {
    loadTrips();
  }, [loadTrips]);

  const onRefresh = () => {
    setRefreshing(true);
    loadTrips();
  };

  const renderTrip = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardTop}>
          <Text style={styles.vehicle}>{VEHICLE_EMOJIS[item.vehicleType]}</Text>

          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor: STATUS_COLORS[item.status] || '#999',
              },
            ]}
          >
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>

        <Text style={styles.locationLabel}>FROM</Text>
        <Text style={styles.locationText}>{item.origin}</Text>

        <Text style={[styles.locationLabel, { marginTop: 12 }]}>TO</Text>
        <Text style={styles.locationText}>{item.destination}</Text>

        <View style={styles.infoRow}>
          <View>
            <Text style={styles.infoLabel}>Distance</Text>
            <Text style={styles.infoValue}>
              {Number(item.distanceKm).toFixed(1)} km
            </Text>
          </View>

          <View>
            <Text style={styles.infoLabel}>Price</Text>
            <Text style={styles.price}>
              ${Number(item.price).toLocaleString()}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Trips</Text>

      <FlatList
        data={trips}
        keyExtractor={item => item.id}
        renderItem={renderTrip}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>No trips yet 🚖</Text>
        }
      />
    </View>
  );
};

export default TripHistoryScreen;
