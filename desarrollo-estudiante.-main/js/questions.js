(function(){
    const titleQuestions = [...document.querySelectorAll('.questions__title')];

    titleQuestions.forEach(question => {
        question.addEventListener('click', () => {
            let height = 0;
            // Corregido: nextElementSibling (con 'l' minúscula)
            let answer = question.nextElementSibling; 
            let addPadding = question.parentElement.parentElement;

            // Alternar la clase .active en la respuesta
            answer.classList.toggle('active');

            // Alternar las demás clases de animación/estilo
            addPadding.classList.toggle('questions__padding--add');
            question.children[0].classList.toggle('questions__arrow--rotate');

            // Ajustar la altura dinámica para la animación CSS
            if (answer.clientHeight === 0) {
                height = answer.scrollHeight;
            }

            answer.style.height = `${height}px`;
        });
    });
})();