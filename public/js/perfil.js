let nombre = document.getElementById('nombre');
let correo = document.getElementById('correo');
let telefono = document.getElementById('telefono');
let direccion = document.getElementById('direccion');
let avatar = document.getElementById('avatar');

let formulario = document.getElementById('formulario');

let arreglo = [];

avatar.addEventListener("change", function(e){
    let extension = avatar.value.substring(avatar.value.lastIndexOf('.'), avatar.value.length);
    if((extension != '.png') && (extension != '.jpg') && (extension != '.jpeg')){
        swal("Debes seleccionar una imagen en formato .png .jpg o .jpeg: ", "", "warning");
    }
})

formulario.addEventListener("submit", function(e){
    e.preventDefault();

    if(correo.value.length<5 || !correo.value.includes('@') || !correo.value.slice(correo.value.indexOf('@'), -2).includes('.')){
        swal("Debes introducir un correo válido", "", "warning");
        return;
    } 

    let extension = avatar.value.substring(avatar.value.lastIndexOf('.'), avatar.value.length);
    if((extension != '.png') && (extension != '.jpg') && (extension != '.jpeg')){
        arreglo.push(" Avatar");
    }

    if(nombre.value.length<1){
        arreglo.push("Nombre");
    }

    if(telefono.value.length<7){
        arreglo.push("Teléfono");
    }

    if(direccion.value.length<1){
        arreglo.push("Dirección");
    }

    if(arreglo.length>0){
        swal("Debes diligenciar correctamente los campos: "+arreglo, "", "warning");
        arreglo = [];
        return;
    }

    formulario.submit();
})