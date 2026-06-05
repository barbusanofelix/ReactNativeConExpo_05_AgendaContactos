
# 🪜 Parte 1: Limpieza de Estilos (Modularización)
Con las prisas metimos estilos directamente en el código (inline) para la Barra de Búsqueda y el Botón de Ordenación. Vamos a sacarlos de ahí para que el archivo del Padre sea legible y fácil de mantener.

## 1. Actualizar src/styles/globalStyles.js
Abre tu archivo de estilos y añade estas reglas. He aprovechado para darle un toque más profesional a la barra de búsqueda:

---
```js
// src/styles/globalStyles.js

export const globalStyles = StyleSheet.create({
  // ... (tus estilos anteriores se mantienen)
  
  inputBusqueda: {
    backgroundColor: colores.blanco,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    fontSize: 16,
    color: colores.texto,
    // Sombra ligera para Android
    elevation: 2,
  },
  
  botonOrden: {
    backgroundColor: colores.primario,
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  botonOrdenTexto: {
    color: colores.blanco,
    fontWeight: 'bold',
    fontSize: 14,
  }
});
```
---

## 2. Aplicar los estilos en el Padre
Ahora ve a tu archivo ``App_CRUD_BusquedaModificar.js`` y sustituye esas "dobles llaves" por las nuevas clases:

---
```jsx
// Busca el TextInput de búsqueda y cámbialo por esto:
<TextInput
  style={globalStyles.inputBusqueda} // ◄--- Limpio
  placeholder="🔍 Buscar contacto..."
  value={textoBusqueda}
  onChangeText={setTextoBusqueda}
/>

// Busca el TouchableOpacity de ordenación y cámbialo por esto:
<TouchableOpacity 
  style={globalStyles.botonOrden} // ◄--- Limpio
  onPress={conmutarOrden}
>
  <Text style={globalStyles.botonOrdenTexto}>
    {direccionOrden === 'ninguno' && '🔤 Ordenar Lista'}
    {direccionOrden === 'asc' && '🔼 Orden: A - Z (Toca para Z - A)'}
    {direccionOrden === 'desc' && '🔽 Orden: Z - A (Toca para A - Z)'}
  </Text>
</TouchableOpacity>
```
---


🚀 ¿Siguiente paso?
Si ya has aplicado la limpieza de estilos y la App se sigue viendo bien (o mejor) en tu móvil, estamos listos para el gran salto: La Persistencia.

Para ello, usaremos una librería llamada AsyncStorage. Es como el "Local Storage" de la web pero para móviles. Nos permitirá que los contactos sobrevivan a un cierre de la aplicación.

¿Te parece si empezamos instalando la librería y creando un archivo de "Servicio de Datos" para no ensuciar el componente principal? Así mantenemos la arquitectura modular que tanto nos está ayudando.