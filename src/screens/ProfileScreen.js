import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import {
  getUserTrips,
  getUserPayments,
  getUser,
} from '../storage/FirestoreService';
import styles from '../styles/ProfileStyles';

const ProfileScreen = () => {
  const { user, logout } = useAuth();

  const [totalTrips, setTotalTrips] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [userData, setUserData] = useState(null);
  const [loadingData, setLoadingData] = useState(true);

  const loadProfileData = useCallback(async () => {
    if (!user?.uid) return;

    const userResult = await getUser(user.uid);
    if (userResult.success) {
      setUserData(userResult.data);
    }

    const tripsResult = await getUserTrips(user.uid);
    const paymentsResult = await getUserPayments(user.uid);

    if (tripsResult.success) {
      setTotalTrips(tripsResult.trips.length);
    }

    if (paymentsResult.success) {
      const total = paymentsResult.payments.reduce(
        (acc, item) => acc + Number(item.amount),
        0,
      );
      setTotalSpent(total);
    }

    setLoadingData(false);
  }, [user]);

  useEffect(() => {
    loadProfileData();
  }, [loadProfileData]);

  const handleLogout = () => {
    Alert.alert('Logout', 'Do you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: logout },
    ]);
  };

  if (loadingData) {
    return (
      <View style={styles.loaderContainer || styles.container}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  const imageSource = userData?.photoUrl
    ? { uri: userData.photoUrl }
    : {
        uri: 'https://ui-avatars.com/api/?name=User&background=E5E7EB&color=1F2937&size=250',
      };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image source={imageSource} style={styles.avatarImage} />
      </View>

      <Text style={styles.name}>{userData?.fullName || 'Uber Clone User'}</Text>
      <Text style={styles.email}>{user?.email}</Text>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{totalTrips}</Text>
          <Text style={styles.statLabel}>Trips</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statValue}>${totalSpent.toLocaleString()}</Text>
          <Text style={styles.statLabel}>Spent</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
