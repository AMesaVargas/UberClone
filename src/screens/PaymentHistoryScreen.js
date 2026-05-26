import React, { useEffect, useState, useCallback } from 'react';

import { View, Text, FlatList, ActivityIndicator } from 'react-native';

import { useAuth } from '../context/AuthContext';

import { getUserPayments } from '../storage/FirestoreService';

import styles from '../styles/TripHistoryStyles';

const PAYMENT_ICONS = {
  mercadopago: '🤝',
  card: '💳',
};

const PaymentsHistoryScreen = () => {
  const { user } = useAuth();

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPayments = useCallback(async () => {
    const result = await getUserPayments(user.uid);

    if (result.success) {
      setPayments(result.payments);
    }

    setLoading(false);
  }, [user]);

  useEffect(() => {
    loadPayments();
  }, [loadPayments]);

  const renderPayment = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardTop}>
          <Text style={styles.vehicle}>
            {PAYMENT_ICONS[item.paymentMethod]}
          </Text>

          <View style={[styles.statusBadge, { backgroundColor: '#22C55E' }]}>
            <Text style={styles.statusText}>Paid</Text>
          </View>
        </View>

        <Text style={styles.locationText}>{item.origin}</Text>

        <Text style={styles.locationText}>{item.destination}</Text>

        <View style={styles.infoRow}>
          <View>
            <Text style={styles.infoLabel}>Method</Text>
            <Text style={styles.infoValue}>{item.paymentMethod}</Text>
          </View>

          <View>
            <Text style={styles.infoLabel}>Amount</Text>
            <Text style={styles.price}>
              ${Number(item.amount).toLocaleString()}
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
      <Text style={styles.title}>Payments</Text>

      <FlatList
        data={payments}
        keyExtractor={item => item.id}
        renderItem={renderPayment}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default PaymentsHistoryScreen;
