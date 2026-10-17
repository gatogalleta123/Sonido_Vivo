import { beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import DetalleProducto from "./DetalleProducto.jsx";

describe("DetalleProducto", () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it("13. DetalleProducto: agrega al carrito la cantidad seleccionada", async () => {
        render(
            <MemoryRouter initialEntries={["/detalle-producto/GA001"]}>
                <Routes>
                    <Route path="/detalle-producto/:codigo" element={<DetalleProducto />} />
                </Routes>
            </MemoryRouter>
        );

        const botonAgregar = (await screen.findAllByRole("button", { name: /añadir al carrito/i }))[0];
        fireEvent.click(screen.getByRole("button", { name: "+" }));
        fireEvent.click(botonAgregar);

        await waitFor(() => {
            const carrito = JSON.parse(localStorage.getItem("sonidoVivo_carrito"));
            expect(carrito).toHaveLength(1);
            expect(carrito[0]).toMatchObject({
                codigo: "GA001",
                cantidad: 2,
            });
        });

        expect(await screen.findByText(/agregaste 2 unidad\(es\)/i)).toBeInTheDocument();
    });
});
