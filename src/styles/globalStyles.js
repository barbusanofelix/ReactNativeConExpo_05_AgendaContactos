// src/styles/globalStyles.js
// Aportara los estiloos para toda la aplicacion.

import { StyleSheet } from "react-native";

export const colores = {
  primario: "#2A6F97",
  secundario: "#A9D6E5",
  fondo: "#F8F9FA",
  texto: "#012A4A",
  blanco: "#FFFFFF",
  rojo: "#E63946",
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colores.fondo,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  containerBusquedaYMas: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: colores.texto,
    textAlign: "center",
    marginBottom: 20,
  },
  botonOrden: {
    backgroundColor: "#2A6F97",
    padding: 19,
    borderRadius: 5,
    marginBottom: 15,
  },
  botonOrdenTexto: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  botonMas: {
    backgroundColor: "#09e243",
    padding: 0,
    borderRadius: 8,
    marginLeft: 10,
    width: 43,
    height: 43,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },

  TextInput: {
    flex: 1,
    marginBottom: 0 /*En cero al colocar el + junto al buscar */,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  // Esto es lo que centro bien el simbolo + en la recuadro verde
  TextoBorrarYMas: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    // Truco maestro para Android: elimina el espacio extra que mete el sistema a las tipografías
    includeFontPadding: false,
    // Opcional: si notas que sigue un pelín abajo, puedes forzar un margen inferior negativo de 1 o 2 píxeles
    marginBottom: 2,
  },
});
