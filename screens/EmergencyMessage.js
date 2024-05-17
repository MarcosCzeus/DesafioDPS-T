import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';

export default function EmergencyMessage({ selectedContacts }) {
  const [message, setMessage] = useState('¡Necesito ayuda! Por favor, ven lo antes posible.');

  const handleSendEmergencyMessage = () => {
    // Mensaje de emregencia simulado
    Alert.alert('Mensaje Enviado', 'Tu mensaje de emergencia ha sido enviado exitosamente.');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        multiline
        placeholder="Mensaje de emergencia"
        value={message}
        onChangeText={setMessage}
      />
      <TouchableOpacity style={styles.button} onPress={handleSendEmergencyMessage}>
        <Text style={styles.buttonText}>Emergencia</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 200,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: 'red',
    borderRadius: 100,
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});