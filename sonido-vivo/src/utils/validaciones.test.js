import { describe, it, expect } from "vitest";
import {
    validarCorreo,
    validarTexto,
    validarRut,
} from "./validaciones.js";

describe("Pruebas Unitarias: Módulo de Validaciones", () => {
    // Test 1
    it("1. validarCorreo: acepta direcciones de correo con formato correcto", () => {
        expect(validarCorreo("contacto@sonidovivo.cl")).toBe(true);
        expect(validarCorreo("cliente@gmail.com")).toBe(true);
    });

    // Test 2
    it("2. validarCorreo: rechaza correos con formato inválido o incompletos", () => {
        expect(validarCorreo("correo_invalido.com")).toBe(false);
        expect(validarCorreo("usuario@dominosinpunto")).toBe(false);
    });

    // Test 3
    it("3. validarTexto: comprueba la longitud mínima requerida de un string", () => {
        expect(validarTexto("Fender", 3)).toBe(true);
        expect(validarTexto("  A  ", 3)).toBe(false);
    });

    // Test 4
    it("4. validarRut: valida correctamente un RUT chileno usando Módulo 11", () => {
        // RUTs chilenos reales válidos
        expect(validarRut("19.011.022-K")).toBe(true);
        expect(validarRut("12345678-5")).toBe(true);
        // RUTs falsos o mal calculados
        expect(validarRut("12.345.678-0")).toBe(false);
    });
});
