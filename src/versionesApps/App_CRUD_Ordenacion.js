// Este archivo, App_CR_D_NoPersistencia,  nacio como una copia de ppConFormYCard y aqui se desarrollará D=DELETE. ( CRUD )  
// src/versionesApps/AppConFormYCard
// Usa 2 componentes : ContactoForm.js y ContactoCard.js

import React, { useState } from 'react'; // 
import { StatusBar } from 'expo-status-bar'; // 
import { Text, View, Alert, FlatList, TouchableOpacity } from 'react-native'; // Importacion de FlatList
import ContactoForm from '../components/ContactoForm' // Componente formulario ContactForm
// ----IMPORTAMOS LA TARJETA MODULAR
import ContactoCard from '../components/ContactoCard'  // Componente Card para Contactos

import { globalStyles } from '../styles/globalStyles'; // Estilos globales

export default function App() {  //En vez de App usaron MiversionApp pero parece que da igual
  // Creamos el useState donde vivira la agenda de cntactos 
  const [listaContactos, setListaContactos] = useState([]);

  // Creamos un estado para la direccion del orden.
  const [direccionOrden, setDireccionOrden] = useState('ninguno');

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

  const eliminarContactoGlobal = (idParaEliminar) => {
    // .filter() recorre todo el array y deja pasar ids distintos a idParaEliminar 
    const listaFiltrada = listaContactos.filter(contacto => contacto.id !== idParaEliminar);

    // Actualizamos la lista en la RAM con el nuevo array donde ya no existe el contacto
    setListaContactos(listaFiltrada);

    //Aqui irá a futuro la grabacion al disco duro ( Persistencia)

  }

  // No necesita parametros porque tiene acceso a los Stages
  const conmutadorOrden = () => {

    // Creamos una copia de listaContactos por la inmutabilidad
    const copiaLista = [...listaContactos];

    // Sino esta ordenado o esta ordenado en decreciente, lo pasamos a Creciente (A-Z)
    if (direccionOrden === 'ninguno' || direccionOrden === 'desc') {
      copiaLista.sort((a, b) => a.nombre.localeCompare(b.nombre));

      // Guardamos la nueva lista 
      setListaContactos(copiaLista);
      setDireccionOrden('asc');
    }
    // Si ya estaba en creciente, el usuario quiere cambiar a direccion (Z-A)
    else {
      // Truco: Comparamos 'b' con 'a'para invertir el orden
      copiaLista.sort((a, b) => b.nombre.localeCompare(a.nombre));
      setListaContactos(copiaLista);
      setDireccionOrden('desc'); // Guardamos el estado como Descendiente
    }
  };

  return (
    // Usamos el contenedor global solo para heredar los márgenes y el fondo limpio
    <View style={globalStyles.container}>
      <Text style={globalStyles.titulo}>📒 Agenda de Contactos</Text>
      {/* 5. LE PASAMOS LA FUNCION AL HIJO COMO UNA PROP  */}
      <ContactoForm onAgregarContacto={agregarContactoGlobal} />

      {/*AGREGAMOS UN BOTON GENERICO PARA ORDENAR  A-Z */}
      <TouchableOpacity
        style={{ backgroundColor: '#2A6F97', padding: 19, borderRadius: 5, marginBottom: 15 }}
        onPress={conmutadorOrden}
      >
        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>
          {direccionOrden === 'ninguno' && '🔤 Ordenar Lista'}
          {direccionOrden === 'asc'     && '🔼 Orden:A-Z (Toca para Z-A)'}
          {direccionOrden === 'desc' && '🔽 Orden: Z-A (Toca para A-Z)'}
          </Text>
      </TouchableOpacity>

      {/* MONTAMOS EL FLATLIST */}
      <FlatList
        data={listaContactos}   // Enviamos el array en la RAM
        keyExtractor={(item) => item.id}  // El id unico del contacto.
        renderItem={({ item }) => (
          // Por cada contacto en el array lo dibujamos en una tarjeta, pasando el item
          // <--- PASAMOS LA FUNCION DE BORRADO A LA TARJETA COMO PROP
          <ContactoCard
            contacto={item}
            onBorrarContacto={eliminarContactoGlobal}
          />
        )}
        contentContainerStyle={{ padding: 20 }} // Espacio al final para que no choque.
      />

      <StatusBar style='auto' />
    </View>
  );
}