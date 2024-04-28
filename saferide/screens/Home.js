import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, TextInput, TouchableOpacity, Text, Alert, Linking } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createMaterialTopTabNavigator();

export default function Home() {

  // Estados para almacenar la ubicación de origen y destino (aunque no sirve lo de destino), y sus coordenadas
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [originCoords, setOriginCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);

  // Hook useEffect es para obtener la ubicación actual al cargar el componente
  useEffect(() => {
    getLocation();
  }, []);

  // Función asincrónica para obtener la ubicación actual del dispositivo
  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permiso de ubicación no concedido');
        Alert.alert(
          'Permiso de ubicación requerido',
          'Esta aplicación necesita acceder a tu ubicación para funcionar correctamente.',
          [
            {
              text: 'Cancelar',
              onPress: () => console.log('Cancelado'),
              style: 'cancel',
            },
            {
              text: 'Configuración',
              onPress: () => Linking.openSettings(),
            },
          ],
          { cancelable: false }
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setOriginCoords({ latitude, longitude });
    } catch (error) {
      console.error('Error obteniendo la ubicación:', error);
    }
  };

  // Función asincrónica para buscar la ubicación introducida por el usuario como destino (aunqe ni funciona la porquria)
  const handleSearch = async () => {
    try {
      const destinationResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${destination}&key=YOUR_API_KEY`);
      const destinationData = await destinationResponse.json();
      const destinationLocation = destinationData.results[0]?.geometry?.location;
      setDestinationCoords(destinationLocation);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };


  // Lo del menú tab
  return (
    <View style={styles.container}>
      
      <Tab.Navigator
        tabBarPosition="bottom" 
        screenOptions={{
          tabBarStyle: { backgroundColor: '#6C3895' }, 
          tabBarShowLabel: false, 
        }}
      >
        <Tab.Screen name="1" options={{ tabBarIcon: () => (
          <Image
            source={require('../assets/francesco.png')} 
            style={{ width: 24, height: 24 }}
          />
        ) }}>
          {() => <Normal origin={originCoords} destination={destinationCoords} />}
        </Tab.Screen>
        <Tab.Screen name="2" options={{ tabBarIcon: () => (
          <Image
            source={require('../assets/francesco.png')}
            style={{ width: 24, height: 24 }}
          />
        ) }}>
          {() => <Especial origin={originCoords} destination={destinationCoords} />}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
}

// Componente de mapa normal
function Normal({ origin, destination, handleSearch }) {
  const [destinationInput, setDestinationInput] = useState("");

  const searchDestination = () => {
    if (destinationInput.trim() !== "") {
      handleSearch(destinationInput);
    } else {
      Alert.alert("Por favor ingresa un destino válido");
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 13.7942,
          longitude: -88.8965,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
      >
        {origin && <Marker coordinate={origin} title="Origen" />}
        {destination && <Marker coordinate={destination} title="Destino" />}
      </MapView>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Destino</Text>
          <View style={styles.inputContent}>
            <Icon name="search" size={20} color="#6C3895" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Buscar destino..."
              value={destinationInput}
              onChangeText={setDestinationInput}
              placeholderTextColor="#C7A5E2"
            />
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.floatingButton} onPress={searchDestination}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>
    </View>
  );
}

// Lo mismo pero para especial
function Especial({ origin, destination, handleSearch }) {
  const [destinationInput, setDestinationInput] = useState("");

  const searchDestination = () => {
    if (destinationInput.trim() !== "") {
      handleSearch(destinationInput);
    } else {
      Alert.alert("Por favor ingresa un destino válido");
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 13.7942,
          longitude: -88.8965,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
      >
        {origin && <Marker coordinate={origin} title="Origen" />}
        {destination && <Marker coordinate={destination} title="Destino" />}
      </MapView>
      <View style={styles.inputContainer}>
      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>Adonde quieres ir</Text>
        <View style={styles.inputContent}>
          <Icon name="search" size={20} color="#6C3895" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Buscar destino..."
            value={destinationInput}
            onChangeText={setDestinationInput}
            placeholderTextColor="#C7A5E2"
          />
        </View>
      </View>
      </View>
      <TouchableOpacity style={styles.floatingButton} onPress={searchDestination}>
        <Icon name="search" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
container: {
  flex: 1,
},
map: {
  flex: 1,
},
inputContainer: {
  position: 'absolute',
  top: 16,
  left: 30,
  right: 36,
  zIndex: 1,
  width:350,
},
inputWrapper: {
  flexDirection: 'column',
  alignItems: 'flex-start',
  backgroundColor: 'white',
  borderRadius: 10,
  paddingHorizontal: 10,
  paddingVertical: 5,
  borderColor: '#6C3895',
  borderWidth: 1,
},
inputContent: {
  flexDirection: 'row',
  alignItems: 'center',
},
inputLabel: {
  color: '#6C3895',
  marginBottom: 5,
},
input: {
  height: 20,
  color: '#C7A5E2',
  flex: 1,
  marginLeft: 10, 
},
floatingButton: {
  position: 'absolute',
  bottom: 16,
  right: 16,
  backgroundColor: "#C7A5E2",
  borderRadius: 60,
  width: 120,
  height: 120,
  justifyContent: 'center',
  alignItems: 'center',
  borderLeftWidth: 5, 
  borderColor: '#6C3895', 
},

buttonText: {
  color: "#6C3895",
  fontWeight: "bold",
}
});
