import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ProductoCard from "../components/ProductoCard.jsx";
import { obtenerProductos, obtenerCategorias } from "../data/productos.js";

export default function Catalogo() {
    const [searchParams, setSearchParams] = useSearchParams();
    const categoriaUrl = searchParams.get("categoria");

    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [categoriaFiltro, setCategoriaFiltro] = useState(categoriaUrl || "Todas");

    useEffect(() => {
        setProductos(obtenerProductos());
        setCategorias(obtenerCategorias());
    }, []);

    // Escuchar si cambia la categoría desde la URL
    useEffect(() => {
        if (categoriaUrl) {
            setCategoriaFiltro(categoriaUrl);
        } else {
            setCategoriaFiltro("Todas");
        }
    }, [categoriaUrl]);

    // Manejar el cambio en el selector manual
    const handleCambioCategoria = (e) => {
        const seleccion = e.target.value;
        setCategoriaFiltro(seleccion);

        if (seleccion === "Todas") {
            setSearchParams({});
        } else {
            setSearchParams({ categoria: seleccion });
        }
    };

    const productosFiltrados = useMemo(() => {
        return productos.filter((p) => {
            const coincideBusqueda =
                p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                p.marca.toLowerCase().includes(busqueda.toLowerCase()) ||
                p.codigo.toLowerCase().includes(busqueda.toLowerCase());

            const coincideCategoria =
                categoriaFiltro === "Todas" || p.categoria === categoriaFiltro;

            return coincideBusqueda && coincideCategoria;
        });
    }, [productos, busqueda, categoriaFiltro]);

    return (
        <div className="catalogo-container mb-5">
            {/* Encabezado */}
            <div className="bg-white p-4 p-md-5 rounded-3 shadow-sm mb-4 border text-center">
                <h1 className="fw-bold mb-2" style={{ color: "var(--color-purpura-profundo)" }}>
                    🎸 Catálogo de Instrumentos
                </h1>
                <p className="text-muted m-0">
                    Explora nuestro stock de guitarras, bajos, teclados y equipos de audio.
                </p>
            </div>

            {/* Barra de Filtros */}
            <div className="card shadow-sm border-0 bg-white p-3 mb-4">
                <div className="row g-3">
                    <div className="col-12 col-md-6">
                        <input
                            type="search"
                            className="form-control"
                            placeholder="Buscar por nombre, marca o código..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                    </div>

                    <div className="col-12 col-md-4">
                        <select
                            className="form-select"
                            value={categoriaFiltro}
                            onChange={handleCambioCategoria}
                        >
                            <option value="Todas">Todas las categorías</option>
                            {categorias.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-12 col-md-2 text-end d-flex align-items-center justify-content-end">
                        <span className="badge text-bg-warning fs-6 px-3 py-2">
                            {productosFiltrados.length} Resultados
                        </span>
                    </div>
                </div>
            </div>

            {/* Grilla de Productos */}
            {productosFiltrados.length > 0 ? (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                    {productosFiltrados.map((prod) => (
                        <ProductoCard key={prod.codigo} producto={prod} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-5 bg-white rounded-3 shadow-sm border">
                    <span className="fs-1">🔍</span>
                    <h4 className="fw-bold mt-2">No se encontraron productos</h4>
                    <p className="text-muted">Intenta cambiar el término de búsqueda o la categoría seleccionada.</p>
                    <button
                        className="btn btn-outline-primary btn-sm fw-bold"
                        onClick={() => {
                            setBusqueda("");
                            setCategoriaFiltro("Todas");
                            setSearchParams({});
                        }}
                    >
                        Limpiar Filtros
                    </button>
                </div>
            )}
        </div>
    );
}
