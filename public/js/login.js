// Guardar el login_form en una variable
const loginForm = document.getElementById('loginform');

const URL = 'https://aromacoffee-natalygiron.onrender.com/';

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const {email, password} = loginForm.elements;

    dataLogin = {
        email: email.value,
        password: password.value
    }

    axios.post(`${URL}/user/login`, dataLogin).then(resp => {
        //TODO: insertar alerta custom
        Swal.fire('Bienvenido de nuevo!');

        console.log(resp.data)

        localStorage.setItem('token', resp.data.token);
        localStorage.setItem('email', resp.data.user.email);

        setTimeout(()=>{
            window.location.href = '/api/home'; 
        }, 1500);
    }). catch (err => {
        Swal.fire({
            position: 'center',
            icon: 'warning',
            background: '#fff',
            title: 'Datos Incorrectos',
            showConfirmButton: false,
            timer: 2000
        })
    });
})