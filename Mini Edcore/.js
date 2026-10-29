document.getElementById('formulario').addEventListener('submit', function(e) {
  e.preventDefault();

  // 1. Obtener los valores de las 3 calificaciones del HTML
  const c1 = parseFloat(document.getElementById('calificacion1').value);
  const c2 = parseFloat(document.getElementById('calificacion2').value);
  const c3 = parseFloat(document.getElementById('calificacion3').value);

  // 2. Calcular el promedio
  const promedio = (c1 + c2 + c3) / 3;
  let mensaje = "";

  // 3. Evaluar los rangos especificados
  if (promedio >= 90 && promedio <= 100) {
    mensaje = "excelente";
  } else if (promedio >= 70 && promedio < 90) { // Cubre desde 70 hasta antes de 90
    mensaje = "bueno";
  } else if (promedio < 70) {
    mensaje = "insuficiente";
  } else {
    mensaje = "Calificación fuera de rango";
  }

  // 4. Inyectar SOLO el mensaje dentro del div widgetMensaje
  document.getElementById('widgetMensaje').textContent = mensaje;
});