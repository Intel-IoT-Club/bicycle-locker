import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function BookingPage() {
  const { boarding, dropping } = useLocalSearchParams();
  const [unlocked, setUnlocked] = useState(false);
  const [rideEnded, setRideEnded] = useState(false);
  const [ownerOverride, setOwnerOverride] = useState(false);
  const router = useRouter();

  const handleUnlock = () => {
    setUnlocked(true);
    Alert.alert('Bike Unlocked', 'Your ride has started!');
  };

  const handleEndRide = () => {
    setRideEnded(true);
    setUnlocked(false);
    Alert.alert('Ride Completed', 'Bike auto-locked & session ended.');
  };

  const simulateOwnerOverride = () => {
    setOwnerOverride(true);
    Alert.alert('Owner Reclaiming', 'Return bike within 10 minutes or it will be locked.');
    setTimeout(() => {
      if (!rideEnded) {
        setUnlocked(false);
        setRideEnded(true);
        Alert.alert('Remote Lock', 'Bike has been locked remotely by the owner.');
      }
    }, 10000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🚲 Booking Confirmed</Text>

      <View style={styles.infoBox}>
        <Text style={styles.label}>From:</Text>
        <Text style={styles.value}>{boarding}</Text>

        <Text style={styles.label}>To:</Text>
        <Text style={styles.value}>{dropping}</Text>
      </View>

      {!unlocked && !rideEnded && (
        <TouchableOpacity style={[styles.button, styles.unlockButton]} onPress={handleUnlock}>
          <Text style={styles.buttonText}>Unlock Bike</Text>
        </TouchableOpacity>
      )}

      {unlocked && !rideEnded && (
        <>
          <TouchableOpacity style={[styles.button, styles.endButton]} onPress={handleEndRide}>
            <Text style={styles.buttonText}>End Ride (Auto-Lock)</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.reclaimButton]} onPress={simulateOwnerOverride}>
            <Text style={styles.buttonText}>Simulate Owner Reclaim</Text>
          </TouchableOpacity>
        </>
      )}

      {rideEnded && (
        <>
          <Text style={styles.successText}>✅ Ride Completed</Text>
          <TouchableOpacity style={[styles.button, styles.homeButton]} onPress={() => router.push('/')}>
            <Text style={styles.buttonText}>Back to Home</Text>
          </TouchableOpacity>
        </>
      )}

      {ownerOverride && !rideEnded && (
        <Text style={styles.warningText}>⚠️ Owner is reclaiming the bike...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  unlockButton: {
    backgroundColor: '#22C55E',
  },
  endButton: {
    backgroundColor: '#FACC15',
  },
  reclaimButton: {
    backgroundColor: '#EF4444',
  },
  homeButton: {
    backgroundColor: '#3B82F6',
  },
  successText: {
    color: '#16A34A',
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 16,
    fontWeight: '600',
  },
  warningText: {
    color: '#DC2626',
    textAlign: 'center',
    marginTop: 12,
    fontSize: 16,
  },
});
