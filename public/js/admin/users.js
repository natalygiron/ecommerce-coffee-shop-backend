let userEmail = localStorage.getItem('email');
let token = localStorage.getItem('token');

let myUser = null;
let userList = [];

const URL = 'https://aromacoffee-natalygiron.onrender.com';

axios.get(`${URL}/users/${userEmail}`).then(resp => {
    myUser = resp.data[0];

    if (myUser == null || myUser.role == 'customer') {
        window.location.href = '/api/home';   
    }

    axios.get(`${URL}/users`, {
        headers: {
            Authorization: token
        }
    }).then(response => {
        userList = response.data.users;

        renderizarTabla();
    });
});

let index = undefined;

const tablebody = document.querySelector("#table-body");

function renderizarTabla() {
    tablebody.innerHTML = '';

    index = 0;

    userList.forEach((user) => {

        const tableRow = `<tr class="product">
                            <td class="t-table-cart">${user.fullname}</td>
                            <td class="t-table-cart">${user.dni}</td>
                            <td class="t-table-cart">${user.email}</td>
                            <td class="t-table-cart">${user.phone}</td>
                            <td class="t-table-cart">${user.role}</td>
                            <td class="t-table-cart-x">
                                <i class='fa fa-edit' data-bs-toggle="modal" data-bs-target="#exampleModal" style='color: blue' onclick="editUser('${user._id}')" data-bs-whatever="producto"></i>
                                <i class='fa fa-trash' style='color: red' onclick="deleteUser('${user._id}')"></i>
                            </td>
                        </tr>`

        tablebody.innerHTML += tableRow;

        index+=1;
    });

    document.querySelector('.count-users').innerHTML = `Hay un total de ${index} usuarios`
}

function editUser(ix) {
    let user = [];
    
    axios.get(`${URL}/user/${ix}`, {
        headers: {
            Authorization: token
        }
    }).then(response => {
        document.getElementById('user-name').value = response.data.user.fullname;
        document.getElementById('user-dni').value = response.data.user.dni;
        document.getElementById('user-mail').value = response.data.user.email;
        document.getElementById('user-phone').value = response.data.user.phone;
        document.getElementById('user-role').value = response.data.user.role;
    });;

    index = ix;
}

function modifyUser(evt) {
    evt.preventDefault();

    const userForm = evt.target.elements;
    
    const userMod = {
        fullname: userForm.name.value,
        dni: userForm.dni.value,
        email: userForm.mail.value,
        password: userForm.password.value,
        phone: userForm.phone.value,
        role: userForm.role.value
    };

    //localStorage.setItem('users', JSON.stringify(userList));

    axios.patch(`${URL}/user/${index}`, userMod, {
        headers: {
            Authorization: token
        }
    }).then(response => {
        Swal.fire('Usuario modificado exitosamente');

        setTimeout(()=>{
            window.location.href = '/api/admin-user'; 
        }, 1000);
    });
}

function deleteUser(ix) {
    Swal.fire({
        title: '¿Eliminar usuario?',
        icon: 'warning',
        showCancelButton: true,
        background: '#fff',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
        if (result.isConfirmed) {
            axios.delete(`${URL}/user/${ix}`, {
                headers: {
                    Authorization: token
                }
            }).then(response => {
                renderizarTabla();

                Swal.fire({
                  title: 'Usuario eliminado!',
                  icon: 'success',
                  background: '#fff'
                });

                setTimeout(()=>{
                    window.location.href = '/api/admin-user'; 
                }, 1000);
            });
        }
      })
}

function reset() {
    document.getElementById('user-name').value = '';
    document.getElementById('user-dni').value = '';
    document.getElementById('user-mail').value = '';
    document.getElementById('user-phone').value = '';
    document.getElementById('user-rol').value = '';
}

// renderizarTabla();