const detalleCompra = document.querySelector('.detalleCompra');
const elementosCarrito = JSON.parse(localStorage.getItem('carrito'));
const precioTotal = document.querySelector('.precioTotal');
const products = document.querySelector('.products');

window.addEventListener('load', () => {
    let sumador = 0;
    let iterador = 1;
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
        +        '<p class="product__text">' + p.nombre + '<p>'
        +    '</div>'
        +    '<p class="product__price fw-bold text-success">'
        +        '$' + p.precioFinal
        +    '</p>'
        +'</div>';

        sumador += parseFloat(p.precioFinal);
        iterador++;
    }

    precioTotal.innerText += '$' + sumador;
});
