import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  // ─── MODAL OVERLAY ─────────────────────────────────────────────
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'flex-end',
  },

  // ─── TRIP SUMMARY MODAL ────────────────────────────────────────
  summaryCard: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 14,
    paddingBottom: Platform.OS === 'ios' ? 40 : 28,
  },

  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    alignSelf: 'center',
    marginBottom: 24,
  },

  arrivalBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 22,
    gap: 10,
  },

  arrivalBadgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#16A34A',
  },

  summaryTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0A0A0A',
    letterSpacing: -0.5,
    marginBottom: 6,
  },

  summarySubtitle: {
    fontSize: 14,
    color: '#999',
    marginBottom: 24,
  },

  routeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 22,
    gap: 12,
  },

  routeDots: {
    alignItems: 'center',
    paddingTop: 3,
    gap: 4,
  },

  dotGreen: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#22C55E',
  },

  dotLine: {
    width: 1.5,
    height: 22,
    backgroundColor: '#E5E5E5',
  },

  dotRed: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#EF4444',
  },

  routeTexts: {
    flex: 1,
    gap: 10,
  },

  routeLabel: {
    fontSize: 11,
    color: '#999',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  routeValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0A0A0A',
    marginTop: 1,
  },

  routeSpacer: {
    height: 16,
  },

  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },

  statCard: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    borderRadius: 14,
    padding: 14,
  },

  statLabel: {
    fontSize: 11,
    color: '#999',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },

  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0A0A0A',
    letterSpacing: -0.5,
  },

  statUnit: {
    fontSize: 13,
    color: '#999',
    fontWeight: '500',
  },

  payNowButton: {
    backgroundColor: '#0A0A0A',
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },

  payNowButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.2,
  },

  // ─── PAYMENT SCREEN ────────────────────────────────────────────
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },

  header: {
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 20,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
  },

  backButton: {
    width: 38,
    height: 38,
    backgroundColor: '#F3F3F3',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  backButtonText: {
    fontSize: 18,
    color: '#0A0A0A',
    fontWeight: '600',
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0A0A0A',
    letterSpacing: -0.3,
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },

  amountCard: {
    backgroundColor: '#0A0A0A',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    alignItems: 'center',
  },

  amountLabel: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.5)',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },

  amountValue: {
    fontSize: 42,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -1,
  },

  amountCurrency: {
    fontSize: 22,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.6)',
  },

  amountTrip: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.4)',
    marginTop: 6,
  },

  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#999',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 12,
    marginTop: 4,
  },

  methodsContainer: {
    gap: 10,
    marginBottom: 28,
  },

  methodCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },

  methodCardSelected: {
    borderColor: '#0A0A0A',
    backgroundColor: '#fff',
  },

  methodIconWrap: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
    alignItems: 'center',
  },

  methodIconWrapSelected: {
    backgroundColor: '#0A0A0A',
  },

  methodIcon: {
    fontSize: 22,
  },

  methodInfo: {
    flex: 1,
  },

  methodName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0A0A0A',
  },

  methodDesc: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },

  methodRadio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },

  methodRadioSelected: {
    borderColor: '#0A0A0A',
  },

  methodRadioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0A0A0A',
  },

  confirmButton: {
    backgroundColor: '#0A0A0A',
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },

  confirmButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },

  confirmButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.2,
  },

  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#F7F7F7',
  },

  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0FDF4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },

  successIconText: {
    fontSize: 36,
  },

  successTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0A0A0A',
    letterSpacing: -0.5,
    marginBottom: 8,
    textAlign: 'center',
  },

  successSubtitle: {
    fontSize: 15,
    color: '#999',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 36,
  },

  successAmount: {
    fontSize: 42,
    fontWeight: '800',
    color: '#0A0A0A',
    letterSpacing: -1,
    marginBottom: 36,
  },

  doneButton: {
    backgroundColor: '#0A0A0A',
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 48,
    alignItems: 'center',
  },

  doneButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },

  loadingText: {
    fontSize: 15,
    color: '#999',
    marginTop: 16,
  },
});

export default styles;
