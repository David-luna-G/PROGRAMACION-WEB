document.addEventListener('DOMContentLoaded', () => {

  // 1. Filtrado de Juegos por Categoria
  const filterBtns = document.querySelectorAll('.filter-btn');
  const gameCards = document.querySelectorAll('.game-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      gameCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 2. Selección de Juego para Checkout Dinámico
  const selectBtns = document.querySelectorAll('.btn-select');
  const titleDisplay = document.getElementById('selected-game-title');
  const priceDisplay = document.getElementById('selected-game-price');
  const submitBtn = document.getElementById('btn-submit-pay');
  const checkoutSection = document.getElementById('buy');

  selectBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.game-card');
      const title = card.getAttribute('data-title');
      const price = card.getAttribute('data-price');

      // Actualizar UI del formulario
      titleDisplay.innerText = title;
      priceDisplay.innerHTML = `$${price} <span>USD</span>`;
      submitBtn.innerText = `Pagar $${price} USD`;

      // Desplazar la pantalla suavemente a la sección de pago
      checkoutSection.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // 3. Sistema de Pestañas para Requisitos
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetTab = btn.getAttribute('data-tab');
      document.getElementById(`tab-${targetTab}`).classList.add('active');
    });
  });

  // 4. Procesamiento de Pago Simulado
  const paymentForm = document.getElementById('payment-form');

  paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const currentGame = titleDisplay.innerText;
    submitBtn.disabled = true;
    submitBtn.innerText = "Procesando pago...";

    setTimeout(() => {
      alert(`¡Gracias por tu compra! Tu clave de activación para "${currentGame}" ha sido enviada a tu correo.`);
      paymentForm.reset();
      submitBtn.disabled = false;
      submitBtn.innerText = `Pagar ${priceDisplay.innerText}`;
    }, 2000);
  });
});