import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
    const [sesion, setSesion] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const actualizarSesion = () => {
            const guardada = localStorage.getItem("sonidoVivo_sesion");
            setSesion(guardada ? JSON.parse(guardada) : null);
        };

        actualizarSesion();
        window.addEventListener("sesionActualizada", actualizarSesion);
        return () => window.removeEventListener("sesionActualizada", actualizarSesion);
    }, []);

    // Función auxiliar para gestionar la clase CSS 'active' dinámicamente
    const navLinkClass = ({ isActive }) =>
        isActive
            ? "nav-link px-3 text-warning fw-bold border-bottom border-warning"
            : "nav-link px-3 text-white";

    const cerrarSesion = () => {
        localStorage.removeItem("sonidoVivo_sesion");
        window.dispatchEvent(new Event("sesionActualizada"));
        navigate("/");
    };

    return (
        <nav className="navbar navbar-expand-lg site-nav shadow-sm">
            <div className="container">

                {/* Botón Toggler para dispositivos móviles */}
                <button
                    className="navbar-toggler border-0 p-0 my-1 shadow-none"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarPrincipal"
                    aria-controls="navbarPrincipal"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <i className="bi bi-list fs-1 text-white" aria-hidden="true"></i>
                </button>

                {/* Menú colapsable */}
                <div className="collapse navbar-collapse" id="navbarPrincipal">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 fw-semibold">

                        <li className="nav-item">
                            <NavLink to="/" className={navLinkClass} end>
                                Home
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/catalogo" className={navLinkClass}>
                                Catálogo
                            </NavLink>
                        </li>


                        <li className="nav-item">
                            <NavLink to="/blog" className={navLinkClass}>
                                Blog / Noticias
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/nosotros" className={navLinkClass}>
                                Nosotros y Ubicación
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/contacto" className={navLinkClass}>
                                Contacto
                            </NavLink>
                        </li>

                    </ul>

                    <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-2 ms-lg-auto py-2 py-lg-0">
                        {sesion ? (
                            <>
                                <span className="text-white-50 small px-3">
                                    <i className="bi bi-person-circle me-2" aria-hidden="true"></i>
                                    {sesion.nombre}
                                </span>
                                {(sesion.rol === "administrador" || sesion.rol === "vendedor") && (
                                    <NavLink
                                        to="/admin"
                                        className="btn btn-outline-warning btn-sm"
                                    >
                                        <i className="bi bi-shield-lock me-1" aria-hidden="true"></i>
                                        Panel Admin
                                    </NavLink>
                                )}
                                <button
                                    type="button"
                                    className="btn btn-outline-light btn-sm"
                                    onClick={cerrarSesion}
                                >
                                    <i className="bi bi-box-arrow-right me-1" aria-hidden="true"></i>
                                    Cerrar Sesión
                                </button>
                            </>
                        ) : (
                            <>
                                <NavLink
                                    to="/login"
                                    className="btn btn-outline-light btn-sm"
                                >
                                    <i className="bi bi-box-arrow-in-right me-1" aria-hidden="true"></i>
                                    Iniciar Sesión
                                </NavLink>
                                <NavLink
                                    to="/registro"
                                    className="btn btn-warning btn-sm fw-bold"
                                >
                                    <i className="bi bi-person-plus me-1" aria-hidden="true"></i>
                                    Crear Cuenta
                                </NavLink>
                            </>
                        )}
                    </div>

                </div>

            </div>
        </nav>
    );
}