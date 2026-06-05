// Este archivo, App_CR_D_NoPersistencia,  nacio como una copia de ppConFormYCard y aqui se desarrollará D=DELETE. ( CRUD )
// src/versionesApps/AppConFormYCard
// Usa 2 componentes : ContactoForm.js y ContactoCard.js

import React, { useState } from "react"; //
import { StatusBar } from "expo-status-bar"; //
import {
  Text,
  TextInput,
  View,
  Alert,
  FlatList,
  TouchableOpacity,
} from "react-native"; // Importacion de FlatList
import ContactoForm from "../components/ContactoForm"; // Componente formulario ContactForm
import ContactoCard from "../components/ContactoCard"; // Componente Card para Contactos
import { globalStyles } from "../styles/globalStyles"; // Estilos globales

export default function App() {
  //En vez de App usaron MiversionApp pero parece que da igual
  // Creamos el useState donde vivira la agenda de cntactos
  const [listaContactos, setListaContactos] = useState([]);

  // Creamos un estado para la direccion del orden.
  const [direccionOrden, setDireccionOrden] = useState("ninguno");

  // Creamos un useState para capturar el texto de busuqeda. Inicia vacio
  const [textoBusqueda, setTextoBusqueda] = useState("");

  // Creamos un useState para el contacto a editar.
  // Inicializado en null porque no se usará hasta activar la edicion ( ✏️ )
  const [contactoAEditar, setContactoAEditar] = useState(null);

  // 3. La funcion que recibira los datos crudos del formulario
  const agregarContactoGlobal = (nombre, telefono) => {
    // 4. Creamos un objeto para agregar al array de contactos

    const nuevoContacto = {
      id: Date.now().toString(), // Devolvera milisegunndos , algo asi "171728349000"
      nombre: nombre,
      telefono: telefono,
    };

    // Añadimos el nuevo contacto creando una copia del array ( inmutabilidad)
    setListaContactos([...listaContactos, nuevoContacto]);
  };

  // FUNCION PARA ACTUALIZAR LOS CONTACTOS EN LA RAM
  const actualizarContactoGlobal = (id, nuevoNombre, nuevoTelefono) => {
    // .map recorre el array uno a uno y genera un nuevo array transformado
    const listaModificada = listaContactos.map((contacto) => {
      // Si el id del contacto coincide con el que modificamos ....
      if (contacto.id === id) {
        // devolvemos un objeto nuevo con los datos actualizados
        return {
          id: contacto.id,
          nombre: nuevoNombre,
          telefono: nuevoTelefono,
        };
      }
      // sino coincide devolvemos el objeto tal cual
      return contacto;
    });
    // Guardamos la nueva lista en ell estado
    setListaContactos(listaModificada);

    //Limpiamos el iman que activa la modificacion y el formulario vuelve a quedar limpio
    setContactoAEditar(null);
  };

  const eliminarContactoGlobal = (idParaEliminar) => {
    // .filter() recorre todo el array y deja pasar ids distintos a idParaEliminar
    const listaFiltrada = listaContactos.filter(
      (contacto) => contacto.id !== idParaEliminar,
    );

    // Actualizamos la lista en la RAM con el nuevo array donde ya no existe el contacto
    setListaContactos(listaFiltrada);

    //Aqui irá a futuro la grabacion al disco duro ( Persistencia)
  };

  const seleccionarParaEditar = (contacto) => {
    setContactoAEditar(contacto); // asignamos el contacto al useState y ya estará disponible.
  };

  const modificarContacto = (contacto) => {
    console.log("Aqui el id a borra");
    console.log(contacto.id, contacto.nombre);
  };

  // No necesita parametros porque tiene acceso a los Stages
  const conmutadorOrden = () => {
    // Creamos una copia de listaContactos por la inmutabilidad
    const copiaLista = [...listaContactos];

    // Sino esta ordenado o esta ordenado en decreciente, lo pasamos a Creciente (A-Z)
    if (direccionOrden === "ninguno" || direccionOrden === "desc") {
      copiaLista.sort((a, b) => a.nombre.localeCompare(b.nombre));

      // Guardamos la nueva lista
      setListaContactos(copiaLista);
      setDireccionOrden("asc");
    }
    // Si ya estaba en creciente, el usuario quiere cambiar a direccion (Z-A)
    else {
      // Truco: Comparamos 'b' con 'a'para invertir el orden
      copiaLista.sort((a, b) => b.nombre.localeCompare(a.nombre));
      setListaContactos(copiaLista);
      setDireccionOrden("desc"); // Guardamos el estado como Descendiente
    }
  };

  const contactosFiltrados = listaContactos.filter((contacto) =>
    contacto.nombre.toLowerCase().includes(textoBusqueda.toLowerCase()),
  );

  return (
    // Usamos el contenedor global solo para heredar los márgenes y el fondo limpio
    <View style={globalStyles.container}>
      <Text style={globalStyles.titulo}>📒 Agenda de Contactos</Text>
      {/* 5. LE PASAMOS LA FUNCION AL HIJO COMO UNA PROP  */}
      <ContactoForm
        onAgregarContacto={agregarContactoGlobal}
        contactoSeleccionado={contactoAEditar}
        onActualizarContacto={actualizarContactoGlobal} // <-- Ultimo paso de modificacion
      />

      {/*NUEVO INPUT DE BUSQUEDA */}
      <TextInput
        style={{
          backgroundColor: "#fff",
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 6,
          padding: 10,
          marginBottom: 10,
          fontSize: 16,
        }}
        placeholder=" Buscar Contacto"
        value={textoBusqueda}
        onChangeText={setTextoBusqueda} // Cada letra se actualiza
      />

      {/*AGREGAMOS UN BOTON GENERICO PARA ORDENAR  A-Z */}
      <TouchableOpacity
        style={globalStyles.botonOrden}
        onPress={conmutadorOrden}
      >
        <Text
          style={globalStyles.botonOrdenTexto}
        >
          {direccionOrden === "ninguno" && "🔤 Ordenar Lista"}
          {direccionOrden === "asc" && "🔼 Orden:A-Z (Toca para Z-A)"}
          {direccionOrden === "desc" && "🔽 Orden: Z-A (Toca para A-Z)"}
        </Text>
      </TouchableOpacity>

      {/* MONTAMOS EL FLATLIST */}
      <FlatList
        data={contactosFiltrados} // Enviamos el array en la RAM
        keyExtractor={(item) => item.id} // El id unico del contacto.
        renderItem={({ item }) => (
          // Por cada contacto en el array lo dibujamos en una tarjeta, pasando el item
          // <--- PASAMOS LA FUNCION DE BORRADO A LA TARJETA COMO PROP
          <ContactoCard
            contacto={item}
            onBorrarContacto={eliminarContactoGlobal}
            onEditarSeleccion={seleccionarParaEditar} // <--Conectamos el puente hacia el lapiz ( ✏️ )
          />
        )}
        contentContainerStyle={{ padding: 20 }} // Espacio al final para que no choque.
      />

      <StatusBar style="auto" />
    </View>
  );
}
