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

            tbody.appendChild(row);
        });


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