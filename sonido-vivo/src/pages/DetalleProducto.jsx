import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
    obtenerProductoPorCodigo,
    obtenerProductos,
} from "../data/productos.js";
import ProductoCard from "../components/ProductoCard.jsx";

export default function DetalleProducto() {
    const { codigo } = useParams();
    const navigate = useNavigate();

    const [producto, setProducto] = useState(null);
    const [relacionados, setRelacionados] = useState([]);
    const [cantidad, setCantidad] = useState(1);
    const [mensajeToast, setMensajeToast] = useState("");

    useEffect(() => {
        // Cargar producto dinámicamente según el parámetro de la URL
        const prodEncontrado = obtenerProductoPorCodigo(codigo);
        if (prodEncontrado) {
            setProducto(prodEncontrado);
            setCantidad(1);

            // Cargar productos relacionados de la misma categoría (excluyendo el actual)
            const todos = obtenerProductos();
            const filtrados = todos.filter(
                (p) => p.categoria === prodEncontrado.categoria && p.codigo !== codigo
            );
            setRelacionados(filtrados.slice(0, 4));
        } else {
            setProducto(null);
        }
    }, [codigo]);

    // Si el código no existe en la base de datos
    if (!producto) {
        return (
            <div className="container text-center py-5">
                <div className="card shadow-sm border-0 p-5 mx-auto" style={{ maxWidth: "500px" }}>
                    <span className="fs-1">⚠️</span>
                    <h3 className="fw-bold mt-3">Producto no encontrado</h3>
                    <p className="text-muted">
                        El código de producto <strong>{codigo}</strong> no existe en nuestro catálogo.
                    </p>
                    <button
                        className="btn btn-warning fw-bold mt-3"
                        onClick={() => navigate("/catalogo")}
                    >
                        ← Volver al Catálogo
                    </button>
                </div>
            </div>
        );
    }

    const esStockCritico = producto.stock <= producto.stockCritico;

    const handleIncrementar = () => {
        if (cantidad < producto.stock) {
            setCantidad(cantidad + 1);
        }
    };

    const handleDecrementar = () => {
        if (cantidad > 1) {
            setCantidad(cantidad - 1);
        }
    };

    const handleAgregarAlCarrito = () => {
        setMensajeToast(`¡Agregaste ${cantidad} unidad(es) de ${producto.nombre} al carrito!`);
        setTimeout(() => {
            setMensajeToast("");
        }, 3000);
    };

    return (
        <div className="detalle-producto-container">

            {/* Miga de pan / Breadcrumb */}
            <nav aria-label="breadcrumb" className="mb-4">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/" className="text-decoration-none">Inicio</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to="/catalogo" className="text-decoration-none">Catálogo</Link>
                    </li>
                    <li className="breadcrumb-item text-muted">{producto.categoria}</li>
                    <li className="breadcrumb-item active fw-bold" aria-current="page">
                        {producto.codigo}
                    </li>
                </ol>
            </nav>

            {/* Toast flotante de confirmación */}
            {mensajeToast && (
                <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1100 }}>
                    <div className="alert alert-success shadow-lg d-flex align-items-center gap-2 mb-0" role="alert">
                        <span>✅</span>
                        <div>{mensajeToast}</div>
                    </div>
                </div>
            )}

            {/* Ficha Principal del Producto */}
            <div className="card shadow-sm border-0 rounded-3 overflow-hidden bg-white mb-5">
                <div className="row g-0">

                    {/* Imagen del Producto */}
                    <div className="col-12 col-md-6 bg-light d-flex align-items-center justify-content-center p-4">
                        <div className="position-relative w-100 text-center">
                            <span className="badge bg-secondary position-absolute top-0 start-0 m-2">
                                {producto.categoria}
                            </span>
                            <img
                                src={producto.imagen}
                                alt={producto.nombre}
                                className="img-fluid rounded shadow-sm"
                                style={{ maxHeight: "400px", objectFit: "contain" }}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://via.placeholder.com/500x400?text=Sonido+Vivo";
                                }}
                            />
                        </div>
                    </div>

                    {/* Detalles e Información Técnica */}
                    <div className="col-12 col-md-6 p-4 p-lg-5 d-flex flex-column justify-content-between">
                        <div>
                            <div className="d-flex justify-content-between align-items-start mb-2">
                                <span className="text-uppercase text-muted fw-bold small">
                                    {producto.marca} | Modelo: {producto.modelo}
                                </span>
                                <span className="badge text-bg-light border">
                                    Cód: {producto.codigo}
                                </span>
                            </div>

                            <h2 className="fw-bold text-dark mb-3">
                                {producto.nombre}
                            </h2>

                            <div className="mb-3">
                                <span className="fs-2 fw-bold text-success me-3">
                                    \${producto.precio.toLocaleString("es-CL")}
                                </span>
                                <span className="text-muted small">IVA incluido</span>
                            </div>

                            {/* Estado del Inventario */}
                            <div className="mb-4">
                                {producto.stock > 0 ? (
                                    <div>
                                        <span className="badge bg-success-subtle text-success border border-success me-2">
                                            ✔ Disponible ({producto.stock} en stock)
                                        </span>
                                        {esStockCritico && (
                                            <span className="badge bg-danger-subtle text-danger border border-danger">
                                                ⚠️ Stock crítico (¡Pocas unidades!)
                                            </span>
                                        )}
                                    </div>
                                ) : (
                                    <span className="badge bg-danger">Agotado</span>
                                )}
                            </div>

                            <hr />

                            <h6 className="fw-bold text-dark mb-2">Descripción del Producto:</h6>
                            <p className="text-muted mb-4 lead fs-6">
                                {producto.descripcion}
                            </p>
                        </div>

                        {/* Selector de Cantidad y Botones de Compra */}
                        <div>
                            <div className="row g-3 align-items-center mb-3">
                                <div className="col-auto">
                                    <label className="fw-bold small me-2">Cantidad:</label>
                                </div>
                                <div className="col-auto">
                                    <div className="input-group input-group-sm" style={{ width: "130px" }}>
                                        <button
                                            className="btn btn-outline-secondary"
                                            type="button"
                                            onClick={handleDecrementar}
                                            disabled={cantidad <= 1}
                                        >
                                            -
                                        </button>
                                        <input
                                            type="text"
                                            className="form-control text-center fw-bold bg-white"
                                            value={cantidad}
                                            readOnly
                                        />
                                        <button
                                            className="btn btn-outline-secondary"
                                            type="button"
                                            onClick={handleIncrementar}
                                            disabled={cantidad >= producto.stock}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="d-grid gap-2 d-sm-flex">
                                <button
                                    type="button"
                                    className="btn btn-warning btn-lg fw-bold flex-grow-1"
                                    onClick={handleAgregarAlCarrito}
                                    disabled={producto.stock === 0}
                                >
                                    🛒 Añadir al carrito
                                </button>
                                <Link
                                    to="/catalogo"
                                    className="btn btn-outline-dark btn-lg fw-semibold"
                                >
                                    ← Volver
                                </Link>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            {/* Sección de Productos Relacionados */}
            {relacionados.length > 0 && (
                <section className="mb-5">
                    <h4 className="fw-bold mb-4" style={{ color: "var(--color-purpura-profundo)" }}>
                        Productos Relacionados ({producto.categoria})
                    </h4>
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
                        {relacionados.map((item) => (
                            <ProductoCard key={item.codigo} producto={item} />
                        ))}
                    </div>
                </section>
            )}

        </div>
    );
}
