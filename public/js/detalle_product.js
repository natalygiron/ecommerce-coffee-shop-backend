let url = window.location.search;
let url_params = new URLSearchParams(url);
let id = url_params.get('id');

const URL = 'http://localhost:3800';

//let product = JSON.parse(localStorage.getItem('products'))[id];

let product = [];

axios.get(`${URL}/product/${id}`).then(resp => {
    product = resp.data.product;

    getProduct();
});

let container = document.querySelector('.container');

let carrito = JSON.parse(localStorage.getItem('carrito')) || [] ;

function getProduct() {

    container.innerHTML = '';

    let imageSrc = product.image ? product.image : '/assets/images/no-product.png';

    const item = `
                <!-- Left Column -->
                <div class="left-column">
                    <img class="active" src="/upload/product/${imageSrc}" alt="">
                </div>
            
                <!-- Right Column -->
                <div class="right-column">
            
                    <!-- Product Description -->
                    <div class="product-description">
                        <span>Tazas</span>
                        <h1>${product.name}</h1>
                        <p>${product.description}</p>
                    </div>
                    <!-- Product Configuration -->
                    <div class="product-configuration">
                        <span>Existencias: ${product.stock} disponibles</span>
                        <!-- Product Color -->
                        <div class="product-amount">
                            <span>Cantidad:</span>
                    
                            <div class="amount-choose">
                                <div>
                                <input type="number" id="amount" name="amount" value="1" checked><label for="amount"><span></span></label>
                                </div>    
                            </div>
                        </div>
                    </div>
                    <!-- Product Pricing -->
                    <div class="product-price">
                        <span>s/${product.price}</span>
                        <button class="cart-btn" onclick="addCarrito()">Añadir al carrito</button>
                    </div>
                </div>
    `
                        // onclick='console.log("${index}")'
    container.innerHTML += item;

}

function addCarrito() {
    let token = localStorage.getItem('token');
    let email = localStorage.getItem('email');

    if (!token) {
        console.log('Hola')
        Swal.fire({
            title: 'No has iniciado sesión',
            text: 'Necesitas iniciar sesión para realizar esta acción',
            icon: 'info',
            showCancelButton: true,
            background: '#fff',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Iniciar sesión'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.replace('/pages/login');
            }
          }) 
    }

    let oki = false;

    let newProduct = {
        id,
        name: product.name,
        price: product.price,
        quantity: Number(document.getElementById('amount').value),
        image: product.image,
        user: email
    };
    
    for (let item in carrito) {
        if (carrito[item].id == id){
            oki = true;
            carrito[item].quantity += newProduct.quantity
        } 
    }
    if (!oki) carrito.push(newProduct);
    localStorage.setItem('carrito', JSON.stringify(carrito));

    Swal.fire({
        position: 'center',
        icon: 'success',
        background: '#fff',
        title: 'Tu producto ha sido agregado al carrito',
        showConfirmButton: false,
        timer: 2000
    })
}

//getProduct();