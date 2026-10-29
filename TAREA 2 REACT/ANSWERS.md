# Respuestas

### 1. ¿Por qué se escribe `onPress={handlePress}` y no `onPress={handlePress()}`?

`onPress={handlePress}` entrega la función para que React Native la ejecute cuando la persona toque el botón. En cambio, `handlePress()` la ejecuta inmediatamente durante el renderizado y pasa su resultado como manejador.

### 2. ¿Cuál es la diferencia entre `Button` y `Pressable`? ¿Cuándo elegirías cada uno?

`Button` es un botón básico que se ve de forma nativa en cada plataforma y ofrece pocas opciones de estilo. `Pressable` permite personalizar completamente el diseño y reaccionar a estados como cuando se mantiene presionado; lo elegiría para botones con una apariencia o respuesta visual específica.

### 3. ¿Qué recibe y qué devuelve la función `style` de `Pressable`?

Recibe un objeto con el estado de interacción, por ejemplo `{ pressed }`, y devuelve un estilo o un arreglo de estilos. Por ejemplo: `style={({ pressed }) => [styles.button, pressed && styles.pressed]}`.

### 4. ¿Por qué no se debe cambiar directamente una variable de estado?

Asignar algo como `isFollowing = true` no notifica a React, por lo que la interfaz no se actualiza de forma fiable. Se debe usar el actualizador del estado, como `setIsFollowing(true)`.

### 5. ¿Por qué `followers` no es otro `useState`? ¿Qué es un valor derivado?

El total se puede calcular usando `isFollowing`, así que guardarlo por separado duplicaría información y podría quedar desincronizado. Un valor derivado es un dato calculado a partir del estado existente, como `BASE_FOLLOWERS + (isFollowing ? 1 : 0)`.

### 6. ¿Qué significa que `TextInput` sea controlado?

Significa que React mantiene el valor del campo en el estado y lo actualiza cuando la persona escribe. Las dos propiedades que lo conectan son `value` y `onChangeText`.

### 7. ¿Por qué `selectedSkills.push(skill)` es incorrecto para actualizar estado?

`push` modifica el arreglo existente en vez de crear uno nuevo, por lo que React puede no detectar el cambio correctamente. Se puede agregar una habilidad de forma inmutable así: `setSelectedSkills((skills) => [...skills, skill])`; para quitarla se usa `filter`.
