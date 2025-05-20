import 'react-native-get-random-values';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Alert,
} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { useRouter } from 'expo-router';
import Wallet from './components/Wallet';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

export default function HomeScreen() {
  const [boarding, setBoarding] = useState(null);
  const [dropping, setDropping] = useState(null);
  const [boardingCoords, setBoardingCoords] = useState(null);
  const [droppingCoords, setDroppingCoords] = useState(null);

  const router = useRouter();

  const handleSearch = () => {
    if (boarding && dropping && boardingCoords && droppingCoords) {
      router.push({
        pathname: '/booking',
        params: {
          boarding: boarding.description,
          dropping: dropping.description,
        },
      });
    } else {
      Alert.alert('Missing Information', 'Please select both boarding and dropping locations.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={StyleSheet.absoluteFill}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={StyleSheet.absoluteFillObject}
          initialRegion={{
            latitude: 19.0760,
            longitude: 72.8777,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          {boardingCoords && (
            <Marker
              coordinate={boardingCoords}
              title="Boarding Point"
              pinColor="green"
            />
          )}
          {droppingCoords && (
            <Marker
              coordinate={droppingCoords}
              title="Dropping Point"
              pinColor="red"
            />
          )}
        </MapView>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}
      >
        <Text style={styles.heading}>Find Your Ride</Text>
        <View style={{ marginVertical: 10 }}>
          <Wallet />
        </View>

        <GooglePlacesAutocomplete
          placeholder="Boarding Point"
          fetchDetails
          enablePoweredByContainer={false}
          onPress={(data, details = null) => {
            setBoarding(data);
            if (details?.geometry?.location) {
              setBoardingCoords({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
              });
            }
          }}
          query={{ key: GOOGLE_API_KEY, language: 'en' }}
          styles={autoCompleteStyles}
        />

        <GooglePlacesAutocomplete
          placeholder="Dropping Point"
          fetchDetails
          enablePoweredByContainer={false}
          onPress={(data, details = null) => {
            setDropping(data);
            if (details?.geometry?.location) {
              setDroppingCoords({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
              });
            }
          }}
          query={{ key: GOOGLE_API_KEY, language: 'en' }}
          styles={autoCompleteStyles}
        />

        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search Bikes</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 50,
    width: '100%',
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
    color: '#000',
  },
  button: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

const autoCompleteStyles = {
  container: {
    flex: 0,
    zIndex: 100,
  },
  textInput: {
    height: 45,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    marginBottom: 8,
  },
  listView: {
    backgroundColor: 'white',
    elevation: 5,
    zIndex: 100,
  },
};
