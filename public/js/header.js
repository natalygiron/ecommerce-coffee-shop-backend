let email = localStorage.getItem('email');

let myUserControl = null;

axios.get(`${URL}/users/${email}`).then(resp => {
    myUserControl = resp.data[0];

    if (myUserControl?.role == 'admin') {
        document.querySelector('.dropdown').setAttribute('style', 'display:inline !important');
    }

    let user = resp.data[0];
    let cuenta = document.getElementById('account');
    
    if(user) {
        cuenta.innerHTML = `<a>Cerrar sesión</a>`

        cuenta.onclick = () => {
          localStorage.removeItem('token');
          localStorage.removeItem('email');
          cuenta.innerHTML = `<a href="./pages/login/login.html">Cuenta</a>`;
          Swal.fire({
            title: '¡Hasta pronto!',
            icon: 'success',
            background: '#fff',
            timer: 3000
          }).then(() => {
            window.location.reload();
            window.location.href = '/api/home'; 
          }) 
        }
    }
});