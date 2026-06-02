# 📘 1. Guía para Crear un Componente desde Cero
Cuando un programador nota que un archivo principal se está llenando de código visual que se puede aislar (como una tarjeta o un botón), sigue estos pasos:

## Aislamiento físico: 
Crea un archivo nuevo con el nombre en mayúscula (ContactoCard.js) dentro de la carpeta src/components/.

## Definición de responsabilidades: 
Pregúntate: ¿Este componente es "inteligente" (maneja lógica propia) o es "tonto" (solo dibuja lo que le mandan)? 
Las tarjetas suelen ser moldes pasivos (tontos), los formularios suelen tener algo de lógica interna.

## 3 Estructura base:( export default ) 
Escribe la función con su **export default** y el retorno del JSX mínimo.

## Encapsular Estilos: 
Crea un StyleSheet.create dentro de ese mismo archivo para que el componente sea totalmente autónomo. 
Si usa colores de la marca, los importa del archivo global, pero sus tamaños y márgenes se quedan dentro de su propio archivo.

Los componentes hijos deben ser "egoístas" con sus estilos internos (paddings, bordes, sombras) pero flexibles con su tamaño exterior. Un componente hijo rara vez debe llevar márgenes globales duros hacia la pantalla; debe dejarse abrazar por el contenedor del Padre (globalStyles.container) para que sea el Padre quien decida dónde colocarlo y cuánto aire dejar respecto a los bordes del teléfono.

## Importación tipo LEGO ( Usar Componente ):
Se va al archivo padre, se importa con su ruta relativa (import Pieza from '../components/Pieza') y se monta en el JSX.

# 🔄 2. Procedimiento para Conectar Datos entre Hijo y Padre (El Puente)
Este es el concepto que más cuesta asimilar en React: Cuando el Hijo necesita enviarle datos al Padre, el diseño sigue este protocolo:

[Componente Padre (App.js)] 
   └── Tiene el useState (La lista general)
   └── Declara la función: const recibirDatos = (a, b) => { ... }
   └── Le pasa la función al Hijo como un atributo: `<Hijo enviarPaquete={recibirDatos} />`

[Componente Hijo (Formulario.js)]
   └── Recibe la propiedad: `function Hijo({ enviarPaquete })`
   └── Captura sus inputs locales con su propio useState.
   └── Al pulsar el botón, ejecuta la propiedad: `enviarPaquete(dato1, dato2);`
🚨 La Regla de Oro de la Inmutabilidad en el Padre:
Cuando la función del Padre recibe esos datos, **nunca hace un .push() al array original**. Un programador siempre **crea una foto nueva usando el operador spread ([...]):**

```js
setLista([...listaAnterior, nuevoObjeto]);
```
---