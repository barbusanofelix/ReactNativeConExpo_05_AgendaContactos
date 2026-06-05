// src/services/contactoService.js
import AsyncStorage from "@react-native-async-storage/async-storage";

// Definimos una clave única para que el móvil sepa dónde se guarda nuestra lista
const LLAVE_ALMACENAMIENTO = "@agenda_contactos_key";

export const contactoService = {
  // 💾 Guardar contactos en el disco
  guardar: async (contactos) => {
    try {
      // AsyncStorage solo entiende TEXTO PLANO.
      // Por eso transformamos el array de objetos a un String con JSON.stringify
      const jsonValue = JSON.stringify(contactos);
      await AsyncStorage.setItem(LLAVE_ALMACENAMIENTO, jsonValue);
    } catch (e) {
      console.error("Error al guardar en el disco:", e);
    }
  },

  // 📖 Leer contactos del disco
  obtener: async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(LLAVE_ALMACENAMIENTO);
      // Si hay datos guardados, los destransformamos de texto a Array de objetos.
      // Si está vacío, devolvemos un array vacío [] de seguridad.
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.error("Error al leer del disco:", e);
      return [];
    }
  },
};
