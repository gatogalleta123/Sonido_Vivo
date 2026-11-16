import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductoCard from "./ProductoCard.jsx";

const productoPrueba = {
    codigo: "GA001",
    nombre: "Guitarra Electroacústica Fender",
    marca: "Fender",
    modelo: "CD-60SCE",
    categoria: "Guitarras Acústicas",
    precio: 299990,
    stock: 8,
    stockCritico: 2,
    imagen: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1",
    descripcion: "Guitarra de tapa armónica de abeto sólido.",
};

describe("Pruebas Unitarias: Componente ProductoCard", () => {
    // Test 5
    it("7. ProductoCard: renderiza nombre, marca, modelo y categoría", () => {
        render(
            <MemoryRouter>
                <ProductoCard producto={productoPrueba} />
            </MemoryRouter>
        );

        expect(
            screen.getByRole("heading", { name: "Guitarra Electroacústica Fender" })
        ).toBeInTheDocument();
        expect(screen.getByText(/Fender - CD-60SCE/i)).toBeInTheDocument();
        expect(screen.getByText("Guitarras Acústicas")).toBeInTheDocument();
    });

    // Test 6
    it("8. ProductoCard: muestra el precio en Pesos Chilenos (CLP)", () => {
        render(
            <MemoryRouter>
                <ProductoCard producto={productoPrueba} />
            </MemoryRouter>
        );

        expect(screen.getByText(/299\.990/)).toBeInTheDocument();
    });

    // Test 7
    it("9. ProductoCard: ejecuta onAgregarAlCarrito al hacer clic", () => {
        const mockAgregar = vi.fn(); // Mock function

        render(
            <MemoryRouter>
                <ProductoCard producto={productoPrueba} onAgregarAlCarrito={mockAgregar} />
            </MemoryRouter>
        );

        const botonAgregar = screen.getByRole("button", { name: /añadir al carrito/i });
        fireEvent.click(botonAgregar);

        expect(mockAgregar).toHaveBeenCalledTimes(1);
        expect(mockAgregar).toHaveBeenCalledWith(productoPrueba);
    });
});
