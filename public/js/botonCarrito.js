const botonCarrito = document.querySelector('.botonCarrito');
const limpiarCarrito = document.querySelector('.limpiarCarrito');

window.addEventListener('load', () => {
	if (limpiarCarrito.innerHTML != 'true') {
        localStorage.clear();
    }

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