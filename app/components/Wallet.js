import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useWalletStore } from '../../store/walletStore';

const Wallet = () => {
    const { balance, recharge } = useWalletStore();
    const [amount, setAmount] = useState('');

    const handleRecharge = () => {
        const amt = parseInt(amount);
        if (isNaN(amt) || amt <= 0) {
            Alert.alert('Invalid', 'Enter a valid recharge amount.');
            return;
        }
        recharge(amt);
        setAmount('');
    };

    return (
        <View className="bg-white p-4 rounded-xl shadow-md mt-4">
            <Text className="text-xl font-bold mb-2">
                Wallet Balance: ₹{balance < 0 ? 'DUE' : balance}
            </Text>

            <TextInput
                placeholder="Enter recharge amount"
                keyboardType="number-pad"
                value={amount}
                onChangeText={setAmount}
                className="border p-2 rounded mb-2"
            />

            <TouchableOpacity
                onPress={handleRecharge}
                className="bg-green-600 rounded p-2"
            >
                <Text className="text-white text-center">Recharge</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Wallet;
