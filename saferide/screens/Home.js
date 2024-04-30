import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, TextInput, TouchableOpacity, Text, Alert, Linking } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createMaterialTopTabNavigator();

export default function Home() {


  // Estados para almacenar la ubicación de origen y destino (ya funciona), y sus coordenadas
  const [originCoords, setOriginCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState({ normal: null, especial: null });
  const [normalDestinationInput, setNormalDestinationInput] = useState("");
  const [especialDestinationInput, setEspecialDestinationInput] = useState("");


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


  /* Esta función busca la ubicación de un término específico en OpenStreetMap usando la API de Nominatim.
     Después, actualiza las coordenadas de destino en una pantalla específica.
     Si no se encuentra ninguna ubicación,sino muestra un mensaje de error en la consola.
  */
  const handleSearch = async (input, screen) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${input}&format=json&limit=1`);
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        setDestinationCoords(prevState => ({ ...prevState, [screen]: { latitude: parseFloat(lat), longitude: parseFloat(lon) } }));
      } else {
        console.error("No se encontró la ubicación.");
      }
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
          {() => <Normal origin={originCoords} destination={destinationCoords.normal} handleSearch={input => handleSearch(input, 'normal')} destinationInput={normalDestinationInput} setDestinationInput={setNormalDestinationInput} />}
        </Tab.Screen>
        <Tab.Screen name="2" options={{ tabBarIcon: () => (
          <Image
            source={require('../assets/francesco.png')}
            style={{ width: 24, height: 24 }}
          />
        ) }}>
          {() => <Especial origin={originCoords} destination={destinationCoords.especial} handleSearch={input => handleSearch(input, 'especial')} destinationInput={especialDestinationInput} setDestinationInput={setEspecialDestinationInput} />}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
}


// Componente de mapa "normal"
function Normal({ origin, destination, handleSearch, destinationInput, setDestinationInput }) {
  const searchDestination = () => {
    if (destinationInput.trim() !== "") {
      handleSearch(destinationInput);
    } else {
      Alert.alert("Por favor ingresa un destino.");
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
              placeholder="Adonde quieres ir"
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


// Lo mismo pero para "especial"
function Especial({ origin, destination, handleSearch, destinationInput, setDestinationInput }) {
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
              placeholder="Adonde quieres ir"
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
