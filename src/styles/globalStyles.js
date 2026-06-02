// src/styles/globalStyles.js
// Aportara los estiloos para toda la aplicacion.

import { StyleSheet } from 'react-native';

export const colores = {
    primario: '#2A6F97',
    secundario: '#A9D6E5',
    fondo: '#F8F9FA',
    texto: '#012A4A',
    blanco: '#FFFFFF',
    rojo: '#E63946'
};

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colores.fondo,
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colores.texto,
        textAlign: 'center',
        marginBottom: 20,
    }
});