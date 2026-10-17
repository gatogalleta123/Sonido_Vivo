import { useState, useEffect, useMemo } from "react";
import {
    obtenerUsuarios,
    crearUsuario,
    eliminarUsuario,
    guardarUsuarios,
} from "../../data/usuarios.js";
import ToastPopup from "../../components/ToastPopup.jsx";
import {
    normalizarRut,
    validarCorreo,
    validarRut,
    validarTelefono,
    validarTexto,
} from "../../utils/validaciones.js";

export default function AdminUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [filtroRol, setFiltroRol] = useState("Todos");

    const [mostrarModal, setMostrarModal] = useState(false);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [mensaje, setMensaje] = useState(null);

    const estadoInicialForm = {
        rut: "",
        nombre: "",
        apellidos: "",
        correo: "",
        telefono: "+56 9 1234 5678",
        rol: "cliente",
        estado: "activo",
        region: "Región Metropolitana de Santiago",
        comuna: "Providencia",
        direccion: "Av. Providencia 1234",
    };

    const [formData, setFormData] = useState(estadoInicialForm);
    const [erroresForm, setErroresForm] = useState({});

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const cargarUsuarios = () => {
        setUsuarios(obtenerUsuarios());
    };

    // Filtro dinámico por término de búsqueda y rol
    const usuariosFiltrados = useMemo(() => {
        return usuarios.filter((u) => {
            const coincideBusqueda =
                u.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                u.apellidos.toLowerCase().includes(busqueda.toLowerCase()) ||
                u.correo.toLowerCase().includes(busqueda.toLowerCase()) ||
                u.rut.toLowerCase().includes(busqueda.toLowerCase());

            const coincideRol = filtroRol === "Todos" || u.rol === filtroRol;

            return coincideBusqueda && coincideRol;
        });
    }, [usuarios, busqueda, filtroRol]);

    const handleAbrirCrear = () => {
        setModoEdicion(false);
        setFormData(estadoInicialForm);
        setErroresForm({});
        setMostrarModal(true);
    };

    const handleAbrirEditar = (u) => {
        setModoEdicion(true);
        setFormData({ ...estadoInicialForm, ...u, rut: normalizarRut(u.rut) });
        setErroresForm({});
        setMostrarModal(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "rut" ? normalizarRut(value) : value,
        }));
    };

    const validarFormulario = () => {
        const errores = {};
        if (!validarRut(formData.rut)) errores.rut = "Ingresa un RUT/RUN válido.";
        if (!validarTexto(formData.nombre, 2)) errores.nombre = "Ingresa un nombre de al menos 2 caracteres.";
        if (!validarTexto(formData.apellidos, 2)) errores.apellidos = "Ingresa apellidos de al menos 2 caracteres.";
        if (!validarCorreo(formData.correo)) errores.correo = "Ingresa un correo electrónico válido.";
        if (formData.telefono?.trim() && !validarTelefono(formData.telefono)) {
            errores.telefono = "Ingresa un teléfono válido con al menos 8 dígitos.";
        }
        if (formData.comuna?.trim() && !validarTexto(formData.comuna, 2)) {
            errores.comuna = "La comuna debe tener al menos 2 caracteres.";
        }
        if (!["cliente", "vendedor", "administrador"].includes(formData.rol)) {
            errores.rol = "Selecciona un rol válido.";
        }
        if (!["activo", "inactivo"].includes(formData.estado)) {
            errores.estado = "Selecciona un estado válido.";
        }
        if (![
            "Región Metropolitana de Santiago",
            "Región de Valparaíso",
            "Región del Bío Bío",
        ].includes(formData.region)) {
            errores.region = "Selecciona una región válida.";
        }

        setErroresForm(errores);
        return Object.keys(errores).length === 0;
    };

    const handleGuardar = (e) => {
        e.preventDefault();
        if (!validarFormulario()) return;

        try {
            const listaActual = obtenerUsuarios();
            const usuario = {
                ...formData,
                rut: normalizarRut(formData.rut),
                nombre: formData.nombre.trim(),
                apellidos: formData.apellidos.trim(),
                correo: formData.correo.trim().toLowerCase(),
                telefono: (formData.telefono ?? "").trim(),
                comuna: (formData.comuna ?? "").trim(),
            };
            const correoRegistrado = listaActual.some(
                (u) =>
                    u.correo.toLowerCase() === usuario.correo &&
                    normalizarRut(u.rut) !== usuario.rut
            );

            if (correoRegistrado) {
                setErroresForm({ correo: "El correo ya se encuentra registrado en el sistema." });
                return;
            }

            if (modoEdicion) {
                const actualizada = listaActual.map((u) =>
                    normalizarRut(u.rut) === usuario.rut ? usuario : u
                );
                guardarUsuarios(actualizada);
                setMensaje({ tipo: "success", texto: `Usuario ${usuario.rut} actualizado exitosamente.` });
            } else {
                const existe = listaActual.some((u) => normalizarRut(u.rut) === usuario.rut);
                if (existe) {
                    setErroresForm({ rut: "El RUT ya se encuentra registrado en el sistema." });
                    return;
                }
                crearUsuario(usuario);
                setMensaje({ tipo: "success", texto: `Usuario ${usuario.rut} creado correctamente.` });
            }

            cargarUsuarios();
            setMostrarModal(false);
        } catch (err) {
            setMensaje({ tipo: "danger", texto: err.message || "Ocurrió un error al guardar el registro." });
        }
    };

    // Alternar el estado activo/inactivo de la cuenta
    const handleCambiarEstado = (rut, estadoActual) => {
        const nuevoEstado = estadoActual === "activo" ? "inactivo" : "activo";
        const listaActual = obtenerUsuarios();
        const actualizada = listaActual.map((u) =>
            u.rut === rut ? { ...u, estado: nuevoEstado } : u
        );
        guardarUsuarios(actualizada);
        cargarUsuarios();
        setMensaje({
            tipo: "info",
            texto: `Estado del usuario ${rut} actualizado a: ${nuevoEstado}.`,
        });
    };

    // Eliminar usuario
    const handleEliminar = (rut, nombre) => {
        if (window.confirm(`¿Seguro que deseas eliminar la cuenta de "${nombre}" (${rut})?`)) {
            eliminarUsuario(rut);
            cargarUsuarios();
            setMensaje({ tipo: "warning", texto: `Usuario ${rut} eliminado.` });
        }
    };

    return (
        <div className="admin-usuarios-container">

            {/* Encabezado */}
            <div className="bg-white p-4 rounded-3 shadow-sm mb-4 border d-flex justify-content-between align-items-center flex-wrap gap-3">
                <div>
                    <h2 className="fw-bold m-0" style={{ color: "var(--color-purpura-profundo)" }}>
                        Gestión de Usuarios y Roles
                    </h2>
                    <p className="text-muted m-0">Administra accesos, roles del personal y estado de las cuentas.</p>
                </div>
                <button className="btn btn-warning fw-bold shadow-sm" onClick={handleAbrirCrear}>
                    + Registrar Nuevo Usuario
                </button>
            </div>

            <ToastPopup
                mensaje={mensaje?.texto}
                tipo={mensaje?.tipo}
                onClose={() => setMensaje(null)}
            />

            {/* Filtros de Búsqueda */}
            <div className="card shadow-sm border-0 bg-white p-3 mb-4">
                <div className="row g-3">
                    <div className="col-12 col-md-6">
                        <input
                            type="search"
                            className="form-control"
                            placeholder="Buscar por RUT, nombre, apellido o correo..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                    </div>
                    <div className="col-12 col-md-4">
                        <select
                            className="form-select"
                            value={filtroRol}
                            onChange={(e) => setFiltroRol(e.target.value)}
                        >
                            <option value="Todos">Todos los roles</option>
                            <option value="administrador">Administrador</option>
                            <option value="vendedor">Vendedor</option>
                            <option value="cliente">Cliente</option>
                        </select>
                    </div>
                    <div className="col-12 col-md-2 text-end d-flex align-items-center justify-content-end">
                        <span className="badge text-bg-secondary fs-6 px-3 py-2">
                            {usuariosFiltrados.length} Usuarios
                        </span>
                    </div>
                </div>
            </div>

            {/* Tabla de Usuarios */}
            <div className="card shadow-sm border-0 bg-white overflow-hidden">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table align-middle table-hover mb-0">
                            <thead className="table-dark">
                                <tr>
                                    <th>RUT / RUN</th>
                                    <th>Usuario</th>
                                    <th>Correo</th>
                                    <th>Ubicación</th>
                                    <th className="text-center">Rol</th>
                                    <th className="text-center">Estado</th>
                                    <th className="text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuariosFiltrados.length > 0 ? (
                                    usuariosFiltrados.map((u) => {
                                        const esAdmin = u.rol === "administrador";
                                        const esVendedor = u.rol === "vendedor";

                                        return (
                                            <tr key={u.rut}>
                                                <td className="fw-bold">{u.rut}</td>
                                                <td>
                                                    <span className="fw-semibold text-dark">{u.nombre} {u.apellidos}</span>
                                                </td>
                                                <td className="small text-muted">{u.correo}</td>
                                                <td className="small text-muted">{u.comuna}, {u.region}</td>
                                                <td className="text-center">
                                                    <span
                                                        className={`badge ${esAdmin
                                                                ? "bg-danger"
                                                                : esVendedor
                                                                    ? "bg-warning text-dark"
                                                                    : "bg-info text-dark"
                                                            }`}
                                                    >
                                                        {u.rol}
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <button
                                                        type="button"
                                                        className={`btn btn-sm ${u.estado === "activo" ? "btn-success" : "btn-secondary"
                                                            } fw-bold`}
                                                        style={{ fontSize: "0.75rem" }}
                                                        onClick={() => handleCambiarEstado(u.rut, u.estado)}
                                                    >
                                                        {u.estado === "activo" ? "Activo" : "Inactivo"}
                                                    </button>
                                                </td>
                                                <td className="text-center">
                                                    <div className="btn-group btn-group-sm">
                                                        <button
                                                            className="btn btn-outline-primary"
                                                            title="Editar"
                                                            onClick={() => handleAbrirEditar(u)}
                                                        >
                                                            Editar
                                                        </button>
                                                        <button
                                                            className="btn btn-outline-danger"
                                                            title="Eliminar"
                                                            onClick={() => handleEliminar(u.rut, `${u.nombre} ${u.apellidos}`)}
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
                                            No se encontraron usuarios que coincidan con los criterios.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* MODAL PARA CREAR / EDITAR USUARIO */}
            {mostrarModal && (
                <div className="modal d-block bg-dark bg-opacity-50" tabIndex="-1">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content shadow-lg border-0">

                            <div className="modal-header bg-dark text-white">
                                <h5 className="modal-title fw-bold">
                                    {modoEdicion ? `Editar Usuario: ${formData.rut}` : "+ Registrar Nuevo Usuario"}
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

                                        {/* RUT */}
                                        <div className="col-md-4">
                                            <label className="form-label small fw-bold">RUT / RUN *</label>
                                            <input
                                                type="text"
                                                className={`form-control ${erroresForm.rut ? "is-invalid" : ""}`}
                                                name="rut"
                                                value={formData.rut}
                                                onChange={handleChange}
                                                disabled={modoEdicion}
                                                placeholder="12.345.678-9"
                                            />
                                            {erroresForm.rut && <div className="invalid-feedback">{erroresForm.rut}</div>}
                                        </div>

                                        {/* Nombre */}
                                        <div className="col-md-4">
                                            <label className="form-label small fw-bold">Nombre *</label>
                                            <input
                                                type="text"
                                                className={`form-control ${erroresForm.nombre ? "is-invalid" : ""}`}
                                                name="nombre"
                                                value={formData.nombre}
                                                onChange={handleChange}
                                                placeholder="Ej: Carlos"
                                            />
                                            {erroresForm.nombre && <div className="invalid-feedback">{erroresForm.nombre}</div>}
                                        </div>

                                        {/* Apellidos */}
                                        <div className="col-md-4">
                                            <label className="form-label small fw-bold">Apellidos *</label>
                                            <input
                                                type="text"
                                                className={`form-control ${erroresForm.apellidos ? "is-invalid" : ""}`}
                                                name="apellidos"
                                                value={formData.apellidos}
                                                onChange={handleChange}
                                                placeholder="Ej: Pérez Silva"
                                            />
                                            {erroresForm.apellidos && <div className="invalid-feedback">{erroresForm.apellidos}</div>}
                                        </div>

                                        {/* Correo */}
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold">Correo Electrónico *</label>
                                            <input
                                                type="email"
                                                className={`form-control ${erroresForm.correo ? "is-invalid" : ""}`}
                                                name="correo"
                                                value={formData.correo}
                                                onChange={handleChange}
                                                placeholder="correo@sonidovivo.cl"
                                            />
                                            {erroresForm.correo && <div className="invalid-feedback">{erroresForm.correo}</div>}
                                        </div>

                                        {/* Teléfono */}
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold">Teléfono de Contacto</label>
                                            <input
                                                type="tel"
                                                className="form-control"
                                                name="telefono"
                                                value={formData.telefono}
                                                onChange={handleChange}
                                            />
                                            {erroresForm.telefono && <div className="invalid-feedback d-block">{erroresForm.telefono}</div>}
                                        </div>

                                        {/* Rol */}
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold">Rol de Usuario *</label>
                                            <select
                                                className="form-select"
                                                name="rol"
                                                value={formData.rol}
                                                onChange={handleChange}
                                            >
                                                <option value="cliente">Cliente (Usuario General)</option>
                                                <option value="vendedor">Vendedor (Staff)</option>
                                                <option value="administrador">Administrador (Acceso Total)</option>
                                            </select>
                                            {erroresForm.rol && <div className="invalid-feedback d-block">{erroresForm.rol}</div>}
                                        </div>

                                        {/* Estado */}
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold">Estado de la Cuenta *</label>
                                            <select
                                                className="form-select"
                                                name="estado"
                                                value={formData.estado}
                                                onChange={handleChange}
                                            >
                                                <option value="activo">Activo (Habilitado)</option>
                                                <option value="inactivo">Inactivo (Deshabilitado)</option>
                                            </select>
                                            {erroresForm.estado && <div className="invalid-feedback d-block">{erroresForm.estado}</div>}
                                        </div>

                                        {/* Región */}
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold">Región</label>
                                            <select
                                                className={`form-select ${erroresForm.region ? "is-invalid" : ""}`}
                                                name="region"
                                                value={formData.region}
                                                onChange={handleChange}
                                            >
                                                <option value="Región Metropolitana de Santiago">Región Metropolitana de Santiago</option>
                                                <option value="Región de Valparaíso">Región de Valparaíso</option>
                                                <option value="Región del Bío Bío">Región del Bío Bío</option>
                                            </select>
                                            {erroresForm.region && <div className="invalid-feedback">{erroresForm.region}</div>}
                                        </div>

                                        {/* Comuna */}
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold">Comuna</label>
                                            <input
                                                type="text"
                                                name="comuna"
                                                value={formData.comuna}
                                                onChange={handleChange}
                                                className={`form-control ${erroresForm.comuna ? "is-invalid" : ""}`}
                                            />
                                            {erroresForm.comuna && <div className="invalid-feedback">{erroresForm.comuna}</div>}
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
                                        Guardar Usuario
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
