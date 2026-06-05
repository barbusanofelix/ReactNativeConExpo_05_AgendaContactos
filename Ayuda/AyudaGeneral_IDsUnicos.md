
# El uso de Identificadores Únicos (ID) vs Índices
Cada contacto nació con un ID imborrable gracias a ``Date.now().toString()``. Aunque en la pantalla vemos  los contactos ordenados, uno detrás de otro, internamente React sabe exactamente quién es quién gracias al ``keyExtractor`` de la ``FlatList``.

Por qué importa: 
En una lista tenemos el indice de la lista, es decir, un entero que inicia en cero (0) con el primer contacto en la lista, 1 para segundo, 2 para el tercero y asi sucesivamente. El problema de usar el indice es que si, por ejemplo, reordenamos la lista, ya el contacto que antes era el que tenia el indice cero (0) no necesarariamente lo mantendra porque los elementos reinician el indice o, 1, 2,3.... 
Ahora, si cada contacto tiene su propio id, inconfundible ( único ) , si mañana borramos a "Carlos Pérez", no le diremos a la app "Borra el número 1". Le diremos "Busca el contacto con ID 171754329 y elimínalo". Da igual si la lista se desordena o se filtra, el ID jamás cambia.
