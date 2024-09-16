const Productdata = [
    { name: "Croissant", value: 9.99, image: "./images/croissants.avif"},
    { name: "Torta", value: 29.9, image: "./images/tortas.avif"},
    { name: "Sandwich", value: 19.99, image: "./images/sandwiches.avif"},
    { name: "bebida fria", value: 4.99, image: "./images/bebidasfrias.avif"}
];

const section = document.getElementById("shopSection");
const shoprow = document.createElement("div");
shoprow.classList.add("shopRow");
section.appendChild(shoprow);

Productdata.forEach ((item, index) => {

    const shopitem = document.createElement("div");
    shopitem.classList.add("shopItem");

    const itemname = document.createElement("p");
    itemname.innerText = (item.name);

    const image = document.createElement("img");
    image.src = (item.image);

    const price = document.createElement("p");
    price.innerText = item.value + " AR$" ;

    const amountbox = document.createElement("div");
    amountbox.classList.add("amountbox", "invis");
    amountbox.setAttribute("id", "Amount("+ index + ")" );

    const minusbtn = document.createElement("button");
    minusbtn.innerText = "-";
    minusbtn.setAttribute("onclick", "lessAmount(" + index + ")");

    const amountnumber = document.createElement("div");
    amountnumber.innerText = "1";

    const plusbtn = document.createElement("button");
    plusbtn.innerText = "+";
    plusbtn.setAttribute("onclick", "addAmount(" + index + ")" );

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

});



// Append to body:

