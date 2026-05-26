import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ScrollView,
  Keyboard,
  Platform,
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import styles from '../styles/HomeStyles';

import { saveTrip } from '../storage/FirestoreService';
import { useAuth } from '../context/AuthContext';
import { useTripController } from '../controllers/tripController';
import { TripSummaryModal } from './PaymentScreen';
import PaymentScreen from './PaymentScreen';

const VEHICLE_CONFIG = {
  economic: { emoji: '🚗', label: 'Economy', rate: 2000 },
  xl: { emoji: '🚙', label: 'XL', rate: 3500 },
  premium: { emoji: '✨', label: 'Premium', rate: 5000 },
};

function useKeyboardHeight() {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showEvent =
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent =
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const onShow = e => setKeyboardHeight(e.endCoordinates.height);
    const onHide = () => setKeyboardHeight(0);

    const s1 = Keyboard.addListener(showEvent, onShow);
    const s2 = Keyboard.addListener(hideEvent, onHide);

    return () => {
      s1.remove();
      s2.remove();
    };
  }, []);

  return keyboardHeight;
}

const HomeScreen = () => {
  const [originText, setOriginText] = useState('');
  const [destinationText, setDestinationText] = useState('');
  const [originResults, setOriginResults] = useState([]);
  const [destinationResults, setDestinationResults] = useState([]);
  const [originCoords, setOriginCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  const [tripStarted, setTripStarted] = useState(false);
  const [vehicleType, setVehicleType] = useState('');
  const [price, setPrice] = useState(0);
  const [distanceKm, setDistanceKm] = useState(0);
  const [carPosition, setCarPosition] = useState({
    latitude: 6.2442,
    longitude: -75.5812,
  });
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [currentTripId, setCurrentTripId] = useState(null);

  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [showPaymentScreen, setShowPaymentScreen] = useState(false);

  const mapRef = useRef(null);
  const { user } = useAuth();
  const keyboardHeight = useKeyboardHeight();

  const searchPlaces = async (text, type) => {
    if (text.length < 3) {
      type === 'origin' ? setOriginResults([]) : setDestinationResults([]);
      return;
    }
    try {
      const response = await fetch(
        `https://photon.komoot.io/api/?q=${encodeURIComponent(text)}&limit=5`,
      );
      const data = await response.json();
      const places = data.features || [];

      type === 'origin'
        ? setOriginResults(places)
        : setDestinationResults(places);
    } catch (error) {
      console.log('SEARCH ERROR:', error);
    }
  };

  const calculatePrice = (km, type) => {
    const rate = VEHICLE_CONFIG[type]?.rate || 0;
    const total = Math.round(Number(km) * Number(rate));
    setPrice(total);
  };

  const getRoute = async (start, end) => {
    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${start.longitude},${start.latitude};${end.longitude},${end.latitude}?overview=full&geometries=geojson`;
      const response = await fetch(url);
      const data = await response.json();

      if (!data.routes || data.routes.length === 0) {
        Alert.alert('Error', 'No route found');
        return;
      }

      const route = data.routes[0];
      const coordinates = route.geometry.coordinates.map(item => ({
        latitude: item[1],
        longitude: item[0],
      }));

      setRouteCoordinates(coordinates);
      const km = route.distance / 1000;
      setDistanceKm(km);

      if (vehicleType) calculatePrice(km, vehicleType);

      mapRef.current?.fitToCoordinates(coordinates, {
        edgePadding: { top: 100, right: 50, bottom: 320, left: 50 },
        animated: true,
      });

      setCarPosition(coordinates[0]);
    } catch (error) {
      console.log('ROUTE ERROR:', error);
    }
  };

  const handleRequestTrip = async () => {
    if (!originCoords || !destinationCoords || !vehicleType) {
      Alert.alert(
        'Missing information',
        'Please select origin, destination and vehicle type',
      );
      return;
    }
    try {
      const result = await saveTrip(user?.uid, {
        origin: originText,
        destination: destinationText,
        vehicleType,
        price,
        distanceKm,
        createdAt: new Date(),
      });

      if (result.success) setCurrentTripId(result.tripId);

      setTripStarted(true);
      setIsFormVisible(false);
      Alert.alert('Trip requested successfully 🚗');
    } catch (error) {
      console.log('SAVE TRIP ERROR:', error);
      Alert.alert('Error saving trip');
    }
  };

  useEffect(() => {
    if (!tripStarted || routeCoordinates.length === 0) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index >= routeCoordinates.length) {
        clearInterval(interval);
        setTripStarted(false);
        setShowSummaryModal(true);
        return;
      }

      const newPosition = routeCoordinates[index];
      setCarPosition(newPosition);

      mapRef.current?.animateToRegion({
        latitude: newPosition.latitude,
        longitude: newPosition.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

      index++;
    }, 700);

    return () => clearInterval(interval);
  }, [tripStarted, routeCoordinates]);

  const handlePaymentDone = () => {
    setShowPaymentScreen(false);
    setShowSummaryModal(false);
    setIsFormVisible(true);
    setOriginText('');
    setDestinationText('');
    setOriginCoords(null);
    setDestinationCoords(null);
    setRouteCoordinates([]);
    setVehicleType('');
    setPrice(0);
    setDistanceKm(0);
    setCurrentTripId(null);
  };

  useEffect(() => {
    if (distanceKm > 0 && vehicleType) {
      calculatePrice(distanceKm, vehicleType);
    }
  }, [distanceKm, vehicleType]);

  if (showPaymentScreen) {
    return (
      <PaymentScreen
        tripData={{
          tripId: currentTripId,
          origin: originText,
          destination: destinationText,
          price,
          distanceKm,
          vehicleType,
        }}
        onPaymentDone={handlePaymentDone}
        onBack={() => {
          setShowPaymentScreen(false);
          setShowSummaryModal(true);
        }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 6.2442,
          longitude: -75.5812,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {originCoords && (
          <Marker coordinate={originCoords} pinColor="green" title="Origin" />
        )}
        {destinationCoords && (
          <Marker
            coordinate={destinationCoords}
            pinColor="red"
            title="Destination"
          />
        )}
        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeWidth={5}
            strokeColor="#0A0A0A"
          />
        )}
        {tripStarted && <Marker coordinate={carPosition} title="Your Car" />}
      </MapView>

      {!isFormVisible && !showSummaryModal && (
        <TouchableOpacity
          onPress={() => setIsFormVisible(true)}
          style={styles.floatingSearchButton}
          activeOpacity={0.85}
        >
          <View
            style={{ flexDirection: 'column', alignItems: 'center', gap: 3 }}
          >
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: '#22C55E',
              }}
            />
            <View
              style={{ width: 1.5, height: 10, backgroundColor: '#E0E0E0' }}
            />
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: '#EF4444',
              }}
            />
          </View>

          <View style={styles.floatingSearchTextWrap}>
            <Text style={styles.floatingSearchTitle}>Where to?</Text>
            {originText ? (
              <Text style={styles.floatingSearchSub} numberOfLines={1}>
                From {originText}
              </Text>
            ) : null}
          </View>

          <View style={styles.floatingSearchArrow}>
            <Text style={styles.floatingSearchArrowText}>›</Text>
          </View>
        </TouchableOpacity>
      )}

      <TripSummaryModal
        visible={showSummaryModal}
        tripData={{
          origin: originText,
          destination: destinationText,
          price,
          distanceKm,
          vehicleType,
        }}
        onPay={() => {
          setShowSummaryModal(false);
          setShowPaymentScreen(true);
        }}
        onClose={() => setShowSummaryModal(false)}
      />

      {isFormVisible && (
        <View style={styles.bottomCard}>
          <View style={styles.dragHandle} />

          <View style={styles.headerRow}>
            <View>
              <Text style={styles.title}>Where are you going?</Text>
              <Text style={styles.subtitle}>
                {distanceKm > 0
                  ? `${distanceKm.toFixed(1)} km route found`
                  : 'Enter your route below'}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                Keyboard.dismiss();
                setIsFormVisible(false);
              }}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: keyboardHeight > 0 ? keyboardHeight - 20 : 0,
            }}
          >
            <View style={styles.inputWrapper}>
              <View style={[styles.inputDot, styles.inputDotOrigin]} />
              <TextInput
                placeholder="Origin"
                placeholderTextColor="#BBBBBB"
                value={originText}
                onChangeText={text => {
                  setOriginText(text);
                  setOriginCoords(null);
                  searchPlaces(text, 'origin');
                }}
                style={styles.input}
              />
            </View>

            {originResults.length > 0 && (
              <FlatList
                keyboardShouldPersistTaps="handled"
                data={originResults}
                keyExtractor={(_, i) => i.toString()}
                style={styles.suggestionContainer}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.suggestionItem}
                    onPress={() => {
                      const coords = {
                        latitude: item.geometry.coordinates[1],
                        longitude: item.geometry.coordinates[0],
                      };
                      setOriginCoords(coords);
                      setOriginText(item.properties.name || 'Selected Origin');
                      setOriginResults([]);
                      Keyboard.dismiss();
                      if (destinationCoords)
                        getRoute(coords, destinationCoords);
                    }}
                  >
                    <Text style={{ fontSize: 14, marginRight: 10 }}>📍</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.suggestionText} numberOfLines={1}>
                        {item.properties.name || 'Location'}
                      </Text>
                      {item.properties.city ? (
                        <Text
                          style={{ fontSize: 12, color: '#999', marginTop: 1 }}
                        >
                          {item.properties.city}
                        </Text>
                      ) : null}
                    </View>
                  </TouchableOpacity>
                )}
              />
            )}

            <View style={styles.inputWrapper}>
              <View style={[styles.inputDot, styles.inputDotDestination]} />
              <TextInput
                placeholder="Destination"
                placeholderTextColor="#BBBBBB"
                value={destinationText}
                onChangeText={text => {
                  setDestinationText(text);
                  setDestinationCoords(null);
                  searchPlaces(text, 'destination');
                }}
                style={styles.input}
              />
            </View>

            {destinationResults.length > 0 && (
              <FlatList
                keyboardShouldPersistTaps="handled"
                data={destinationResults}
                keyExtractor={(_, i) => i.toString()}
                style={styles.suggestionContainer}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.suggestionItem}
                    onPress={() => {
                      const coords = {
                        latitude: item.geometry.coordinates[1],
                        longitude: item.geometry.coordinates[0],
                      };
                      setDestinationCoords(coords);
                      setDestinationText(
                        item.properties.name || 'Selected Destination',
                      );
                      setDestinationResults([]);
                      Keyboard.dismiss();
                      if (originCoords) getRoute(originCoords, coords);
                    }}
                  >
                    <Text style={{ fontSize: 14, marginRight: 10 }}>📍</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.suggestionText} numberOfLines={1}>
                        {item.properties.name || 'Location'}
                      </Text>
                      {item.properties.city ? (
                        <Text
                          style={{ fontSize: 12, color: '#999', marginTop: 1 }}
                        >
                          {item.properties.city}
                        </Text>
                      ) : null}
                    </View>
                  </TouchableOpacity>
                )}
              />
            )}

            <Text style={styles.sectionLabel}>Choose ride</Text>
            <View style={styles.vehicleContainer}>
              {Object.entries(VEHICLE_CONFIG).map(([key, config]) => (
                <TouchableOpacity
                  key={key}
                  style={[
                    styles.vehicleButton,
                    vehicleType === key && styles.selectedVehicle,
                  ]}
                  onPress={() => {
                    setVehicleType(key);
                    if (distanceKm > 0) calculatePrice(distanceKm, key);
                  }}
                  activeOpacity={0.75}
                >
                  <Text style={styles.vehicleEmoji}>{config.emoji}</Text>
                  <Text
                    style={[
                      styles.vehicleText,
                      vehicleType === key && styles.selectedVehicleText,
                    ]}
                  >
                    {config.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.tripInfoRow}>
              <View style={styles.tripInfoCard}>
                <Text style={styles.tripInfoLabel}>Estimated fare</Text>
                <Text style={styles.price}>${price.toLocaleString()}</Text>
              </View>
              <View style={styles.tripInfoCard}>
                <Text style={styles.tripInfoLabel}>Distance</Text>
                <Text style={styles.price}>
                  {distanceKm.toFixed(1)}
                  <Text style={styles.priceUnit}> km</Text>
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.requestButton}
              onPress={handleRequestTrip}
              activeOpacity={0.85}
            >
              <Text style={{ fontSize: 18, marginRight: 8 }}>🚗</Text>
              <Text style={styles.requestButtonText}>Request Trip</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
