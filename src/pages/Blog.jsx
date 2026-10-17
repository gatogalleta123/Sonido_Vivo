import { useState } from "react";
import { Link } from "react-router-dom";

export default function Blog() {
    const [categoriaFiltro, setCategoriaFiltro] = useState("Todas");

    // Artículos y noticias adaptados al ecosistema de Sonido Vivo
    const articulos = [
        {
            id: 1,
            titulo: "Guía definitiva: Cómo elegir tu primera guitarra eléctrica",
            categoria: "Guías de Compra",
            fecha: "12 de Octubre, 2026",
            autor: "Taller Sonido Vivo",
            resumen:
                "Descubre qué debes considerar al elegir tu primera guitarra eléctrica: comodidad, tipos de cuerpo, cápsulas single-coil y humbucker, y características que se adaptan a tu estilo musical.",
            imagen: "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?auto=format&fit=crop&w=800&q=80",
            enlaceLectura: "https://www.fender.com/articles/instruments/7-electric-guitars-for-the-beginner",
            destacado: true,
        },
        {
            id: 2,
            titulo: "Tendencias en producción musical: El auge del Home Studio profesional",
            categoria: "Audio & Grabación",
            fecha: "05 de Octubre, 2026",
            autor: "Equipo Técnico",
            resumen:
                "Descubre cómo mejorar tus grabaciones desde casa mediante una correcta selección de interfaces de audio, técnicas de microfonía y control de la acústica. Aprende a reducir el ruido y aprovechar al máximo tu equipo de producción.",
            imagen: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80",
            enlaceLectura: "https://focusrite.com/articles/how-to-record-acoustic-instruments/",
            destacado: false,
        },
        {
            id: 3,
            titulo: "Mantenimiento y calibración: Cuidado esencial para tus instrumentos de cuerda",
            categoria: "Taller & Servicio Técnico",
            fecha: "28 de Septiembre, 2026",
            autor: "Luthier Staff",
            resumen:
                "Aprende a mantener tu guitarra o bajo en óptimas condiciones mediante el cambio de cuerdas, la revisión del mástil y el ajuste de la octavación. Descubre cómo detectar problemas de afinación y cuándo acudir a un especialista.",
            imagen: "https://images.unsplash.com/photo-1550291652-6ea9114a47b1?auto=format&fit=crop&w=800&q=80",
            enlaceLectura: "https://blog.ernieball.com/interesting/maintaining-your-instrument/",
            destacado: false,
        },

        {
            id: 4,
            titulo: "Analog vs Digital: Los mejores pedales y multiefectos para el escenario",
            categoria: "Equipamiento & Efectos",
            fecha: "15 de Septiembre, 2026",
            autor: "Especialistas de Sonido",
            resumen:
                "Compara las posibilidades de las pedaleras analógicas tradicionales con la versatilidad de los procesadores digitales. Descubre cómo combinar pedales individuales, simulaciones de amplificadores y efectos programables para crear sonidos personalizados.",
            imagen: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=800&q=80",
            enlaceLectura: "https://blog.line6.com/2026/05/28/why-the-hx-stomp-is-the-ultimate-pedalboard-enhancer/",
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
                <h1
                    className="display-5 fw-bold mb-3"
                    style={{ color: "var(--color-primario-vibrante)" }}
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
                                    : "btn-outline-dark"
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
                                        <span><i className="bi bi-calendar-event me-1" aria-hidden="true"></i>{item.fecha}</span>
                                        <span>•</span>
                                        <span><i className="bi bi-pen me-1" aria-hidden="true"></i>{item.autor}</span>
                                    </div>

                                    <h3 className="card-title fw-bold text-dark mb-3">
                                        {item.titulo}
                                    </h3>

                                    <p className="card-text text-muted lead fs-6 mb-4">
                                        {item.resumen}
                                    </p>

                                    <div className="d-flex align-items-center justify-content-between pt-2 border-top">
                                        <a
                                            href={item.enlaceLectura}
                                            className="btn btn-outline-dark fw-bold"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Leer Noticia Completa
                                        </a>
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