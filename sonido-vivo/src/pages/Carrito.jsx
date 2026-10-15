import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    obtenerCarrito,
    cambiarCantidadStorage,
    eliminarDelCarritoStorage,
    vaciarCarritoStorage,
} from "../utils/carritoStorage.js";

export default function Carrito() {
    const navigate = useNavigate();
    const [carrito, setCarrito] = useState([]);
    const [cupon, setCupon] = useState("");
    const [descuentoPorcentaje, setDescuentoPorcentaje] = useState(0);
    const [mensajeCupon, setMensajeCupon] = useState(null);

    useEffect(() => {
        setCarrito(obtenerCarrito());
    }, []);

    // Modificar cantidad
    const handleCambiarCantidad = (codigo, cambio) => {
        const actualizado = cambiarCantidadStorage(codigo, cambio);
        setCarrito(actualizado);
    };

    // Eliminar producto
    const handleEliminar = (codigo) => {
        const actualizado = eliminarDelCarritoStorage(codigo);
        setCarrito(actualizado);
    };

    // Vaciar carrito
    const handleVaciar = () => {
        if (window.confirm("¿Seguro que deseas vaciar el carrito de compras?")) {
            const actualizado = vaciarCarritoStorage();
            setCarrito(actualizado);
        }
    };

    // Aplicar cupón de descuento
    const handleAplicarCupon = (e) => {
        e.preventDefault();
        const codigoUpper = cupon.trim().toUpperCase();

        if (codigoUpper === "SONIDO10") {
            setDescuentoPorcentaje(10);
            setMensajeCupon({ tipo: "success", texto: "¡Cupón 'SONIDO10' aplicado! (10% de descuento)" });
        } else if (codigoUpper === "DUOC20") {
            setDescuentoPorcentaje(20);
            setMensajeCupon({ tipo: "success", texto: "¡Cupón 'DUOC20' aplicado! (20% de descuento)" });
        } else {
            setDescuentoPorcentaje(0);
            setMensajeCupon({ tipo: "danger", texto: "El código de cupón no es válido o ha expirado." });
        }
    };

    // Cálculos financieros
    const subtotal = useMemo(() => {
        return carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    }, [carrito]);

    const montoDescuento = useMemo(() => {
        return Math.round((subtotal * descuentoPorcentaje) / 100);
    }, [subtotal, descuentoPorcentaje]);

    const totalFinal = useMemo(() => {
        return subtotal - montoDescuento;
    }, [subtotal, montoDescuento]);

    return (
        <div className="carrito-container">

            {/* Encabezado */}
            <div className="bg-white p-4 rounded-3 shadow-sm mb-4 border">
                <h1 className="fw-bold mb-1" style={{ color: "var(--color-purpura-profundo)" }}>
                    🛒 Carrito de Compras
                </h1>
                <p className="text-muted m-0">
                    Revisa el detalle de tus instrumentos y equipos antes de continuar con la compra.
                </p>
            </div>

            {carrito.length > 0 ? (
                <div className="row g-4 mb-5">

                    {/* Tabla de Productos */}
                    <div className="col-12 col-lg-8">
                        <div className="card shadow-sm border-0 bg-white">
                            <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                                <span className="fw-bold text-dark">
                                    Productos Seleccionados ({carrito.length})
                                </span>
                                <button
                                    type="button"
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={handleVaciar}
                                >
                                    🗑️ Vaciar Carrito
                                </button>
                            </div>

                            <div className="card-body p-0">
                                <div className="table-responsive">
                                    <table className="table align-middle mb-0">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Producto</th>
                                                <th className="text-center">Precio</th>
                                                <th className="text-center">Cantidad</th>
                                                <th className="text-end">Subtotal</th>
                                                <th className="text-center">Acción</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {carrito.map((item) => (
                                                <tr key={item.codigo}>
                                                    <td>
                                                        <div className="d-flex align-items-center gap-3">
                                                            <img
                                                                src={item.imagen}
                                                                alt={item.nombre}
                                                                className="rounded"
                                                                style={{ width: "60px", height: "60px", objectFit: "cover" }}
                                                                onError={(e) => {
                                                                    e.target.onerror = null;
                                                                    e.target.src = "https://via.placeholder.com/60x60?text=Sonido+Vivo";
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
                                                    <td className="text-center">
                                                        <div className="input-group input-group-sm mx-auto" style={{ width: "100px" }}>
                                                            <button
                                                                className="btn btn-outline-secondary"
                                                                type="button"
                                                                onClick={() => handleCambiarCantidad(item.codigo, -1)}
                                                            >
                                                                -
                                                            </button>
                                                            <span className="form-control text-center fw-bold bg-light">
                                                                {item.cantidad}
                                                            </span>
                                                            <button
                                                                className="btn btn-outline-secondary"
                                                                type="button"
                                                                onClick={() => handleCambiarCantidad(item.codigo, 1)}
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className="text-end fw-bold text-success">
                                                        \${(item.precio * item.cantidad).toLocaleString("es-CL")}
                                                    </td>
                                                    <td className="text-center">
                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-danger btn-sm"
                                                            title="Eliminar producto"
                                                            onClick={() => handleEliminar(item.codigo)}
                                                        >
                                                            ✕
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="card-footer bg-white py-3">
                                <Link to="/catalogo" className="btn btn-outline-dark btn-sm fw-bold">
                                    ← Seguir comprando
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Resumen del Pedido y Pago */}
                    <div className="col-12 col-lg-4">
                        <div className="card shadow-sm border-0 bg-white">
                            <div className="card-header bg-white py-3">
                                <h5 className="fw-bold mb-0">Resumen de la Orden</h5>
                            </div>

                            <div className="card-body">

                                {/* Aplicar Cupón */}
                                <form onSubmit={handleAplicarCupon} className="mb-4">
                                    <label htmlFor="inputCupon" className="form-label small fw-bold text-muted">
                                        ¿Tienes un cupón de descuento?
                                    </label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            id="inputCupon"
                                            className="form-control text-uppercase"
                                            placeholder="Ej: SONIDO10"
                                            value={cupon}
                                            onChange={(e) => setCupon(e.target.value)}
                                        />
                                        <button className="btn btn-outline-dark fw-bold" type="submit">
                                            Aplicar
                                        </button>
                                    </div>
                                    {mensajeCupon && (
                                        <div className={`form-text text-${mensajeCupon.tipo} fw-bold mt-1`}>
                                            {mensajeCupon.texto}
                                        </div>
                                    )}
                                </form>

                                <hr />

                                {/* Desglose de Precios */}
                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-muted">Subtotal:</span>
                                    <span className="fw-semibold">\${subtotal.toLocaleString("es-CL")}</span>
                                </div>

                                {montoDescuento > 0 && (
                                    <div className="d-flex justify-content-between mb-2 text-success">
                                        <span>Descuento ({descuentoPorcentaje}%):</span>
                                        <span className="fw-bold">-\${montoDescuento.toLocaleString("es-CL")}</span>
                                    </div>
                                )}

                                <div className="d-flex justify-content-between mb-3">
                                    <span className="text-muted">Despacho:</span>
                                    <span className="text-success fw-bold">Por calcular en Checkout</span>
                                </div>

                                <hr />

                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <span className="fs-5 fw-bold text-dark">Total estimado:</span>
                                    <span className="fs-4 fw-bold text-success">
                                        \${totalFinal.toLocaleString("es-CL")}
                                    </span>
                                </div>

                                <div className="d-grid gap-2">
                                    <button
                                        type="button"
                                        className="btn btn-success btn-lg fw-bold shadow-sm"
                                        onClick={() => navigate("/checkout")}
                                    >
                                        💳 Continuar al Pago (Checkout)
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            ) : (
                /* Estado Vacío */
                <div className="text-center py-5 bg-white rounded-3 shadow-sm border mb-5">
                    <span className="fs-1">🛒</span>
                    <h3 className="fw-bold mt-3">Tu carrito está vacío</h3>
                    <p className="text-muted">
                        Aún no has agregado instrumentos o accesorios a tu orden de compra.
                    </p>
                    <Link to="/catalogo" className="btn btn-warning btn-lg fw-bold mt-2 shadow-sm">
                        🎸 Explorar el Catálogo
                    </Link>
                </div>
            )}

        </div>
    );
}