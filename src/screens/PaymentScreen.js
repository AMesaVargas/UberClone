import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  ActivityIndicator,
  Linking,
  Alert,
  AppState,
} from 'react-native';
import styles from '../styles/PaymentStyles';
import { usePaymentController } from '../controllers/paymentController';
import { savePayment, updateTripStatus } from '../storage/FirestoreService';
import { useAuth } from '../context/AuthContext';

export const TripSummaryModal = ({ visible, tripData, onPay, onClose }) => {
  if (!tripData) return null;

  const { origin, destination, distanceKm, price, vehicleType } = tripData;

  const VEHICLE_EMOJI = { economic: '🚗', xl: '🚙', premium: '✨' };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.summaryCard}>
          <View style={styles.dragHandle} />

          {/* Badge de llegada */}
          <View style={styles.arrivalBadge}>
            <Text style={{ fontSize: 18 }}>✅</Text>
            <Text style={styles.arrivalBadgeText}>
              You have arrived at your destination!
            </Text>
          </View>

          <Text style={styles.summaryTitle}>Trip Summary</Text>
          <Text style={styles.summarySubtitle}>
            {VEHICLE_EMOJI[vehicleType] || '🚖'}{' '}
            {vehicleType?.charAt(0).toUpperCase() + vehicleType?.slice(1)} ride
          </Text>

          {/* Ruta */}
          <View style={styles.routeRow}>
            <View style={styles.routeDots}>
              <View style={styles.dotGreen} />
              <View style={styles.dotLine} />
              <View style={styles.dotRed} />
            </View>
            <View style={styles.routeTexts}>
              <View>
                <Text style={styles.routeLabel}>From</Text>
                <Text style={styles.routeValue} numberOfLines={1}>
                  {origin}
                </Text>
              </View>
              <View style={styles.routeSpacer} />
              <View>
                <Text style={styles.routeLabel}>To</Text>
                <Text style={styles.routeValue} numberOfLines={1}>
                  {destination}
                </Text>
              </View>
            </View>
          </View>

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Distance</Text>
              <Text style={styles.statValue}>
                {Number(distanceKm).toFixed(1)}
                <Text style={styles.statUnit}> km</Text>
              </Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Total fare</Text>
              <Text style={styles.statValue}>
                <Text style={styles.statUnit}>$</Text>
                {Number(price).toLocaleString()}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.payNowButton}
            onPress={onPay}
            activeOpacity={0.85}
          >
            <Text style={{ fontSize: 18 }}>💳</Text>
            <Text style={styles.payNowButtonText}>Pay Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const PaymentScreen = ({ tripData, onPaymentDone, onBack }) => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [paymentDone, setPaymentDone] = useState(false);
  const [waitingReturn, setWaitingReturn] = useState(false);

  const { processPaymentController, loading, resetPaymentController } =
    usePaymentController();
  const { user } = useAuth();

  const METHODS = [
    {
      key: 'mercadopago',
      icon: '🤝',
      name: 'Mercado Pago',
      desc: 'Pay securely via Mercado Pago',
    },
    {
      key: 'card',
      icon: '💳',
      name: 'Credit / Debit Card',
      desc: 'Visa, Mastercard, Amex',
    },
  ];

  const handlePaymentSuccess = useCallback(async () => {
    await savePayment(user?.uid, {
      tripId: tripData.tripId || null,
      origin: tripData.origin,
      destination: tripData.destination,
      amount: tripData.price,
      distanceKm: tripData.distanceKm,
      vehicleType: tripData.vehicleType,
      paymentMethod: selectedMethod,
    });
    if (tripData.tripId) {
      await updateTripStatus(tripData.tripId, 'completed');
    }
    resetPaymentController();
    setPaymentDone(true);
  }, [user, tripData, selectedMethod, resetPaymentController]);

  useEffect(() => {
    if (!waitingReturn) return;

    const sub = AppState.addEventListener('change', state => {
      if (state === 'active') {
        setWaitingReturn(false);
        handlePaymentSuccess();
      }
    });

    return () => sub.remove();
  }, [waitingReturn, handlePaymentSuccess]);

  const handleConfirm = async () => {
    if (!selectedMethod) return;

    const amount = Number(tripData.price);

    if (!amount || amount <= 0) {
      Alert.alert('Error', 'Invalid trip amount');
      return;
    }

    const formData = {
      paymentMethod: selectedMethod,
    };

    if (selectedMethod === 'card') {
      formData.cardNumber = '1234567890123456';
    }

    const result = await processPaymentController(formData, amount, {
      id: tripData.tripId || 'viaje',
      origin: tripData.origin,
      destination: tripData.destination,
    });

    if (!result.success) {
      Alert.alert('Payment error', result.message);
      return;
    }

    if (selectedMethod === 'mercadopago' && result.urlPago) {
      const canOpen = await Linking.canOpenURL(result.urlPago);

      if (canOpen) {
        await Linking.openURL(result.urlPago);
        setWaitingReturn(true);
      } else {
        Alert.alert('Error', 'Could not open Mercado Pago');
      }

      return;
    }

    await handlePaymentSuccess();
  };

  if (paymentDone) {
    return (
      <View style={styles.successContainer}>
        <View style={styles.successIcon}>
          <Text style={styles.successIconText}>✅</Text>
        </View>
        <Text style={styles.successTitle}>Payment Successful!</Text>
        <Text style={styles.successSubtitle}>
          Your trip has been completed and payment confirmed.
        </Text>
        <Text style={styles.successAmount}>
          ${Number(tripData.price).toLocaleString()} COP
        </Text>
        <TouchableOpacity
          style={styles.doneButton}
          onPress={onPaymentDone}
          activeOpacity={0.85}
        >
          <Text style={styles.doneButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (waitingReturn) {
    return (
      <View style={styles.successContainer}>
        <ActivityIndicator size="large" color="#0A0A0A" />
        <Text style={styles.loadingText}>
          Waiting for payment confirmation...
        </Text>
        <TouchableOpacity
          style={[styles.doneButton, { marginTop: 32 }]}
          onPress={() => {
            setWaitingReturn(false);
            handlePaymentSuccess();
          }}
        >
          <Text style={styles.doneButtonText}>I already paid ✓</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Monto */}
        <View style={styles.amountCard}>
          <Text style={styles.amountLabel}>Total to pay</Text>
          <Text style={styles.amountValue}>
            <Text style={styles.amountCurrency}>$</Text>
            {Number(tripData.price).toLocaleString()}
          </Text>
          <Text style={styles.amountTrip}>
            {tripData.origin} → {tripData.destination}
          </Text>
        </View>

        {/* Métodos */}
        <Text style={styles.sectionLabel}>Payment method</Text>
        <View style={styles.methodsContainer}>
          {METHODS.map(method => (
            <TouchableOpacity
              key={method.key}
              style={[
                styles.methodCard,
                selectedMethod === method.key && styles.methodCardSelected,
              ]}
              onPress={() => setSelectedMethod(method.key)}
              activeOpacity={0.75}
            >
              <View
                style={[
                  styles.methodIconWrap,
                  selectedMethod === method.key &&
                    styles.methodIconWrapSelected,
                ]}
              >
                <Text style={styles.methodIcon}>{method.icon}</Text>
              </View>
              <View style={styles.methodInfo}>
                <Text style={styles.methodName}>{method.name}</Text>
                <Text style={styles.methodDesc}>{method.desc}</Text>
              </View>
              <View
                style={[
                  styles.methodRadio,
                  selectedMethod === method.key && styles.methodRadioSelected,
                ]}
              >
                {selectedMethod === method.key && (
                  <View style={styles.methodRadioDot} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Botón confirmar */}
        <TouchableOpacity
          style={[
            styles.confirmButton,
            (!selectedMethod || loading) && styles.confirmButtonDisabled,
          ]}
          onPress={handleConfirm}
          disabled={!selectedMethod || loading}
          activeOpacity={0.85}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Text style={{ fontSize: 18 }}>
                {selectedMethod === 'mercadopago' ? '🤝' : '💳'}
              </Text>
              <Text style={styles.confirmButtonText}>
                {selectedMethod === 'mercadopago'
                  ? 'Pay with Mercado Pago'
                  : 'Confirm Payment'}
              </Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default PaymentScreen;
