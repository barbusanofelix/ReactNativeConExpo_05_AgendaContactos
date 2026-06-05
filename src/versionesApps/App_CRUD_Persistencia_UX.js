// Este archivo, App_CR_D_NoPersistencia,  nacio como una copia de ppConFormYCard y aqui se desarrollará D=DELETE. ( CRUD )
// src/versionesApps/AppConFormYCard
// Usa 2 componentes : ContactoForm.js y ContactoCard.js

import React, { useState, useEffect } from "react"; //
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
import { contactoService } from "../services/contactoServices"; // <--Importamos contactoServices para usar la DB

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

  // Estado para mostrar o ocultar el formulario de agregar contactos.
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // 🔄 Conexion a DB (TUBERÍA DE CARGA: Se activa una sola vez al encender la App)
  useEffect(() => {
    const cargarContactosDelDisco = async () => {
      const contactosGuardados = await contactoService.obtener(); // Pedimos los datos de la db
      setListaContactos(contactosGuardados);
    };
    cargarContactosDelDisco();
  }, []); // Corchetes vacios para no depender de ningun cambio sino que se ejecute al cargar la App

  // GUARDADO DE DATOS EN LA BASE DE DATOS ( REALMENTE ES UN ARCHIVO DE TEXTO PLANO.)
  // 💾 TUBERÍA DE GUARDADO: Se activa CADA VEZ que 'listaContactos' cambie en la RAM
  useEffect(() => {
    if (listaContactos.length > 0) {
      contactoService.guardar(listaContactos); // El gestor actualiza el disco.
    }
  }, [listaContactos]); // Si cambiar el estado de lista de contacto se guardará la misma en disco

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
    setMostrarFormulario(true); // Cuando vayamos a editar hay que mostrar el formulario.
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
    <View style={globalStyles.container}>
      <Text style={globalStyles.titulo}>📒 Agenda de Contactos</Text>

      {/* SCENARIO A: Si el formulario está ABIERTO, mostramos el formulario y un botón para cerrarlo ARRIBA */}
      {mostrarFormulario ? (
        <View>
          <ContactoForm
            onAgregarContacto={agregarContactoGlobal}
            contactoSeleccionado={contactoAEditar}
            onActualizarContacto={actualizarContactoGlobal}
            onCancelar={()=> {
              setMostrarFormulario(false);
              setContactoAEditar(null); // Limpiamos el iman por seguridad al cerrar
            }}
          />
          

          
        </View>
      ) : (
        // SCENARIO B: Si el formulario está CERRADO, mostramos las herramientas de búsqueda y el botón +
        <View>
          <View style={globalStyles.containerBusquedaYMas}>
            <TextInput
              style={globalStyles.TextInput}
              placeholder=" 🔍 Buscar Contacto"
              value={textoBusqueda}
              onChangeText={setTextoBusqueda}
            />

            <TouchableOpacity
              style={globalStyles.botonMas}
              onPress={() => setMostrarFormulario(true)} // Abre el formulario
            >
              <Text style={globalStyles.TextoBorrarYMas}>➕</Text>
            </TouchableOpacity>
          </View>

          {/* El botón de ordenar solo se muestra si estamos buscando/viendo la lista */}
          <TouchableOpacity
            style={globalStyles.botonOrden}
            onPress={conmutadorOrden}
          >
            <Text style={globalStyles.botonOrdenTexto}>
              {direccionOrden === "ninguno" && "🔤 Ordenar Lista"}
              {direccionOrden === "asc" && "🔼 Orden: A-Z (Toca para Z-A)"}
              {direccionOrden === "desc" && "🔽 Orden: Z-A (Toca para A-Z)"}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* LA LISTA SIEMPRE SE MUESTRA ABAJO (Ya sea completa o filtrada) */}
      <FlatList
        data={contactosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ContactoCard
            contacto={item}
            onBorrarContacto={eliminarContactoGlobal}
            onEditarSeleccion={seleccionarParaEditar}
          />
        )}
        contentContainerStyle={{ padding: 0 }}
      />

      <StatusBar style="auto" />
    </View>
  );
}
