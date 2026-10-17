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
                className="p-4 p-md-5 mb-5 rounded-4 shadow text-white overflow-hidden"
                style={{
                    background:
                        "linear-gradient(135deg, var(--color-fondo-oscuro) 0%, var(--color-primario) 100%)",
                }}
            >
                <div className="row align-items-center py-3 g-4">

                    {/* Texto principal */}
                    <div className="col-lg-7 text-center text-md-start">
                        <h1 className="display-4 fw-bold text-white mb-3">
                            Siente la <span style={{ color: "var(--color-accent)" }}>pasión</span> por el sonido perfecto
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
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                    className="me-2"
                                    aria-hidden="true"
                                >
                                    <path d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13s1.12-2 2.5-2 2.5.896 2.5 2m9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2" />
                                    <path
                                        fillRule="evenodd"
                                        d="M14 11V2h1v9zM6 3v10H5V3z"
                                    />
                                    <path d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4z" />
                                </svg>

                                Ver Catálogo Completo
                            </Link>
                        </div>
                    </div>

                    {/* Imagen principal */}
                    <div className="col-lg-5">
                        <img
                            src="https://images.unsplash.com/photo-1680695762257-ec0297a4d61b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
                            alt="Guitarra en un entorno musical"
                            className="img-fluid rounded-4 shadow"
                            style={{
                                width: "100%",
                                height: "320px",
                                objectFit: "cover",
                                objectPosition: "center",
                            }}
                        />
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
                        className="btn btn-outline-dark btn-sm fw-bold"
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
                        className="btn btn-outline-dark btn-sm fw-bold"
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
