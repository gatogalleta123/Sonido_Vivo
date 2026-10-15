import { Routes, Route } from "react-router-dom";
import LayoutPrincipal from "./layouts/LayoutPrincipal.jsx";
import Inicio from "./pages/Inicio.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<LayoutPrincipal />}>
        <Route index element={<Inicio />} />
        {/* Próximamente iremos registrando aquí /catalogo, /contacto, /login, etc. */}
      </Route>
    </Routes>
  );
}