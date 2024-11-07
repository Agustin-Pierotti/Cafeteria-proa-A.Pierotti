

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
        btn.classList.remove("bg-green-500", "border-green-700", "hover:bg-green-100", "hover:border-green-300", "hover:text-green-500");
        btn.classList.add("bg-red-500", "border-red-700", "hover:bg-red-100", "hover:border-red-300", "hover:text-red-500");
        amtbox.classList.remove('invisible');
        btn.innerHTML = "Quitar";
    } else {
        btn.classList.remove("bg-red-500", "border-red-700", "hover:bg-red-100", "hover:border-red-300", "hover:text-red-500");
        btn.classList.add("bg-green-500", "border-green-700", "hover:bg-green-100", "hover:border-green-300", "hover:text-green-500");
        amtbox.classList.add('invisible');
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
                message += `${button.name} | ${button.price} x ${button.amount}\n`;
                total += button.price * button.amount;
                break;
            case "Dolars":
                message += `${button.name} | ${(Math.trunc((button.price/dolarunidad)* 100) / 100)} x ${button.amount}\n`;
                total += (Math.trunc((button.price/dolarunidad)* 100) / 100) * button.amount;
                break;
            case "Euros":
                message += `${button.name} | ${(Math.trunc((button.price/eurounidad)* 100) / 100)} x ${button.amount}\n`;
                total += (Math.trunc((button.price/eurounidad)* 100) / 100) * button.amount;
                break;
        }
    });
    message += `Total: ${(Math.trunc(total*100))/100}`;
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
                btn.classList.remove("bg-red-500", "border-red-700", "hover:bg-red-100", "hover:border-red-300", "hover:text-red-500");
                btn.classList.add("bg-green-500", "border-green-700", "hover:bg-green-100", "hover:border-green-300", "hover:text-green-500");
                amountbox.classList.add('invisible');
                btn.innerHTML = "Agregar";
            }
        }
        Productdata[index].active=false
    });
}


