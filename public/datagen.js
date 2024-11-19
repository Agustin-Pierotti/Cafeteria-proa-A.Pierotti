let Productdata = [];

async function fetchProducts() {
    const url = 'https://viodutbgusuvznsbkodx.supabase.co/rest/v1/products?select=*';
    const headers = {
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpb2R1dGJndXN1dnpuc2Jrb2R4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYyMzU2MTUsImV4cCI6MjA0MTgxMTYxNX0.-sOtkuxY42Fdlav4tc_ar8A2E2i13h_VOUAfK1MUClw',
        'Content-Type': 'application/json'
    };

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();


        Productdata = data.map(item => ({
            ...item, 
            active: false, 
            amount: 1 
        }));
        
        const section = document.getElementById("shopSection");
        let shoprow = document.createElement("div");
        shoprow.classList.add("flex", "justify-center", "content-center", "mt-3", "mb-3");
        section.appendChild(shoprow);

        Productdata.forEach((item, index) => {

            const shopitem = document.createElement("div");
            shopitem.classList.add("w-80", "m-4", "rounded-md");

            const anchorcont = document.createElement("a");
            anchorcont.setAttribute("href", "#");
            anchorcont.classList.add("group", "relative", "block", "overflow-hidden");

            const image = document.createElement("img");
            image.classList.add("h-64", "w-full", "object-cover", "transition", "duration-500", "group-hover:scale-105", "sm:h-72")
            image.src = item.image;

            const descontainer = document.createElement("div");
            descontainer.classList.add("relative", "border", "border-amber-100", "bg-white", "p-6")

            const price = document.createElement("p");
            price.classList.add("text-amber-700", "priceTag")
            price.innerText = item.price + " AR$";

            const itemname = document.createElement("h3");
            itemname.classList.add("mt-1.5", "text-lg", "font-medium", "text-amber-900")
            itemname.innerText = item.name;

            const buttonform = document.createElement("form")
            buttonform.classList.add("mt-4", "flex", "gap-4")

            const amountform = document.createElement("input")
            amountform.setAttribute("type", "number")
            amountform.setAttribute("id", "Amount" + index);
            amountform.setAttribute("name", "Amount" + index);
            amountform.setAttribute("onclick", "updateform(" + index + ")");
            amountform.setAttribute("min", "1");
            amountform.value = 1
            amountform.setAttribute("disabled", "");
            amountform.classList.add("border-4", "border-amber-900", "w-20", "text-center", "pl-2", "rounded", "disabled:opacity-50");

            const agregar = document.createElement("button");
            agregar.innerText = "Agregar";
            agregar.setAttribute("type", "button");
            agregar.setAttribute("id", "btn" + index);
            agregar.classList.add("block", "w-full", "rounded", "bg-[#5d6127]", "border-[#554e1e]", "hover:bg-[#b3ac90]", "hover:border-[#7c7444]", "hover:text-green-100", "px-4", "py-3", "border-4", "text-sm", "font-medium", "transition", "hover:scale-105", "text-white");
            agregar.setAttribute("onclick", "toggleButton(" + index + ")");


            shopitem.appendChild(anchorcont);
            anchorcont.appendChild(image);
            anchorcont.appendChild(descontainer);
            descontainer.appendChild(price);
            descontainer.appendChild(itemname);
            descontainer.appendChild(buttonform);
            buttonform.appendChild(amountform);
            buttonform.appendChild(agregar);
            shoprow.appendChild(shopitem);

            if ((index + 1) % 5 === 0 && index !== Productdata.length - 1) {
                shoprow = document.createElement("div");
                shoprow.classList.add("flex", "justify-center", "content-center", "mt-3", "mb-3");
                section.appendChild(shoprow);
            }

        });

    } catch (error) {
        console.error('Error:', error);
    }
}

fetchProducts();

var currency = "Pesos"

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

function preciopeso() {
    const shopItems = document.querySelectorAll('.priceTag'); 
    currency = "Pesos"
    Productdata.forEach((item, index) => {
        const price = shopItems[index];
        price.innerHTML = item.price + " AR$";
    });
}

function preciodolar() {
    const shopItems = document.querySelectorAll('.priceTag'); 
    currency = "Dolars"
    Productdata.forEach((item, index) => {
        const price = shopItems[index];
        dolar = item.price / dolarunidad ;
        dolar = Math.trunc(dolar* 100) / 100;
        price.innerHTML = dolar + " U$D";
    });
}

function precioeuro() {
    const shopItems = document.querySelectorAll('.priceTag'); 
    currency = "Euros"
    Productdata.forEach((item, index) => {
        const price = shopItems[index];
        euro = item.price / eurounidad ;
        euro = Math.trunc(euro* 100) / 100;
        price.innerText = euro + " EUR";
    });
}

const selectElement = document.querySelector(".botonMoneda");
selectElement.addEventListener("change", (event) => {
    switch (event.target.value) {
        case "Pesos":
            preciopeso();
            break;
        case "Dolars":
            preciodolar();
            break;
        case "Euros":
            precioeuro();
            break;
    }
});
