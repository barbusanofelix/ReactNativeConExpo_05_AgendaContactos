// Dentro de tu archivo de versión activa (ej: AppV01.js o AppV02.js)
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

// ◄--- IMPORTACIÓN NUEVA: Traemos nuestro componente modular
import ContactoForm from '../components/ContactoForm';

export default function MiVersionApp() {
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.titulo}>📒 Agenda de Contactos</Text>

            {/* ◄--- APLICACIÓN NUEVA: Colocamos la pieza de LEGO */}
            <ContactoForm />

            <Text style={{ textAlign: 'center', marginTop: 10, color: '#666' }}>
                Peldaño 2: Interfaz del formulario lista.
            </Text>

            <StatusBar style="auto" />
        </View>
    );
}