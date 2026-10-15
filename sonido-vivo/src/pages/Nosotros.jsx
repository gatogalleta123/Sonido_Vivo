import { Link } from "react-router-dom";

export default function Nosotros() {
    const sucursales = [
        {
            id: "santiago",
            ciudad: "Santiago (Casa Matriz)",
            direccion: "Av. Providencia 1234, Providencia",
            telefono: "+56 2 2345 6789",
            horario: "Lunes a Viernes: 10:00 - 19:00 hrs | Sábados: 10:00 - 14:00 hrs",
            mapaUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.839218209214!2d-70.6148386!3d-33.4275817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9692cabb10df3a1b%3A0xb3634047a0640e70!2sAv.%20Providencia%201234%2C%20Providencia%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses-419!2scl!4v1710000000000!5m2!1ses-419!2scl",
        },
        {
            id: "vina",
            ciudad: "Viña del Mar",
            direccion: "Calle Valparaíso 450, Local 12",
            telefono: "+56 32 2123 4567",
            horario: "Lunes a Viernes: 10:30 - 18:30 hrs | Sábados: 10:30 - 14:00 hrs",
            mapaUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3344.821431209214!2d-71.5518386!3d-33.0235817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9689de7a10df3a1b%3A0xb3634047a0640e70!2sCalle%20Valpara%C3%ADso%20450%2C%20Vi%C3%B1a%20del%20Mar%2C%20Valpara%C3%ADso!5e0!3m2!1ses-419!2scl!4v1710000000000!5m2!1ses-419!2scl",
        },
    ];

    return (
        <div className="nosotros-container mb-5">

            {/* Encabezado */}
            <div className="bg-white p-4 p-md-5 rounded-3 shadow-sm mb-5 border text-center">
                <span className="badge bg-warning text-dark px-3 py-2 fw-bold text-uppercase mb-2">
                    Sobre Nosotros
                </span>
                <h1 className="display-5 fw-bold mb-3" style={{ color: "var(--color-purpura-profundo)" }}>
                    Pasión por la Música y el Sonido Profesional
                </h1>
                <p className="lead text-muted mx-auto" style={{ maxWidth: "800px" }}>
                    En <strong>Sonido Vivo</strong> nos dedicamos a equipar a músicos, productores y entusiastas del audio con los mejores instrumentos, garantizando calidad, soporte técnico y asesoría experta.
                </p>
            </div>

            {/* Valores y Misión */}
            <div className="row g-4 mb-5">
                <div className="col-12 col-md-4">
                    <div className="card h-100 border-0 shadow-sm p-4 bg-white text-center">
                        <span className="fs-1 mb-2">🎯</span>
                        <h5 className="fw-bold mb-2">Nuestra Misión</h5>
                        <p className="text-muted small m-0">
                            Democratizar el acceso a instrumentos musicales de primer nivel en Chile, ofreciendo garantía real y asesoría personalizada.
                        </p>
                    </div>
                </div>

                <div className="col-12 col-md-4">
                    <div className="card h-100 border-0 shadow-sm p-4 bg-white text-center">
                        <span className="fs-1 mb-2">⭐</span>
                        <h5 className="fw-bold mb-2">Garantía y Confianza</h5>
                        <p className="text-muted small m-0">
                            Trabajamos únicamente con distribuidores oficiales de marcas líderes como Fender, Yamaha, Roland, Shure y Boss.
                        </p>
                    </div>
                </div>

                <div className="col-12 col-md-4">
                    <div className="card h-100 border-0 shadow-sm p-4 bg-white text-center">
                        <span className="fs-1 mb-2">🔧</span>
                        <h5 className="fw-bold mb-2">Servicio Técnico</h5>
                        <p className="text-muted small m-0">
                            Contamos con un taller especializado para calibración de guitarras, mantención de equipos de audio y soporte de garantías.
                        </p>
                    </div>
                </div>
            </div>

            {/* Sección de Ubicación y Tiendas Físicas */}
            <div className="bg-white p-4 p-md-5 rounded-3 shadow-sm border mb-5">
                <div className="text-center mb-5">
                    <h2 className="fw-bold mb-2" style={{ color: "var(--color-purpura-profundo)" }}>
                        📍 Nuestras Tiendas Físicas y Puntos de Retiro
                    </h2>
                    <p className="text-muted">
                        Visítanos para probar tus instrumentos o selecciona tu sucursal más cercana para retiro gratuito.
                    </p>
                </div>

                <div className="row g-5">
                    {sucursales.map((tienda) => (
                        <div key={tienda.id} className="col-12 col-lg-6">
                            <div className="card h-100 border-0 shadow-sm bg-light overflow-hidden">
                                <div className="card-body p-4">
                                    <h4 className="fw-bold text-dark mb-3">{tienda.ciudad}</h4>

                                    <ul className="list-unstyled d-flex flex-column gap-2 text-muted mb-4">
                                        <li className="d-flex align-items-start gap-2">
                                            <span>📍</span>
                                            <strong>Dirección:</strong> {tienda.direccion}
                                        </li>
                                        <li className="d-flex align-items-center gap-2">
                                            <span>📞</span>
                                            <strong>Teléfono:</strong> {tienda.telefono}
                                        </li>
                                        <li className="d-flex align-items-start gap-2">
                                            <span>⏰</span>
                                            <strong>Horario:</strong> {tienda.horario}
                                        </li>
                                    </ul>

                                    {/* Mapa Interactivo (Google Maps Iframe) */}
                                    <div className="ratio ratio-16x9 rounded overflow-hidden shadow-sm border">
                                        <iframe
                                            src={tienda.mapaUrl}
                                            title={`Mapa de sucursal ${tienda.ciudad}`}
                                            allowFullScreen=""
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                        ></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Banner de Contacto Directo */}
            <div
                className="p-5 rounded-4 shadow text-white text-center"
                style={{
                    background: "linear-gradient(135deg, var(--color-fondo-oscuro) 0%, var(--color-primario) 100%)",
                }}
            >
                <h3 className="fw-bold mb-2">¿Tienes alguna duda o buscas un instrumento específico?</h3>
                <p className="text-light mb-4">
                    Nuestro equipo de especialistas está listo para responder tus consultas técnicas.
                </p>
                <Link to="/contacto" className="btn btn-warning btn-lg fw-bold shadow-sm">
                    ✉️ Enviar un mensaje
                </Link>
            </div>

        </div>
    );
}
