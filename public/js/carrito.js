const popoverTriggerList = document.querySelectorAll(
	'[data-bs-toggle="popover"]'
);
const popoverList = [...popoverTriggerList].map(
	(popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
);

const idProductos = document.querySelector('.idProductos').innerHTML;
const imagen = document.querySelector('.imagen').innerHTML;
const nombre = document.querySelector('.nombre').innerHTML;
const precioFinal = document.querySelector('.precioFinal').innerHTML;
const cantidad = document.querySelector('.cantidad');
const carrito = document.querySelector('.carrito');

let elemento = {
	idProductos: idProductos,
	nombre: nombre,
	imagen: imagen,
	cantidad: null,
	precioFinal: precioFinal
};

let elementosCarrito = [];

if (localStorage.getItem('carrito') != null) {
	elementosCarrito = JSON.parse(localStorage.getItem('carrito'));
	for (let i = 0; i < elementosCarrito.length; i++) {
		if (elementosCarrito[i].idProductos == idProductos) {
			carrito.innerText = 'Quitar del carrito';
			cambiarEstado();
			break;
		}
	}
}

carrito.addEventListener('click', () => {
	let agregarTrue = carrito.classList.contains('agregarTrue');
	if (agregarTrue) {
		agregarLocalStorage();
		carrito.innerText = 'Quitar del carrito';
	} else {
		quitarLocalStorage();
		carrito.innerText = 'Añadir al carrito';
	}

	cambiarEstado();
	window.location.reload();
});

function agregarLocalStorage() {
	elemento.cantidad = cantidad.selectedOptions[0].value;
	elementosCarrito.push(elemento);
	localStorage.setItem('carrito', JSON.stringify(elementosCarrito));
}

function quitarLocalStorage() {
	elementosCarrito = elementosCarrito.filter(
		(e) => e.idProductos != idProductos
	);
	localStorage.setItem('carrito', JSON.stringify(elementosCarrito));
}

function cambiarEstado() {
	carrito.classList.toggle('btn-success');
	carrito.classList.toggle('btn-danger');
	carrito.classList.toggle('agregarTrue');
}
