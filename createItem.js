async function authenticate() {
    try {
        const response = await fetch('https://viodutbgusuvznsbkodx.supabase.co/auth/v1/token?grant_type=password', {
            method: 'POST',
            headers: {
                'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpb2R1dGJndXN1dnpuc2Jrb2R4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYyMzU2MTUsImV4cCI6MjA0MTgxMTYxNX0.-sOtkuxY42Fdlav4tc_ar8A2E2i13h_VOUAfK1MUClw',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

            }),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Error en la autenticación');
        }

        localStorage.setItem('access_token', data.access_token);
    } catch (error) {
        console.error('Error en la autenticación:', error);
        alert('Error en la autenticación: ' + error.message);
    }
}

async function createProduct(product) {
    const accessToken = localStorage.getItem('access_token');

    const response = await fetch(`https://viodutbgusuvznsbkodx.supabase.co/rest/v1/products`, {
        method: 'POST',
        headers: {
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpb2R1dGJndXN1dnpuc2Jrb2R4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYyMzU2MTUsImV4cCI6MjA0MTgxMTYxNX0.-sOtkuxY42Fdlav4tc_ar8A2E2i13h_VOUAfK1MUClw',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(
            {
            name: product.name,
            price: product.price,
            image: product.image
            })
    });

    const responseData = await response.text(); 

    if (!response.ok) {
        throw new Error(`Error ${response.status}: ${responseData || 'Error al crear el producto'}`);
    }

}

document.getElementById('product-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    

    const name = document.getElementById('name').value;
    const price = parseFloat(document.getElementById('price').value);
    const image = document.getElementById('image').value;

    const product = { name, price, image };

    try {
        if (!localStorage.getItem('access_token')) {
            await authenticate();
        }

        const newProduct = await createProduct(product);
        console.log('Producto creado:', newProduct);
        alert('Producto creado con éxito');
        refreshProducts();
    } catch (error) {
        console.error('Ocurrió un error:', error);
        alert('Ocurrió un error: ' + error.message);
    }
});