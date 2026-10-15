import { Link } from "react-router-dom";

export default function Inicio() {
    // Categorías destacadas para la vista principal
    const categoriasDestacadas = [
        {
            id: "guitarras",
            nombre: "Guitarras y Bajos",
            icono: "🎸",
            descripcion: "Guitarras eléctricas, acústicas, electroacústicas y bajos profesionales.",
        },
        {
            id: "teclados",
            nombre: "Teclados y Sintetizadores",
            icono: "🎹",
            descripcion: "Pianos digitales, controladores MIDI y sintetizadores para escenario.",
        },
        {
            id: "baterias",
            nombre: "Baterías y Percusión",
            icono: "🥁",
            descripcion: "Baterías acústicas, electrónicas, platillos y repuestos.",
        },
        {
            id: "audio",
            nombre: "Audio Profesional",
            icono: "🎙️",
            descripcion: "Micrófonos de estudio, monitores, interfaces y consolas de sonido.",
        },
    ];

    // Vista previa de productos destacados
    const productosDestacados = [
        {
            id: 1,
            nombre: "Guitarra Eléctrica Fender Stratocaster",
            precio: 890000,
            categoria: "Guitarras",
        },
        {
            id: 2,
            nombre: "Teclado Sintetizador Roland JUNO-DS",
            precio: 650000,
            categoria: "Teclados",
        },
        {
            id: 3,
            nombre: "Batería Electrónica Alesis Nitro Max",
            precio: 490000,
            categoria: "Baterías",
        },
        {
            id: 4,
            nombre: "Micrófono de Condensador Shure SM7B",
            precio: 399000,
            categoria: "Audio",
        },
    ];

    return (
        <div className="inicio-container">

            {/* 1. SECCIÓN HERO / BANNER PRINCIPAL */}
            <section
                className="p-5 mb-5 rounded-4 shadow text-white text-center text-md-start overflow-hidden"
                style={{
                    background: "linear-gradient(135deg, var(--color-fondo-oscuro) 0%, var(--color-primario) 100%)",
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
                            Explora nuestro catálogo de instrumentos musicales, equipos de sonido profesional y accesorios con garantía oficial y despacho a todo Chile.
                        </p>
                        <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-md-start">
                            <Link to="/catalogo" className="btn btn-warning btn-lg px-4 fw-bold shadow-sm">
                                🎸 Ver Catálogo Completo
                            </Link>
                            <Link to="/ofertas" className="btn btn-outline-light btn-lg px-4 fw-bold">
                                🔥 Ver Ofertas
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-4 text-center mt-4 mt-lg-0">
                        <div className="p-4 rounded-circle d-inline-block bg-white bg-opacity-10 border border-light border-opacity-25">
                            <span style={{ fontSize: "5rem" }} role="img" aria-label="Música">
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
                        <h2 className="fw-bold m-0" style={{ color: "var(--color-purpura-profundo)" }}>
                            Categorías Destacadas
                        </h2>
                        <p className="text-muted m-0">Encuentra el equipo ideal para tu proyecto musical</p>
                    </div>
                    <Link to="/categorias" className="btn btn-outline-primary btn-sm fw-bold">
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
                                    <p className="card-text text-muted small mb-4">{cat.descripcion}</p>
                                    <Link to="/categorias" className="btn btn-sm btn-outline-dark mt-auto w-100 fw-semibold">
                                        Explorar
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
                        <h2 className="fw-bold m-0" style={{ color: "var(--color-purpura-profundo)" }}>
                            Productos Destacados
                        </h2>
                        <p className="text-muted m-0">Los más recomendados por nuestros especialistas</p>
                    </div>
                    <Link to="/catalogo" className="btn btn-outline-primary btn-sm fw-bold">
                        Ir a la Tienda →
                    </Link>
                </div>

                <div className="row g-4">
                    {productosDestacados.map((prod) => (
                        <div key={prod.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <div className="card h-100 shadow-sm border-0 rounded-3 overflow-hidden bg-white">
                                <div className="bg-light text-center p-4 position-relative">
                                    <span className="badge bg-secondary position-absolute top-0 start-0 m-3">
                                        {prod.categoria}
                                    </span>
                                    <span className="fs-1">🎵</span>
                                </div>
                                <div className="card-body d-flex flex-column">
                                    <h6 className="card-title fw-bold text-dark mb-2">{prod.nombre}</h6>
                                    <p className="fs-5 fw-bold text-success mt-auto mb-3">
                                        ${prod.precio.toLocaleString("es-CL")}
                                    </p>

                                    <Link to="/catalogo" className="btn btn-primary-custom w-100 btn-sm fw-bold">
                                        Ver Detalles
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. BENEFICIOS Y GARANTÍAS */}
            <section className="py-4 px-3 rounded-4 mb-5" style={{ backgroundColor: "var(--color-fondo-suave)" }}>
                <div className="row g-4 text-center">
                    <div className="col-12 col-md-3">
                        <div className="p-2">
                            <span className="fs-2">🚚</span>
                            <h6 className="fw-bold mt-2 mb-1">Despacho a todo Chile</h6>
                            <p className="small text-muted mb-0">Envíos asegurados y rápidos</p>
                        </div>
                    </div>
                    <div className="col-12 col-md-3">
                        <div className="p-2">
                            <span className="fs-2">🛡️</span>
                            <h6 className="fw-bold mt-2 mb-1">Garantía Oficial</h6>
                            <p className="small text-muted mb-0">Productos 100% originales</p>
                        </div>
                    </div>
                    <div className="col-12 col-md-3">
                        <div className="p-2">
                            <span className="fs-2">📍</span>
                            <h6 className="fw-bold mt-2 mb-1">Retiro en Tienda</h6>
                            <p className="small text-muted mb-0">Viña del Mar y Santiago</p>
                        </div>
                    </div>
                    <div className="col-12 col-md-3">
                        <div className="p-2">
                            <span className="fs-2">🔧</span>
                            <h6 className="fw-bold mt-2 mb-1">Servicio Técnico</h6>
                            <p className="small text-muted mb-0">Calibración y mantención</p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
