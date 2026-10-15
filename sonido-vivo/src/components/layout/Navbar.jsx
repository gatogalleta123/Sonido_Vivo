import { NavLink } from "react-router-dom";

export default function Navbar() {
    // Función auxiliar para gestionar la clase CSS 'active' dinámicamente
    const navLinkClass = ({ isActive }) =>
        isActive
            ? "nav-link px-3 text-warning fw-bold border-bottom border-warning"
            : "nav-link px-3 text-white";

    return (
        <nav className="navbar navbar-expand-lg site-nav shadow-sm">
            <div className="container">

                {/* Botón Toggler para dispositivos móviles */}
                <button
                    className="navbar-toggler text-white border-light my-1"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarPrincipal"
                    aria-controls="navbarPrincipal"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
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
                            <NavLink to="/categorias" className={navLinkClass}>
                                Categorías
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/ofertas" className={navLinkClass}>
                                Ofertas
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

                    {/* Enlace directo al Panel Administrativo */}
                    <div className="d-flex">
                        <NavLink to="/admin" className="btn btn-outline-warning btn-sm">
                            🛡️ Panel Admin
                        </NavLink>
                    </div>

                </div>

            </div>
        </nav>
    );
}