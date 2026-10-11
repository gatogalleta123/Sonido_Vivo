import { Outlet, Routes } from "react-router-dom";
import Header from "../components/layout/Header.jsx";
import Navbar from "../components/layout/Navbar.jsx";
import Footer from "../components/layout/Footer.jsx";

import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header.jsx";
import Navbar from "../components/layout/Navbar.jsx";
import Footer from "../components/layout/Footer.jsx";
    export default function LayoutPrincipal(){
        return(
            <Routes>
                <Route element={<LayoutPrincipal />}>
                    <Route index element={<Inicio />} />
                    {/* Próximamente iremos registrando aquí 
                    /catalogo, /contacto, /login, etc. */}
                </Route>
            </Routes>
        )
    }