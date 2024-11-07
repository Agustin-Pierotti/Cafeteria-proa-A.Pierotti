let emailInput = document.getElementById('email');
let passwordInput = document.getElementById('password');

document.getElementById('login').addEventListener('submit', async (event) => {
    authenticate();
});

async function updateProduct(productId, updatedProduct) {
    const accessToken = localStorage.getItem('access_token');

    const response = await fetch(`https://viodutbgusuvznsbkodx.supabase.co/rest/v1/products?id=eq.${productId}`, {
        method: 'PATCH',
        headers: {
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpb2R1dGJndXN1dnpuc2Jrb2R4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYyMzU2MTUsImV4cCI6MjA0MTgxMTYxNX0.-sOtkuxY42Fdlav4tc_ar8A2E2i13h_VOUAfK1MUClw',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(
            {
                name: updatedProduct.name,
                price: updatedProduct.price,
                image: updatedProduct.image
            }
        ),
    });
    console.log(JSON.stringify({
        name: updatedProduct.name,
        price: updatedProduct.price,
        image: updatedProduct.image
    }))
    const responseData = await response.text();

    if (!response.ok) {
        throw new Error(`Error ${response.status}: ${responseData || 'Error al actualizar el producto'}`);
    }

    return await response.json(); // Return the updated product
}

document.getElementById('edit-product-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const productId = document.getElementById('edit-product-id').value;
    const updatedProduct = {
        name: document.getElementById('edit-name').value,
        price: parseFloat(document.getElementById('edit-price').value),
        image: document.getElementById('edit-image').value,
    };

    try {
        await updateProduct(productId, updatedProduct);
        alert('Producto actualizado con éxito');
        refreshProducts(); // Refresh the product list to show updates
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        alert('Ocurrió un error: ' + error.message);
    }
});

document.querySelectorAll('.delete-button').forEach(button => {
    button.addEventListener('click', async (event) => {
        const productId = event.target.dataset.id;

        if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
            try {
                await deleteProduct(productId);
                alert('Producto eliminado con éxito');
                refreshProducts(); // Refresh the product list to show changes
            } catch (error) {
                console.error('Error al eliminar el producto:', error);
                alert('Ocurrió un error: ' + error.message);
            }
        }
    });
});

async function authenticate() {
    console.log("dale")
    try {
        const response = await fetch('https://viodutbgusuvznsbkodx.supabase.co/auth/v1/token?grant_type=password', {
            method: 'POST',
            headers: {
                'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpb2R1dGJndXN1dnpuc2Jrb2R4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYyMzU2MTUsImV4cCI6MjA0MTgxMTYxNX0.-sOtkuxY42Fdlav4tc_ar8A2E2i13h_VOUAfK1MUClw',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'email': emailInput.value,
                'password': passwordInput.value,
            }),
        });
        const data = await response.json();
        //if (!response.ok) {
        //    throw new Error(data.message || 'Error en la autenticación');
        //}

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