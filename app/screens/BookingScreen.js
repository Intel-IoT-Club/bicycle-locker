import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useWalletStore } from '../../store/walletStore';
import { calculateFare } from '../../utils/fareCalculator';

const BookingScreen = () => {
    const { balance, deduct, setDue } = useWalletStore();
    const [startTime, setStartTime] = useState(null);
    const [fare, setFare] = useState(null);

    const startRide = () => {
        if (balance < 50) {
            Alert.alert('Insufficient balance', 'You need ₹50 to start a ride.');
            return;
        }
        setStartTime(new Date());
        setFare(null);
    };

    const endRide = () => {
        if (!startTime) {
            Alert.alert('Start Ride First!');
            return;
        }

        const end = new Date();
        const duration = Math.ceil((end - startTime) / 60000); // in minutes
        const totalFare = calculateFare(duration);

        setFare(totalFare);

        if (balance >= totalFare) {
            deduct(totalFare);
            Alert.alert('Ride Ended', `Duration: ${duration} min\nFare: ₹${totalFare}`);
        } else {
            setDue();
            Alert.alert('Due Recorded', `Your fare ₹${totalFare} exceeds balance.`);
        }

        setStartTime(null);
    };

    return (
        <View className="p-4">
            <Text className="text-2xl font-bold mb-4">Bike Booking</Text>

            <TouchableOpacity
                onPress={startRide}
                className="bg-blue-500 p-3 rounded mb-2"
            >
                <Text className="text-white text-center">Start Ride</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={endRide}
                className="bg-red-500 p-3 rounded"
            >
                <Text className="text-white text-center">End Ride</Text>
            </TouchableOpacity>

            {fare && (
                <Text className="mt-4 text-lg">Fare: ₹{fare}</Text>
            )}
        </View>
    );
};

export default BookingScreen;
