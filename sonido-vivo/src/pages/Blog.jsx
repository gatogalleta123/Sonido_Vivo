import { useState } from "react";
import { Link } from "react-router-dom";

export default function Blog() {
    const [categoriaFiltro, setCategoriaFiltro] = useState("Todas");

    // Artículos y noticias adaptados al ecosistema de Sonido Vivo
    const articulos = [
        {
            id: 1,
            titulo: "Guía definitiva: Cómo elegir tu primera guitarra eléctrica en 2026",
            categoria: "Guías de Compra",
            fecha: "12 de Octubre, 2026",
            autor: "Taller Sonido Vivo",
            resumen:
                "Descubre los factores clave entre tipos de cuerpo (Solid Body vs Semi-Hollow), cápsulas (Single Coil vs Humbucker) y maderas para tomar la decisión correcta según tu estilo musical.",
            imagen: "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?auto=format&fit=crop&w=800&q=80",
            enlaceLectura: "#",
            destacado: true,
        },
        {
            id: 2,
            titulo: "Tendencias en producción musical: El auge del Home Studio profesional",
            categoria: "Audio & Grabación",
            fecha: "05 de Octubre, 2026",
            autor: "Equipo Técnico",
            resumen:
                "Consejos esenciales de acondicionamiento acústico, elección de interfaces de audio de baja latencia y micrófonos de condensador para lograr mezclas de nivel comercial desde casa.",
            imagen: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80",
            enlaceLectura: "#",
            destacado: false,
        },
        {
            id: 3,
            titulo: "Mantenimiento y calibración: Cuidado esencial para tus instrumentos de cuerda",
            categoria: "Taller & Servicio Técnico",
            fecha: "28 de Septiembre, 2026",
            autor: "Luthier Staff",
            resumen:
                "Aprende a ajustar la octavación, la curvatura del mástil y la altura de las cuerdas en tu guitarra o bajo para mantener una afinación perfecta y prevenir daños por cambios de humedad.",
            imagen: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=800&q=80",
            enlaceLectura: "#",
            destacado: false,
        },
        {
            id: 4,
            titulo: "Analog vs Digital: Los mejores pedales y multiefectos para el escenario",
            categoria: "Equipamiento & Efectos",
            fecha: "15 de Septiembre, 2026",
            autor: "Especialistas de Sonido",
            resumen:
                "Analizamos las ventajas entre armar una pedalera analógica tradicional versus utilizar procesadores digitales y modeladores de amplificadores en presentaciones en vivo.",
            imagen: "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&w=800&q=80",
            enlaceLectura: "#",
            destacado: false,
        },
    ];

    // Filtrado de artículos por categoría
    const articulosFiltrados =
        categoriaFiltro === "Todas"
            ? articulos
            : articulos.filter((a) => a.categoria === categoriaFiltro);

    return (
        <div className="blog-container mb-5">
            {/* Encabezado Principal */}
            <div className="bg-white p-4 p-md-5 rounded-3 shadow-sm mb-4 border text-center">
                <span className="badge bg-warning text-dark px-3 py-2 fw-bold text-uppercase mb-2">
                    Novedades & Noticia
                </span>
                <h1
                    className="display-5 fw-bold mb-3"
                    style={{ color: "var(--color-purpura-profundo)" }}
                >
                    Blog Sonido Vivo
                </h1>
                <p className="lead text-muted mx-auto" style={{ maxWidth: "750px" }}>
                    Artículos técnicos, guías de equipamiento, consejos de luthería y noticias sobre el mundo de la música y el sonido profesional.
                </p>
            </div>

            {/* Filtros por Categoría */}
            <div className="d-flex flex-wrap gap-2 justify-content-center mb-5">
                {["Todas", "Guías de Compra", "Audio & Grabación", "Taller & Servicio Técnico", "Equipamiento & Efectos"].map(
                    (cat) => (
                        <button
                            key={cat}
                            type="button"
                            className={`btn btn-sm fw-bold px-3 py-2 ${categoriaFiltro === cat
                                    ? "btn-dark shadow-sm"
                                    : "btn-outline-secondary bg-white"
                                }`}
                            onClick={() => setCategoriaFiltro(cat)}
                        >
                            {cat}
                        </button>
                    )
                )}
            </div>

            {/* Lista de Artículos (Estilo Bloques / Cards Horizontales) */}
            <div className="d-flex flex-column gap-4">
                {articulosFiltrados.map((item) => (
                    <article
                        key={item.id}
                        className="card border-0 shadow-sm overflow-hidden bg-white rounded-4 border"
                    >
                        <div className="row g-0 align-items-center">
                            {/* Imagen del artículo */}
                            <div className="col-12 col-lg-5 position-relative">
                                <img
                                    src={item.imagen}
                                    alt={item.titulo}
                                    className="img-fluid w-100 object-fit-cover"
                                    style={{ minHeight: "260px", maxHeight: "320px" }}
                                />
                                <span className="position-absolute top-0 start-0 m-3 badge bg-warning text-dark fw-bold">
                                    {item.categoria}
                                </span>
                            </div>

                            {/* Contenido del artículo */}
                            <div className="col-12 col-lg-7">
                                <div className="card-body p-4 p-md-5">
                                    <div className="d-flex align-items-center gap-2 text-muted small mb-2">
                                        <span>📅 {item.fecha}</span>
                                        <span>•</span>
                                        <span>✍️ {item.autor}</span>
                                    </div>

                                    <h3 className="card-title fw-bold text-dark mb-3">
                                        {item.titulo}
                                    </h3>

                                    <p className="card-text text-muted lead fs-6 mb-4">
                                        {item.resumen}
                                    </p>

                                    <div className="d-flex align-items-center justify-content-between pt-2 border-top">
                                        <button
                                            type="button"
                                            className="btn btn-outline-primary fw-bold"
                                            onClick={() =>
                                                alert(`Próximamente estará disponible la lectura completa de: "${item.titulo}"`)
                                            }
                                        >
                                            📖 Leer Noticia Completa
                                        </button>
                                        <Link to="/contacto" className="small text-muted text-decoration-none">
                                            ¿Dudas sobre el tema? Contáctanos
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}