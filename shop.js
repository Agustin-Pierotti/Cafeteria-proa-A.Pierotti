const buttonStates = [
    { name: "Croissant", value: 9.99, active: false, amount:1},
    { name: "Torta", value: 29.99, active: false, amount:1},
    { name: "Sandwich", value: 19.99, active: false, amount:1},
    { name: "bebida fria", value: 4.99, active: false, amount:1}
];

document.addEventListener("DOMContentLoaded", function() {
    function lessAmount(index) {
        const amountbox = document.getElementById(`Amount${index}`);
        const array = buttonStates[index];
        
        if (array.amount > 1) {
            array.amount--;
        };
        
        amountbox.children[1].innerHTML = array.amount;
    }
    
    function addAmount(index) {
        const amountbox = document.getElementById(`Amount${index}`);
        const array = buttonStates[index];
        array.amount++;
        amountbox.children[1].innerHTML = array.amount;
    }
    
    function toggleButton(index) {
        const btn = document.getElementById(`btn${index}`);
        const amtbox = document.getElementById(`Amount${index}`);
        const state = buttonStates[index];
        state.active = !state.active;
        if (state.active) {
            btn.classList.remove('off');
            btn.classList.add('on');
            amtbox.classList.remove('invis');
            btn.innerHTML = "Quitar";
        } else {
            btn.classList.remove('on');
            btn.classList.add('off');
            amtbox.classList.add('invis');
            btn.innerHTML = "Agregar";
        }
    }
    
    
    function calcular() {
        const activeButtons = buttonStates.filter(button => button.active);
        let message = '';
        let total = 0;
        activeButtons.forEach(button => {
            message += `${button.name} | ${button.value} x ${button.amount}\n`;
            total += button.value * button.amount;
        });
        message += `Total: ${total}`;
        alert(message);
    }
    
    
    function borrar() {
        buttonStates.forEach((cantidad, index) => {
            cantidad.amount = 1;
            const amountbox = document.getElementById(`Amount${index}`);
            const btn = document.getElementById(`btn${index}`);
            if (amountbox) {
                amountbox.children[1].innerHTML = cantidad.amount;
                if (btn) {
                    btn.classList.remove('on');
                    btn.classList.add('off');
                    amountbox.classList.add('invis');
                    btn.innerHTML = "Agregar";
                }
            }
        });
    }
});


