import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Image } from 'react-native';
import Home from './screens/Home';
import Login from './screens/Login';

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
    <Drawer.Navigator>
      <Drawer.Screen
        name="HomeDrawer"
        component={Home}
        options={{
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
    </Drawer.Navigator>
  );
}