// src/components/ContactoForm.js
// formulario para los contactos
import React, { useState } from 'react';  // <- 1. Importamos el useState
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { colores } from '../styles/globalStyles';

// 1. Recibimos la propiedad ( La tuberia de conexion Padre-Hijo)en el argumento de la funcion
export default function ContactoForm({onAgregarContacto}) {
    // 2. Creamos los 2 almacenes temporales para el texto
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');

    // 3. Funcion de prueba para verificar que guardar.a bien. 
    const presionarGuardar = () => {
        if (nombre.trim === '' || telefono.trim() === '') {
            Alert.alert('Error', 'Por favor rellena los campos');
            return;
        }
        // De momento solo lanzamos la alerta para comprobar como lee los datos
        // Usar las comillas (``), es decir, inclinadas hacia la derecha para combinar con ${variable} 
        // Alert.alert('capturado', `Nombre: ${nombre}\nTelefono : ${telefono}`);
        // 2. Ahora usamos la tuberia o conexion con el Padre:
        onAgregarContacto(nombre, telefono);

        //3. Limpiamos los inputs para que queden vacios para la proxima vez.
        setNombre('');
        setTelefono('');

    }


    return (
        <View style={styles.formContainer}>
            <TextInput
                style={styles.input}
                placeholder="Nombre del contacto"
                placeholderTextColor="#888"
                value={nombre} // <- Vinculamos el valor al useState nombre
                onChangeText={setNombre} // <- Cada letra que se escribe cambia el estado.
            />
            <TextInput
                style={styles.input}
                placeholder="Teléfono (ej: 600000000)"
                placeholderTextColor="#888"
                keyboardType="phone-pad" // Muestra el teclado numérico en el móvil
                value={telefono}  // <- Vinculamos el valor al useState telefono }
                onChangeText={setTelefono}  // <- Cada numero cambia el estado
            />
            {/* Conectamos el boton a nuestra funcion de prueba.*/}
            <TouchableOpacity style={styles.boton} onPress={presionarGuardar}>
                <Text style={styles.botonTexto}>Guardar Contacto</Text>
            </TouchableOpacity>
        </View>
    );
}

// Estilos específicos y locales de este formulario
const styles = StyleSheet.create({
    formContainer: {
        backgroundColor: colores.blanco,
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // Sombra para Android
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: colores.secundario,
        borderRadius: 6,
        padding: 10,
        fontSize: 16,
        marginBottom: 12,
        color: colores.texto,
    },
    boton: {
        backgroundColor: colores.primario,
        padding: 12,
        borderRadius: 6,
        alignItems: 'center',
    },
    botonTexto: {
        color: colores.blanco,
        fontSize: 16,
        fontWeight: 'bold',
    },
});