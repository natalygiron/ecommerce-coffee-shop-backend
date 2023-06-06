let cart = JSON.parse(localStorage.getItem('carrito'));
let email = localStorage.getItem('email');

let userMail = email;

let content = document.querySelector('.cart-content');

function renderizarCarrito() {

    content.innerHTML = '';

    let index = 0;
    let total = 0;

    cart.forEach((item) => {

        if (item.user == userMail) {
            let imageSrc = item.image ? item.image : '/assets/images/no-product.png';
            let item_total = ((item.quantity)*(item.price)).toFixed(2);
            
            let cart_item = `
                            <tr>
                                <td class="t-table-cart-img">
                                <img src="/upload/product/${imageSrc}" class="img-cart"/>
                                </td>
                                <td class="t-table-cart" class="name">${item.name}</td>
                                <td class="t-table-cart qnt-btn">
                                    <i class="far fa-minus-square btn-minus" onclick='editQuantity(${index},"minus")'></i>
                                    <p id="quantity" name="quantity" class="input-quantity-cart" >${item.quantity}</p>
                                    <i class="far fa-plus-square btn-plus" onclick='editQuantity(${index},"plus")'></i>
                                </td>
                                <td class="t-table-cart">S/${item.price}</td>
                                <td class="t-table-cart">S/${item_total}</td>
                                <td class="t-table-cart-x">
                                    <i class='fa fa-times-circle' onclick=deleteProduct(${index})></i>
                                </td>
                            </tr>`

            content.innerHTML += cart_item;

            index+=1;
            
            total+=Number(item_total);
        }

    });

    document.querySelector(".total").innerHTML = 'S/' + total.toFixed(2);
}

function deleteProduct(ix) {
    
    Swal.fire({
        title: '¿Eliminar producto?',
        icon: 'warning',
        showCancelButton: true,
        background: '#fff',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
        if (result.isConfirmed) {
            // Eliminar producto
            cart = cart.filter((item) => item !== cart[ix]);
            // Guardar cambios ls
            localStorage.setItem('carrito', JSON.stringify(cart));
        
            renderizarCarrito();
        }
      })
}

function editQuantity(ix, type) {

    if(type == 'minus') {
        let item = cart[ix];
        item.quantity-=1;
    } else if (type == 'plus') {
        let item = cart[ix];
        item.quantity+=1;
    }
    
    localStorage.setItem('carrito', JSON.stringify(cart));
    renderizarCarrito();

}

renderizarCarrito();