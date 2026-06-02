// 

import React, { useState } from 'react'; // 1 Importamos useState
import { StatusBar } from 'expo-status-bar'; // Ya veremos si se usa.
import { Text, View, Alert } from 'react-native'; // Incluyo importacion de Text y Alert
import ContactoForm from '../components/ContactoForm' // Componente formulario ContactForm

import { globalStyles } from '../styles/globalStyles'; // Estilos globales

export default function App() {  //En vez de App usaron MiversionApp pero parece que da igual
  // 2. Creamos el useState donde vivira la agenda de cntactos 
  const [listaContactos, setListaContactos] = useState([]);

  // 3. La funcion que recibira los datos crudos del formulario
  const agregarContactoGlobal = (nombre, telefono) => {

    // 4. Creamos un objeto para agregar al array de contactos
    const nuevoContacto = {
      id: Date.now().toString,  // Devolvera milisegunndos , algo asi "171728349000"
      nombre: nombre,
      telefono: telefono
    };

    // Añadimos el nuevo contacto creando una copia del array ( inmutabilidad) 
    setListaContactos([...listaContactos, nuevoContacto])

    // Una alerta para comprobar que el Padre recibio el paquete del hijo ( ContactoForm hacia aqui)
    Alert.alert('Recibido por el Padre', `Total contactos en RAm ${listaContactos.length + 1} \nÚltimo : ${nuevoContacto.nombre}`);
  };

  return (
    // Usamos el contenedor global solo para heredar los márgenes y el fondo limpio
    <View style={globalStyles.container}>
      <Text style={globalStyles.titulo}>📒 Agenda de Contactos</Text>
      {/* 5. LE PASAMOS LA FUNCION AL HIJO COMO UNA PROP  */}
      <ContactoForm onAgregarContacto={agregarContactoGlobal} />
    </View>
  );
}