let correo = document.getElementById('correo');
let password = document.getElementById('password');
let formulario = document.getElementById('formulario');

formulario.addEventListener("submit", function(e){
    e.preventDefault();

    if(correo.value.length<5 || !correo.value.includes('@') || !correo.value.slice(correo.value.indexOf('@'), -2).includes('.')){
        swal("Debes introducir un correo válido", "", "warning");
        return;
    }

    if(password.value.length<6){
        swal("Ingresa una contraseña valida", "", "warning");
        return;
    }

    formulario.submit();
})