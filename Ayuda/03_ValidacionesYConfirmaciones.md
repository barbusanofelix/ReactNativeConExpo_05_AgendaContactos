# OBJETIVOS DE ESTE ARCHIVO

En este archivo veremos:

- Las validaciones de datos
- Confirmacion de borrado

# 🛠️ Retoque 1: Confirmación de Borrado (Protección de Datos)

Para evitar que un toque accidental elimine a un contacto para siempre, vamos a poner un "freno de mano". Usaremos el `componente Alert nativo de React Native`, configurándolo con dos botones: uno para echarse atrás y otro para confirmar la eliminación.

Crearemos una nueva version de nuestro archivo :

- App_CRUD_Persistencia_UX.js haciendo una copia que llamaremos
- `App_CRUDenDisco_ValConf.js`
  (Abrebiaciones en el nombre : enDisco = Persistencia en disco, Val= Validacion Conf= Confirmar).

Este cambio lo haremos en el Padre (App_CRUDenDisco_ValConf.js).
Busca la función `eliminarContactoGlobal` y la cambiamos por:

---

```jsx
// En App_CRUD_Persistencia_UX.js

const eliminarContactoGlobal = (idParaEliminar, nombre) => {
  // Disparamos una Alerta nativa antes de tocar le RAM o el Disco
  Alert.alert(
    "⚠️ Confirmar eliminacion de Contacto",
    `Seguro quieres eliminar a ${nombre}. No se puede deshacer`,
    [
      {
        text: "Cancelar",
        style: "cancel", // No hacer nada...cierra la alerta de forma segura
      },
      {
        text: "Eliminar",
        style: "destructive", // En IOS pinta de rojo el boton
        onPress: () => {
          // Si el usuario confirma pues borramos y guardamos
          const listaActualizada = listaContactos.filter(
            (contacto) => contacto.id !== idParaEliminar,
          );
          setListaContactos(listaActualizada);
          // No se necesita guardar en disco porque de eso ya esta encargado useEffect
        },
      },
    ],
  );
};
```

---

Inicialmente `const eliminarContactoGlobal = (idParaEliminar, nombre) => {...` tenia solo idParaEliminar como parametro asi que hay que recostruir el `cableado` ( las relaciones y parametros )
para que se envie el id y nombre.

## RECONSTRUIR EL ENVIO DE PARÀMETROS EN const eliminarContactoGlobal = (idParaEliminar, nombre)

Inicialmente tenia solamente idParaEliminar y para mejorar la alerta para borrar un Contacto se incluyó el nombre.

El camino que sigue `eliminarContactoGlobal` es:

- De App_CRUDenDisco_ValConf.js ( Padre ) - Definicion de `eliminarContactoGlobal`.
- Va a ContactoCard.js en el FlatList: `onBorrarContacto={eliminarContactoGlobal}  `

---

```jsx
<FlatList
  data={contactosFiltrados}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <ContactoCard // LLAMA AL COMPONENTE ContactoCard.js
      contacto={item}
      onBorrarContacto={eliminarContactoGlobal} //<-- AQUI BRINCA A ContactoCard.js>
      onEditarSeleccion={seleccionarParaEditar}
    />
  )}
  contentContainerStyle={{ padding: 0 }}
/>
```

---

Ahora le hacemos la trazabilidad a `onBorrarContacto` dentro de `ContactoCard.js`  
Vemos que se usa en el boton asociado a la X y que al presionarlo ( onPress ) ejecutará la funcion onBorrarContacto: `onPress={() => onBorrarContacto(contacto.id, contacto.nombre)}`.

Inicialmente estaba:

- `onPress={() => onBorrarContacto(contacto.id)}`

y ahora le añadi que devuelva tambien `contacto.nombre`:

- `onPress={() => onBorrarContacto(contacto.id, contacto.nombre)}`

