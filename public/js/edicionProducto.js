let name = document.getElementById('name');
let price = document.getElementById('price');
let discount = document.getElementById('discount');
let description = document.getElementById('description');
let specification = document.getElementById('specification');
let cantidad = document.getElementById('cantidad');
let talla = document.getElementById('talla');

let formulario = document.getElementById('formulario');

let arreglo = [];

formulario.addEventListener("submit", function(e){
    e.preventDefault();

    if(name.value.trim().length<1){
        arreglo.push(" Nombre");
    }

    if(price.value.length<1){
        arreglo.push(" Precio");
    }

    if(discount.value.length<1){
        arreglo.push(" Descuento");
    }

    if(description.value.trim().length<1){
        arreglo.push(" Descripción");
    }

    // if(specification.value.trim().length<1){
    //     arreglo.push(" Especificaciones");
    // }

    if(cantidad.value.length<1){
        arreglo.push(" Cantidad");
    }

    // if(talla.value.length<1){
    //     arreglo.push(" Talla");
    // }

    if(arreglo.length>0){
        swal("Debes diligenciar los campos: "+arreglo, "", "warning");
        arreglo = [];
        return;
    }

    formulario.submit();
})