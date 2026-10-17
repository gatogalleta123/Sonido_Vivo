import { describe, it, expect } from "vitest";
import {
    validarCorreo,
    validarTexto,
    validarRut,
    normalizarRut,
    validarUrl,
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
        expect(validarRut("23.000.000-K")).toBe(true);
        expect(validarRut("12345678-5")).toBe(true);
        // RUTs falsos o mal calculados
        expect(validarRut("12.345.678-0")).toBe(false);
        expect(validarRut("12345678K")).toBe(false);
        expect(validarRut("123456789012345-0")).toBe(false);
    });

    it("normalizarRut: elimina puntos y guiones del RUT ingresado", () => {
        expect(normalizarRut("12.345.678-K")).toBe("12345678K");
        expect(normalizarRut("12 345 678-K")).toBe("12345678K");
    });

    it("validarUrl: acepta URLs web válidas y rechaza esquemas no web", () => {
        expect(validarUrl("https://sonidovivo.cl/imagen.jpg")).toBe(true);
        expect(validarUrl("javascript:alert(1)")).toBe(false);
        expect(validarUrl("no es una url")).toBe(false);
    });
});
