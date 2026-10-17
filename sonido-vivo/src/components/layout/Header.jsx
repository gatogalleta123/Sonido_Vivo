import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { obtenerProductos } from "../../data/productos.js";
import { obtenerCarrito } from "../../utils/carritoStorage.js";

export default function Header() {
    const navigate = useNavigate();
    const [carrito, setCarrito] = useState([]);
    const [busqueda, setBusqueda] = useState("");

    // Cargar el carrito y escuchar actualizaciones
    useEffect(() => {
        const actualizarDatos = () => {
            setCarrito(obtenerCarrito());
        };

        // Cargar estado inicial
        actualizarDatos();

        // Escuchar eventos personalizados
        window.addEventListener("carritoActualizado", actualizarDatos);

        return () => {
            window.removeEventListener("carritoActualizado", actualizarDatos);
        };
    }, []);

    const cantidadProductos = carrito.reduce(
        (total, item) => total + item.cantidad,
        0
    );

    const resultadosBusqueda = useMemo(() => {
        const termino = busqueda.trim().toLocaleLowerCase("es-CL");
        if (!termino) return [];

        return obtenerProductos()
            .filter((producto) =>
                [producto.nombre, producto.marca, producto.modelo, producto.codigo, producto.categoria]
                    .some((dato) => dato.toLocaleLowerCase("es-CL").includes(termino))
            )
            .slice(0, 5);
    }, [busqueda]);

    const handleBuscar = (e) => {
        e.preventDefault();
        const termino = busqueda.trim();
        navigate(termino ? `/catalogo?busqueda=${encodeURIComponent(termino)}` : "/catalogo");
        setBusqueda("");
    };

    return (
        <header className="site-header py-3 border-bottom shadow-sm">
            <div className="container">
                <div className="row align-items-center g-3">

                    {/* Brand / Logo */}
                    <div className="d-none d-lg-block col-lg-3 text-center text-lg-start">
                        <Link
                            to="/"
                            className="text-decoration-none d-inline-flex align-items-center gap-2"
                        >
                            <span className="fs-3 fw-bold text-white">
                                <i className="bi bi-music-note-beamed me-2" aria-hidden="true"></i>
                                Sonido Vivo
                            </span>
                        </Link>
                    </div>

                    {/* Buscador Rápido */}
                    <div className="col-9 col-lg-6">
                        <form className="d-flex w-100 position-relative" onSubmit={handleBuscar}>
                            <div className="position-relative flex-grow-1">
                                <input
                                    type="search"
                                    className="form-control"
                                    placeholder="Buscar guitarras, amplificadores, micrófonos..."
                                    aria-label="Buscar productos"
                                    aria-controls="resultados-busqueda-header"
                                    aria-expanded={Boolean(busqueda.trim())}
                                    value={busqueda}
                                    onChange={(e) => setBusqueda(e.target.value)}
                                />
                                {busqueda.trim() && (
                                    <div
                                        id="resultados-busqueda-header"
                                        className="position-absolute top-100 start-0 w-100 bg-white rounded-3 shadow mt-1 overflow-hidden"
                                        style={{ zIndex: 1080 }}
                                    >
                                        {resultadosBusqueda.length > 0 ? (
                                            <>
                                                {resultadosBusqueda.map((producto) => (
                                                    <Link
                                                        key={producto.codigo}
                                                        to={`/detalle-producto/${encodeURIComponent(producto.codigo)}`}
                                                        className="d-flex align-items-center gap-3 p-2 text-decoration-none text-dark border-bottom"
                                                        onClick={() => setBusqueda("")}
                                                    >
                                                        <img
                                                            src={producto.imagen}
                                                            alt=""
                                                            className="rounded"
                                                            style={{ width: "44px", height: "44px", objectFit: "cover" }}
                                                        />
                                                        <span className="flex-grow-1 overflow-hidden">
                                                            <span className="d-block fw-semibold text-truncate">
                                                                {producto.nombre}
                                                            </span>
                                                            <small className="text-muted">
                                                                {producto.marca} · {producto.precio.toLocaleString("es-CL", {
                                                                    style: "currency",
                                                                    currency: "CLP",
                                                                    maximumFractionDigits: 0,
                                                                })}
                                                            </small>
                                                        </span>
                                                    </Link>
                                                ))}
                                                <button
                                                    type="submit"
                                                    className="btn btn-light w-100 rounded-0 fw-semibold"
                                                >
                                                    Ver todos los resultados
                                                </button>
                                            </>
                                        ) : (
                                            <p className="text-muted small mb-0 p-3">
                                                No se encontraron productos para “{busqueda.trim()}”.
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                            <button className="btn btn-outline-light px-3 ms-2" type="submit">
                                <i className="bi bi-search me-1" aria-hidden="true"></i>
                                Buscar
                            </button>
                        </form>
                    </div>

                    {/* Accesos Rápidos */}
                    <div className="col-3 col-lg-3 d-flex justify-content-end align-items-center gap-2">

                        {/* Carrito */}
                        <Link
                            to="/carrito"
                            className="btn btn-success d-flex align-items-center gap-2 px-2 px-lg-3"
                            aria-label={`Carrito, ${cantidadProductos} productos`}
                        >
                            <i className="bi bi-cart3 fs-5" aria-hidden="true"></i>
                            <span className="d-none d-lg-inline">Carrito</span>

                            <span className="badge text-bg-light rounded-pill">
                                {cantidadProductos}
                            </span>
                        </Link>

                    </div>
                </div>
            </div>
        </header>
    );
}