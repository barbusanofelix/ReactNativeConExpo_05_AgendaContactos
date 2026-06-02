# Error por puerto 8081 en uso.

Si cuando apliquemos el comando `npx expo start`, nos apareza el mensaje:
Nos sale un mensaje: El puerto 8081 lo esta usando otro proceso.

› Port 8081 is being used by another process
× Use port 8082 instead? 



---
```bash
› Port 8081 is being used by another process
× Use port 8082 instead? ... yes
```
---

Se soluciona matando el proceso del puerto 8081 en uo.

## Paso 1: Determinar cual PIN del proceso port 8081

### Determinar la direccion de la tarea que esta interfiriendo con el puerto.

```bash
netstat -ano | findstr :8081
```

Dara una salida similar a:

---
```bash
PS E:\React Native Con Expo\ProyectosReactNativeConExpo\05_AgendaContactos> netstat -ano | findstr :8081
  TCP    0.0.0.0:8081           0.0.0.0:0              LISTENING       6116
  TCP    [::]:8081              [::]:0                 LISTENING       6116
```
---

Paso 2: Matar la tarea:

El PID mostrado en el comando, 6116, es el que arrojo el LISTENING anterior. 
Sustituir el 6116 por el numero que aparezca en el paso anterior. 
```bash
taskkill /PID 6116 /F
``` 
Deberia mostrar : `Correcto: se terminó el proceso con PID 6116.

Paso 3. Ejecutar nuevamente `npx expo start`  y ya deberia correr normal.
