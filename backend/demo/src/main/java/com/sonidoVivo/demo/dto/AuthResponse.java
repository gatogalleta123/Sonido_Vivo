package com.sonidoVivo.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class AuthResponse {
    private String token;
    private String tipo; // "Bearer"
    private String rut;
    private String nombre;
    private String correo;
    private String rol;
}