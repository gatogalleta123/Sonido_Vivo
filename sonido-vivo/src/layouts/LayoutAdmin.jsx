import { Outlet } from "react-router-dom";
import SidebarAdmin from "../components/layout/SidebarAdmin.jsx";

export default function LayoutAdmin() {
    return (
        <div className="d-flex flex-column flex-lg-row bg-light min-vh-100">
            <SidebarAdmin />
            <main className="flex-grow-1 p-4 p-md-5 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
}
