const botonCarrito = document.querySelector('.botonCarrito');

window.addEventListener('load', () => {
	if (
		localStorage.getItem('carrito') != null &&
		JSON.parse(localStorage.getItem('carrito')).length > 0
	) {
		botonCarrito.classList.add('border');
		botonCarrito.classList.add('bg-danger');
		botonCarrito.classList.add('border-light');
	} else {
		botonCarrito.classList.remove('border');
		botonCarrito.classList.remove('bg-danger');
		botonCarrito.classList.remove('border-light');
	}
});

const cerrar = document.querySelector('.cerrar');

cerrar.addEventListener('click', () => {
	localStorage.clear();
	window.location.href='/users/logout';
})
