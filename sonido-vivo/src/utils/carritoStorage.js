const STORAGE_KEY_CARRITO = "sonidoVivo_carrito";

// Cargar los items del carrito desde localStorage
export function obtenerCarrito() {
    try {
        const guardado = localStorage.getItem(STORAGE_KEY_CARRITO);
        return guardado ? JSON.parse(guardado) : [];
    } catch (error) {
        console.error("Error al leer el carrito:", error);
        return [];
    }
}

// Guardar el arreglo completo del carrito
export function guardarCarrito(carrito) {
    localStorage.setItem(STORAGE_KEY_CARRITO, JSON.stringify(carrito));
}

// Agregar producto o incrementar cantidad si ya existe
export function agregarAlCarritoStorage(producto, cantidad = 1) {
    const carrito = obtenerCarrito();
    const index = carrito.findIndex((item) => item.codigo === producto.codigo);

    if (index >= 0) {
        carrito[index].cantidad += cantidad;
    } else {
        carrito.push({
            codigo: producto.codigo,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            marca: producto.marca,
            modelo: producto.modelo,
            cantidad: cantidad,
        });
    }

    guardarCarrito(carrito);
    return carrito;
}

// Cambiar la cantidad de un producto (+1 o -1)
export function cambiarCantidadStorage(codigo, cambio) {
    let carrito = obtenerCarrito();
    carrito = carrito
        .map((item) => {
            if (item.codigo === codigo) {
                const nuevaCantidad = item.cantidad + cambio;
                return nuevaCantidad > 0 ? { ...item, cantidad: nuevaCantidad } : null;
            }
            return item;
        })
        .filter(Boolean);

    guardarCarrito(carrito);
    return carrito;
}

// Eliminar un producto del carrito por su código
export function eliminarDelCarritoStorage(codigo) {
    const carrito = obtenerCarrito();
    const actualizado = carrito.filter((item) => item.codigo !== codigo);
    guardarCarrito(actualizado);
    return actualizado;
}

// Vaciar el carrito por completo
export function vaciarCarritoStorage() {
    localStorage.removeItem(STORAGE_KEY_CARRITO);
    return [];
}
