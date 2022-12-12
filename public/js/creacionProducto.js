let name = document.getElementById('name');
let price = document.getElementById('price');
let discount = document.getElementById('discount');
let description = document.getElementById('description');
let specification = document.getElementById('specification');
let category = document.getElementById('category');
let type = document.getElementById('type');
let cantidad = document.getElementById('cantidad');
let talla = document.getElementById('talla');
let color = document.getElementById('color');
let pais = document.getElementById('pais');

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

    if(specification.value.trim().length<1){
        arreglo.push(" Especificaciones");
    }

    if(category.value == "0"){
        arreglo.push(" Categoría");
    }

    if(type.value == "0"){
        arreglo.push(" Tipo");
    }

    if(cantidad.value.length<1){
        arreglo.push(" Cantidad");
    }

    if(talla.value.length<1){
        arreglo.push(" Talla");
    }

    if(color.value == "0"){
        arreglo.push(" Color");
    }

    if(pais.value == "0"){
        arreglo.push(" Pais");
    }

    if(arreglo.length>0){
        swal("Debes diligenciar los campos: "+arreglo, "", "warning");
        arreglo = [];
        return;
    }

    formulario.submit();
})