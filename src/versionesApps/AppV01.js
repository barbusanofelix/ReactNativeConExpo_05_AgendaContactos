// App.js (Raíz del proyecto)
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

// Importamos el estilo global usando la ruta relativa
import { globalStyles } from '../styles/globalStyles';


export default function App() {
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.titulo}>📒 Agenda de Contactos</Text>

            <Text style={{ textAlign: 'center', marginTop: 20 }}>
                ¡Peldaño 1 completado con éxito!
            </Text>

            <StatusBar style="auto" />
        </View>
    );
}