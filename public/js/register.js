// Guardar el registerForm en una variable
const registerForm = document.getElementById('registerForm');

// Guardar el el boton de registro en una variable
const registerBtn = document.getElementById('registerbtn');

const URL = 'http://localhost:3800';

registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = e.target.elements

    const user = {
        fullname: data.fullname.value,
        dni: data.dni.value,
        email: data.email.value,
        phone:  data.phone.value,
        password: data.password.value,
        role: 'customer'
    }

    if (data.password.value !== data.confirm_password.value) return Swal.fire(`Las contraseñas no coinciden`);

    axios.post(`${URL}/user`, user).then(resp => {
        Swal.fire('El usuario ha sido registrado');

        // Limpiar formulario y redirigir al home
        registerForm.reset
        window.location.href = '/api/login'
    });
});

function validateUser(users, email, dni){
    return users.find(user => {
        if (user.email === email || user.dni === dni) return true;
    })
}