import { useState, useEffect, useMemo } from "react";
import {
    obtenerProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
    obtenerCategorias,
} from "../../data/productos.js";

export default function AdminProductos() {
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);

    // Estados de filtro
    const [busqueda, setBusqueda] = useState("");
    const [categoriaFiltro, setCategoriaFiltro] = useState("Todas");

    // Estado del Modal / Formulario
    const [mostrarModal, setMostrarModal] = useState(false);
    const [modoEdicion, setModoEdicion] = useState(false); // false: crear, true: editar
    const [mensaje, setMensaje] = useState(null);

    // Formulario vacio inicial
    const estadoFormInicial = {
        codigo: "",
        categoria: "Guitarras Acústicas",
        nombre: "",
        marca: "",
        modelo: "",
        stock: 5,
        stockCritico: 2,
        precio: 99990,
        descripcion: "",
        imagen: "",
    };

    const [formData, setFormData] = useState(estadoFormInicial);
    const [erroresForm, setErroresForm] = useState({});

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = () => {
        setProductos(obtenerProductos());
        setCategorias(obtenerCategorias());
    };

    // Filtrado reactivo de la tabla
    const productosFiltrados = useMemo(() => {
        return productos.filter((p) => {
            const coincideBusqueda =
                p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                p.codigo.toLowerCase().includes(busqueda.toLowerCase()) ||
                p.marca.toLowerCase().includes(busqueda.toLowerCase());

            const coincideCategoria =
                categoriaFiltro === "Todas" || p.categoria === categoriaFiltro;

            return coincideBusqueda && coincideCategoria;
        });
    }, [productos, busqueda, categoriaFiltro]);

    // Abrir Modal para Crear
    const handleAbrirCrear = () => {
        setModoEdicion(false);
        setFormData(estadoFormInicial);
        setErroresForm({});
        setMostrarModal(true);
    };

    // Abrir Modal para Editar
    const handleAbrirEditar = (prod) => {
        setModoEdicion(true);
        setFormData({ ...prod });
        setErroresForm({});
        setMostrarModal(true);
    };

    // Manejador de inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "stock" || name === "stockCritico" || name === "precio" ? Number(value) : value,
        }));
    };

    // Validaciones del Formulario
    const validarFormulario = () => {
        const errores = {};
        if (!formData.codigo.trim()) errores.codigo = "El código es obligatorio.";
        if (!formData.nombre.trim()) errores.nombre = "El nombre es obligatorio.";
        if (!formData.marca.trim()) errores.marca = "La marca es obligatoria.";
        if (!formData.modelo.trim()) errores.modelo = "El modelo es obligatorio.";
        if (formData.precio <= 0) errores.precio = "El precio debe ser mayor a 0.";
        if (formData.stock < 0) errores.stock = "El stock no puede ser negativo.";

        setErroresForm(errores);
        return Object.keys(errores).length === 0;
    };

    // Guardar (Crear o Editar)
    const handleGuardar = (e) => {
        e.preventDefault();
        if (!validarFormulario()) return;

        try {
            if (modoEdicion) {
                actualizarProducto(formData.codigo, formData);
                setMensaje({ tipo: "success", texto: `Producto ${formData.codigo} actualizado correctamente.` });
            } else {
                crearProducto(formData);
                setMensaje({ tipo: "success", texto: `Producto ${formData.codigo} creado exitosamente.` });
            }

            cargarDatos();
            setMostrarModal(false);
            setTimeout(() => setMensaje(null), 3000);
        } catch (err) {
            setMensaje({ tipo: "danger", texto: err.message });
        }
    };

    // Eliminar Producto
    const handleEliminar = (codigo, nombre) => {
        if (window.confirm(`¿Seguro que deseas eliminar el producto "${nombre}" (${codigo})?`)) {
            eliminarProducto(codigo);
            cargarDatos();
            setMensaje({ tipo: "warning", texto: `Producto ${codigo} eliminado.` });
            setTimeout(() => setMensaje(null), 3000);
        }
    };

    return (
        <div className="admin-productos-container">

            {/* Encabezado */}
            <div className="bg-white p-4 rounded-3 shadow-sm mb-4 border d-flex justify-content-between align-items-center flex-wrap gap-3">
                <div>
                    <h2 className="fw-bold m-0" style={{ color: "var(--color-purpura-profundo)" }}>
                        Gestión de Inventario
                    </h2>
                    <p className="text-muted m-0">Administra el catálogo de productos, precios y stock disponible.</p>
                </div>
                <button className="btn btn-warning fw-bold shadow-sm" onClick={handleAbrirCrear}>
                    + Agregar Nuevo Producto
                </button>
            </div>

            {/* Alerta de notificación */}
            {mensaje && (
                <div className={`alert alert-${mensaje.tipo} alert-dismissible fade show shadow-sm`} role="alert">
                    {mensaje.texto}
                    <button type="button" className="btn-close" onClick={() => setMensaje(null)}></button>
                </div>
            )}

            {/* Filtros y Búsqueda */}
            <div className="card shadow-sm border-0 bg-white p-3 mb-4">
                <div className="row g-3">
                    <div className="col-12 col-md-6">
                        <input
                            type="search"
                            className="form-control"
                            placeholder="Buscar por código, nombre o marca..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                    </div>
                    <div className="col-12 col-md-4">
                        <select
                            className="form-select"
                            value={categoriaFiltro}
                            onChange={(e) => setCategoriaFiltro(e.target.value)}
                        >
                            <option value="Todas">Todas las categorías</option>
                            {categorias.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-12 col-md-2 text-end d-flex align-items-center justify-content-end">
                        <span className="badge text-bg-secondary fs-6 px-3 py-2">
                            {productosFiltrados.length} Registros
                        </span>
                    </div>
                </div>
            </div>

            {/* Tabla de Productos */}
            <div className="card shadow-sm border-0 bg-white overflow-hidden">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table align-middle table-hover mb-0">
                            <thead className="table-dark">
                                <tr>
                                    <th>Código</th>
                                    <th>Producto</th>
                                    <th>Categoría</th>
                                    <th>Marca / Modelo</th>
                                    <th className="text-end">Precio</th>
                                    <th className="text-center">Stock</th>
                                    <th className="text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productosFiltrados.length > 0 ? (
                                    productosFiltrados.map((p) => {
                                        const esCritico = p.stock <= p.stockCritico;
                                        return (
                                            <tr key={p.codigo}>
                                                <td className="fw-bold text-primary">{p.codigo}</td>
                                                <td>
                                                    <div className="d-flex align-items-center gap-2">
                                                        <img
                                                            src={p.imagen}
                                                            alt={p.nombre}
                                                            className="rounded"
                                                            style={{ width: "40px", height: "40px", objectFit: "cover" }}
                                                            onError={(e) => {
                                                                e.target.onerror = null;
                                                                e.target.src = "https://via.placeholder.com/40x40?text=SV";
                                                            }}
                                                        />
                                                        <span className="fw-semibold text-dark">{p.nombre}</span>
                                                    </div>
                                                </td>
                                                <td><span className="badge bg-light text-dark border">{p.categoria}</span></td>
                                                <td className="small text-muted">{p.marca} {p.modelo}</td>
                                                <td className="text-end fw-bold text-success">
                                                    \${p.precio.toLocaleString("es-CL")}
                                                </td>
                                                <td className="text-center">
                                                    <span className={`badge ${esCritico ? "bg-danger" : "bg-success"}`}>
                                                        {p.stock} un.
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <div className="btn-group btn-group-sm">
                                                        <button
                                                            className="btn btn-outline-primary"
                                                            title="Editar"
                                                            onClick={() => handleAbrirEditar(p)}
                                                        >
                                                            Editar
                                                        </button>
                                                        <button
                                                            className="btn btn-outline-danger"
                                                            title="Eliminar"
                                                            onClick={() => handleEliminar(p.codigo, p.nombre)}
                                                        >
                                                            Eliminar
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center py-4 text-muted">
                                            No hay productos registrados que coincidan con la búsqueda.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* MODAL PARA CREAR / EDITAR PRODUCTO */}
            {mostrarModal && (
                <div className="modal d-block bg-dark bg-opacity-50" tabIndex="-1">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content shadow-lg border-0">

                            <div className="modal-header bg-dark text-white">
                                <h5 className="modal-title fw-bold">
                                    {modoEdicion ? `Editar Producto: ${formData.codigo}` : "+ Agregar Nuevo Producto"}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close btn-close-white"
                                    onClick={() => setMostrarModal(false)}
                                ></button>
                            </div>

                            <form onSubmit={handleGuardar}>
                                <div className="modal-body p-4">
                                    <div className="row g-3">

                                        {/* Código */}
                                        <div className="col-md-4">
                                            <label className="form-label small fw-bold">Código Único *</label>
                                            <input
                                                type="text"
                                                className={`form-control ${erroresForm.codigo ? "is-invalid" : ""}`}
                                                name="codigo"
                                                value={formData.codigo}
                                                onChange={handleChange}
                                                disabled={modoEdicion}
                                                placeholder="Ej: GA004"
                                            />
                                            {erroresForm.codigo && <div className="invalid-feedback">{erroresForm.codigo}</div>}
                                        </div>

                                        {/* Categoría */}
                                        <div className="col-md-4">
                                            <label className="form-label small fw-bold">Categoría *</label>
                                            <select
                                                className="form-select"
                                                name="categoria"
                                                value={formData.categoria}
                                                onChange={handleChange}
                                            >
                                                <option value="Guitarras Acústicas">Guitarras Acústicas</option>
                                                <option value="Guitarras Eléctricas">Guitarras Eléctricas</option>
                                                <option value="Bajos Eléctricos">Bajos Eléctricos</option>
                                                <option value="Baterías">Baterías</option>
                                                <option value="Teclados y Pianos">Teclados y Pianos</option>
                                                <option value="Amplificadores">Amplificadores</option>
                                                <option value="Micrófonos">Micrófonos</option>
                                                <option value="Pedales de Efectos">Pedales de Efectos</option>
                                                <option value="Accesorios">Accesorios</option>
                                                <option value="Estudio y Grabación">Estudio y Grabación</option>
                                            </select>
                                        </div>

                                        {/* Precio */}
                                        <div className="col-md-4">
                                            <label className="form-label small fw-bold">Precio (CLP) *</label>
                                            <input
                                                type="number"
                                                className={`form-control ${erroresForm.precio ? "is-invalid" : ""}`}
                                                name="precio"
                                                value={formData.precio}
                                                onChange={handleChange}
                                            />
                                            {erroresForm.precio && <div className="invalid-feedback">{erroresForm.precio}</div>}
                                        </div>

                                        {/* Nombre */}
                                        <div className="col-12">
                                            <label className="form-label small fw-bold">Nombre del Producto *</label>
                                            <input
                                                type="text"
                                                className={`form-control ${erroresForm.nombre ? "is-invalid" : ""}`}
                                                name="nombre"
                                                value={formData.nombre}
                                                onChange={handleChange}
                                                placeholder="Ej: Guitarra Electroacústica Fender"
                                            />
                                            {erroresForm.nombre && <div className="invalid-feedback">{erroresForm.nombre}</div>}
                                        </div>

                                        {/* Marca */}
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold">Marca *</label>
                                            <input
                                                type="text"
                                                className={`form-control ${erroresForm.marca ? "is-invalid" : ""}`}
                                                name="marca"
                                                value={formData.marca}
                                                onChange={handleChange}
                                                placeholder="Ej: Fender / Yamaha"
                                            />
                                            {erroresForm.marca && <div className="invalid-feedback">{erroresForm.marca}</div>}
                                        </div>

                                        {/* Modelo */}
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold">Modelo *</label>
                                            <input
                                                type="text"
                                                className={`form-control ${erroresForm.modelo ? "is-invalid" : ""}`}
                                                name="modelo"
                                                value={formData.modelo}
                                                onChange={handleChange}
                                                placeholder="Ej: CD-60SCE"
                                            />
                                            {erroresForm.modelo && <div className="invalid-feedback">{erroresForm.modelo}</div>}
                                        </div>

                                        {/* Stock */}
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold">Stock Actual *</label>
                                            <input
                                                type="number"
                                                className={`form-control ${erroresForm.stock ? "is-invalid" : ""}`}
                                                name="stock"
                                                value={formData.stock}
                                                onChange={handleChange}
                                            />
                                            {erroresForm.stock && <div className="invalid-feedback">{erroresForm.stock}</div>}
                                        </div>

                                        {/* Stock Crítico */}
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold">Stock Crítico (Mínimo) *</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="stockCritico"
                                                value={formData.stockCritico}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        {/* URL Imagen */}
                                        <div className="col-12">
                                            <label className="form-label small fw-bold">URL de la Imagen</label>
                                            <input
                                                type="url"
                                                className="form-control"
                                                name="imagen"
                                                value={formData.imagen}
                                                onChange={handleChange}
                                                placeholder="https://images.unsplash.com/..."
                                            />
                                        </div>

                                        {/* Descripción */}
                                        <div className="col-12">
                                            <label className="form-label small fw-bold">Descripción / Ficha Técnica</label>
                                            <textarea
                                                className="form-control"
                                                name="descripcion"
                                                rows="3"
                                                value={formData.descripcion}
                                                onChange={handleChange}
                                            ></textarea>
                                        </div>

                                    </div>
                                </div>

                                <div className="modal-footer bg-light">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => setMostrarModal(false)}
                                    >
                                        Cancelar
                                    </button>
                                    <button type="submit" className="btn btn-warning fw-bold">
                                        Guardar Cambios
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}