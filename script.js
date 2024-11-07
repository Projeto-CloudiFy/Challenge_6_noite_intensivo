const optionButtons = document.querySelectorAll('.buttonTop')

function activeButton(event) {
    optionButtons.forEach(button => button.classList.remove('active'));
    event.currentTarget.classList.add('active');
}

optionButtons.forEach(button => {
    button.addEventListener('click', activeButton)
});