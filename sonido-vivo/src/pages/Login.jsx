import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { obtenerUsuarios } from "../data/usuarios.js";

export default function Login() {
    const navigate = useNavigate();

    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        setError("");

        // Validar campos obligatorios
        if (!correo.trim() || !password.trim()) {
            setError("Por favor, ingresa tu correo electrónico y contraseña.");
            return;
        }

        // Buscar el usuario en la base de datos simulada
        const usuarios = obtenerUsuarios();
        const usuarioEncontrado = usuarios.find(
            (u) => u.correo.toLowerCase() === correo.trim().toLowerCase()
        );

        if (!usuarioEncontrado) {
            setError("El correo ingresado no corresponde a ningún usuario registrado.");
            return;
        }

        if (usuarioEncontrado.estado === "inactivo") {
            setError("Tu cuenta se encuentra deshabilitada. Contacta al administrador.");
            return;
        }

        // Crear sesión simulada
        const sesion = {
            rut: usuarioEncontrado.rut,
            nombre: usuarioEncontrado.nombre,
            apellidos: usuarioEncontrado.apellidos,
            correo: usuarioEncontrado.correo,
            rol: usuarioEncontrado.rol,
            fechaInicio: new Date().toISOString(),
        };

        localStorage.setItem("sonidoVivo_sesion", JSON.stringify(sesion));

        // Redirigir según el rol del usuario
        if (
            usuarioEncontrado.rol === "administrador" ||
            usuarioEncontrado.rol === "vendedor"
        ) {
            navigate("/admin");
        } else {
            navigate("/");
        }
    };

    return (
        <div className="container py-5 my-3">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6 col-lg-5">

                    <div className="card shadow-lg border-0 rounded-4 overflow-hidden bg-white">

                        {/* Encabezado con degradado de la marca */}
                        <div
                            className="p-4 text-center text-white"
                            style={{
                                background:
                                    "linear-gradient(135deg, var(--color-fondo-oscuro) 0%, var(--color-primario) 100%)",
                            }}
                        >
                            <span className="fs-1">🎵</span>
                            <h3 className="fw-bold mt-2 mb-1">Sonido Vivo</h3>
                            <p className="small mb-0 text-white-50">
                                Inicia sesión para gestionar tus compras o tienda
                            </p>
                        </div>

                        <div className="card-body p-4 p-md-5">

                            {/* Alerta de Error */}
                            {error && (
                                <div
                                    className="alert alert-danger d-flex align-items-center gap-2 mb-4"
                                    role="alert"
                                >
                                    <span>⚠️</span>
                                    <div className="small fw-semibold">{error}</div>
                                </div>
                            )}

                            <form onSubmit={handleLogin}>

                                {/* Campo Correo */}
                                <div className="mb-3">
                                    <label
                                        htmlFor="correoInput"
                                        className="form-label small fw-bold text-muted"
                                    >
                                        Correo Electrónico
                                    </label>
                                    <input
                                        type="email"
                                        id="correoInput"
                                        className="form-control form-control-lg fs-6"
                                        placeholder="ejemplo@sonidovivo.cl"
                                        value={correo}
                                        onChange={(e) => setCorreo(e.target.value)}
                                    />
                                </div>

                                {/* Campo Contraseña */}
                                <div className="mb-4">
                                    <div className="d-flex justify-content-between align-items-center mb-1">
                                        <label
                                            htmlFor="passwordInput"
                                            className="form-label small fw-bold text-muted mb-0"
                                        >
                                            Contraseña
                                        </label>
                                        <Link
                                            to="/contacto"
                                            className="small text-decoration-none text-primary"
                                        >
                                            ¿Olvidaste tu clave?
                                        </Link>
                                    </div>
                                    <input
                                        type="password"
                                        id="passwordInput"
                                        className="form-control form-control-lg fs-6"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                {/* Botón Submit */}
                                <div className="d-grid mb-3">
                                    <button
                                        type="submit"
                                        className="btn btn-warning btn-lg fw-bold shadow-sm"
                                    >
                                        🔐 Iniciar Sesión
                                    </button>
                                </div>

                                {/* Enlace a Registro */}
                                <div className="text-center mt-3">
                                    <span className="small text-muted me-1">
                                        ¿No tienes una cuenta?
                                    </span>
                                    <Link
                                        to="/registro"
                                        className="small fw-bold text-primary text-decoration-none"
                                    >
                                        Crear Cuenta
                                    </Link>
                                </div>

                            </form>

                            {/* Guía de Credenciales de Prueba */}
                            <div className="mt-4 pt-3 border-top bg-light p-3 rounded-3">
                                <small className="fw-bold d-block text-muted mb-2">
                                    Credenciales de prueba disponibles:
                                </small>
                                <div className="small text-muted mb-1">
                                    <strong>Admin:</strong> <code>admin@sonidovivo.cl</code>
                                </div>
                                <div className="small text-muted mb-1">
                                    <strong>Vendedor:</strong> <code>vendedor@sonidovivo.cl</code>
                                </div>
                                <div className="small text-muted">
                                    <strong>Cliente:</strong> <code>cliente@gmail.com</code>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}
