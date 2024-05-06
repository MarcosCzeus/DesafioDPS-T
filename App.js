import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';


import Feather from '@expo/vector-icons/Feather';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { Image } from 'react-native';
import Home from './screens/Home';
import Login from './screens/Login';
import Seguri from './screens/Seguri';
import Ayuda from './screens/Ayuda';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

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
  return (
    <Drawer.Navigator
     screenOptions={{
      drawerStyle:{
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
          <Feather name="map-pin" size={24} color="white" />          ),
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
          <Ionicons name="shield-checkmark" size={24} color="white" /> ),
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
            <AntDesign name="exclamationcircleo" size={24} color="white" /> ),
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
      
    </Drawer.Navigator>
  );
}
