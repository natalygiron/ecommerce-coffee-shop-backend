// let productList = JSON.parse(localStorage.getItem('products'));
let productList = [];

const URL = 'https://aromacoffee-natalygiron.onrender.com/';

async function cargarProductos() {
    try {
        const response = await axios.get(`${URL}/products`);

        productList = response.data.products;

        renderizarCatalogo();
    } catch (error) {
        console.log(error);
    }
};

let card = document.querySelector('.cards');
let messageFiltro = document.querySelector('#message-filtro');
let filtro = document.querySelector('#filtro');

function renderizarCatalogo() {
    card.innerHTML = '';

    //productList = JSON.parse(localStorage.getItem('products'));

    let index = 0;
    
    productList.forEach((producto) => {
        let imageSrc = producto.image ? producto.image : '/assets/images/no-product.png';

        const card_item = `
                <li class="cards_item">
                    <div class="card">
                        <div class="card_image"><img src="/upload/product/${imageSrc}"></div>
                        <div class="card_content">
                            <h2 class="card_title">${producto.name}</h2>
                            <p class="card_text">S/${producto.price}</p>
                            <button class="btn_catalogo card_btn" onclick='location.href="/api/product?id=${producto._id}"'>Comprar</button>
                        </div>
                    </div>
                </li>`

        card.innerHTML += card_item;

        index += 1;

        if (index != 0) {
            messageFiltro.innerHTML = `Se encontraron ${index} productos`;
        } else {
            messageFiltro.innerHTML = `No existen coincidencias`;
        }
    });
}

function searchProducts() {
    productList = productList.filter((item) => (item.name).toLowerCase().includes((filtro.value).toLowerCase()));

    renderizarCatalogo();

    //productList = JSON.parse(localStorage.getItem('products'));

    (async function cargarProductos() {
        try {
            const response = await axios.get(`${URL}/products`);
    
            productList = response.data.products;
        } catch (error) {
            console.log(error);
        }
    })();
}

// renderizarCatalogo();

cargarProductos();