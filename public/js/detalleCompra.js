const detalleCompra = document.querySelector('.detalleCompra');
const elementosCarrito = JSON.parse(localStorage.getItem('carrito'));
const precioTotal = document.querySelector('.precioTotal');
const products = document.querySelector('.products');
const btnCompra = document.querySelector('.btnCompra');
const formCompra = document.querySelector('.formCompra');
const local = document.querySelector('.local');
const monto = document.querySelector('.monto');

window.addEventListener('load', () => {
    let sumador = 0;
    let iterador = 1;
    if (elementosCarrito != null) {
        for (const p of elementosCarrito) {
            detalleCompra.innerHTML += 
            '<div class="card mb-3">' 
            +   '<div class="row g-0">'
            +       '<div class="col-md-4">'
            +           '<a href="/products/detalle/' + p.idProductos + '">'
            +                '<img src="/imagenes/products/' + p.imagen + '" class="card-img-top" alt="..."/>'
            +           '</a>'
            +        '</div>'
            +       '<div class="col-md-8">'
            +           '<div class="card-body">'
            +               '<h5 class="card-title">' + p.nombre + '</h5>'
            +               '<p class="card-text">'
            +                   '$' + p.precioFinal
            +               '</p>'
            +               '<a href="/products/detalle/' + p.idProductos + '" class="btn btn-danger">Ir a quitar</a>'
            +           '</div>'
            +       '</div>'
            +   '</div>'
            +'</div>';

            products.innerHTML +=
            '<div class="products__item d-flex justify-content-between align-items-center">'
            +    '<div class="product">'
            +        '<p class="product__title fw-bold mb-1">Producto ' + iterador + '</p>'
            +        '<p class="product__text">' + p.nombre + ' <b>X' + p.cantidad + '</b><p>'
            +    '</div>'
            +    '<p class="product__price fw-bold text-success">'
            +        '$' + p.precioFinal*p.cantidad
            +    '</p>'
            +'</div>'

            sumador += parseFloat(p.precioFinal*p.cantidad);
            iterador++;
        }
    }
    precioTotal.innerText += '$' + sumador;

    if (elementosCarrito != null && elementosCarrito.length >= 1) {
        btnCompra.classList.remove('d-none');
        local.value = JSON.stringify(localStorage);
        monto.value = sumador;
    }
});

btnCompra.addEventListener('click', async(e)=>{
    e.preventDefault();
    localStorage.clear();
    await swal("Compra realizada", "Que disfrutes tu compra", "success");
    formCompra.submit();
})
