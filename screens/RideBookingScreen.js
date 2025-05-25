import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { calculateFare } from '../utils/pricing';

const RideBookingScreen = () => {
  const [fare, setFare] = useState(null);

  const handleCalculateFare = () => {
    const distanceKm = 8;
    const durationMin = 15;
    const demandFactor = 1.5;

    const totalFare = calculateFare({ distanceKm, durationMin, demandFactor });
    setFare(totalFare);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>📍 Book a Ride</Text>
      <Button title="Calculate Fare" onPress={handleCalculateFare} />
      {fare !== null && <Text style={{ marginTop: 20 }}>Estimated Fare: ${fare}</Text>}
    </View>
  );
};

export default RideBookingScreen;
