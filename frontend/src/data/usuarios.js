const STORAGE_KEY_USUARIOS = "sonidoVivo_usuarios";

export const usuariosIniciales = [
    {
        rut: "12345678-9",
        nombre: "Administrador",
        apellidos: "General",
        correo: "admin@sonidovivo.cl",
        rol: "administrador",
        estado: "activo",
        region: "Región de Valparaíso",
        comuna: "Viña del Mar",
        direccion: "Av. Libertad 450"
    },
    {
        rut: "18765432-1",
        nombre: "Carlos",
        apellidos: "Pérez",
        correo: "vendedor@sonidovivo.cl",
        rol: "vendedor",
        estado: "activo",
        region: "Región de Valparaíso",
        comuna: "Viña del Mar",
        direccion: "Calle Valparaíso 123"
    },
    {
        rut: "19876543-2",
        nombre: "María",
        apellidos: "González",
        correo: "cliente@gmail.com",
        rol: "cliente",
        estado: "activo",
        region: "Región Metropolitana de Santiago",
        comuna: "Providencia",
        direccion: "Av. Providencia 1900"
    }
];

export function obtenerUsuarios() {
    try {
        const guardados = localStorage.getItem(STORAGE_KEY_USUARIOS);
        if (!guardados) {
            localStorage.setItem(STORAGE_KEY_USUARIOS, JSON.stringify(usuariosIniciales));
            return usuariosIniciales;
        }
        return JSON.parse(guardados);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        return usuariosIniciales;
    }
}

export function guardarUsuarios(usuarios) {
    localStorage.setItem(STORAGE_KEY_USUARIOS, JSON.stringify(usuarios));
}

export function crearUsuario(nuevoUsuario) {
    const usuarios = obtenerUsuarios();
    const listaActualizada = [...usuarios, nuevoUsuario];
    guardarUsuarios(listaActualizada);
    return listaActualizada;
}

export function eliminarUsuario(rut) {
    const usuarios = obtenerUsuarios();
    const listaActualizada = usuarios.filter((u) => u.rut !== rut);
    guardarUsuarios(listaActualizada);
    return listaActualizada;
}
