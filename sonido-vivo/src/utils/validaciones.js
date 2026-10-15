/**
 * Utilitarios de validación de formularios para Sonido Vivo
 */

// 1. Validar correo electrónico con expresión regular
export function validarCorreo(correo) {
    if (!correo || typeof correo !== "string") return false;
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+\$/;
    return regexCorreo.test(correo.trim());
}

// 2. Validar texto con longitud mínima
export function validarTexto(texto, minLength = 1) {
    if (!texto || typeof texto !== "string") return false;
    return texto.trim().length >= minLength;
}

// 3. Validar número de teléfono (mínimo 8 dígitos)
export function validarTelefono(telefono) {
    if (!telefono || typeof telefono !== "string") return false;
    const numeros = telefono.replace(/[^0-9]/g, "");
    return numeros.length >= 8;
}

// 4. Validar RUT/RUN chileno mediante algoritmo Módulo 11
export function validarRut(rut) {
    if (!rut || typeof rut !== "string") return false;

    // Limpiar puntos, guiones y espacios
    const rutLimpio = rut.replace(/[^0-9kK]/g, "");
    if (rutLimpio.length < 8) return false;

    const cuerpo = rutLimpio.slice(0, -1);
    const dvIngresado = rutLimpio.slice(-1).toUpperCase();

    // Algoritmo Módulo 11
    let suma = 0;
    let multiplicador = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo.charAt(i), 10) * multiplicador;
        multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }

    const resto = suma % 11;
    const dvCalculadoNum = 11 - resto;

    let dvEsperado = "";
    if (dvCalculadoNum === 11) {
        dvEsperado = "0";
    } else if (dvCalculadoNum === 10) {
        dvEsperado = "K";
    } else {
        dvEsperado = dvCalculadoNum.toString();
    }

    return dvIngresado === dvEsperado;
}

// 5. Validar que un conjunto de campos requeridos no estén vacíos
export function validarCamposObligatorios(objetoCampos) {
    const errores = {};

    Object.keys(objetoCampos).forEach((campo) => {
        const valor = objetoCampos[campo];
        if (!valor || (typeof valor === "string" && valor.trim() === "")) {
            errores[campo] = `El campo ${campo} es obligatorio.`;
        }
    });

    return {
        esValido: Object.keys(errores).length === 0,
        errores,
    };
}
