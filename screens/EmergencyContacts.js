import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Alert, TouchableOpacity, Text } from 'react-native';

export default function EmergencyContacts({ onSelectContact }) {
  const [contacts, setContacts] = useState([]);
  const [newContactName, setNewContactName] = useState('');
  const [newContactNumber, setNewContactNumber] = useState('');

  const addContact = () => {
    if (!newContactName || !newContactNumber) {
      Alert.alert('Campos Vacíos', 'Por favor ingresa el nombre y el número del contacto.');
      return;
    }

    const existingContact = contacts.find(contact => contact.number === newContactNumber);
    if (existingContact) {
      Alert.alert('Contacto Existente', 'Este número de contacto ya está en la lista.');
      return;
    }

    const newContact = { name: newContactName, number: newContactNumber, selected: false };
    setContacts(prevContacts => [...prevContacts, newContact]);
    setNewContactName('');
    setNewContactNumber('');
  };

  const toggleSelectContact = (contactNumber) => {
    setContacts(prevContacts =>
      prevContacts.map(contact =>
        contact.number === contactNumber ? { ...contact, selected: !contact.selected } : contact
      )
    );
  };

  const removeContact = (contactNumber) => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.number !== contactNumber)
    );
  };

  const handleTelefonoRestoChange = (text) => {
    const formattedText = text.replace(/[^\d]/g, '');
    let newText = formattedText.replace(/(.{4})/g, '$1 ');

    setNewContactNumber(newText.trim());
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        placeholder="Nombre del Contacto"
        value={newContactName}
        onChangeText={setNewContactName}
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        placeholder="Número del Contacto"
        value={newContactNumber}
        onChangeText={handleTelefonoRestoChange}
        keyboardType="phone-pad"
      />
      <Button title="Agregar Contacto" onPress={addContact} color="#6C3895" />
      <FlatList
        data={contacts}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleSelectContact(item.number)}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
              <Text>{item.name}</Text>
              <Text>{item.number}</Text>
              {item.selected ? <Text>Seleccionado</Text> : <Text>Seleccionar</Text>}
              <Button title="Eliminar" onPress={() => removeContact(item.number)} color="#6C3895" />
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.number}
      />
    </View>
  );
}