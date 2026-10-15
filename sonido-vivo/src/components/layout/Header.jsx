import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { obtenerCarrito } from "../utils/carritoStorage.js";

export default function Header() {
    const [carrito, setCarrito] = useState([]);

    // Cargar el carrito y escuchar sus actualizaciones
    useEffect(() => {
        const actualizarCarrito = () => {
            setCarrito(obtenerCarrito());
        };

        // Cargar el estado inicial
        actualizarCarrito();

        // Escuchar cambios en el carrito
        window.addEventListener("carritoActualizado", actualizarCarrito);

        return () => {
            window.removeEventListener(
                "carritoActualizado",
                actualizarCarrito
            );
        };
    }, []);

    // Sumar las unidades de todos los productos
    const cantidadProductos = carrito.reduce(
        (total, item) => total + item.cantidad,
        0
    );

    return (
        <header className="site-header py-3 border-bottom shadow-sm">
            <div className="container">
                <div className="row align-items-center g-3">

                    {/* Brand / Logo */}
                    <div className="col-12 col-md-3 text-center text-md-start">
                        <Link
                            to="/"
                            className="text-decoration-none d-inline-flex align-items-center gap-2"
                        >
                            <span className="fs-3 fw-bold text-white">
                                🎵 Sonido Vivo
                            </span>
                        </Link>
                    </div>

                    {/* Buscador Rápido */}
                    <div className="col-12 col-md-5">
                        <form
                            className="d-flex"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <input
                                type="search"
                                className="form-control me-2"
                                placeholder="Buscar guitarras, amplificadores, micrófonos..."
                                aria-label="Buscar productos"
                            />
                            <button
                                className="btn btn-outline-light px-3"
                                type="submit"
                            >
                                Buscar
                            </button>
                        </form>
                    </div>

                    {/* Accesos Rápidos */}
                    <div className="col-12 col-md-4 d-flex justify-content-center justify-content-md-end align-items-center gap-2">

                        {/* Botón Carrito */}
                        <Link
                            to="/carrito"
                            className="btn btn-success d-flex align-items-center gap-2 me-2"
                        >
                            <span>🛒 Carrito</span>
                            <span className="badge text-bg-light rounded-pill">
                                {cantidadProductos}
                            </span>
                        </Link>

                        {/* Iniciar Sesión / Registro */}
                        <Link to="/login" className="btn btn-outline-light btn-sm">
                            Iniciar Sesión
                        </Link>

                        <Link
                            to="/registro"
                            className="btn btn-warning btn-sm fw-bold"
                        >
                            Crear Cuenta
                        </Link>

                    </div>
                </div>
            </div>
        </header>
    );
}
