import { useState, useEffect, useMemo } from "react";
import ProductoCard from "../components/ProductoCard.jsx";
import { obtenerProductos } from "../data/productos.js";

export default function Categorias() {
    const [productos, setProductos] = useState([]);
    const [categoriaActiva, setCategoriaActiva] = useState("Todas");

    useEffect(() => {
        setProductos(obtenerProductos());
    }, []);

    // Lista de categorías con metadatos e iconos
    const listaCategorias = [
        { id: "Todas", nombre: "Todas las Categorías", icono: "🎵", descripcion: "Todo el catálogo disponible" },
        { id: "Guitarras Acústicas", nombre: "Guitarras Acústicas", icono: "🎸", descripcion: "Folk, dreadnought y clásicas" },
        { id: "Guitarras Eléctricas", nombre: "Guitarras Eléctricas", icono: "⚡", descripcion: "Stratocaster, Les Paul y más" },
        { id: "Bajos Eléctricos", nombre: "Bajos Eléctricos", icono: "🎸", descripcion: "4 y 5 cuerdas, Jazz y Precision" },
        { id: "Baterías", nombre: "Baterías y Percusión", icono: "🥁", descripcion: "Acústicas, electrónicas y parches" },
        { id: "Teclados y Pianos", nombre: "Teclados y Pianos", icono: "🎹", descripcion: "Sintetizadores y pianos digitales" },
        { id: "Amplificadores", nombre: "Amplificadores", icono: "🔊", descripcion: "Para guitarra, bajo y voz" },
        { id: "Micrófonos", nombre: "Micrófonos", icono: "🎙️", descripcion: "Dinámicos y de condensador" },
        { id: "Pedales de Efectos", nombre: "Pedales de Efectos", icono: "🎛️", descripcion: "Distorsión, delay, reverb" },
        { id: "Accesorios", nombre: "Accesorios", icono: "🎧", descripcion: "Cuerdas, púas, cables y afines" },
        { id: "Estudio y Grabación", nombre: "Estudio y Grabación", icono: "🎚️", descripcion: "Interfaces, audífonos y monitores" },
    ];

    // Filtrar productos reactivamente según la categoría seleccionada
    const productosFiltrados = useMemo(() => {
        if (categoriaActiva === "Todas") return productos;
        return productos.filter((p) => p.categoria === categoriaActiva);
    }, [productos, categoriaActiva]);

    return (
        <div className="categorias-container mb-5">

            {/* Encabezado */}
            <div className="bg-white p-4 p-md-5 rounded-3 shadow-sm mb-4 border text-center">
                <span className="badge bg-warning text-dark px-3 py-2 fw-bold text-uppercase mb-2">
                    Explora por Categoría
                </span>
                <h1 className="display-5 fw-bold mb-3" style={{ color: "var(--color-purpura-profundo)" }}>
                    Categorías de Instrumentos
                </h1>
                <p className="lead text-muted mx-auto" style={{ maxWidth: "700px" }}>
                    Selecciona una categoría para filtrar los productos en tiempo real y encontrar el equipo adecuado para ti.
                </p>
            </div>

            {/* Grilla de Tarjetas de Selección de Categoría */}
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3 mb-5">
                {listaCategorias.map((cat) => {
                    const esActiva = categoriaActiva === cat.id;
                    const cantidad =
                        cat.id === "Todas"
                            ? productos.length
                            : productos.filter((p) => p.categoria === cat.id).length;

                    return (
                        <div key={cat.id} className="col">
                            <button
                                type="button"
                                className={`card h-100 w-100 text-start border-0 shadow-sm p-3 transition-all ${esActiva
                                        ? "bg-dark text-white border-start border-4 border-warning shadow"
                                        : "bg-white text-dark border"
                                    }`}
                                onClick={() => setCategoriaActiva(cat.id)}
                                style={{ cursor: "pointer" }}
                            >
                                <div className="d-flex align-items-center justify-content-between mb-2">
                                    <span className="fs-2">{cat.icono}</span>
                                    <span className={`badge ${esActiva ? "bg-warning text-dark" : "bg-light text-dark border"}`}>
                                        {cantidad} prod.
                                    </span>
                                </div>
                                <h6 className="fw-bold mb-1">{cat.nombre}</h6>
                                <p className={`small m-0 ${esActiva ? "text-white-50" : "text-muted"}`}>
                                    {cat.descripcion}
                                </p>
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Barra de estado de categoría activa */}
            <div className="d-flex justify-content-between align-items-center mb-4 bg-white p-3 rounded-3 shadow-sm border">
                <div>
                    <h4 className="fw-bold m-0 text-dark">
                        {categoriaActiva}
                    </h4>
                    <small className="text-muted">
                        Mostrando {productosFiltrados.length} producto(s)
                    </small>
                </div>
                {categoriaActiva !== "Todas" && (
                    <button
                        className="btn btn-outline-secondary btn-sm fw-semibold"
                        onClick={() => setCategoriaActiva("Todas")}
                    >
                        ✕ Restablecer a Todas
                    </button>
                )}
            </div>

            {/* Grilla de Productos Filtrados */}
            {productosFiltrados.length > 0 ? (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                    {productosFiltrados.map((prod) => (
                        <ProductoCard key={prod.codigo} producto={prod} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-5 bg-white rounded-3 shadow-sm border">
                    <span className="fs-1">📦</span>
                    <h5 className="fw-bold mt-2">Sin productos en esta categoría</h5>
                    <p className="text-muted">No hay elementos cargados actualmente para la selección elegida.</p>
                </div>
            )}

        </div>
    );
}
