import FormRegistro from "../components/FormRegistro.jsx";

export default function Registro() {
    return (
        <div className="container py-5 my-2">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-8">
                    <div className="card shadow-lg border-0 rounded-4 overflow-hidden bg-white">

                        {/* Header del Registro */}
                        <div
                            className="p-4 text-center text-white"
                            style={{
                                background:
                                    "linear-gradient(135deg, var(--color-fondo-oscuro) 0%, var(--color-primario) 100%)",
                            }}
                        >
                            <i className="bi bi-music-note-beamed fs-1" aria-hidden="true"></i>
                            <h3 className="fw-bold mt-2 mb-1">Crea tu cuenta en Sonido Vivo</h3>
                            <p className="small mb-0 text-white-50">
                                Únete para realizar compras más rápidas, seguir tus pedidos y recibir promociones exclusivas.
                            </p>
                        </div>

                        <div className="card-body p-4 p-md-5">
                            <FormRegistro />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
