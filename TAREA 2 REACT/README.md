# Tarea 2 — Tarjeta de perfil interactiva

## Objetivo

Convertir una tarjeta de perfil estática en una aplicación interactiva con React Native. La tarea practica el manejo de eventos (`onPress`), los componentes `Button` y `Pressable`, el estado con `useState`, los campos controlados con `TextInput`, la representación condicional y la actualización inmutable de arreglos.

La aplicación de esta carpeta ya incluye las interacciones solicitadas: seguir o dejar de seguir, abrir y enviar un mensaje, compartir el perfil, expandir la biografía, cambiar el estado en línea y seleccionar habilidades.

## Qué debes hacer

1. Instala [Node.js LTS](https://nodejs.org/) y la aplicación **Expo Go** en tu teléfono, o prepara un emulador Android/iOS.
2. Abre la carpeta `TAREA 2 REACT` en VS Code.
3. Abre la terminal integrada y confirma que estás dentro de esta carpeta, donde está `package.json`.
4. Instala las dependencias e inicia Expo:

   ```bash
   npm install
   npx expo start
   ```

5. Escanea el código QR con Expo Go usando la misma red Wi-Fi. También puedes iniciar un emulador con `a` (Android) o `i` (iOS). Si el QR no conecta, prueba `npx expo start --tunnel`.
6. Prueba la aplicación siguiendo la lista de comprobación de abajo y revisa las respuestas en [ANSWERS.md](./ANSWERS.md).

## Guía de la actividad

### Paso 1 — Eventos y botones

Los botones **Follow** y **Message** se crean con `Pressable`; **Share profile** usa el `Button` básico de React Native. Cada `onPress` recibe una función para ejecutarla cuando se toca el botón. Al compartir, la aplicación muestra una alerta.

### Paso 2 — Respuesta visual al tocar

Los `Pressable` usan una función de estilo que recibe el estado `pressed`. Mientras el dedo está sobre el botón, se aplica una opacidad menor para dar respuesta visual.

### Paso 3 — Seguir y dejar de seguir

El estado `isFollowing` cambia entre `true` y `false`. El texto y el estilo del botón se actualizan, y la cantidad de seguidores se calcula a partir de ese estado: empieza en 1,200 y pasa a 1,201 al seguir el perfil. No se guarda el total en un segundo estado.

### Paso 4 — Redactar un mensaje

El botón **Message** abre y cierra el compositor. El campo `TextInput` es controlado por el estado `message`, tiene un límite de 140 caracteres y muestra un contador. **Send** permanece deshabilitado si el texto está vacío o solo contiene espacios. Al enviar, se muestra una alerta, se limpia el campo y se cierra el compositor.

### Paso 5 — Biografía, conexión y habilidades

- **Read more / Show less** expande o contrae la biografía.
- Toca las iniciales del perfil para alternar entre conectado y desconectado.
- Toca una habilidad para seleccionarla o quitar la selección. El arreglo se actualiza sin modificar el estado directamente.
- La indicación debajo de las habilidades muestra cuántas están seleccionadas.

## Lista de comprobación

- [ ] Follow alterna entre **Follow** y **Following**, y los seguidores cambian entre 1,200 y 1,201.
- [ ] El compositor abre y cierra, actualiza el contador y desactiva **Send** si el texto está vacío.
- [ ] Al enviar un mensaje, el compositor se cierra y el campo queda limpio.
- [ ] La biografía se expande, el estado en línea cambia y las habilidades se pueden seleccionar.
- [ ] Los botones muestran un cambio visual al presionarlos.
- [ ] Las siete preguntas están contestadas en [ANSWERS.md](./ANSWERS.md).

## Problemas comunes

- **`npm error enoent ... package.json`:** abre la terminal dentro de `TAREA 2 REACT`.
- **La alerta no aparece en el navegador:** prueba la aplicación con Expo Go o un emulador.
- **El teclado tapa el campo:** desplaza la pantalla; el contenido está dentro de un `ScrollView`.
- **Un botón no responde:** pasa la función, por ejemplo `onPress={handleFollowPress}`, no la llamada `onPress={handleFollowPress()}`.
- **`useState is not defined`:** comprueba que `useState` esté importado desde `react`.

## Entrega

Cuando hayas probado la aplicación, puedes crear una rama con el nombre `task/interactive-profile-card`, guardar los cambios en commits pequeños, subirla con `git push -u origin task/interactive-profile-card` y abrir un Pull Request. Añade capturas o una grabación breve de la aplicación funcionando.
