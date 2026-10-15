import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import KpiCard from "../../components/ui/KpiCard.jsx";
import { obtenerProductos } from "../../data/productos.js";
import { obtenerUsuarios } from "../../data/usuarios.js";

export default function DashboardAdmin() {
    const [productos, setProductos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        setProductos(obtenerProductos());
        setUsuarios(obtenerUsuarios());
    }, []);

    // Métricas calculadas
    const totalProductos = productos.length;
    const stockCriticoCount = productos.filter((p) => p.stock <= p.stockCritico).length;
    const totalUsuarios = usuarios.length;
    const valorInventario = productos.reduce((sum, p) => sum + p.precio * p.stock, 0);

    return (
        <div className="dashboard-admin-container">

            {/* Header del Dashboard */}
            <div className="bg-white p-4 rounded-3 shadow-sm mb-4 border d-flex justify-content-between align-items-center flex-wrap gap-3">
                <div>
                    <h2 className="fw-bold m-0" style={{ color: "var(--color-purpura-profundo)" }}>
                        📊 Panel de Control y Métricas
                    </h2>
                    <p className="text-muted m-0">Resumen operativo general de la Tienda Sonido Vivo</p>
                </div>
                <div className="d-flex gap-2">
                    <Link to="/admin/productos" className="btn btn-warning fw-bold btn-sm">
                        ➕ Nuevo Producto
                    </Link>
                </div>
            </div>

            {/* Tarjetas KPI */}
            <div className="row g-4 mb-5">
                <KpiCard
                    titulo="Total Inventario"
                    valor={`\$${valorInventario.toLocaleString("es-CL")}`}
                    subtitulo="Valorización comercial"
                    icono="💰"
                    colorBorder="success"
                />
                <KpiCard
                    titulo="Catálogo Activo"
                    valor={totalProductos}
                    subtitulo="Productos registrados"
                    icono="🎸"
                    colorBorder="primary"
                />
                <KpiCard
                    titulo="Stock Crítico"
                    valor={stockCriticoCount}
                    subtitulo="Requieren reabastecimiento"
                    icono="⚠️"
                    colorBorder="danger"
                />
                <KpiCard
                    titulo="Usuarios Registrados"
                    valor={totalUsuarios}
                    subtitulo="Clientes y staff"
                    icono="👥"
                    colorBorder="warning"
                />
            </div>

            {/* Alerta de Productos en Stock Crítico */}
            {stockCriticoCount > 0 && (
                <div className="card shadow-sm border-0 mb-4 bg-white">
                    <div className="card-header bg-danger text-white py-3">
                        <h6 className="fw-bold mb-0">⚠️ Productos con Stock Crítico</h6>
                    </div>
                    <div className="card-body p-0">
                        <div className="table-responsive">
                            <table className="table align-middle mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th>Código</th>
                                        <th>Producto</th>
                                        <th>Categoría</th>
                                        <th className="text-center">Stock Actual</th>
                                        <th className="text-center">Stock Mínimo</th>
                                        <th className="text-end">Precio</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productos
                                        .filter((p) => p.stock <= p.stockCritico)
                                        .map((p) => (
                                            <tr key={p.codigo}>
                                                <td className="fw-bold">{p.codigo}</td>
                                                <td>{p.nombre}</td>
                                                <td>{p.categoria}</td>
                                                <td className="text-center">
                                                    <span className="badge bg-danger">{p.stock} un.</span>
                                                </td>
                                                <td className="text-center">{p.stockCritico} un.</td>
                                                <td className="text-end fw-bold">
                                                    \${p.precio.toLocaleString("es-CL")}
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

