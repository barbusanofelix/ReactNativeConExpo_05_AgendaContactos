## 🪜 Parte 2: El Resumen Funcional (Consolidación)

Veamos qué hace la App ahora mismo en la RAM.
Tenemos el control de estos 4 pilares:

`Creación:`
El formulario genera un objeto con un id único basado en Date.now().

`Lectura Filtrada:`
No pintamos la lista completa, sino una "versión filtrada" que se recalcula en cada letra que escribes.

`Ordenación Dinámica:`
Usamos `.sort()` y `localeCompare` sobre una copia ([...]) para no romper el estado original.

`Actualización Cruzada:`
El Padre hace de puente entre el lápiz de la tarjeta y el formulario, usando `.map()` para reescribir solo el contacto que coincide con el ID.
