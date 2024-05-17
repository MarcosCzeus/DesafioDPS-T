import React, { useState } from 'react';
import { Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../screens/firebase-config';
import { useNavigation } from '@react-navigation/native';
import googleImage from './go.png';
import logo1 from './logo1.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigation = useNavigation();

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Cuenta creada');
        const user = userCredential.user;
        console.log(user);
        navigation.navigate('Home');
      })
      .catch(error => {
        console.log(error);
        Alert.alert('Error', 'Ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.');
      });
  };

  const handleSignIn = () => {
    setEmailError('');
    setPasswordError('');

    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
    setEmailError('Por favor, ingresa tu correo electrónico.');
    return;
  } else if (!email.match(emailFormat)) {
    setEmailError('Por favor, ingresa un correo electrónico válido.');
    return;
  }

  if (!password) {
    setPasswordError('Por favor, ingresa tu contraseña.');
    return;
  }


    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Registrado');
        const user = userCredential.user;
        console.log(user);
        navigation.navigate('Home');
      })
      .catch(error => {
        console.log(error);
        if (error.code === 'auth/user-not-found') {
      
          Alert.alert(
            'Usuario no encontrado',
            'No hemos encontrado una cuenta con ese correo electrónico. ¿Quieres crear una nueva cuenta?',
            [
              {
                text: 'Sí',
                onPress: handleCreateAccount
              },
              {
                text: 'No',
                style: 'cancel'
              }
            ]
          );
        } else {
          Alert.alert('Usuario no encontrado', 'No hemos encontrado una cuenta con ese correo electrónico. ¿Quieres crear una nueva cuenta?');
        }
      });
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
      Alert.alert('Usuario no encontrado', 'No hemos encontrado una cuenta con ese correo electrónico. ¿Quieres crear una nueva cuenta?');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <BlurView intensity={100}>
          <View style={styles.login}>
            <View>
              <Text style={{ fontSize: 15, fontWeight: '400', color: '#6C3895', textAlign: 'center' }}>Ingresa tu correo electrónico</Text>
              <TextInput
                onChangeText={(text) => setEmail(text)}
                style={styles.input}
                placeholder="Correo electrónico"
                placeholderTextColor="#C7A5E2"
              />
              {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            </View>
            <View>
              <Text style={{ fontSize: 15, fontWeight: '400', color: '#6C3895', textAlign: 'center' }}>Ingresa tu contraseña</Text>
              <TextInput
                onChangeText={(text) => setPassword(text)}
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry={true}
                placeholderTextColor="#C7A5E2"
              />
              {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            </View>
            <TouchableOpacity onPress={handleSignIn} style={[styles.button, { backgroundColor: '#6C3895' }]}>
              <Text style={{ fontSize: 15, fontWeight: '400', color: 'white' }}>Continuar</Text>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleCreateAccount} style={[styles.button, {}]}>
                <Text style={{ fontSize: 15, fontWeight: '400', color: '#6C3895', textDecorationLine: 'underline' }}>Crear cuenta</Text>
              </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 15, fontWeight: '400', color: '#6C3895', textAlign: 'center', marginBottom: 30 }}>___________________ o ___________________ </Text>

            <TouchableOpacity onPress={handleGoogleSignIn}>
              <Image source={googleImage} style={{ width: 70, height: 70, marginTop: 10, }} />
            </TouchableOpacity>
            <View style={styles.logoContainer}>
              <Image source={logo1} style={{ width: 75, height: 100 }} />
            </View>
          </View>
        </BlurView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  login: {
    width: 350,
    height: 500,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginBottom: 90

  },
  input: {
    width: 300,
    height: 40,
    borderColor: '#6C3895',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ffffff90',
    marginBottom: 40,
    marginTop: 35,
    color: '#C7A5E2',
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    width: 300,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    backgroundColor: '#ffffff',
  },
  logoContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 60,
  },
  errorText: {
    fontSize: 14,
    fontWeight: '400',
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});