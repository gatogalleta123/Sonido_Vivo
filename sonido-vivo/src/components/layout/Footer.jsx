import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="site-header text-light pt-5 pb-3 mt-auto border-top border-secondary">
            <div className="container">
                <div className="row g-4">

                    {/* Columna 1: Información de la Marca */}
                    <div className="col-12 col-md-4">
                        <h5 className="fw-bold text-warning mb-3">🎵 Sonido Vivo</h5>
                        <p className="text-light-50 small">
                            Tu tienda especializada en instrumentos musicales, equipos de audio profesional y accesorios. Calidad, garantía y pasión por la música.
                        </p>
                        <div className="d-flex gap-3 mt-3">
                            <a href="#facebook" className="text-white text-decoration-none small">
                                🌐 Facebook
                            </a>
                            <a href="#instagram" className="text-white text-decoration-none small">
                                📸 Instagram
                            </a>
                            <a href="#youtube" className="text-white text-decoration-none small">
                                ▶️ YouTube
                            </a>
                        </div>
                    </div>

                    {/* Columna 2: Navegación Rápida */}
                    <div className="col-12 col-sm-6 col-md-2">
                        <h6 className="fw-bold text-white mb-3">Navegación</h6>
                        <ul className="list-unstyled d-flex flex-column gap-2 small">
                            <li>
                                <Link to="/" className="text-white-50 text-decoration-none">
                                    Inicio
                                </Link>
                            </li>
                            <li>
                                <Link to="/catalogo" className="text-white-50 text-decoration-none">
                                    Catálogo
                                </Link>
                            </li>
                            <li>
                                <Link to="/nosotros" className="text-white-50 text-decoration-none">
                                    Nosotros
                                </Link>
                            </li>
                            <li>
                                <Link to="/contacto" className="text-white-50 text-decoration-none">
                                    Contacto
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Columna 3: Datos de Contacto y Tienda */}
                    <div className="col-12 col-sm-6 col-md-3">
                        <h6 className="fw-bold text-white mb-3">Atención al Cliente</h6>
                        <ul className="list-unstyled text-white-50 small d-flex flex-column gap-2">
                            <li>📍 Av. Providencia 1234, Santiago</li>
                            <li>📞 +56 2 2345 6789</li>
                            <li>✉️ contacto@sonidovivo.cl</li>
                            <li>⏰ Lun - Vie: 10:00 - 19:00 hrs</li>
                            <li>⏰ Sáb: 10:00 - 14:00 hrs</li>
                        </ul>
                    </div>

                    {/* Columna 4: Suscripción a Ofertas / Newsletter */}
                    <div className="col-12 col-md-3">
                        <h6 className="fw-bold text-white mb-3">Newsletter</h6>
                        <p className="text-white-50 small">
                            Suscríbete para recibir promociones exclusivas y novedades del catálogo.
                        </p>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="input-group mb-2">
                                <input
                                    type="email"
                                    className="form-control form-control-sm"
                                    placeholder="tu-correo@ejemplo.com"
                                    aria-label="Correo electrónico"
                                    required
                                />
                                <button className="btn btn-warning btn-sm fw-bold" type="submit">
                                    Unirse
                                </button>
                            </div>
                        </form>
                    </div>

                </div>

                <hr className="my-4 border-secondary" />

                {/* Derechos de Autor y Créditos */}
                <div className="row align-items-center small text-white-50">
                    <div className="col-md-6 text-center text-md-start">
                        © {new Date().getFullYear()} Sonido Vivo SpA. Todos los derechos reservados.
                    </div>
                    <div className="col-md-6 text-center text-md-end mt-2 mt-md-0">
                        <span>Proyecto de Desarrollo FullStack - DSY1104</span>
                    </div>
                </div>

            </div>
        </footer>
    );
}
