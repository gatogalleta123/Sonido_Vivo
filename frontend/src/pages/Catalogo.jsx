import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductoCard from "../components/ProductoCard.jsx";
import ToastPopup from "../components/ToastPopup.jsx";
import { obtenerProductos, obtenerCategorias } from "../data/productos.js";
import { agregarAlCarritoStorage } from "../utils/carritoStorage.js";

export default function Catalogo() {
    const [searchParams] = useSearchParams();
    const busquedaURL = searchParams.get("busqueda") ?? "";
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);

    // Estados para filtros
    const [busqueda, setBusqueda] = useState(busquedaURL);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");
    const [orden, setOrden] = useState("defecto");

    // Estado para notificación de carrito
    const [mensajeToast, setMensajeToast] = useState("");

    useEffect(() => {
        setProductos(obtenerProductos());
        setCategorias(obtenerCategorias());
    }, []);

    useEffect(() => {
        setBusqueda(busquedaURL);
    }, [busquedaURL]);

    // Filtrar y ordenar productos de forma optimizada
    const productosFiltrados = useMemo(() => {
        let resultado = [...productos];

        // 1. Filtrar por término de búsqueda (nombre, marca o modelo)
        if (busqueda.trim() !== "") {
            const termino = busqueda.toLowerCase().trim();
            resultado = resultado.filter(
                (p) =>
                    p.nombre.toLowerCase().includes(termino) ||
                    p.marca.toLowerCase().includes(termino) ||
                    p.modelo.toLowerCase().includes(termino)
            );
        }

        // 2. Filtrar por categoría
        if (categoriaSeleccionada !== "Todas") {
            resultado = resultado.filter((p) => p.categoria === categoriaSeleccionada);
        }

        // 3. Ordenamiento
        if (orden === "precio-menor") {
            resultado.sort((a, b) => a.precio - b.precio);
        } else if (orden === "precio-mayor") {
            resultado.sort((a, b) => b.precio - a.precio);
        } else if (orden === "nombre") {
            resultado.sort((a, b) => a.nombre.localeCompare(b.nombre));
        }

        return resultado;
    }, [productos, busqueda, categoriaSeleccionada, orden]);

    // Manejador para agregar productos al carrito
    const handleAgregarAlCarrito = (producto) => {
        agregarAlCarritoStorage(producto);
        setMensajeToast(`¡${producto.nombre} agregado al carrito!`);
    };

    return (
        <div className="catalogo-container">

            {/* Encabezado del Catálogo */}
            <div className="bg-white p-4 rounded-3 shadow-sm mb-4 border">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <h1 className="fw-bold mb-1" style={{ color: "var(--color-primario-vibrante)" }}>
                            Catálogo de Productos
                        </h1>
                        <p className="text-muted m-0">
                            Explora nuestros instrumentos, equipos de sonido y accesorios en stock.
                        </p>
                    </div>
                    <div className="col-md-6 text-md-end mt-3 mt-md-0">
                        <span className="badge text-bg-dark fs-6 px-3 py-2">
                            {productosFiltrados.length} productos encontrados
                        </span>
                    </div>
                </div>
            </div>

            <ToastPopup
                mensaje={mensajeToast}
                tipo="success"
                onClose={() => setMensajeToast("")}
            />

            {/* Barra de Filtros y Búsqueda */}
            <div className="card border-0 shadow-sm p-3 mb-4 bg-white">
                <div className="row g-3 align-items-center">

                    {/* Buscador */}
                    <div className="col-12 col-md-5">
                        <label className="form-label small fw-bold text-muted mb-1">
                            Buscar Producto
                        </label>
                        <input
                            type="search"
                            className="form-control"
                            placeholder="Buscar por marca, modelo o nombre..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                    </div>

                    {/* Categoría */}
                    <div className="col-12 col-sm-6 col-md-4">
                        <label className="form-label small fw-bold text-muted mb-1">
                            Filtrar por Categoría
                        </label>
                        <select
                            className="form-select"
                            value={categoriaSeleccionada}
                            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                        >
                            <option value="Todas">Todas las categorías</option>
                            {categorias.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Ordenamiento */}
                    <div className="col-12 col-sm-6 col-md-3">
                        <label className="form-label small fw-bold text-muted mb-1">
                            Ordenar Por
                        </label>
                        <select
                            className="form-select"
                            value={orden}
                            onChange={(e) => setOrden(e.target.value)}
                        >
                            <option value="defecto">Relevancia</option>
                            <option value="precio-menor">Precio: Menor a Mayor</option>
                            <option value="precio-mayor">Precio: Mayor a Menor</option>
                            <option value="nombre">Nombre A-Z</option>
                        </select>
                    </div>

                </div>
            </div>

            {/* Grilla de Productos */}
            {productosFiltrados.length > 0 ? (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 mb-5">
                    {productosFiltrados.map((prod) => (
                        <ProductoCard
                            key={prod.codigo}
                            producto={prod}
                            onAgregarAlCarrito={handleAgregarAlCarrito}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-5 bg-white rounded-3 shadow-sm my-4 border">
                    <span className="fs-1">🔍</span>
                    <h4 className="fw-bold mt-2">No se encontraron productos</h4>
                    <p className="text-muted">
                        Intenta cambiar los términos de búsqueda o selecciona otra categoría.
                    </p>
                    <button
                        className="btn btn-outline-dark btn-sm fw-bold mt-2"
                        onClick={() => {
                            setBusqueda("");
                            setCategoriaSeleccionada("Todas");
                            setOrden("defecto");
                        }}
                    >
                        Restablecer Filtros
                    </button>
                </div>
            )}

        </div>
    );
}