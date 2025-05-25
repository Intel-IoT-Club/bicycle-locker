import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const mockUserData = [
  { id: '1', name: 'Alice', points: 120 },
  { id: '2', name: 'Bob', points: 110 },
  { id: '3', name: 'Charlie', points: 95 },
];

const RewardsScreen = () => {
  const [userPoints, setUserPoints] = useState(mockUserData);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏆 Eco Leaderboard</Text>
      <FlatList
        data={userPoints}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.userRow}>
            <Text style={styles.userText}>
              {index + 1}. {item.name} - {item.points} pts
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default RewardsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  userRow: { paddingVertical: 10 },
  userText: { fontSize: 18 },
});
