import { useState, useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
    obtenerCarrito,
    vaciarCarritoStorage,
} from "../utils/carritoStorage.js";

export default function Checkout() {
    const navigate = useNavigate();
    const [carrito, setCarrito] = useState([]);

    // Estado del Formulario de Envío y Contacto
    const [formData, setFormData] = useState({
        nombre: "",
        apellidos: "",
        rut: "",
        correo: "",
        telefono: "",
        region: "Región Metropolitana de Santiago",
        comuna: "Providencia",
        direccion: "",
        departamento: "",
        metodoDespacho: "domicilio",
        medioPago: "tarjeta",
        notas: "",
    });

    const [errores, setErrores] = useState({});

    useEffect(() => {
        const items = obtenerCarrito();
        if (items.length === 0) {
            // Si el carrito está vacío, redirigir al catálogo
            navigate("/catalogo");
        } else {
            setCarrito(items);
        }
    }, [navigate]);

    // Cálculos del pedido
    const subtotal = useMemo(() => {
        return carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    }, [carrito]);

    const costoDespacho = useMemo(() => {
        return formData.metodoDespacho === "retiro" ? 0 : 4990;
    }, [formData.metodoDespacho]);

    const totalFinal = useMemo(() => {
        return subtotal + costoDespacho;
    }, [subtotal, costoDespacho]);

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Validaciones básicas del formulario
    const validarFormulario = () => {
        const nuevosErrores = {};
        if (!formData.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio.";
        if (!formData.apellidos.trim()) nuevosErrores.apellidos = "Los apellidos son obligatorios.";
        if (!formData.rut.trim()) nuevosErrores.rut = "El RUT es obligatorio.";
        if (!formData.correo.trim()) nuevosErrores.correo = "El correo electrónico es obligatorio.";
        if (!formData.telefono.trim()) nuevosErrores.telefono = "El teléfono es obligatorio.";
        if (formData.metodoDespacho === "domicilio" && !formData.direccion.trim()) {
            nuevosErrores.direccion = "La dirección de entrega es obligatoria.";
        }

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    // Confirmar y procesar la compra
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validarFormulario()) return;

        // Generar un número de orden aleatorio (Ej: SV-84920)
        const numeroOrden = `SV-${Math.floor(10000 + Math.random() * 90000)}`;

        const ordenGenerada = {
            numeroOrden,
            fecha: new Date().toLocaleDateString("es-CL"),
            cliente: formData,
            items: carrito,
            subtotal,
            costoDespacho,
            totalFinal,
        };

        // Guardar la orden en localStorage para consultar en confirmación
        localStorage.setItem("sonidoVivo_ultimaOrden", JSON.stringify(ordenGenerada));

        // Vaciar el carrito
        vaciarCarritoStorage();

        // Redirigir a la vista de confirmación
        navigate(`/confirmacion-compra/${numeroOrden}`);
    };

    return (
        <div className="checkout-container mb-5">

            {/* Encabezado */}
            <div className="bg-white p-4 rounded-3 shadow-sm mb-4 border">
                <h1 className="fw-bold mb-1" style={{ color: "var(--color-purpura-profundo)" }}>
                    💳 Proceso de Pago (Checkout)
                </h1>
                <p className="text-muted m-0">
                    Ingresa los datos para la entrega de tus productos y selecciona tu método de pago.
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="row g-4">

                    {/* Formulario de Datos del Cliente y Despacho */}
                    <div className="col-12 col-lg-8">

                        {/* 1. Datos Personales */}
                        <div className="card shadow-sm border-0 bg-white mb-4">
                            <div className="card-header bg-white py-3">
                                <h5 className="fw-bold mb-0">1. Datos Personales y de Contacto</h5>
                            </div>
                            <div className="card-body">
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold">Nombre *</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errores.nombre ? "is-invalid" : ""}`}
                                            name="nombre"
                                            value={formData.nombre}
                                            onChange={handleChange}
                                            placeholder="Ej: Juan"
                                        />
                                        {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold">Apellidos *</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errores.apellidos ? "is-invalid" : ""}`}
                                            name="apellidos"
                                            value={formData.apellidos}
                                            onChange={handleChange}
                                            placeholder="Ej: Pérez González"
                                        />
                                        {errores.apellidos && <div className="invalid-feedback">{errores.apellidos}</div>}
                                    </div>

                                    <div className="col-md-4">
                                        <label className="form-label small fw-bold">RUT *</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errores.rut ? "is-invalid" : ""}`}
                                            name="rut"
                                            value={formData.rut}
                                            onChange={handleChange}
                                            placeholder="12.345.678-9"
                                        />
                                        {errores.rut && <div className="invalid-feedback">{errores.rut}</div>}
                                    </div>

                                    <div className="col-md-4">
                                        <label className="form-label small fw-bold">Correo Electrónico *</label>
                                        <input
                                            type="email"
                                            className={`form-control ${errores.correo ? "is-invalid" : ""}`}
                                            name="correo"
                                            value={formData.correo}
                                            onChange={handleChange}
                                            placeholder="correo@ejemplo.com"
                                        />
                                        {errores.correo && <div className="invalid-feedback">{errores.correo}</div>}
                                    </div>

                                    <div className="col-md-4">
                                        <label className="form-label small fw-bold">Teléfono de Contacto *</label>
                                        <input
                                            type="tel"
                                            className={`form-control ${errores.telefono ? "is-invalid" : ""}`}
                                            name="telefono"
                                            value={formData.telefono}
                                            onChange={handleChange}
                                            placeholder="+56 9 1234 5678"
                                        />
                                        {errores.telefono && <div className="invalid-feedback">{errores.telefono}</div>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. Opciones de Despacho */}
                        <div className="card shadow-sm border-0 bg-white mb-4">
                            <div className="card-header bg-white py-3">
                                <h5 className="fw-bold mb-0">2. Método y Dirección de Entrega</h5>
                            </div>
                            <div className="card-body">

                                {/* Selección Método de Entrega */}
                                <div className="row g-3 mb-4">
                                    <div className="col-md-6">
                                        <div className="form-check card p-3 h-100 cursor-pointer">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="metodoDespacho"
                                                id="despachoDomicilio"
                                                value="domicilio"
                                                checked={formData.metodoDespacho === "domicilio"}
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label fw-bold ms-2" htmlFor="despachoDomicilio">
                                                🚚 Despacho a Domicilio (\$4.990)
                                            </label>
                                            <small className="text-muted d-block ms-4">Entrega estimada en 2 a 4 días hábiles.</small>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-check card p-3 h-100 cursor-pointer">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="metodoDespacho"
                                                id="retiroTienda"
                                                value="retiro"
                                                checked={formData.metodoDespacho === "retiro"}
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label fw-bold ms-2" htmlFor="retiroTienda">
                                                📍 Retiro Gratuito en Tienda (\$0)
                                            </label>
                                            <small className="text-muted d-block ms-4">Disponible en Providencia o Viña del Mar.</small>
                                        </div>
                                    </div>
                                </div>

                                {formData.metodoDespacho === "domicilio" ? (
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold">Región</label>
                                            <select
                                                className="form-select"
                                                name="region"
                                                value={formData.region}
                                                onChange={handleChange}
                                            >
                                                <option value="Región Metropolitana de Santiago">Región Metropolitana de Santiago</option>
                                                <option value="Región de Valparaíso">Región de Valparaíso</option>
                                                <option value="Región del Bío Bío">Región del Bío Bío</option>
                                            </select>
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold">Comuna</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="comuna"
                                                value={formData.comuna}
                                                onChange={handleChange}
                                                placeholder="Ej: Providencia / Viña del Mar"
                                            />
                                        </div>

                                        <div className="col-md-8">
                                            <label className="form-label small fw-bold">Calle y Número *</label>
                                            <input
                                                type="text"
                                                className={`form-control ${errores.direccion ? "is-invalid" : ""}`}
                                                name="direccion"
                                                value={formData.direccion}
                                                onChange={handleChange}
                                                placeholder="Av. Providencia 1234"
                                            />
                                            {errores.direccion && <div className="invalid-feedback">{errores.direccion}</div>}
                                        </div>

                                        <div className="col-md-4">
                                            <label className="form-label small fw-bold">Depto / Casa / Block</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="departamento"
                                                value={formData.departamento}
                                                onChange={handleChange}
                                                placeholder="Depto 502 (Opcional)"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="alert alert-info mb-0">
                                        📍 <strong>Punto de Retiro Seleccionado:</strong> Sucursal Av. Providencia 1234, Santiago. Recibirás un correo cuando tu pedido esté listo para ser retirado.
                                    </div>
                                )}

                            </div>
                        </div>

                        {/* 3. Medio de Pago */}
                        <div className="card shadow-sm border-0 bg-white">
                            <div className="card-header bg-white py-3">
                                <h5 className="fw-bold mb-0">3. Medio de Pago</h5>
                            </div>
                            <div className="card-body">
                                <div className="form-check mb-3">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="medioPago"
                                        id="pagoTarjeta"
                                        value="tarjeta"
                                        checked={formData.medioPago === "tarjeta"}
                                        onChange={handleChange}
                                    />
                                    <label className="form-check-label fw-bold ms-2" htmlFor="pagoTarjeta">
                                        💳 Webpay Plus / Tarjeta de Débito o Crédito
                                    </label>
                                </div>

                                <div className="form-check mb-3">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="medioPago"
                                        id="pagoTransferencia"
                                        value="transferencia"
                                        checked={formData.medioPago === "transferencia"}
                                        onChange={handleChange}
                                    />
                                    <label className="form-check-label fw-bold ms-2" htmlFor="pagoTransferencia">
                                        🏦 Transferencia Bancaria Directa
                                    </label>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Resumen Lateral del Pedido */}
                    <div className="col-12 col-lg-4">
                        <div className="card shadow-sm border-0 bg-white sticky-top" style={{ top: "20px" }}>
                            <div className="card-header bg-white py-3">
                                <h5 className="fw-bold mb-0">Resumen del Pedido</h5>
                            </div>

                            <div className="card-body">
                                <div className="mb-3" style={{ maxHeight: "250px", overflowY: "auto" }}>
                                    {carrito.map((item) => (
                                        <div key={item.codigo} className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom">
                                            <div>
                                                <h6 className="mb-0 small fw-bold">{item.nombre}</h6>
                                                <small className="text-muted">Cant: {item.cantidad}</small>
                                            </div>
                                            <span className="small fw-bold">
                                                \${(item.precio * item.cantidad).toLocaleString("es-CL")}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-muted">Subtotal:</span>
                                    <span className="fw-semibold">\${subtotal.toLocaleString("es-CL")}</span>
                                </div>

                                <div className="d-flex justify-content-between mb-3">
                                    <span className="text-muted">Despacho:</span>
                                    <span className="fw-semibold">
                                        {costoDespacho === 0 ? "Gratis" : `\$${costoDespacho.toLocaleString("es-CL")}`}
                                    </span>
                                </div>

                                <hr />

                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <span className="fs-5 fw-bold text-dark">Total a pagar:</span>
                                    <span className="fs-4 fw-bold text-success">
                                        \${totalFinal.toLocaleString("es-CL")}
                                    </span>
                                </div>

                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-success btn-lg fw-bold shadow-sm">
                                        🔒 Confirmar y Pagar
                                    </button>

                                    <Link to="/carrito" className="btn btn-outline-dark btn-sm fw-semibold text-center">
                                        ← Volver al Carrito
                                    </Link>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </form>

        </div>
    );
}
