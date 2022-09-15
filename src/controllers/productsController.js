const productsController = {
    creacionProducto: (req, res) => {
        res.render('./products/creacionProducto');
    },

    detalle: (req, res) => {
        res.render('./products/detalle');
    },

    edicionProducto: (req, res) => {
        res.render('./products/edicionProducto');
    },

    listadoProductos: (req, res) => {
        res.render('./products/listadoProductos');
    }
}

module.exports = productsController;
