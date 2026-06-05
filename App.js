//CONTROL DE VERSIONES DE App.js
// Tdoas las versiones estaran en la carpeta ./src/versionesApps/[nombre version]
// Solo puede estar activo un import de MiVersionApp ( resto comentado )
// Al correr App.js ( en la raiz) con npx expo start , correra la version importada.

// import MiVersionApp from './src/versionesApps/AppOriginal';
// import MiVersionApp from './src/versionesApps/AppV01' // Solo Muestra el titulo de la aplicacion.
// import MiVersionApp from './src/versionesApps/AppV02'   // Enganchar el formulario
// import MiVersionApp from './src/components/ContactoForm'  // Visualizar el Formulario ContactoForm
// import MiVersionApp from './src/versionesApps/AppProbarContactoForm' // Esta version incluye la adicion de contactos a traves del formulario.
// import MiVersionApp from './src/versionesApps/AppConFormYCard' //Incluye Formulario ( añadir Contactos)  y Mostrar con Cards
// import MiVersionApp from './src/versionesApps/App_CR_D_NoPersistencia'  // Version con el delete.
// import MiVersionApp from './src/versionesApps/App_CRUD_Ordenacion';  // Implementando la ordenacion de los contactos.
// import MiVersionApp from "./src/versionesApps/App_CRUD_BusquedaModificar"; // Implementar Buscar y Modificar
// import MiVersionApp from "./src/versionesApps/App_CRUD_Persistencia"; // Implementada persistencia, agregar y buscar pero no me gusto la pantalla incluyendo la creacion y buscar.
// import MiVersionApp from "./src/versionesApps/App_CRUD_Persistencia_UX";// + Mejora en la interface
import MiVersionApp from "./src/versionesApps/App_CRUDenDisco_ValConf";

export default function App() {
  return <MiVersionApp />;
}

//
