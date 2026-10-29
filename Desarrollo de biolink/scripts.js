document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('btn-toggle-register');
  const closeBtn = document.getElementById('btn-close-register');
  const container = document.getElementById('register-container');
  const registerForm = document.getElementById('register-form');
  const formMessage = document.getElementById('form-message');

  // Lógica para abrir el formulario
  if (toggleBtn && container) {
    toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      container.classList.remove('hidden');
      toggleBtn.classList.add('hidden');
      if (window.lucide) lucide.createIcons();
    });
  }

  // Lógica para cerrar el formulario
  if (closeBtn && container) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      container.classList.add('hidden');
      toggleBtn.classList.remove('hidden');
      if (window.lucide) lucide.createIcons();
    });
  }

  // Lógica de validación y envío del formulario
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('name').value.trim();
      const ageInput = parseInt(document.getElementById('age').value, 10);
      const emailInput = document.getElementById('email').value.trim();
      const passwordInput = document.getElementById('password').value;

      resetMessage();

      // Validaciones
      if (!nameInput || !ageInput || !emailInput || !passwordInput) {
        showError('Por favor, completa todos los campos obligatorios.');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput)) {
        showError('Por favor, ingresa un correo electrónico válido.');
        return;
      }

      if (isNaN(ageInput) || ageInput < 18) {
        showError('Debes tener al menos 18 años para registrarte.');
        return;
      }

      if (passwordInput.length < 8) {
        showError('La contraseña debe tener al menos 8 caracteres.');
        return;
      }

      // Envío del formulario
      const submitBtn = document.getElementById('btn-register');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Enviando...</span>`;

      try {
        const formData = new FormData(registerForm);
        const response = await fetch(registerForm.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          showSuccess('registro con exito');
          registerForm.reset();
        } else {
          showError('Ocurrió un error al enviar el registro. Inténtalo de nuevo.');
        }
      } catch (error) {
        showError('Error de conexión. Inténtalo más tarde.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        if (window.lucide) lucide.createIcons();
      }
    });
  }

  function showError(message) {
    formMessage.textContent = message;
    formMessage.className = 'form__message form__message--error block';
  }

  function showSuccess(message) {
    formMessage.textContent = message;
    formMessage.className = 'form__message form__message--success block';
  }

  function resetMessage() {
    formMessage.textContent = '';
    formMessage.className = 'form__message hidden';
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();

      // Ocultar mensajes de error previos
      const errorElements = contactForm.querySelectorAll('.error-message');
      errorElements.forEach(el => {
        el.textContent = '';
        el.classList.add('hidden');
      });

      // Obtener valores de los campos
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const phone = document.getElementById('contact-phone').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      let isValid = true;

      // Validar Nombre
      if (name === '') {
        showFieldError('nameError', 'El nombre es obligatorio.');
        isValid = false;
      }

      // Validar Email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email === '' || !emailPattern.test(email)) {
        showFieldError('emailError', 'Ingresa un correo electrónico válido.');
        isValid = false;
      }

      // Validar Teléfono (10 dígitos)
      const phonePattern = /^[0-9]{10}$/;
      if (phone === '' || !phonePattern.test(phone)) {
        showFieldError('phoneError', 'Ingresa un número telefónico válido (10 dígitos).');
        isValid = false;
      }

      // Validar Mensaje
      if (message === '') {
        showFieldError('messageError', 'El mensaje no puede estar vacío.');
        isValid = false;
      }

      // Si pasa la validación
      if (isValid) {
        alert('¡Mensaje enviado con éxito!');
        contactForm.reset();
      }
    });
  }

  function showFieldError(elementId, errorMessage) {
    const errorEl = document.getElementById(elementId);
    if (errorEl) {
      errorEl.textContent = errorMessage;
      errorEl.classList.remove('hidden');
    }
  }
});