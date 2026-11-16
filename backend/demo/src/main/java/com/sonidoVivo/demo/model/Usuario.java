package com.sonidoVivo.demo.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "usuarios")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 15)
    private String rut;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(nullable = false, length = 100)
    private String apellidos;

    @Column(nullable = false, unique = true, length = 150)
    private String correo;

    @Column(nullable = false)
    private String password; // Guardado con BCrypt

    @Column(length = 20)
    private String telefono;

    @Column(length = 100)
    private String region;

    @Column(length = 100)
    private String comuna;

    @Column(length = 255)
    private String direccion;

    
    @Column(nullable = false, length = 30)
    private String rol;

    @Column(nullable = false, length = 20)
    private String estado; 

    @Column(name = "fecha_registro", updatable = false)
    private LocalDateTime fechaRegistro;

}