package com.sonidoVivo.demo.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "pedidos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "numero_orden", nullable = false, unique = true, length = 30)
    private String numeroOrden; // Ej: "SV-84920"

    @Column(name = "fecha_pedido", updatable = false)
    private LocalDateTime fechaPedido;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id")
    private Usuario usuario; // Opcional (null si es compra rápida)

    // Datos del cliente / receptor ingresados en Checkout
    @Column(name = "nombre_cliente", nullable = false)
    private String nombreCliente;

    @Column(name = "apellidos_cliente", nullable = false)
    private String apellidosCliente;

    @Column(name = "rut_cliente", nullable = false, length = 15)
    private String rutCliente;

    @Column(name = "correo_cliente", nullable = false)
    private String correoCliente;

    @Column(name = "telefono_cliente", nullable = false, length = 20)
    private String telefonoCliente;

    // Dirección de Envío
    @Column(name = "region_envio", nullable = false)
    private String regionEnvio;

    @Column(name = "comuna_envio", nullable = false)
    private String comunaEnvio;

    @Column(name = "direccion_envio", nullable = false)
    private String direccionEnvio;

    @Column(name = "departamento_envio")
    private String departamentoEnvio;

    @Column(name = "metodo_despacho", nullable = false, length = 30)
    private String metodoDespacho; // "domicilio" o "retiro"

    @Column(name = "medio_pago", nullable = false, length = 30)
    private String medioPago; // "tarjeta" o "transferencia"

    @Column(columnDefinition = "TEXT")
    private String notas;

    // Totales
    @Column(nullable = false)
    private Integer subtotal;

    @Column(name = "costo_despacho", nullable = false)
    private Integer costoDespacho;

    @Column(name = "total_final", nullable = false)
    private Integer totalFinal;

    @Column(nullable = false, length = 20)
    private String estado;

    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<DetallePedido> items = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        if (this.fechaPedido == null) {
            this.fechaPedido = LocalDateTime.now();
        }
        if (this.estado == null) {
            this.estado = "COMPLETADO"; 
        }
    }
}