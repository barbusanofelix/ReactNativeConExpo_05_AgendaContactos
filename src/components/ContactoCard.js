// src/components/ContactoCard.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colores } from "../styles/globalStyles";

// Recibimos el objeto 'contacto' como una propiedad
export default function ContactoCard({
  contacto,
  onBorrarContacto,
  onEditarSeleccion,
}) {
  return (
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        {/* Usamos los atributos exactos de nuestro objeto */}
        <Text style={styles.nombreText}>{contacto.nombre}</Text>
        <Text style={styles.telefonoText}>📞 {contacto.telefono}</Text>
      </View>

      {/* NUEVO BOTON PARA SELECCIONAR Y EDITAR UN CONTACTO */}
      <TouchableOpacity
        style={styles.actionBoton}
        onPress={() => onEditarSeleccion(contacto)} // enviamos contacto hacia arriba
      >
        <Text style={styles.actionTexto}>✏️</Text>
      </TouchableOpacity>

      {/* Botón de borrar (de momento sin lógica profunda) */}
      <TouchableOpacity
        style={styles.actionBoton}
        onPress={() => onBorrarContacto(contacto.id, contacto.nombre)}
      >
        <Text style={styles.actionTexto}>❌</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colores.blanco,
    padding: 15,
    borderRadius: 8,
    flexDirection: "row", // Alinea la info y el botón de borrar en la misma fila
    alignItems: "center",
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: colores.primario, // Una sutil línea azul a la izquierda
  },

  infoContainer: {
    flex: 1, // Recuerdas el truco? Esto estira la info y empuja el botón de borrar al extremo derecho
  },

  nombreText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colores.texto,
    
  },

  telefonoText: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
    
  actionBoton: {
    padding: 8,
    marginLeft: 5,
  },

  actionTexto: {
    fontSize: 18,
  },
});
