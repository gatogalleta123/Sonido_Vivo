import { Navigate, Outlet } from "react-router-dom";

export default function RutaProtegida() {
    const sesionGuardada = localStorage.getItem("sonidoVivo_sesion");
    const sesion = sesionGuardada ? JSON.parse(sesionGuardada) : null;

    // Si no hay sesión iniciada o el rol no es admin/vendedor, redirige a Login
    if (!sesion || (sesion.rol !== "administrador" && sesion.rol !== "vendedor")) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}
