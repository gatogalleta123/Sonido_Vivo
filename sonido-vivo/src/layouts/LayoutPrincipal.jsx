import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header.jsx";
import Navbar from "../components/layout/Navbar.jsx";
import Footer from "../components/layout/Footer.jsx";

export default function LayoutPrincipal() {
    return (
        <>
            <Header />
            <Navbar />
            <main className="container my-4 min-vh-100">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}
