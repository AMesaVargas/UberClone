import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },

  map: {
    width: '100%',
    height: '100%',
  },

  bottomCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 22,
    paddingTop: 14,
    paddingBottom: Platform.OS === 'ios' ? 36 : 26,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 24,
    maxHeight: '68%',
  },

  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    alignSelf: 'center',
    marginBottom: 18,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0A0A0A',
    letterSpacing: -0.5,
    marginBottom: 0,
  },

  subtitle: {
    fontSize: 13,
    color: '#999',
    marginTop: 2,
    fontWeight: '400',
  },

  inputWrapper: {
    backgroundColor: '#F7F7F7',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 14,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },

  inputDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 12,
  },

  inputDotOrigin: {
    backgroundColor: '#22C55E',
  },

  inputDotDestination: {
    backgroundColor: '#EF4444',
  },

  inputDividerLine: {
    width: 1.5,
    height: 18,
    backgroundColor: '#E5E5E5',
    marginLeft: 19,
    marginBottom: -6,
  },

  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: '#0A0A0A',
    fontWeight: '500',
  },

  suggestionContainer: {
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 10,
    marginTop: -4,
    maxHeight: 160,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 10,
    zIndex: 1000,
    overflow: 'hidden',
  },

  suggestionItem: {
    paddingVertical: 11,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#F0F0F0',
  },

  suggestionText: {
    color: '#1A1A1A',
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },

  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#999',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 10,
    marginTop: 6,
  },

  vehicleContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
    marginBottom: 18,
  },

  vehicleButton: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },

  selectedVehicle: {
    backgroundColor: '#0A0A0A',
    borderColor: '#0A0A0A',
  },

  vehicleEmoji: {
    fontSize: 22,
    marginBottom: 4,
  },

  vehicleText: {
    color: '#666',
    fontWeight: '600',
    fontSize: 12,
  },

  selectedVehicleText: {
    color: '#fff',
  },

  tripInfoRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 18,
  },

  tripInfoCard: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    borderRadius: 14,
    padding: 14,
  },

  tripInfoLabel: {
    fontSize: 11,
    color: '#999',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },

  price: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0A0A0A',
    letterSpacing: -0.5,
  },

  priceUnit: {
    fontSize: 13,
    color: '#999',
    fontWeight: '500',
  },
  requestButton: {
    backgroundColor: '#0A0A0A',
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  requestButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.2,
  },

  floatingSearchButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    left: 20,
    right: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 10,
  },

  floatingSearchTextWrap: {
    flex: 1,
    marginLeft: 14,
  },

  floatingSearchTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0A0A0A',
    letterSpacing: -0.2,
  },

  floatingSearchSub: {
    fontSize: 12,
    color: '#999',
    marginTop: 1,
  },

  floatingSearchArrow: {
    width: 34,
    height: 34,
    backgroundColor: '#0A0A0A',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  floatingSearchArrowText: {
    color: '#fff',
    fontSize: 16,
  },

  closeButton: {
    backgroundColor: '#F3F3F3',
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  closeButtonText: {
    color: '#0A0A0A',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default styles;
