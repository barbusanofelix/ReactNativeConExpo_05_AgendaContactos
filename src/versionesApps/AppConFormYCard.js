// src/versionesApps/AppConFormYCard
// Usa 2 componentes : ContactoForm.js y ContactoCard.js

import React, { useState } from 'react'; // 
import { StatusBar } from 'expo-status-bar'; // 
import { Text, View, Alert, FlatList } from 'react-native'; // Importacion de FlatList
import ContactoForm from '../components/ContactoForm' // Componente formulario ContactForm
// ----IMPORTAMOS LA TARJETA MODULAR
import ContactoCard from '../components/ContactoCard'  // Componente Card para Contactos

import { globalStyles } from '../styles/globalStyles'; // Estilos globales

export default function App() {  //En vez de App usaron MiversionApp pero parece que da igual
  // Creamos el useState donde vivira la agenda de cntactos 
  const [listaContactos, setListaContactos] = useState([]);

  // 3. La funcion que recibira los datos crudos del formulario
  const agregarContactoGlobal = (nombre, telefono) => {

    // 4. Creamos un objeto para agregar al array de contactos
    const nuevoContacto = {
      id: Date.now().toString(),  // Devolvera milisegunndos , algo asi "171728349000"
      nombre: nombre,
      telefono: telefono
    };

    // Añadimos el nuevo contacto creando una copia del array ( inmutabilidad) 
    setListaContactos([...listaContactos, nuevoContacto])

    // Una alerta para comprobar que el Padre recibio el paquete del hijo ( ContactoForm hacia aqui)
    // YA NO NECESITAREMOS LA ALERTA.
    // Alert.alert('Recibido por el Padre', `Total contactos en RAm ${listaContactos.length + 1} \nÚltimo : ${nuevoContacto.nombre}`);
  };

  return (
    // Usamos el contenedor global solo para heredar los márgenes y el fondo limpio
    <View style={globalStyles.container}>
      <Text style={globalStyles.titulo}>📒 Agenda de Contactos</Text>
      {/* 5. LE PASAMOS LA FUNCION AL HIJO COMO UNA PROP  */}
      <ContactoForm onAgregarContacto={agregarContactoGlobal} />

      {/* MONTAMOS EL FLATLIST */}
      <FlatList
        data={listaContactos}   // Enviamos el array en la RAM
        keyExtractor={(item) => item.id}  // El id unico del contacto.
        renderItem={({ item }) => (
          // Por cada contacto en el array lo dibujamos en una tarjeta, pasando el item
          <ContactoCard contacto={item} />
        )}
        contentContainerStyle={{ padding: 20 }} // Espacio al final para que no choque.
      />

      <StatusBar style='auto' />
    </View>
  );
}