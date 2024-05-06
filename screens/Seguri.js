import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';

export default function Seguri() {


  // Constantes que contienen números de teléfono de emergencia
  const phoneNumber1 = '71905225'; 
  const phoneNumber2 = '71750123'; 


  // Función que maneja la llamada telefónica
  const handleCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <View style={styles.container}>
      <Ionicons name="shield-checkmark" size={70} color="white" style={styles.icon} />
      <Text style={styles.text}>¿Con quién desea ponerse en contacto?</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => handleCall(phoneNumber1)} style={styles.button}>
          <SimpleLineIcons name="phone" size={25} color="white" />
          <Text style={styles.buttonText}>Ambulancia</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleCall(phoneNumber2)} style={styles.button}>
          <SimpleLineIcons name="phone" size={25} color="white" />
          <Text style={styles.buttonText}>Policía</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#251432',
  },
  icon: {
    marginBottom: 20,
  },
  text: {
    color: 'white',
    fontFamily: 'Semi-Bold-Italic', 
    fontStyle: 'italic', 
    fontWeight: '600', 
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 100,
  },
  buttonContainer: {
    alignSelf: 'flex-start', 
    marginBottom: 10, 
    marginLeft: 30,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    textAlign: 'right', 
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 20, 
  },
  iconLeft: {
    marginRight: 20, 
  }
});
