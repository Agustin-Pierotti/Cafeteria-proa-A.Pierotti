

function lessAmount(index) {
    const amountbox = document.getElementById(`Amount${index}`);
    const array = Productdata[index];
    
    if (array.amount > 1) {
        array.amount--;
    };
    
    amountbox.children[1].innerHTML = array.amount;
}

function addAmount(index) {
    const amountbox = document.getElementById(`Amount${index}`);
    const array = Productdata[index];
    array.amount++;
    amountbox.children[1].innerHTML = array.amount;
}

function toggleButton(index) {
    const btn = document.getElementById(`btn${index}`);
    const amtbox = document.getElementById(`Amount${index}`);
    const state = Productdata[index];
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
    const activeButtons = Productdata.filter(button => button.active);
    let message = '';
    let total = 0;
    activeButtons.forEach(button => {
        switch (currency) {
            case "Pesos":
                message += `${button.name} | ${button.value} x ${button.amount}\n`;
                total += button.value * button.amount;
                break;
            case "Dolars":
                message += `${button.name} | ${(Math.trunc((button.value/dolarunidad)* 100) / 100)} x ${button.amount}\n`;
                total += (Math.trunc((button.value/dolarunidad)* 100) / 100) * button.amount;
                break;
            case "Euros":
                message += `${button.name} | ${(Math.trunc((button.value/eurounidad)* 100) / 100)} x ${button.amount}\n`;
                total += (Math.trunc((button.value/eurounidad)* 100) / 100) * button.amount;
                break;
            }
        
    });
    message += `Total: ${total}`;
    alert(message);
}


function borrar() {
    Productdata.forEach((cantidad, index) => {
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



