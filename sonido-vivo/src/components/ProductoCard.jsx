import { Link } from "react-router-dom";

export default function ProductoCard({ producto, onAgregarAlCarrito }) {
    const esStockCritico = producto.stock <= producto.stockCritico;

    return (
        <div className="col">
            <div className="card h-100 shadow-sm border-0 rounded-3 overflow-hidden bg-white">

                {/* Encabezado con imagen y badges */}
                <div className="position-relative bg-light text-center p-3">
                    <span className="badge bg-secondary position-absolute top-0 start-0 m-2">
                        {producto.categoria}
                    </span>

                    {esStockCritico && (
                        <span className="badge bg-danger position-absolute top-0 end-0 m-2">
                            ⚠️ Últimas {producto.stock} unidades
                        </span>
                    )}

                    <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="card-img-top img-fluid"
                        style={{ height: "180px", objectFit: "cover" }}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/300x200?text=Sonido+Vivo";
                        }}
                    />
                </div>

                {/* Cuerpo de la tarjeta */}
                <div className="card-body d-flex flex-column p-3">
                    <small className="text-muted fw-semibold">
                        {producto.marca} - {producto.modelo}
                    </small>

                    <h6 className="card-title fw-bold text-dark my-1">
                        {producto.nombre}
                    </h6>

                    <p className="card-text text-muted small flex-grow-1">
                        {producto.descripcion}
                    </p>

                    <div className="mt-2 pt-2 border-top">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-muted small">Precio:</span>
                            <span className="fs-5 fw-bold text-success">
                                \${producto.precio.toLocaleString("es-CL")}
                            </span>
                        </div>

                        {/* Acciones */}
                        <div className="d-grid gap-2">
                            <button
                                type="button"
                                className="btn btn-warning btn-sm fw-bold"
                                onClick={() => onAgregarAlCarrito && onAgregarAlCarrito(producto)}
                            >
                                🛒 Añadir al carrito
                            </button>

                            <Link
                                to={`/detalle-producto/${producto.codigo}`}
                                className="btn btn-outline-dark btn-sm text-center"
                            >
                                Ver detalles
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
