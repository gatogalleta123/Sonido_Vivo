import { Link } from "react-router-dom";
import ProductoCard from "../components/ProductoCard.jsx";
import { obtenerProductos } from "../data/productos.js";

export default function Inicio() {
    const productosDestacados = obtenerProductos().slice(0, 4);

    const categoriasDestacadas = [
        {
            id: "acusticas",
            nombre: "Guitarras Acústicas",
            icono: "🎸",
            descripcion: "Modelos electroacústicos, folk y clásicos de sonido cálido.",
            linkCategoria: "Guitarras Acústicas",
        },
        {
            id: "electricas",
            nombre: "Guitarras Eléctricas",
            icono: "⚡",
            descripcion: "Modelos de marcas líderes para rock, jazz y metal.",
            linkCategoria: "Guitarras Eléctricas",
        },
        {
            id: "bajos",
            nombre: "Bajos Eléctricos",
            icono: "🎸",
            descripcion: "Bajos de 4 y 5 cuerdas con precisión de frecuencias graves.",
            linkCategoria: "Bajos Eléctricos",
        },
        {
            id: "teclados",
            nombre: "Teclados y Pianos",
            icono: "🎹",
            descripcion: "Pianos digitales y sintetizadores para escenario y estudio.",
            linkCategoria: "Teclados y Pianos",
        },
    ];

    return (
        <div className="inicio-container">
            {/* 1. SECCIÓN HERO / BANNER PRINCIPAL */}
            <section
                className="p-5 mb-5 rounded-4 shadow text-white text-center text-md-start overflow-hidden"
                style={{
                    background:
                        "linear-gradient(135deg, var(--color-fondo-oscuro) 0%, var(--color-primario) 100%)",
                }}
            >
                <div className="row align-items-center py-3">
                    <div className="col-lg-8">
                        <span className="badge bg-warning text-dark mb-3 px-3 py-2 fw-bold text-uppercase">
                            Lanzamientos 2026
                        </span>
                        <h1 className="display-4 fw-bold text-white mb-3">
                            Siente la pasión por el sonido perfecto
                        </h1>
                        <p className="lead text-light mb-4">
                            Explora nuestro catálogo de instrumentos musicales, equipos de
                            sonido profesional y accesorios con garantía oficial y despacho
                            a todo Chile.
                        </p>
                        <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-md-start">
                            <Link
                                to="/catalogo"
                                className="btn btn-warning btn-lg px-4 fw-bold shadow-sm"
                            >
                                🎸 Ver Catálogo Completo
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-4 text-center mt-4 mt-lg-0">
                        <div className="p-4 rounded-circle d-inline-block bg-white bg-opacity-10 border border-light border-opacity-25">
                            <span
                                style={{ fontSize: "5rem" }}
                                role="img"
                                aria-label="Música"
                            >
                                🎶
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. SECCIÓN DE CATEGORÍAS PRINCIPALES */}
            <section className="mb-5">
                <div className="d-flex justify-content-between align-items-end mb-4">
                    <div>
                        <h2
                            className="fw-bold m-0"
                            style={{ color: "var(--color-purpura-profundo)" }}
                        >
                            Categorías Destacadas
                        </h2>
                        <p className="text-muted m-0">
                            Encuentra el equipo ideal para tu proyecto musical
                        </p>
                    </div>
                    <Link
                        to="/catalogo"
                        className="btn btn-outline-primary btn-sm fw-bold"
                    >
                        Ver todas →
                    </Link>
                </div>

                <div className="row g-4">
                    {categoriasDestacadas.map((cat) => (
                        <div key={cat.id} className="col-12 col-sm-6 col-lg-3">
                            <div className="card h-100 border-0 shadow-sm p-3 text-center bg-white">
                                <div className="card-body d-flex flex-column align-items-center">
                                    <span className="fs-1 mb-3">{cat.icono}</span>
                                    <h5 className="card-title fw-bold mb-2">{cat.nombre}</h5>
                                    <p className="card-text text-muted small mb-4">
                                        {cat.descripcion}
                                    </p>
                                    <Link
                                        to={`/catalogo?categoria=${encodeURIComponent(
                                            cat.linkCategoria
                                        )}`}
                                        className="btn btn-outline-warning text-dark btn-sm fw-bold mt-auto w-100"
                                    >
                                        Explorar →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. SECCIÓN DE PRODUCTOS DESTACADOS */}
            <section className="mb-5">
                <div className="d-flex justify-content-between align-items-end mb-4">
                    <div>
                        <h2
                            className="fw-bold m-0"
                            style={{ color: "var(--color-purpura-profundo)" }}
                        >
                            Productos Destacados
                        </h2>
                        <p className="text-muted m-0">
                            Lo más solicitado por nuestros clientes este mes
                        </p>
                    </div>
                    <Link
                        to="/catalogo"
                        className="btn btn-outline-primary btn-sm fw-bold"
                    >
                        Ver catálogo completo →
                    </Link>
                </div>

                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                    {productosDestacados.map((prod) => (
                        <ProductoCard key={prod.codigo} producto={prod} />
                    ))}
                </div>
            </section>
        </div>
    );
}
