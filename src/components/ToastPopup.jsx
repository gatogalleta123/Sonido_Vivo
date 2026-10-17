import { useEffect } from "react";

const variantes = {
    success: { estilo: "text-bg-success", icono: "bi-check-circle-fill" },
    danger: { estilo: "text-bg-danger", icono: "bi-exclamation-triangle-fill" },
    warning: { estilo: "text-bg-warning text-dark", icono: "bi-exclamation-circle-fill" },
    info: { estilo: "text-bg-info", icono: "bi-info-circle-fill" },
};

export default function ToastPopup({ mensaje, tipo = "info", onClose, duracion = 4500 }) {
    useEffect(() => {
        if (!mensaje || !onClose) return undefined;

        const timeoutId = window.setTimeout(onClose, duracion);
        return () => window.clearTimeout(timeoutId);
    }, [mensaje, onClose, duracion]);

    if (!mensaje) return null;

    const variante = variantes[tipo] ?? variantes.info;
    const esError = tipo === "danger";
    const cierreClaro = tipo === "success" || tipo === "danger";

    return (
        <div
            className="toast-container position-fixed bottom-0 end-0 p-3"
            style={{ zIndex: 1090 }}
            aria-live={esError ? "assertive" : "polite"}
            aria-atomic="true"
        >
            <div
                className={`toast show border-0 shadow ${variante.estilo}`}
                role={esError ? "alert" : "status"}
            >
                <div className="d-flex align-items-center">
                    <div className="toast-body d-flex align-items-center gap-2">
                        <i className={`bi ${variante.icono}`} aria-hidden="true"></i>
                        <span>{mensaje}</span>
                    </div>
                    {onClose && (
                        <button
                            type="button"
                            className={`btn-close me-2${cierreClaro ? " btn-close-white" : ""}`}
                            aria-label="Cerrar notificación"
                            onClick={onClose}
                        ></button>
                    )}
                </div>
            </div>
        </div>
    );
}
