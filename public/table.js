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
        Productdata = data;
        
        const tbody = document.querySelector('#itemsTable tbody');

        Productdata.forEach(item => {
            const row = document.createElement('tr');
            row.classList.add("border-1", "border-slate-900", "odd:bg-slate-200", "even:bg-white")


            const imageCell = document.createElement('td');
            const link = document.createElement('a');
            link.href = item.image;
            link.textContent = item.image;
            link.target = '_blank';
            imageCell.appendChild(link);
            row.appendChild(imageCell);

            const nameCell = document.createElement('td');
            nameCell.textContent = item.name;
            row.appendChild(nameCell);

            const priceCell = document.createElement('td');
            priceCell.textContent = `$${item.price}`;
            row.appendChild(priceCell);

            const editCell = document.createElement('td');
            row.appendChild(editCell)
            const editImage = document.createElement('img');
            editImage.setAttribute("src","./images/editar.png")
            editImage.classList.add("grayscale", "hover:grayscale-[50%]", "active:grayscale-0", "m-2", "w-[25px]", "h-[25px]")
            editImage.setAttribute("id", "Edit" + item.id);
            editImage.setAttribute("onclick", "editproducts(" + item.id + ")" );
            editCell.appendChild(editImage)

            const deleteCell = document.createElement('td');
            row.appendChild(deleteCell)
            const deleteImage = document.createElement('img');
            deleteImage.setAttribute("src","./images/borrar.png")
            deleteImage.classList.add("grayscale", "hover:grayscale-[50%]", "active:grayscale-0", "m-2", "w-[25px]", "h-[25px]")
            deleteImage.setAttribute("id", "Delete" + item.id);
            deleteImage.setAttribute("onclick", "deleteProduct(" + item.id + ")");
            deleteCell.appendChild(deleteImage)
            
            tbody.appendChild(row);
        });
        const xtrarow = document.createElement('tr');
        xtrarow.setAttribute("style", "justify-content:center; align-items:center;", )
        tbody.appendChild(xtrarow)
        const agregarImage = document.createElement('img');
        agregarImage.setAttribute("src","./images/agregar.png")
        agregarImage.classList.add("grayscale", "hover:grayscale-[50%]", "active:grayscale-0", "m-2", "w-[25px]", "h-[25px]")
        agregarImage.setAttribute("id", "Add");
        xtrarow.appendChild(agregarImage)

    } catch (error) {
        console.error('Error:', error);
    }
}

fetchProducts();

async function refreshProducts() {
    const tbody = document.querySelector('#itemsTable tbody');
    tbody.innerHTML = ''; 
    await fetchProducts(); 
}

function editproducts(index) {
    const form = document.getElementById("edit-product-form")
    const image = document.getElementById(`Edit${index}`);
    const row = image.closest('tr');
    const cells = row.querySelectorAll('td');
            

    const rowData = Array.from(cells).map(cell => cell.textContent.trim());
    
    document.getElementById('edit-name').value = rowData[1]; 
    document.getElementById('edit-price').value = rowData[2].replace('$', '').trim();
    document.getElementById('edit-image').value = rowData[0]; 
    document.getElementById('edit-product-id').value = index; 
    
    form.classList.remove("hidden")
    const otherform = document.getElementById('product-form'); 
    otherform.classList.add("hidden");
}


async function deleteProduct(productId) {
    const accessToken = localStorage.getItem('access_token');

    const response = await fetch(`https://viodutbgusuvznsbkodx.supabase.co/rest/v1/products?id=eq.${productId}`, {
        method: 'DELETE',
        headers: {
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpb2R1dGJndXN1dnpuc2Jrb2R4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYyMzU2MTUsImV4cCI6MjA0MTgxMTYxNX0.-sOtkuxY42Fdlav4tc_ar8A2E2i13h_VOUAfK1MUClw',
            'Authorization': `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        const responseData = await response.text();
        throw new Error(`Error ${response.status}: ${responseData || 'Error al eliminar el producto'}`);
    }
    refreshProducts();
    return true; // Successfully deleted
}

document.addEventListener('DOMContentLoaded', function() {
    const table = document.querySelector('table'); 
    table.addEventListener('click', function(event) {
        if (event.target && event.target.tagName === 'IMG' && event.target.id.startsWith('Add')) {
            const form = document.getElementById('product-form'); 
            form.classList.remove("hidden")
            const otherform = document.getElementById('edit-product-form'); 
            otherform.classList.add("hidden")
        }
    });
});