````jsx
{/* Botón de borrar (de momento sin lógica profunda) */}
      <TouchableOpacity
        style={styles.actionBoton}
        onPress={() => onBorrarContacto(contacto.id, contacto.nombre)}
      >
        <Text style={styles.actionTexto}>❌</Text>
      </TouchableOpacity>```jsx

````

Entonces al aplicar el onPress con funcion flecha ( callBack ) la informacion se devuelve por la conexion:

- onPress => onBorrarContacto <-> eliminarContactoGlobal=>Borra el registro.

Puse <-> porque es el punto de vinculacion de nombres, que ocurre en el padre.

Nota: Asegúrate de importar Alert desde 'react-native' en la cabecera del Padre si aún no lo tenías importado ahí.

## 🔍 NO BORRAR UN CONTACTO QUE ESTEMOS EDITANDO : Un mini detalle de seguridad en el Padre

hay que considerar la posibilidad de : ¿Qué pasa si borras el contacto que justamente tenías seleccionado para editar?

Si tienes a Robin metido en el formulario listo para modificar y decides pulsar su cruz roja ❌ de la lista para eliminarlo, el contacto desaparecerá, pero sus datos se quedarían "atascados" en el formulario si no los limpiamos.

Para dejarlo perfecto y blindado, podemos añadir una pequeña comprobación dentro del bloque de confirmación en tu función eliminarContactoGlobal:

---

```jsx
// Dentro del onPress de "Eliminar" en tu Alerta:
onPress: () => {
  // 1. Filtramos y actualizamos la lista (lo que ya hiciste perfectamente)
  const listaActualizada = listaContactos.filter((c) => c.id !== id);
  setListaContactos(listaActualizada);

  // 2. 🛡️ CONTROL DE SEGURIDAD: Si el contacto borrado era el que se estaba editando...
  if (contactoAEditar && contactoAEditar.id === id) {
    setContactoAEditar(null); // Soltamos el imán
    setMostrarFormulario(false); // Bajamos el telón del formulario
  }
};
```

---

Recordemos que `contactoAEditar` es un estado que alberga el contacto que se seleccionó para editar y por otro lado tenemos el parametro id que es el id del contacto que se quiere borrar y por eso hacemos la pregunta:

`contactoAEditar && contactoAEditar.id === id` (Condicion)

Es decir, si seleccionamos un `contactoAEditar` la primera parte de la condicion será `true` y si el id de ese contacto; `contactoAEditar.id` es igual al `id` que viene del contacto seleccionado _para borrar_, entonces NO lo podemos editar y entonces:

- Deseleccionamos la edicion del contacto.
  - setContactoAEditar(null);
- Cerramos el formulario de edicion ( por el cambio de estado se redibuja)
  - setMostrarFormulario(false);

## 🛠️ Retoque 2: Validación del Teléfono (Evitar Datos Rotos)

Vamos a blindar el formulario.
Queremos que el campo de teléfono acepte únicamente números enteros y que tenga una longitud lógica (por ejemplo, entre 7 y 15 dígitos, que cubre fijos y móviles internacionales), bloqueando textos o espacios en blanco.

- Abrimos archivo Hijo (`src/components/ContactoForm.js`).
- Dentro de la función presionarGuardar, vamos a meter una Expresión Regular (Regex) para validar el formato justo después de comprobar que los campos no estén vacíos:

---

```jsx
// En src/components/ContactoForm.js -> Dentro de presionarGuardar

const presionarGuardar = () => {
if (nombre.trim() === "" || telefono.trim() === "") {
Alert.alert("Error", "Por favor rellena los campos");
return;
}

// 🔍 EXPRESIÓN REGULAR: ^(Inicio) \d(Solo dígitos) {7,15}(Entre 7 y 15 caracteres) $(Fin)
  const regexTelefono = /^\d{7,15}$/;

if (!regexTelefono.test(telefono.trim())) {
Alert.alert(
"Formato Inválido",
"El teléfono debe contener solo números y tener entre 7 y 15 dígitos."
);
return; // Frenamos la ejecución para que no se guarde
}
```

---

// ... El resto de tu lógica de DETECTAMOS SI ES CREACION O EDICION se queda exactamente IGUAL
🛠️ Retoque 3: Control de Lista Vacía (Manejo de Estados)
¿Qué pasa si limpiamos la agenda o si filtramos en la búsqueda un nombre que no existe? Ver la pantalla gris en blanco da la sensación de que la app se ha colgado. Vamos a pintar un "Empty State" elegante aprovechando una propiedad nativa de la FlatList llamada ListEmptyComponent.

1. Añade los estilos en tu src/styles/globalStyles.js
   Vamos a crear una regla sencilla para darle un formato limpio al texto de aviso:

JavaScript
// En src/styles/globalStyles.js dentro de globalStyles = StyleSheet.create({ ... })

contenedorVacio: {
padding: 40,
alignItems: 'center',
justifyContent: 'center',
},
textoVacio: {
fontSize: 16,
color: '#888',
textAlign: 'center',
fontStyle: 'italic',
}, 2. Aplícalo en el return del Padre (App_CRUD_Persistencia_UX.js)
La FlatList tiene un superpoder: si detecta que el array que le pasas en data está vacío (length === 0), pinta automáticamente lo que le pongas en la propiedad ListEmptyComponent.

Busca tu FlatList y añade esta propiedad:

JavaScript
{/_ En App_CRUD_Persistencia_UX.js _/}
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
contentContainerStyle={{ paddingBottom: 20 }}

// ◄--- NUEVO: Si 'contactosFiltrados' está vacío, se ejecuta este bloque
ListEmptyComponent={
<View style={globalStyles.contenedorVacio}>
<Text style={globalStyles.textoVacio}>
{textoBusqueda.trim() !== ""
? "🔍 No se encontraron contactos que coincidan con tu búsqueda."
: "✨ Tu agenda está vacía. ¡Toca el botón ➕ para empezar!"}
</Text>
</View>
}
/>
¿Viste la magia? Usamos un pequeño operador ternario dentro del texto para saber por qué está vacía la lista. Si el usuario está buscando algo, le dice que no hay coincidencias; si la barra de búsqueda está limpia, lo anima a crear su primer contacto.
