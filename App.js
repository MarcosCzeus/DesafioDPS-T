import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { View, Text, StyleSheet, Image } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import Home from './screens/Home';
import Login from './screens/Login';
import Seguri from './screens/Seguri';
import Ayuda from './screens/Ayuda';
import EmergencyContacts from './screens/EmergencyContacts';
import EmergencyMessage from './screens/EmergencyMessage';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const userService = {
  logout: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  },
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: 'transparent',
            },
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="Home"
          component={DrawerNavigator}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function DrawerNavigator() {
  const navigation = useNavigation();
  const [isConnected, setIsConnected] = useState(true);
  const [showConnectionMessage, setShowConnectionMessage] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      setShowConnectionMessage(true);
      setTimeout(() => {
        setShowConnectionMessage(false);
      }, 5000); // Oculta el mensaje después de 5 segundos
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const logOut = () => {
    userService.logout()
      .then(() => {
        navigation.navigate('Login');
      })
      .catch(error => console.log(error));
  };

  return (
    <View style={{ flex: 1 }}>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} logOut={logOut} />}
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#C7A5E2',
          },
          drawerLabelStyle: {
            color: 'white',
          },
        }}
      >
        <Drawer.Screen
          name="Ciudad"
          component={Home}
          options={{
            drawerIcon: ({ color, size }) => (
              <Feather name="map-pin" size={24} color="white" />
            ),
            headerShown: true,
            headerStyle: {
              backgroundColor: '#6C3895',
              height: 80,
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerTitle: () => (
              <Image
                source={require('./assets/icono2.png')}
                style={{ width: 100, height: 20, marginRight: 'auto', marginLeft: 'auto' }}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Seguridad y protección"
          component={Seguri}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="shield-checkmark" size={24} color="white" />
            ),
            headerShown: true,
            headerStyle: {
              backgroundColor: '#6C3895',
              height: 80,
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerTitle: () => (
              <Image
                source={require('./assets/icono3.png')}
                style={{ width: 200, height: 20, marginRight: 'auto', marginLeft: 'auto' }}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Ayuda"
          component={Ayuda}
          options={{
            drawerIcon: ({ color, size }) => (
              <AntDesign name="exclamationcircleo" size={24} color="white" />
            ),
            headerShown: true,
            headerStyle: {
              backgroundColor: '#6C3895',
              height: 80,
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerTitle: () => (
              <Image
                source={require('./assets/icono4.png')}
                style={{ width: 70, height: 20, marginRight: 'auto', marginLeft: 'auto' }}
              />
            ),
          }}
        />
              <Drawer.Screen
        name="EmergencyContacts"
        component={EmergencyContacts}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#6C3895',
            height: 80,
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          title: 'Contactos de Emergencia',
          drawerIcon: ({ color, size }) => (
            <Feather name="users" size={24} color="white" />
          ),
        }}
      />
      <Drawer.Screen
        name="EmergencyMessage"
        component={EmergencyMessage}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#6C3895',
            height: 80,
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          title: 'Mensaje de Emergencia',
          drawerIcon: ({ color, size }) => (
            <Feather name="message-square" size={24} color="white" />
          ),
        }}
      />

      </Drawer.Navigator>
      {showConnectionMessage && (
        <View style={styles.connectionMessage}>
          <Text style={styles.connectionText}>
            {isConnected ? 'Conexión a internet activa' : 'Sin conexión a internet'}
          </Text>
          {isConnected ? (
            <Feather name="wifi" size={24} color="white" />
          ) : (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Feather name="wifi" size={24} color="white" style={{ marginRight: 5 }} />
              <Feather name="x" size={14} color="white" />
            </View>
          )}
        </View>
      )}
    </View>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Cerrar Sesión"
        onPress={props.logOut}
        icon={({ color, size }) => (
          <AntDesign name="logout" size={24} color="white" />
        )}
        labelStyle={{ color: 'white' }}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  connectionMessage: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  connectionText: {
    color: 'white',
    marginRight: 10,
  },
});
