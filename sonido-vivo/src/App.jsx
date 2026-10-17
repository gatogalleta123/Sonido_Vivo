import { Routes, Route } from "react-router-dom";
import LayoutPrincipal from "./components/layout/LayoutPrincipal.jsx";
import LayoutAdmin from "./components/layout/LayoutAdmin.jsx";
import RutaProtegida from "./components/RutaProtegida.jsx";

import Inicio from "./pages/Inicio.jsx";
import Catalogo from "./pages/Catalogo.jsx";
import DetalleProducto from "./pages/DetalleProducto.jsx";
import Carrito from "./pages/Carrito.jsx";
import Checkout from "./pages/Checkout.jsx";
import ConfirmacionCompra from "./pages/ConfirmacionCompra.jsx";
import Login from "./pages/Login.jsx";
import Registro from "./pages/Registro.jsx";
import Nosotros from "./pages/Nosotros.jsx";
import Contacto from "./pages/Contacto.jsx";
import Blog from "./pages/Blog.jsx";

import DashboardAdmin from "./pages/admin/DashboardAdmin.jsx";
import AdminProductos from "./pages/admin/AdminProductos.jsx";
import AdminUsuarios from "./pages/admin/AdminUsuarios.jsx";
import AdminPedidos from "./pages/admin/AdminPedidos.jsx";

export default function App() {
  return (
    <Routes>
      {/* RUTAS PÚBLICAS */}
      <Route element={<LayoutPrincipal />}>
        <Route index element={<Inicio />} />
        <Route path="catalogo" element={<Catalogo />} />
        <Route path="detalle-producto/:codigo" element={<DetalleProducto />} />
        <Route path="carrito" element={<Carrito />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="confirmacion-compra/:numeroOrden" element={<ConfirmacionCompra />} />
        <Route path="login" element={<Login />} />
        <Route path="registro" element={<Registro />} />
        <Route path="nosotros" element={<Nosotros />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="blog" element={<Blog />} />
      </Route>

      {/* RUTAS PRIVADAS / ADMIN PROTEGIDAS */}
      <Route element={<RutaProtegida />}>
        <Route path="admin" element={<LayoutAdmin />}>
          <Route index element={<DashboardAdmin />} />
          <Route path="productos" element={<AdminProductos />} />
          <Route path="usuarios" element={<AdminUsuarios />} />
          <Route path="pedidos" element={<AdminPedidos />} /> 
        </Route>
      </Route>
    </Routes>
  );
}
