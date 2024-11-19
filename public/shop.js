

function lessAmount(index) {
    const amountbox = document.getElementById(`Amount${index}`);
    const array = Productdata[index];
    
    if (array.amount > 1) {
        array.amount--;
    };
    
    amountbox.children[1].innerHTML = array.amount;
}

function updateform(index) {
    const amountform = document.getElementById(`Amount${index}`)
    const array = Productdata[index];
    array.amount = amountform.value;
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
        btn.classList.remove("bg-[#5d6127]", "border-[#554e1e]", "hover:bg-[#b3ac90]", "hover:border-[#7c7444]", "hover:text-green-100");
        btn.classList.add("bg-[#a03920]", "border-[#9e2416]", "hover:bg-[#c79b8c]", "hover:border-[#a85e46]", "hover:text-red-100");
        amtbox.removeAttribute("disabled")
        btn.innerHTML = "Quitar";
    } else {
        btn.classList.remove("bg-[#a03920]", "border-[#9e2416]", "hover:bg-[#c79b8c]", "hover:border-[#a85e46]", "hover:text-red-100");
        btn.classList.add("bg-[#5d6127]", "border-[#554e1e]", "hover:bg-[#b3ac90]", "hover:border-[#7c7444]", "hover:text-green-100");
        amtbox.setAttribute("disabled", "")
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
            amountbox.value = cantidad.amount;
            if (btn) {
                btn.classList.remove("bg-[#a03920]", "border-[#9e2416]", "hover:bg-[#c79b8c]", "hover:border-[#a85e46]", "hover:text-red-100");
                btn.classList.add("bg-[#5d6127]", "border-[#554e1e]", "hover:bg-[#b3ac90]", "hover:border-[#7c7444]", "hover:text-green-100");
                amountbox.setAttribute("disabled", "")
                btn.innerHTML = "Agregar";
            }
        }
        Productdata[index].active=false
    });
}



