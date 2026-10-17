import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { obtenerCarrito } from "../../utils/carritoStorage.js";

export default function Header() {
    const navigate = useNavigate();
    const [carrito, setCarrito] = useState([]);
    const [sesion, setSesion] = useState(null);
    const [busqueda, setBusqueda] = useState("");

    // Cargar el carrito, la sesión y escuchar actualizaciones
    useEffect(() => {
        const actualizarDatos = () => {
            setCarrito(obtenerCarrito());
            
            // Leer sesión de localStorage
            const sesionGuardada = localStorage.getItem("sonidoVivo_sesion");
            setSesion(sesionGuardada ? JSON.parse(sesionGuardada) : null);
        };

        // Cargar estado inicial
        actualizarDatos();

        // Escuchar eventos personalizados
        window.addEventListener("carritoActualizado", actualizarDatos);
        window.addEventListener("sesionActualizada", actualizarDatos);

        return () => {
            window.removeEventListener("carritoActualizado", actualizarDatos);
            window.removeEventListener("sesionActualizada", actualizarDatos);
        };
    }, []);

    const cantidadProductos = carrito.reduce(
        (total, item) => total + item.cantidad,
        0
    );

    const handleCerrarSesion = () => {
        localStorage.removeItem("sonidoVivo_sesion");
        // Disparar evento para que el Header se actualice al instante
        window.dispatchEvent(new Event("sesionActualizada"));
        navigate("/");
    };

    const handleBuscar = (e) => {
        e.preventDefault();
        const termino = busqueda.trim();
        navigate(termino ? `/catalogo?busqueda=${encodeURIComponent(termino)}` : "/catalogo");
    };

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
                            onSubmit={handleBuscar}
                        >
                            <input
                                type="search"
                                className="form-control me-2"
                                placeholder="Buscar guitarras, amplificadores, micrófonos..."
                                aria-label="Buscar productos"
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
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

                        {/* Renderizado condicional según si hay sesión iniciada */}
                        {sesion ? (
                            <div className="dropdown">
                                <button
                                    className="btn btn-outline-light btn-sm dropdown-toggle d-flex align-items-center gap-1"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    👤 {sesion.nombre}
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end shadow">
                                    {(sesion.rol === "administrador" || sesion.rol === "vendedor") && (
                                        <li>
                                            <Link className="dropdown-item" to="/admin">
                                                ⚙️ Panel Admin
                                            </Link>
                                        </li>
                                    )}
                                    <li>
                                        <button
                                            className="dropdown-item text-danger"
                                            onClick={handleCerrarSesion}
                                        >
                                            🚪 Cerrar Sesión
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-outline-light btn-sm">
                                    Iniciar Sesión
                                </Link>

                                <Link
                                    to="/registro"
                                    className="btn btn-warning btn-sm fw-bold"
                                >
                                    Crear Cuenta
                                </Link>
                            </>
                        )}

                    </div>
                </div>
            </div>
        </header>
    );
}