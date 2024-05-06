import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput, TouchableWithoutFeedback, Image, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function Login() {
    const [nombre, setNombre] = useState('');
    const [telefonoCodigo, setTelefonoCodigo] = useState('+503');
    const [telefonoResto, setTelefonoResto] = useState('');
    const [email, setEmail] = useState('');
    const navigation = useNavigation(); 
    const handleNombreChange = (text) => {
        setNombre(text);
    }

    const handleTelefonoCodigoChange = (text) => {
        setTelefonoCodigo(text);
    }

    const handleTelefonoRestoChange = (text) => {
        const formattedText = text.replace(/[^\d]/g, '');
        let newText = formattedText;

        if (formattedText.length > 4) {
            newText = `${formattedText.slice(0, 4)} ${formattedText.slice(4)}`;
        }

        if (newText.length <= 9) {
            setTelefonoResto(newText);
        }
    }

    const handleEmailChange = (text) => {
        setEmail(text);
    }

    const validarEmail = () => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (!regex.test(email)) {
            Alert.alert('Error', 'Correo electrónico no válido');
            return;
        }
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Ingresa tu nombre
            </Text>
            <TextInput
                style={styles.input}
                value={nombre}
                onChangeText={handleNombreChange}
                placeholder="Mi nombre es..."
                placeholderTextColor="#C7A5E2"
            />
            <Text style={styles.text}>
                Ingresa tu número de teléfono móvil
            </Text>
            <View style={styles.telefonoContainer}>
                <TextInput
                    style={styles.codigoPais}
                    value={telefonoCodigo}
                    onChangeText={handleTelefonoCodigoChange}
                    placeholder="+503"
                    placeholderTextColor="#6C3895"
                    editable={false}
                />
                <TextInput
                    style={styles.telefonoInput}
                    value={telefonoResto}
                    onChangeText={handleTelefonoRestoChange}
                    placeholder="Número de teléfono móvil"
                    placeholderTextColor="#C7A5E2"
                    keyboardType="phone-pad"
                    maxLength={9}
                />
            </View>
            <Text style={styles.text}>
                ________________ o ________________
            </Text>
            <Text style={styles.text}>
                Ingresa tu correo electrónico
            </Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={handleEmailChange}
                placeholder="Correo electrónico"
                placeholderTextColor="#C7A5E2"
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TouchableWithoutFeedback onPress={() => {
                navigation.navigate('Home');
            }}>
                <View style={styles.customButton}>
                    <Text style={styles.buttonText}>Continuar</Text>
                </View>
            </TouchableWithoutFeedback>

            <Image
                source={require('./logo1.png')}
                style={styles.imageStyle}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    text: {
        color: '#6C3895',
        fontSize: 15,
        marginBottom: 20,
        marginTop: 40,
        fontFamily: 'System',
        fontWeight: '600',
        fontStyle: 'italic',
    },
    input: {
        height: 40,
        width: 300,
        borderColor: '#6C3895',
        borderWidth: 1,
        marginTop: 20,
        padding: 10,
        borderRadius: 10,
        color: '#6C3895',
        fontFamily: 'System',
        fontWeight: '600',
    },
    telefonoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#6C3895',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 20,
    },
    codigoPais: {
        color: '#6C3895',
        fontSize: 16,
        marginLeft: 10,
        fontFamily: 'System',
        backgroundColor: 'white',
    },
    telefonoInput: {
        width: 243,
        height: 40,
        padding: 10,
        color: '#6C3895',
        fontFamily: 'System',
    },
    customButton: {
        backgroundColor: "#6C3895",
        paddingVertical: 15,
        borderRadius: 15,
        marginTop: 40,
        width: 300,
        alignItems: 'center',
        height: 50,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontFamily: 'System',
    },
    imageStyle: {
        width: 70,  
        height: 90, 
        marginTop: 80, 
    },
});
