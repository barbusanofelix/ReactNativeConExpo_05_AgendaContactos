
# El uso de Identificadores Únicos (ID) vs Índices
En la captura actual, cada contacto nació con un ID imborrable gracias a Date.now().toString(). Aunque en la pantalla los ves ordenados uno detrás de otro, internamente React sabe exactamente quién es quién gracias al keyExtractor de la FlatList.

Por qué importa: Si mañana borramos a "Carlos Pérez", no le diremos a la app "Borra el número 1". Le diremos "Busca el contacto con ID 171754329 y elimínalo". Da igual si la lista se desordena o se filtra, el ID jamás cambia.

B) El Diseño de Interfases Orientado a Contenedores (El error de la pantalla estirada)
Aprendimos que los componentes hijos deben ser "egoístas" con sus estilos internos (paddings, bordes, sombras) pero flexibles con su tamaño exterior. Un componente hijo rara vez debe llevar márgenes globales duros hacia la pantalla; debe dejarse abrazar por el contenedor del Padre (globalStyles.container) para que sea el Padre quien decida dónde colocarlo y cuánto aire dejar respecto a los bordes del teléfono.