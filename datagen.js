const Productdata = [
    { name: "Croissant", value: 5000, image: "./images/croissants.avif"},
    { name: "Torta", value: 15000, image: "./images/tortas.avif"},
    { name: "Sandwich", value: 7500, image: "./images/sandwiches.avif"},
    { name: "bebida fria", value: 3000, image: "./images/bebidasfrias.avif"}
];
let dolarunidad = 0
let eurounidad = 0
async function fetchDolar() {
    try {
        const response = await fetch("https://dolarapi.com/v1/dolares/blue");
        const data = await response.json();
        dolarunidad = data.venta;

    } catch (error) {
        console.error('Error:', error);
    }
}

async function fetchEuro() {
    try {
        const response = await fetch("https://dolarapi.com/v1/cotizaciones/eur");
        const data = await response.json();
        eurounidad = data.venta;

    } catch (error) {
        console.error('Error:', error);
    }
}

fetchDolar();
fetchEuro();

const section = document.getElementById("shopSection");
let shoprow = document.createElement("div");
shoprow.classList.add("shopRow");
section.appendChild(shoprow);

Productdata.forEach((item, index) => {
    const shopitem = document.createElement("div");
    shopitem.classList.add("shopItem");

    const itemname = document.createElement("p");
    itemname.innerText = item.name;

    const image = document.createElement("img");
    image.src = item.image;

    const price = document.createElement("p");
    price.innerText = item.value + " AR$";

    const amountbox = document.createElement("div");
    amountbox.classList.add("amountbox", "invis");
    amountbox.setAttribute("id", "Amount" + index); 

    const minusbtn = document.createElement("button");
    minusbtn.innerText = "-";
    minusbtn.setAttribute("onclick", "lessAmount(" + index + ")");

    const amountnumber = document.createElement("div");
    amountnumber.innerText = "1";

    const plusbtn = document.createElement("button");
    plusbtn.innerText = "+";
    plusbtn.setAttribute("onclick", "addAmount(" + index + ")");

    const agregar = document.createElement("button");
    agregar.innerText = "Agregar";
    agregar.setAttribute("id", "btn" + index);
    agregar.classList.add("BotonAgregar", "off");
    agregar.setAttribute("onclick", "toggleButton(" + index + ")");

    shopitem.appendChild(itemname);
    shopitem.appendChild(image);
    shopitem.appendChild(price);
    shopitem.appendChild(amountbox);
    amountbox.appendChild(minusbtn);
    amountbox.appendChild(amountnumber);
    amountbox.appendChild(plusbtn);
    shopitem.appendChild(agregar);
    shoprow.appendChild(shopitem);

    if ((index + 1) % 4 === 0 && index !== Productdata.length - 1) {
        shoprow = document.createElement("div");
        shoprow.classList.add("shopRow");
        section.appendChild(shoprow);
    }

});

  


function preciopeso() {
    const shopItems = document.querySelectorAll('.shopItem'); 


    Productdata.forEach((item, index) => {
        const shopItem = shopItems[index];
        if (shopItem) {
            const price = shopItem.querySelectorAll('p')[1];
            price.innerText = item.value + " AR$";
        }
    });
}

function preciodolar() {
    const shopItems = document.querySelectorAll('.shopItem'); 
    

    Productdata.forEach((item, index) => {
        const shopItem = shopItems[index];
        if (shopItem) {
            dolar = item.value / dolarunidad ;
            dolar = Math.trunc(dolar* 100) / 100;
            const price = shopItem.querySelectorAll('p')[1];
            price.innerText = dolar + " U$D";
        }
    });
}

function precioeuro() {
    const shopItems = document.querySelectorAll('.shopItem'); 
    

    Productdata.forEach((item, index) => {
        const shopItem = shopItems[index];
        if (shopItem) {
            euro = item.value / eurounidad ;
            euro = Math.trunc(euro* 100) / 100;
            const price = shopItem.querySelectorAll('p')[1];
            price.innerText = euro + " EUR";
        }
    });
}