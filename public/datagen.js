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
        console.log(Productdata)
        
        const section = document.getElementById("shopSection");
        let shoprow = document.createElement("div");
        shoprow.classList.add("flex", "justify-center", "content-center", "mt-3", "mb-3");
        section.appendChild(shoprow);

        Productdata.forEach((item, index) => {
            const shopitem = document.createElement("div");
            shopitem.classList.add("flex", "justify-center", "content-center", "text-center", "flex-col", "border-10", "border-slate-300", "h-92", "w-60", "text-xl", "ml-1", "mr-1", "bg-slate-100", "font-bold", "rounded");

            const itemname = document.createElement("p");
            itemname.classList.add("mb-0", "mt-2")
            itemname.innerText = item.name;

            const image = document.createElement("img");
            image.classList.add("mt-1", "mr-[0.5em]", "mb-1", "ml-[0.5em]", "rounded-[30px]", "border-slate-200", "object-cover", "aspect-square")
            image.src = item.image;

            const price = document.createElement("p");
            price.classList.add("text-slate-400", "font-normal")
            price.innerText = item.price + " AR$";

            const amountbox = document.createElement("div");
            amountbox.classList.add("mx-auto","flex", "justify-center", "items-center","bg-slate-300","rounded", "invisible", "w-20", "h-8", "mb-2");
            amountbox.setAttribute("id", "Amount" + index);

            const minusbtn = document.createElement("button");
            minusbtn.classList.add("flex", "justify-center", "content-center", "bg-slate-400", "border-1", "border-slate-600", "text-slate-200", "font-[800]", "h-8", "w-6", "rounded", "active:bg-slate-100", "active:border-slate-400" , "active:text-slate-300")
            minusbtn.innerText = "-";
            minusbtn.setAttribute("onclick", "lessAmount(" + index + ")");

            const amountnumber = document.createElement("div");
            amountnumber.classList.add("content-center", "justify-center", "p-1", "pl-2", "pr-2")
            amountnumber.innerText = "1";

            const plusbtn = document.createElement("button");
            plusbtn.classList.add("flex", "justify-center", "content-center", "bg-slate-400", "border-1", "border-slate-600", "text-slate-200", "font-[800]", "h-8", "w-6", "rounded", "active:bg-slate-100", "active:border-slate-400" , "active:text-slate-300")
            plusbtn.innerText = "+";
            plusbtn.setAttribute("onclick", "addAmount(" + index + ")");

            const agregar = document.createElement("button");
            agregar.innerText = "Agregar";
            agregar.setAttribute("id", "btn" + index);
            agregar.classList.add("pt-3","pb-3", "pl-3", "pr-3", "flex", "justify-center", "text-sm", "rounded-xl", "mb-3", "text-slate-50", "border-4", "ml-4", "mr-4" , /* state style */  "bg-green-500", "border-green-700", "hover:bg-green-100", "hover:border-green-300", "hover:text-green-500");
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
    const shopItems = document.querySelectorAll('.shopItem'); 
    currency = "Pesos"
    Productdata.forEach((item, index) => {
        const shopItem = shopItems[index];
        if (shopItem) {
            const price = shopItem.querySelectorAll('p')[1];
            price.innerText = item.price + " AR$";
        }
    });
}

function preciodolar() {
    const shopItems = document.querySelectorAll('.shopItem'); 
    currency = "Dolars"
    Productdata.forEach((item, index) => {
        const shopItem = shopItems[index];
        if (shopItem) {
            dolar = item.price / dolarunidad ;
            dolar = Math.trunc(dolar* 100) / 100;
            const price = shopItem.querySelectorAll('p')[1];
            price.innerText = dolar + " U$D";
        }
    });
}

function precioeuro() {
    const shopItems = document.querySelectorAll('.shopItem'); 
    currency = "Euros"
    Productdata.forEach((item, index) => {
        const shopItem = shopItems[index];
        if (shopItem) {
            euro = item.price / eurounidad ;
            euro = Math.trunc(euro* 100) / 100;
            const price = shopItem.querySelectorAll('p')[1];
            price.innerText = euro + " EUR";
        }
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