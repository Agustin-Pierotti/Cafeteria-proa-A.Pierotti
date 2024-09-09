const buttonStates = [
    { name: "Croissant", value: 9.99, active: false },
    { name: "Torta", value: 29.99, active: false },
    { name: "Sandwich", value: 19.99, active: false },
    { name: "bebida fria", value: 4.99, active: false }
];
function toggleButton(index) {
    const btn = document.getElementById(`btn${index}`);
    const state = buttonStates[index - 1];
    state.active = !state.active;
    if (state.active) {
        btn.classList.remove('off');
        btn.classList.add('on');
        btn.innerHTML = "Quitar";
    } else {
        btn.classList.remove('on');
        btn.classList.add('off');
        btn.innerHTML = "Agregar";
    }
}
function calcular() {
    const activeButtons = buttonStates.filter(button => button.active);
    let message = '';
    let total = 0;
    activeButtons.forEach(button => {
        message += `${button.name} | ${button.value}\n`;
        total += button.value;
    });
    message += `Total: ${total}`;
    alert(message);
}