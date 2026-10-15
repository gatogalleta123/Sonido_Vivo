import { useState } from "react";
import { validarCorreo, validarTexto } from "../utils/validaciones.js";

export default function Contacto() {
    const [formData, setFormData] = useState({
        nombre: "",
        correo: "",
        asunto: "",
        mensaje: "",
    });

    const [errores, setErrores] = useState({});
    const [mensajeResultado, setMensajeResultado] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validarFormulario = () => {
        const nuevosErrores = {};

        if (!validarTexto(formData.nombre, 3)) {
            nuevosErrores.nombre = "El nombre es obligatorio (mínimo 3 caracteres).";
        }

        if (!validarCorreo(formData.correo)) {
            nuevosErrores.correo = "Ingresa un correo electrónico válido.";
        }

        if (!validarTexto(formData.asunto, 3)) {
            nuevosErrores.asunto = "El asunto es obligatorio (mínimo 3 caracteres).";
        }

        if (!validarTexto(formData.mensaje, 5)) {
            nuevosErrores.mensaje = "El mensaje debe contener al menos 5 caracteres.";
        }

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validarFormulario()) {
            setMensajeResultado({
                tipo: "danger",
                texto: "Por favor, corrige los errores señalados en el formulario.",
            });
            return;
        }

        // Guardar simulación de contacto en localStorage
        localStorage.setItem("sonidoVivo_ultimoContacto", JSON.stringify(formData));

        setMensajeResultado({
            tipo: "success",
            texto: `¡Gracias ${formData.nombre}! Tu mensaje ha sido enviado correctamente. Nos contactaremos a ${formData.correo} a la brevedad.`,
        });

        // Limpiar formulario
        setFormData({
            nombre: "",
            correo: "",
            asunto: "",
            mensaje: "",
        });
        setErrores({});
    };

    return (
        <div className="contacto-container mb-5">

            {/* Encabezado */}
            <div className="bg-white p-4 p-md-5 rounded-3 shadow-sm mb-5 border text-center">
                <span className="badge bg-warning text-dark px-3 py-2 fw-bold text-uppercase mb-2">
                    Atención al Cliente
                </span>
                <h1 className="display-5 fw-bold mb-3" style={{ color: "var(--color-purpura-profundo)" }}>
                    Contacta a Sonido Vivo
                </h1>
                <p className="lead text-muted mx-auto" style={{ maxWidth: "700px" }}>
                    ¿Tienes dudas sobre un producto, deseas consultar por despacho o solicitar servicio técnico? Escríbenos y nuestros especialistas te responderán.
                </p>
            </div>

            <div className="row g-4">

                {/* Formulario de Contacto */}
                <div className="col-12 col-lg-7">
                    <div className="card shadow-sm border-0 bg-white p-4 p-md-5">
                        <h4 className="fw-bold mb-4 text-dark">Enviar un Mensaje</h4>

                        {/* Alerta de Resultado */}
                        {mensajeResultado && (
                            <div
                                className={`alert alert-${mensajeResultado.tipo} alert-dismissible fade show mb-4`}
                                role="alert"
                            >
                                {mensajeResultado.texto}
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setMensajeResultado(null)}
                                ></button>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} noValidate>

                            {/* Nombre Completo */}
                            <div className="mb-3">
                                <label htmlFor="nombre" className="form-label small fw-bold text-muted">
                                    Nombre Completo *
                                </label>
                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    className={`form-control ${errores.nombre ? "is-invalid" : ""}`}
                                    placeholder="Ej: María Valles"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                />
                                {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
                            </div>

                            {/* Correo Electrónico */}
                            <div className="mb-3">
                                <label htmlFor="correo" className="form-label small fw-bold text-muted">
                                    Correo Electrónico *
                                </label>
                                <input
                                    type="email"
                                    id="correo"
                                    name="correo"
                                    className={`form-control ${errores.correo ? "is-invalid" : ""}`}
                                    placeholder="ejemplo@correo.com"
                                    value={formData.correo}
                                    onChange={handleChange}
                                />
                                {errores.correo && <div className="invalid-feedback">{errores.correo}</div>}
                            </div>

                            {/* Asunto */}
                            <div className="mb-3">
                                <label htmlFor="asunto" className="form-label small fw-bold text-muted">
                                    Asunto *
                                </label>
                                <input
                                    type="text"
                                    id="asunto"
                                    name="asunto"
                                    className={`form-control ${errores.asunto ? "is-invalid" : ""}`}
                                    placeholder="Ej: Consulta por disponibilidad de guitarra Fender"
                                    value={formData.asunto}
                                    onChange={handleChange}
                                />
                                {errores.asunto && <div className="invalid-feedback">{errores.asunto}</div>}
                            </div>

                            {/* Mensaje */}
                            <div className="mb-4">
                                <label htmlFor="mensaje" className="form-label small fw-bold text-muted">
                                    Mensaje *
                                </label>
                                <textarea
                                    id="mensaje"
                                    name="mensaje"
                                    rows="5"
                                    className={`form-control ${errores.mensaje ? "is-invalid" : ""}`}
                                    placeholder="Escribe aquí tu consulta..."
                                    value={formData.mensaje}
                                    onChange={handleChange}
                                ></textarea>
                                {errores.mensaje && <div className="invalid-feedback">{errores.mensaje}</div>}
                            </div>

                            <div className="d-grid">
                                <button type="submit" className="btn btn-warning btn-lg fw-bold shadow-sm">
                                    ✉️ Enviar Formulario
                                </button>
                            </div>

                        </form>
                    </div>
                </div>

                {/* Información de Contacto Directo */}
                <div className="col-12 col-lg-5">
                    <div className="card shadow-sm border-0 bg-white p-4 p-md-5 h-100 d-flex flex-column justify-content-between">
                        <div>
                            <h4 className="fw-bold mb-4 text-dark">Información de Contacto</h4>

                            <div className="d-flex align-items-start gap-3 mb-4">
                                <span className="fs-2 text-primary">📍</span>
                                <div>
                                    <h6 className="fw-bold mb-1">Casa Matriz - Providencia</h6>
                                    <p className="text-muted small mb-0">
                                        Av. Providencia 1234, Providencia, Santiago.
                                    </p>
                                </div>
                            </div>

                            <div className="d-flex align-items-start gap-3 mb-4">
                                <span className="fs-2 text-primary">📞</span>
                                <div>
                                    <h6 className="fw-bold mb-1">Teléfonos de Atención</h6>
                                    <p className="text-muted small mb-0">+56 2 2345 6789</p>
                                    <p className="text-muted small mb-0">+56 9 8765 4321 (WhatsApp)</p>
                                </div>
                            </div>

                            <div className="d-flex align-items-start gap-3 mb-4">
                                <span className="fs-2 text-primary">✉️</span>
                                <div>
                                    <h6 className="fw-bold mb-1">Correo Electrónico</h6>
                                    <p className="text-muted small mb-0">contacto@sonidovivo.cl</p>
                                    <p className="text-muted small mb-0">soporte@sonidovivo.cl</p>
                                </div>
                            </div>

                            <div className="d-flex align-items-start gap-3 mb-4">
                                <span className="fs-2 text-primary">⏰</span>
                                <div>
                                    <h6 className="fw-bold mb-1">Horario de Atención</h6>
                                    <p className="text-muted small mb-0">Lunes a Viernes: 10:00 - 19:00 hrs</p>
                                    <p className="text-muted small mb-0">Sábados: 10:00 - 14:00 hrs</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-3 bg-light rounded-3 border">
                            <small className="fw-bold d-block text-dark mb-1">
                                💬 ¿Buscas respuesta inmediata?
                            </small>
                            <small className="text-muted d-block mb-2">
                                Atendemos consultas rápidas por WhatsApp en horario de tienda.
                            </small>
                            <a
                                href="https://wa.me/56987654321"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline-success btn-sm w-100 fw-bold"
                            >
                                Escribir a WhatsApp
                            </a>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    );
}

