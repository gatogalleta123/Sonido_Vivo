import { useState, useEffect } from "react";

export default function AdminPedidos() {
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        try {
            const ultimaOrden = localStorage.getItem("sonidoVivo_ultimaOrden");
            if (ultimaOrden) {
                setPedidos([JSON.parse(ultimaOrden)]);
            }
        } catch (error) {
            console.error("Error al cargar pedidos:", error);
        }
    }, []);

    return (
        <div className="admin-pedidos-container">
            <div className="bg-white p-4 rounded-3 shadow-sm mb-4 border">
                <h2 className="fw-bold m-0" style={{ color: "var(--color-purpura-profundo)" }}>
                    Gestión de Pedidos
                </h2>
                <p className="text-muted m-0">
                    Revisa las órdenes de compra realizadas por los clientes en la tienda.
                </p>
            </div>

            <div className="card shadow-sm border-0 bg-white overflow-hidden">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table align-middle table-hover mb-0">
                            <thead className="table-dark">
                                <tr>
                                    <th>N° Orden</th>
                                    <th>Fecha</th>
                                    <th>Cliente</th>
                                    <th>Método Pago</th>
                                    <th className="text-end">Total Pagado</th>
                                    <th className="text-center">Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pedidos.length > 0 ? (
                                    pedidos.map((p) => (
                                        <tr key={p.numeroOrden}>
                                            <td className="fw-bold text-primary">{p.numeroOrden}</td>
                                            <td>{p.fecha}</td>
                                            <td>
                                                <div className="fw-semibold text-dark">
                                                    {p.cliente.nombre} {p.cliente.apellidos}
                                                </div>
                                                <small className="text-muted">{p.cliente.correo}</small>
                                            </td>
                                            <td>
                                                {p.cliente.medioPago === "tarjeta"
                                                    ? "Webpay / Tarjeta"
                                                    : "Transferencia"}
                                            </td>
                                            <td className="text-end fw-bold text-success">
                                                \${p.totalFinal.toLocaleString("es-CL")}
                                            </td>
                                            <td className="text-center">
                                                <span className="badge bg-success px-3 py-2">Completado</span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center py-4 text-muted">
                                            No hay registros de compras recientes en la tienda.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}