import { useState, useEffect, useMemo } from "react";
import ProductoCard from "../components/ProductoCard.jsx";
import { obtenerProductos } from "../data/productos.js";

export default function Ofertas() {
    const [productos, setProductos] = useState([]);
    const [categoriaFiltro, setCategoriaFiltro] = useState("Todas");
    const [busqueda, setBusqueda] = useState("");

    useEffect(() => {
        // Cargar productos y simular cuáles están en oferta
        const lista = obtenerProductos();
        setProductos(lista);
    }, []);

    // Simular lista de ofertas aplicando un 15% de descuento a productos seleccionados
    const productosEnOferta = useMemo(() => {
        return productos.map((p, index) => {
            // Marcamos los primeros productos o ítems clave en promoción
            const esOferta = index % 2 === 0 || p.stock <= p.stockCritico;
            const precioOriginal = esOferta ? Math.round(p.precio * 1.18) : p.precio;

            return {
                ...p,
                esOferta,
                precioOriginal,
                descuentoPorcentaje: esOferta ? 15 : 0,
            };
        }).filter((p) => p.esOferta);
    }, [productos]);

    // Filtrado por categoría y búsqueda
    const ofertasFiltradas = useMemo(() => {
        return productosEnOferta.filter((p) => {
            const coincideBusqueda =
                p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                p.marca.toLowerCase().includes(busqueda.toLowerCase());

            const coincideCategoria =
                categoriaFiltro === "Todas" || p.categoria === categoriaFiltro;

            return coincideBusqueda && coincideCategoria;
        });
    }, [productosEnOferta, busqueda, categoriaFiltro]);

    return (
        <div className="ofertas-container mb-5">

            {/* Banner de Ofertas */}
            <section
                className="p-4 p-md-5 mb-5 rounded-4 shadow text-white text-center position-relative overflow-hidden"
                style={{
                    background: "linear-gradient(135deg, var(--color-purpura-profundo) 0%, var(--color-primario-vibrante) 100%)",
                }}
            >
                <span className="badge bg-danger text-white px-3 py-2 fw-bold text-uppercase mb-3 fs-6">
                    🔥 Promociones Especiales
                </span>
                <h1 className="display-5 fw-bold mb-3 text-white">
                    Ofertas de la Semana en Sonido Vivo
                </h1>
                <p className="lead text-light mx-auto" style={{ maxWidth: "750px" }}>
                    Aprovecha descuentos exclusivos en guitarras, teclados, micrófonos y accesorios con despacho a todo Chile.
                </p>
            </section>

            {/* Barra de Filtros */}
            <div className="card border-0 shadow-sm p-3 mb-4 bg-white">
                <div className="row g-3 align-items-center">
                    <div className="col-12 col-md-6">
                        <input
                            type="search"
                            className="form-control"
                            placeholder="Buscar dentro de las ofertas..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                    </div>

                    <div className="col-12 col-md-4">
                        <select
                            className="form-select"
                            value={categoriaFiltro}
                            onChange={(e) => setCategoriaFiltro(e.target.value)}
                        >
                            <option value="Todas">Todas las categorías en oferta</option>
                            <option value="Guitarras Acústicas">Guitarras Acústicas</option>
                            <option value="Guitarras Eléctricas">Guitarras Eléctricas</option>
                            <option value="Bajos Eléctricos">Bajos Eléctricos</option>
                            <option value="Baterías">Baterías</option>
                            <option value="Teclados y Pianos">Teclados y Pianos</option>
                            <option value="Amplificadores">Amplificadores</option>
                            <option value="Micrófonos">Micrófonos</option>
                            <option value="Pedales de Efectos">Pedales de Efectos</option>
                            <option value="Accesorios">Accesorios</option>
                            <option value="Estudio y Grabación">Estudio y Grabación</option>
                        </select>
                    </div>

                    <div className="col-12 col-md-2 text-end">
                        <span className="badge text-bg-danger fs-6 px-3 py-2">
                            {ofertasFiltradas.length} Ofertas
                        </span>
                    </div>
                </div>
            </div>

            {/* Grilla de Ofertas */}
            {ofertasFiltradas.length > 0 ? (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                    {ofertasFiltradas.map((prod) => (
                        <ProductoCard key={prod.codigo} producto={prod} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-5 bg-white rounded-3 shadow-sm border my-4">
                    <span className="fs-1">🏷️</span>
                    <h4 className="fw-bold mt-2">No hay ofertas disponibles para esta selección</h4>
                    <p className="text-muted">Prueba cambiando la categoría o restableciendo el filtro.</p>
                    <button
                        className="btn btn-outline-primary btn-sm fw-bold mt-2"
                        onClick={() => {
                            setBusqueda("");
                            setCategoriaFiltro("Todas");
                        }}
                    >
                        Restablecer Filtros
                    </button>
                </div>
            )}

        </div>
    );
}
