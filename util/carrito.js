global.carrito = [];

// Función para agregar un producto al carrito
global.addToCart = (producto) => {
    global.carrito.push(producto);
};

// Función para obtener el contenido del carrito
global.getCart = () => {
    return global.carrito;
};

module.exports = carrito;