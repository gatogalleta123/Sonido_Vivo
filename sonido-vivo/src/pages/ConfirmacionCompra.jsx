import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function ConfirmacionCompra() {
    const { numeroOrden } = useParams();
    const [orden, setOrden] = useState(null);

    useEffect(() => {
        try {
            const ultimaOrdenGuardada = localStorage.getItem("sonidoVivo_ultimaOrden");
            if (ultimaOrdenGuardada) {
                const datosOrden = JSON.parse(ultimaOrdenGuardada);
                if (datosOrden.numeroOrden === numeroOrden) {
                    setOrden(datosOrden);
                }
            }
        } catch (error) {
            console.error("Error al cargar la orden:", error);
        }
    }, [numeroOrden]);

    // Si no se encuentra la orden en el almacenamiento local
    if (!orden) {
        return (
            <div className="container text-center py-5">
                <div className="card shadow-sm border-0 p-5 mx-auto" style={{ maxWidth: "550px" }}>
                    <span className="fs-1">🔍</span>
                    <h3 className="fw-bold mt-3">Orden no encontrada</h3>
                    <p className="text-muted">
                        No pudimos encontrar el comprobante para el número de orden <strong>{numeroOrden}</strong>.
                    </p>
                    <Link to="/catalogo" className="btn btn-warning fw-bold mt-3">
                        ← Volver al Catálogo
                    </Link>
                </div>
            </div>
        );
    }

    const { cliente, items, subtotal, costoDespacho, totalFinal, fecha } = orden;

    return (
        <div className="confirmacion-container mb-5">

            {/* Banner de Éxito */}
            <div className="bg-white p-4 p-md-5 rounded-3 shadow-sm mb-4 border text-center">
                <div className="d-inline-flex p-3 rounded-circle bg-success bg-opacity-10 text-success mb-3">
                    <span className="fs-1">🎉</span>
                </div>
                <h1 className="fw-bold text-success mb-2">¡Gracias por tu compra!</h1>
                <p className="lead text-muted mb-3">
                    Tu pedido ha sido procesado exitosamente y estamos preparando tus productos.
                </p>
                <div className="d-inline-block bg-light px-4 py-2 rounded-pill border">
                    <span className="text-muted me-2">Número de Orden:</span>
                    <strong className="text-dark fs-5">{numeroOrden}</strong>
                </div>
            </div>

            <div className="row g-4">

                {/* Detalle de Productos y Resumen */}
                <div className="col-12 col-lg-8">
                    <div className="card shadow-sm border-0 bg-white mb-4">
                        <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                            <h5 className="fw-bold mb-0">Resumen de Artículos</h5>
                            <span className="text-muted small">Fecha: {fecha}</span>
                        </div>

                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table align-middle mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Producto</th>
                                            <th className="text-center">Precio Unitario</th>
                                            <th className="text-center">Cantidad</th>
                                            <th className="text-end">Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map((item) => (
                                            <tr key={item.codigo}>
                                                <td>
                                                    <div className="d-flex align-items-center gap-3">
                                                        <img
                                                            src={item.imagen}
                                                            alt={item.nombre}
                                                            className="rounded"
                                                            style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                                            onError={(e) => {
                                                                e.target.onerror = null;
                                                                e.target.src = "https://via.placeholder.com/50x50?text=Sonido+Vivo";
                                                            }}
                                                        />
                                                        <div>
                                                            <h6 className="mb-0 fw-bold">{item.nombre}</h6>
                                                            <small className="text-muted">Cód: {item.codigo}</small>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="text-center fw-semibold">
                                                    \${item.precio.toLocaleString("es-CL")}
                                                </td>
                                                <td className="text-center fw-bold">{item.cantidad}</td>
                                                <td className="text-end fw-bold text-success">
                                                    \${(item.precio * item.cantidad).toLocaleString("es-CL")}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="card-footer bg-white py-3">
                            <div className="row text-end">
                                <div className="col-8 text-muted">Subtotal:</div>
                                <div className="col-4 fw-semibold">\${subtotal.toLocaleString("es-CL")}</div>

                                <div className="col-8 text-muted mt-1">Costo de Despacho:</div>
                                <div className="col-4 fw-semibold mt-1">
                                    {costoDespacho === 0 ? "Gratis" : `$${costoDespacho.toLocaleString("es-CL")}`}
                                </div>

                                <div className="col-8 fs-5 fw-bold text-dark mt-2">Total Pagado:</div>
                                <div className="col-4 fs-5 fw-bold text-success mt-2">
                                    \${totalFinal.toLocaleString("es-CL")}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Información del Cliente y Acciones */}
                <div className="col-12 col-lg-4">
                    <div className="card shadow-sm border-0 bg-white mb-4">
                        <div className="card-header bg-white py-3">
                            <h5 className="fw-bold mb-0">Datos de Entrega y Pago</h5>
                        </div>
                        <div className="card-body">

                            <div className="mb-3">
                                <small className="text-muted d-block fw-bold text-uppercase">Cliente</small>
                                <span className="fw-semibold text-dark">
                                    {cliente.nombre} {cliente.apellidos}
                                </span>
                                <div className="small text-muted">RUT: {cliente.rut}</div>
                                <div className="small text-muted">Correo: {cliente.correo}</div>
                                <div className="small text-muted">Teléfono: {cliente.telefono}</div>
                            </div>

                            <hr />

                            <div className="mb-3">
                                <small className="text-muted d-block fw-bold text-uppercase">Método de Envío</small>
                                <span className="fw-semibold text-dark">
                                    {cliente.metodoDespacho === "domicilio" ? "🚚 Despacho a Domicilio" : "📍 Retiro en Tienda"}
                                </span>
                                {cliente.metodoDespacho === "domicilio" ? (
                                    <div className="small text-muted mt-1">
                                        {cliente.direccion} {cliente.departamento && `(${cliente.departamento})`}<br />
                                        {cliente.comuna}, {cliente.region}
                                    </div>
                                ) : (
                                    <div className="small text-muted mt-1">
                                        Sucursal Av. Providencia 1234, Santiago.
                                    </div>
                                )}
                            </div>

                            <hr />

                            <div className="mb-3">
                                <small className="text-muted d-block fw-bold text-uppercase">Medio de Pago</small>
                                <span className="fw-semibold text-dark">
                                    {cliente.medioPago === "tarjeta"
                                        ? "💳 Webpay Plus / Tarjeta"
                                        : "🏦 Transferencia Bancaria"}
                                </span>
                            </div>

                        </div>
                    </div>

                    {/* Botones de Acción */}
                    <div className="d-grid gap-2">
                        <button
                            type="button"
                            className="btn btn-outline-dark fw-bold"
                            onClick={() => window.print()}
                        >
                            🖨️ Imprimir Comprobante
                        </button>
                        <Link to="/catalogo" className="btn btn-warning fw-bold">
                            🎸 Continuar Comprando
                        </Link>
                    </div>
                </div>

            </div>

        </div>
    );
}
