let userEmail = localStorage.getItem('email');
let token = localStorage.getItem('token');

let myUser = null;
let Products = [];

const URL = 'https://aromacoffee-natalygiron.onrender.com/';

axios.get(`${URL}/users/${userEmail}`).then(resp => {
    myUser = resp.data[0];

    if (myUser == null || myUser.role == 'customer') {
        window.location.href = '/api/home';   
    }

    axios.get(`${URL}/products`).then(response => {
        Products = response.data.products;

        renderizarTabla();
    });
});

let index=0;
let edit=false;

//1- Obtener el body de la tabla para poder modificarlo desde JS
const tablebody = document.querySelector("#table-body");

//2- Definir una función para iterar el array
function renderizarTabla() {
    tablebody.innerHTML = '';
    document.getElementById('exampleModalLabel').innerText = 'Agregar nuevo producto';
    document.getElementById('save-btn').innerText = 'Registrar producto';
    
    index=0;
    //3- Iterar el array para acceder a cada producto
    Products.forEach((producto) => {

        let imageSrc = producto.image ? producto.image : '/assets/img/products/no-product.png';

        //4- Introducir dentro del tbody una fila por producto con sus respectivas celdas
        const tableRow = `<tr class="product">
                            <td class="t-table-cart-img"><img src="/upload/product/${imageSrc}" alt="${producto.name}" class="img-cart"/></td>
                            <td class="t-table-cart product__name">${producto.name}</td>
                            <td class="t-table-cart product__desc">${producto.description}</td>
                            <td class="t-table-cart product__price">S/${producto.price}</td>
                            <td class="t-table-cart product__stock">${producto.stock}</td>
                            <td class="t-table-cart-x product__actions">
                                <i class='fa fa-edit' data-bs-toggle="modal" data-bs-target="#exampleModal" style='color: blue' onclick="editProduct('${producto._id}')" data-bs-whatever="producto"></i>
                                <i class='fa fa-trash' style='color: red' onclick="deleteProduct('${producto._id}')"></i>
                            </td>
                        </tr>`
        tablebody.innerHTML += tableRow;
        index+=1;
    });

    document.querySelector('.count-products').innerHTML = `Hay un total de ${index} productos`
}

function addProduct(evt) {
    evt.preventDefault();

    const product = evt.target.elements;

    const newProduct = {
        name: product.name.value,
        description: product.description.value,
        price: product.price.value,
        stock: product.stock.valueAsNumber,
        image: document.getElementById('uploadImage').files[0]?.name
    };

    const newFormData = new FormData(evt.target);
    const newProductFormData = Object.fromEntries(newFormData);
    // newProductFormData.stock = newProductFormData.stock === "on" ? true : false;
    newProductFormData.price =+ newProductFormData.price

    if(edit == true){
        if(document.getElementById('uploadImage').files[0]) {
            const formData = new FormData();
            formData.append('file', document.getElementById('uploadImage').files[0]);

            axios.post(`${URL}/product/upload/image`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
            }).catch(err => console.log(err));
        } else {
            axios.get(`${URL}/product/${index}`).then(response => {
                newProduct.image = response.data.product.image;
            });

            // setTimeout(()=>{
            //     window.location.href = '/api/admin-product'; 
            // }, 1000);
        }

        axios.patch(`${URL}/product/${index}`, newProduct, {
            headers: {
                Authorization: token
            }
        }).then(response => {
            Swal.fire({
                title: `El producto fue modificado exitosamente.`,
                icon: 'success'
            });
    
            edit = false;

            setTimeout(()=>{
                window.location.href = '/api/admin-product'; 
            }, 1000);
        });
    } else {
        const formData = new FormData();
        formData.append('file', document.getElementById('uploadImage').files[0]);

        axios.post(`${URL}/product/upload/image`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        }).catch(err => console.log(err));

        axios.post(`${URL}/product`, newProduct, {
            headers: {
                Authorization: token
            }
        }).then(response => {
            Swal.fire({
                title: `El producto fue agregado exitosamente.`,
                icon: 'success'
            });

            renderizarTabla();

            evt.target.reset();

            product.name.focus();

            setTimeout(()=>{
                window.location.href = '/api/admin-product'; 
            }, 1000);
        });
    }
}

const exampleModal = document.getElementById('exampleModal')
  if (exampleModal) {
    exampleModal.addEventListener('show.bs.modal', event => {
      // Button that triggered the modal
      const button = event.relatedTarget
      // Extract info from data-bs-* attributes
      const recipient = button.getAttribute('data-bs-whatever')
      // If necessary, you could initiate an Ajax request here
      // and then do the updating in a callback.

      // Update the modal's content.
      const modalTitle = exampleModal.querySelector('.modal-title')
      const modalBodyInput = exampleModal.querySelector('.modal-body input')

    //   modalTitle.textContent = `Agregar nuevo ${recipient}`
    //   modalBodyInput.value = recipient
    })
  }


function editProduct(ix) {

    document.getElementById('exampleModalLabel').innerText = 'Editar producto';
    document.getElementById('save-btn').innerText = 'Guardar cambios';
    edit=true;
    
    let product = [];

    axios.get(`${URL}/product/${ix}`).then(response => {
        product = response.data.product;
        
        // const prod_element = productList.elements;
        
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-description').value = product.description;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-stock').value = product.stock;
        
        index = ix;
    });
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
            axios.delete(`${URL}/product/${ix}`, {
                headers: {
                    Authorization: token
                }
            }).then(response => {
                renderizarTabla();

                Swal.fire({
                  title: 'Producto eliminado!',
                  icon: 'success',
                  background: '#fff'
                })

                setTimeout(()=>{
                    window.location.href = '/api/admin-product'; 
                }, 1000);
            });

        }
      })
}

function reset() {
    document.getElementById('product-name').value = '';
    document.getElementById('product-description').value = '';
    document.getElementById('product-price').value = '';
    document.getElementById('product-stock').value = '';
    edit=false;
}

//renderizarTabla();