import { NavLink, useNavigate } from "react-router-dom";

export default function SidebarAdmin() {
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
        <aside className="d-flex flex-column p-3 text-white bg-dark min-vh-100 shadow-lg" style={{ width: "260px" }}>

            {/* Identidad del Panel */}
            <div className="d-flex align-items-center gap-2 mb-4 pb-3 border-bottom border-secondary">
                <span className="fs-3">🛡️</span>
                <div>
                    <h6 className="fw-bold mb-0 text-white">Panel Admin</h6>
                    <small className="text-warning">Sonido Vivo</small>
                </div>
            </div>

            {/* Menú de Navegación */}
            <ul className="nav nav-pills flex-column mb-auto gap-2">
                <li className="nav-item">
                    <NavLink to="/admin" end className={navLinkClass}>
                        📊 Dashboard
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/admin/productos" className={navLinkClass}>
                        🎸 Productos / Stock
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/admin/usuarios" className={navLinkClass}>
                        👥 Usuarios / Roles
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/admin/pedidos" className={navLinkClass}>
                        📦 Gestión de Pedidos
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
                <NavLink to="/" className="btn btn-outline-light btn-sm fw-semibold">
                    🌐 Ir a la Tienda
                </NavLink>
                <button
                    type="button"
                    className="btn btn-danger btn-sm fw-bold"
                    onClick={handleCerrarSesion}
                >
                    🚪 Cerrar Sesión
                </button>
            </div>

        </aside>
    );
}
