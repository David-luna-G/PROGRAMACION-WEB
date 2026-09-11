document.addEventListener('DOMContentLoaded', () => {
    const statusBtn = document.getElementById('statusBtn');
    const statusIndicator = statusBtn.querySelector('.status-indicator');
    const statusText = statusBtn.querySelector('.status-text');
    const shareBtn = document.getElementById('shareBtn');
    const userIdElement = document.getElementById('userId');
    const toast = document.getElementById('toast');

    let isOnline = true;

    // Cambiar estado de disponibilidad
    statusBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        isOnline = !isOnline;
        if (isOnline) {
            statusIndicator.classList.remove('inactive');
            statusText.textContent = 'En Línea';
        } else {
            statusIndicator.classList.add('inactive');
            statusText.textContent = 'Ausente';
        }
    });

    // Copiar ID al portapapeles
    shareBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const userIdText = userIdElement.textContent;
        
        navigator.clipboard.writeText(userIdText).then(() => {
            showToast('Tag copiado al portapapeles');
        }).catch(err => {
            console.error('Error al copiar: ', err);
            showToast('No se pudo copiar el tag');
        });
    });

    // Notificación flotante Toast
    function showToast(message) {
        toast.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
});

