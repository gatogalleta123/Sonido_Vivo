import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function SidebarAdmin() {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const navigate = useNavigate();
    const sesionGuardada = localStorage.getItem("sonidoVivo_sesion");
    const sesion = sesionGuardada ? JSON.parse(sesionGuardada) : null;

    const handleCerrarSesion = () => {
        localStorage.removeItem("sonidoVivo_sesion");
        navigate("/login");
    };

    const navLinkClass = ({ isActive }) =>
        isActive
            ? "nav-link text-warning fw-bold bg-white bg-opacity-10 rounded px-3 py-2"
            : "nav-link text-white-50 px-3 py-2";

    return (
        <aside className="admin-sidebar d-flex flex-column p-3 text-white bg-dark min-vh-100 shadow-lg">

            {/* Identidad del Panel */}
            <div className="admin-sidebar-header d-flex align-items-center justify-content-between gap-2 mb-4 pb-3 border-bottom border-secondary">
                <div>
                    <h6 className="fw-bold mb-0 text-white">Panel Admin</h6>
                    <small className="text-warning">Sonido Vivo</small>
                </div>
                <button
                    type="button"
                    className="btn btn-outline-warning btn-sm d-lg-none"
                    aria-expanded={menuAbierto}
                    aria-controls="adminSidebarMenu"
                    aria-label={menuAbierto ? "Cerrar menú administrativo" : "Abrir menú administrativo"}
                    onClick={() => setMenuAbierto((abierto) => !abierto)}
                >
                    Menú
                </button>
            </div>

            <div id="adminSidebarMenu" className={`admin-sidebar-content${menuAbierto ? " is-open" : ""}`}>
                {/* Menú de Navegación */}
                <ul className="nav nav-pills flex-column mb-auto gap-2">
                    <li className="nav-item">
                        <NavLink to="/admin" end className={navLinkClass} onClick={() => setMenuAbierto(false)}>
                            Dashboard
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/admin/productos" className={navLinkClass} onClick={() => setMenuAbierto(false)}>
                            Productos / Stock
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/admin/usuarios" className={navLinkClass} onClick={() => setMenuAbierto(false)}>
                            Usuarios / Roles
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/admin/pedidos" className={navLinkClass} onClick={() => setMenuAbierto(false)}>
                            Gestión de Pedidos
                        </NavLink>
                    </li>
                </ul>

                <hr className="border-secondary my-3" />

                {/* Usuario Activo y Salida */}
                <div className="mb-3">
                    <small className="text-white-50 d-block">Usuario activo:</small>
                    <strong className="text-white small d-block text-truncate">
                        {sesion ? `${sesion.nombre} (${sesion.rol})` : "Usuario"}
                    </strong>
                </div>

                <div className="d-grid gap-2">
                    <NavLink to="/" className="btn btn-outline-light btn-sm fw-semibold" onClick={() => setMenuAbierto(false)}>
                        Ir a la Tienda
                    </NavLink>
                    <button
                        type="button"
                        className="btn btn-danger btn-sm fw-bold"
                        onClick={handleCerrarSesion}
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </div>

        </aside>
    );
}
