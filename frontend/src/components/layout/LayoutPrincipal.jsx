import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

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
