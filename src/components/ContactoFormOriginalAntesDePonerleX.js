// src/components/ContactoForm.js
// formulario para los contactos
import React, { useEffect, useState } from "react"; // <- 1. Importamos el useState
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import { colores } from "../styles/globalStyles";

// 1. Recibimos la propiedad ( La tuberia de conexion Padre-Hijo)en el argumento de la funcion
export default function ContactoForm({
  onAgregarContacto,
  contactoSeleccionado,
  onActualizarContacto    // nueva propiedad para actualizar.
}) {
  // 2. Creamos los 2 almacenes temporales para el texto
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");

  // Usamos useEffect para detectar que contactoSeleccionado cambio en ContactoCard.
  // Inicialmente era nulo pero al seleccionar uno se le asigna ese valor y cambia.
  useEffect(() => {
    if (contactoSeleccionado) {
      // Si el padre nos mando un contacto, rellenamos el input
      setNombre(contactoSeleccionado.nombre);
      setTelefono(contactoSeleccionado.telefono);
    }
  }, [contactoSeleccionado]); // La dependencia : Vigila el cambio de contactoSeleccionado

  // 3. Funcion de prueba para verificar que guardar.a bien.
  const presionarGuardar = () => {
    if (nombre.trim === "" || telefono.trim() === "") {
      Alert.alert("Error", "Por favor rellena los campos");
      return;
    }
    //DETECTAMOS SI ES CREACION O EDICION
    if (contactoSeleccionado) {
      // Si estamos editando, enviamos el ID original junto con el nuevo nombre y/o telefono
      onActualizarContacto(contactoSeleccionado.id, nombre, telefono);
    } else{
      onAgregarContacto(nombre, telefono);
    }
  
    //Limpiamos los inputs, sea actualizar o guardar
    setNombre("");
    setTelefono("");
  };

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
        value={telefono} // <- Vinculamos el valor al useState telefono }
        onChangeText={setTelefono} // <- Cada numero cambia el estado
      />
      {/* Conectamos el boton a nuestra funcion de prueba.*/}
      <TouchableOpacity style={styles.boton} onPress={presionarGuardar}>
        {/* Si hay un contacto seleccionado , el boton cambia a Actualizar */}
        <Text style={styles.botonTexto}>
          {contactoSeleccionado
            ? "🔄 Actualizar Contacto"
            : "💾 Guardar Contacto"}
        </Text>
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
    shadowColor: "#000",
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
    alignItems: "center",
  },
  botonTexto: {
    color: colores.blanco,
    fontSize: 16,
    fontWeight: "bold",
  },
});
