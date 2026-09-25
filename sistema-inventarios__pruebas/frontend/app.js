document.getElementById('btn-test').addEventListener('click', async () => {
    const resVisual = document.getElementById('resultado');
    resVisual.textContent = "Cargando...";
    try {
        const response = await fetch('http://localhost:3000/api/status');
        const data = await response.json();
        resVisual.style.color = "green";
        resVisual.textContent = `Éxito: ${data.status} | Hora DB: ${data.db_time}`;
    } catch (error) {
        resVisual.style.color = "red";
        resVisual.textContent = "Error de conexión con el Backend.";
    }
});