export default function KpiCard({ titulo, valor, subtitulo, icono, colorBorder = "primary" }) {
    return (
        <div className="col-12 col-sm-6 col-xl-3">
            <div className={`card shadow-sm border-0 border-start border-4 border-${colorBorder} h-100 bg-white p-3`}>
                <div className="card-body p-2 d-flex justify-content-between align-items-center">
                    <div>
                        <span className="text-muted small fw-bold text-uppercase d-block mb-1">
                            {titulo}
                        </span>
                        <h3 className="fw-bold text-dark mb-1">{valor}</h3>
                        <small className="text-muted">{subtitulo}</small>
                    </div>
                    <div className="fs-1 opacity-75">{icono}</div>
                </div>
            </div>
        </div>
    );
}
