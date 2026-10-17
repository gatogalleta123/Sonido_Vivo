import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Login from "./Login.jsx";

function renderLoginConRutas() {
    return render(
        <MemoryRouter initialEntries={["/login"]}>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<h1>Panel de Administración Simulado</h1>} />
                <Route path="/" element={<h1>Portada Tienda</h1>} />
            </Routes>
        </MemoryRouter>
    );
}

describe("Pruebas Unitarias: Página de Login e Interacción de Usuario", () => {
    // Test 8
    it("10. Login: muestra error cuando se envía el formulario vacío", () => {
        renderLoginConRutas();

        const botonSubmit = screen.getByRole("button", { name: /iniciar sesión/i });
        fireEvent.click(botonSubmit);

        expect(
            screen.getByText("Por favor, ingresa tu correo electrónico y contraseña.")
        ).toBeInTheDocument();
    });

    // Test 9
    it("11. Login: muestra error si el correo no está registrado", () => {
        renderLoginConRutas();

        const inputCorreo = screen.getByLabelText(/correo electrónico/i);
        const inputPassword = screen.getByLabelText(/contraseña/i);
        const botonSubmit = screen.getByRole("button", { name: /iniciar sesión/i });

        fireEvent.change(inputCorreo, { target: { value: "noexiste@correo.cl" } });
        fireEvent.change(inputPassword, { target: { value: "123456" } });
        fireEvent.click(botonSubmit);

        expect(
            screen.getByText("El correo ingresado no corresponde a ningún usuario registrado.")
        ).toBeInTheDocument();
    });

    // Test 10
    it("12. Login: autentica al usuario y redirige al panel admin", () => {
        renderLoginConRutas();

        const inputCorreo = screen.getByLabelText(/correo electrónico/i);
        const inputPassword = screen.getByLabelText(/contraseña/i);
        const botonSubmit = screen.getByRole("button", { name: /iniciar sesión/i });

        // Ingresar credenciales válidas registradas en usuarios.js
        fireEvent.change(inputCorreo, { target: { value: "admin@sonidovivo.cl" } });
        fireEvent.change(inputPassword, { target: { value: "admin123" } });
        fireEvent.click(botonSubmit);

        // Verificar redirección hacia la ruta /admin
        expect(
            screen.getByRole("heading", { name: "Panel de Administración Simulado" })
        ).toBeInTheDocument();

        // Verificar que la sesión quedó guardada en localStorage
        const sesionGuardada = JSON.parse(localStorage.getItem("sonidoVivo_sesion"));
        expect(sesionGuardada).not.toBeNull();
        expect(sesionGuardada.correo).toBe("admin@sonidovivo.cl");
        expect(sesionGuardada.rol).toBe("administrador");
    });
});
