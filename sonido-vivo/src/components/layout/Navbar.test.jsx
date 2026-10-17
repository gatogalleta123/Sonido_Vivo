import { beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar.jsx";

describe("Navbar", () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it("navigates when a menu link is clicked without treating it as a collapse trigger", () => {
        render(
            <MemoryRouter initialEntries={["/"]}>
                <Navbar />
                <Routes>
                    <Route path="/" element={<h1>Inicio</h1>} />
                    <Route path="/blog" element={<h1>Blog</h1>} />
                </Routes>
            </MemoryRouter>
        );

        const enlaceBlog = screen.getByRole("link", { name: "Blog / Noticias" });
        expect(enlaceBlog).not.toHaveAttribute("data-bs-toggle");
        fireEvent.click(enlaceBlog);

        expect(screen.getByRole("heading", { name: "Blog" })).toBeInTheDocument();
    });
});
