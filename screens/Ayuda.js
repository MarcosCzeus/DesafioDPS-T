import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Ayuda() {

  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.separator}>__________________________________________</Text>
      <TouchableOpacity onPress={() => setIsDropdownOpen1(!isDropdownOpen1)} style={styles.dropdownToggle}>
        <Text style={styles.dropdownText}>{isDropdownOpen1 ? 'Problemas con la aplicación   ▲' : 'Problemas con la aplicación   ▼'}</Text>
      </TouchableOpacity>
      {isDropdownOpen1 && (
        <View style={styles.dropdownContainer}>
          <View style={styles.dropdownContent}>
            <Text style={styles.dropdownContentText}>Para solicitar un viaje, simplemente abre la aplicación SafeRide y selecciona tu ubicación de recogida y destino. Luego confirma tu solicitud. ¡Es así de fácil!</Text>
            <Text style={styles.dropdownContentText}></Text>
            <Text style={styles.dropdownContentText}>Si necesitas cancelar un viaje, puedes hacerlo desde la aplicación. Ten en cuenta que podrían aplicarse cargos por cancelaciones tardías o repetidas, así que asegúrate de revisar nuestras políticas de cancelación para evitar sorpresas.</Text>
            <Text style={styles.dropdownContentText}></Text>
            <Text style={styles.dropdownContentText}>Tu seguridad es nuestra máxima prioridad. Antes de subir a cualquier vehículo, asegúrate de verificar el nombre, la foto y la placa del conductor que se muestran en la aplicación. Siempre comparte los detalles de tu viaje con amigos o familiares y utiliza la función de seguimiento en tiempo real para mayor tranquilidad.</Text>
          </View>
          <View>
          
          </View>
        </View>
      )}
      <Text style={styles.separator}>__________________________________________</Text>
      <TouchableOpacity onPress={() => setIsDropdownOpen2(!isDropdownOpen2)} style={[styles.dropdownToggle, isDropdownOpen1 && styles.secondDropdownToggle]}>
        <Text style={styles.dropdownText}>{isDropdownOpen2 ? 'Acerca de SafeRide                  ▲' : 'Acerca de SafeRide                  ▼'}</Text>
      </TouchableOpacity>
      {isDropdownOpen2 && (
        <View style={styles.dropdownContainer}>
          <View style={styles.dropdownContent}>
            <Text style={styles.dropdownContentText}>SafeRide es una aplicación diseñada para proporcionarte un transporte seguro y confiable a tu destino deseado. Nuestro equipo se compromete a garantizar tu comodidad y seguridad durante todo el viaje.</Text>
            <Text style={styles.dropdownContentText}></Text>
            <Text style={styles.dropdownContentText}>Nuestra plataforma conecta a pasajeros con conductores certificados que han pasado por rigurosos controles de antecedentes y seguridad. Así que puedes confiar en nosotros para llevarte a tu destino de manera segura y sin problemas.</Text>
          </View>
          <View>
          
          </View>
        </View>
      )}
       <Text style={styles.separator}>__________________________________________</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 60
  },
  dropdownToggle: {
    marginTop: 20,
  },
  secondDropdownToggle: {
    marginLeft: 60, 
  },
  dropdownText: {
    fontSize: 18,
    color: '#251432',
  },
  dropdownContainer: {
    maxWidth: 300, 
  },
  dropdownContent: {
    marginTop: 10,
    marginLeft: -10, 
    padding: 10,
  },
  dropdownContentText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#6C3895',
  },
  separator: {
    color: '#6C3895', 
  },
});
