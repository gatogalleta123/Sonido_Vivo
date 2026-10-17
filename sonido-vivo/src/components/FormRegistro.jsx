import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { obtenerUsuarios, crearUsuario } from "../data/usuarios.js";
import ToastPopup from "./ToastPopup.jsx";

export default function FormRegistro() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        rut: "",
        nombre: "",
        apellidos: "",
        correo: "",
        telefono: "",
        region: "Región Metropolitana de Santiago",
        comuna: "Providencia",
        direccion: "",
        password: "",
        confirmarPassword: "",
    });

    const [errores, setErrores] = useState({});
    const [mensajeExito, setMensajeExito] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validarFormulario = () => {
        const nuevosErrores = {};

        if (!formData.rut.trim()) nuevosErrores.rut = "El RUT/RUN es obligatorio.";
        if (!formData.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio.";
        if (!formData.apellidos.trim()) nuevosErrores.apellidos = "Los apellidos son obligatorios.";
        if (!formData.correo.trim()) nuevosErrores.correo = "El correo es obligatorio.";
        if (!formData.telefono.trim()) nuevosErrores.telefono = "El teléfono es obligatorio.";
        if (!formData.direccion.trim()) nuevosErrores.direccion = "La dirección es obligatoria.";

        if (!formData.password) {
            nuevosErrores.password = "La contraseña es obligatoria.";
        } else if (formData.password.length < 6) {
            nuevosErrores.password = "La contraseña debe tener al menos 6 caracteres.";
        }

        if (formData.password !== formData.confirmarPassword) {
            nuevosErrores.confirmarPassword = "Las contraseñas no coinciden.";
        }

        // Validar si el correo o RUT ya existen
        const usuariosExistentes = obtenerUsuarios();
        const existeCorreo = usuariosExistentes.some(
            (u) => u.correo.toLowerCase() === formData.correo.trim().toLowerCase()
        );
        if (existeCorreo) {
            nuevosErrores.correo = "Este correo ya se encuentra registrado.";
        }

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validarFormulario()) return;

        // Crear el nuevo usuario con rol predeterminado 'cliente'
        const nuevoUsuario = {
            rut: formData.rut.trim(),
            nombre: formData.nombre.trim(),
            apellidos: formData.apellidos.trim(),
            correo: formData.correo.trim().toLowerCase(),
            telefono: formData.telefono.trim(),
            region: formData.region,
            comuna: formData.comuna,
            direccion: formData.direccion.trim(),
            rol: "cliente",
            estado: "activo",
        };

        try {
            crearUsuario(nuevoUsuario);
            setMensajeExito("¡Cuenta creada exitosamente! Redirigiendo al inicio de sesión...");

            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error) {
            setErrores({
                general: error.message || "Ocurrió un error al registrar la cuenta.",
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>

            <ToastPopup
                mensaje={mensajeExito || errores.general}
                tipo={mensajeExito ? "success" : "danger"}
                onClose={() => {
                    setMensajeExito("");
                    setErrores((actuales) => ({ ...actuales, general: "" }));
                }}
            />

            <div className="row g-3">
                {/* RUT */}
                <div className="col-md-4">
                    <label className="form-label small fw-bold text-muted">RUT / RUN *</label>
                    <input
                        type="text"
                        className={`form-control ${errores.rut ? "is-invalid" : ""}`}
                        name="rut"
                        placeholder="12.345.678-9"
                        value={formData.rut}
                        onChange={handleChange}
                    />
                    {errores.rut && <div className="invalid-feedback">{errores.rut}</div>}
                </div>

                {/* Nombre */}
                <div className="col-md-4">
                    <label className="form-label small fw-bold text-muted">Nombre *</label>
                    <input
                        type="text"
                        className={`form-control ${errores.nombre ? "is-invalid" : ""}`}
                        name="nombre"
                        placeholder="Ej: María"
                        value={formData.nombre}
                        onChange={handleChange}
                    />
                    {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
                </div>

                {/* Apellidos */}
                <div className="col-md-4">
                    <label className="form-label small fw-bold text-muted">Apellidos *</label>
                    <input
                        type="text"
                        className={`form-control ${errores.apellidos ? "is-invalid" : ""}`}
                        name="apellidos"
                        placeholder="Ej: González Silva"
                        value={formData.apellidos}
                        onChange={handleChange}
                    />
                    {errores.apellidos && <div className="invalid-feedback">{errores.apellidos}</div>}
                </div>

                {/* Correo */}
                <div className="col-md-6">
                    <label className="form-label small fw-bold text-muted">Correo Electrónico *</label>
                    <input
                        type="email"
                        className={`form-control ${errores.correo ? "is-invalid" : ""}`}
                        name="correo"
                        placeholder="correo@ejemplo.com"
                        value={formData.correo}
                        onChange={handleChange}
                    />
                    {errores.correo && <div className="invalid-feedback">{errores.correo}</div>}
                </div>

                {/* Teléfono */}
                <div className="col-md-6">
                    <label className="form-label small fw-bold text-muted">Teléfono de Contacto *</label>
                    <input
                        type="tel"
                        className={`form-control ${errores.telefono ? "is-invalid" : ""}`}
                        name="telefono"
                        placeholder="+56 9 1234 5678"
                        value={formData.telefono}
                        onChange={handleChange}
                    />
                    {errores.telefono && <div className="invalid-feedback">{errores.telefono}</div>}
                </div>

                {/* Región */}
                <div className="col-md-6">
                    <label className="form-label small fw-bold text-muted">Región *</label>
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

                {/* Comuna */}
                <div className="col-md-6">
                    <label className="form-label small fw-bold text-muted">Comuna *</label>
                    <input
                        type="text"
                        className="form-control"
                        name="comuna"
                        placeholder="Ej: Providencia / Viña del Mar"
                        value={formData.comuna}
                        onChange={handleChange}
                    />
                </div>

                {/* Dirección */}
                <div className="col-12">
                    <label className="form-label small fw-bold text-muted">Dirección de Envío *</label>
                    <input
                        type="text"
                        className={`form-control ${errores.direccion ? "is-invalid" : ""}`}
                        name="direccion"
                        placeholder="Av. Providencia 1234, Depto 502"
                        value={formData.direccion}
                        onChange={handleChange}
                    />
                    {errores.direccion && <div className="invalid-feedback">{errores.direccion}</div>}
                </div>

                {/* Contraseña */}
                <div className="col-md-6">
                    <label className="form-label small fw-bold text-muted">Contraseña *</label>
                    <input
                        type="password"
                        className={`form-control ${errores.password ? "is-invalid" : ""}`}
                        name="password"
                        placeholder="Mínimo 6 caracteres"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errores.password && <div className="invalid-feedback">{errores.password}</div>}
                </div>

                {/* Confirmar Contraseña */}
                <div className="col-md-6">
                    <label className="form-label small fw-bold text-muted">Confirmar Contraseña *</label>
                    <input
                        type="password"
                        className={`form-control ${errores.confirmarPassword ? "is-invalid" : ""}`}
                        name="confirmarPassword"
                        placeholder="Repite la contraseña"
                        value={formData.confirmarPassword}
                        onChange={handleChange}
                    />
                    {errores.confirmarPassword && (
                        <div className="invalid-feedback">{errores.confirmarPassword}</div>
                    )}
                </div>
            </div>

            <div className="d-grid mt-4">
                <button type="submit" className="btn btn-warning btn-lg fw-bold shadow-sm">
                    Registrar mi Cuenta
                </button>
            </div>

            <div className="text-center mt-3">
                <span className="small text-muted me-1">¿Ya tienes una cuenta?</span>
                <Link to="/login" className="small fw-bold text-primary text-decoration-none">
                    Iniciar Sesión
                </Link>
            </div>
        </form>
    );
}
