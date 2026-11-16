-- =====================================================
-- SCRIPT DE CREACIÓN DE TABLAS (POSTGRESQL) - SONIDO VIVO
-- =====================================================

DROP TABLE IF EXISTS mensajes_contacto CASCADE;
DROP TABLE IF EXISTS detalles_pedido CASCADE;
DROP TABLE IF EXISTS pedidos CASCADE;
DROP TABLE IF EXISTS productos CASCADE;
DROP TABLE IF EXISTS categorias CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;

-- =====================================================
-- USUARIOS
-- =====================================================
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    rut VARCHAR(15) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    correo VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    region VARCHAR(100),
    comuna VARCHAR(100),
    direccion VARCHAR(255),
    rol VARCHAR(30) NOT NULL DEFAULT 'ROLE_CLIENTE',
    estado VARCHAR(20) NOT NULL DEFAULT 'ACTIVO',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- CATEGORIAS (sin subcategoria)
-- =====================================================
CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL,
    descripcion TEXT
);

-- =====================================================
-- PRODUCTOS
-- =====================================================
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(20) UNIQUE NOT NULL,
    nombre VARCHAR(150) NOT NULL,
    marca VARCHAR(100),
    modelo VARCHAR(100),
    precio INTEGER NOT NULL,
    stock INTEGER NOT NULL,
    stock_critico INTEGER NOT NULL DEFAULT 2,
    descripcion TEXT,
    imagen VARCHAR(500),
    categoria_id INTEGER NOT NULL,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE RESTRICT
);

-- =====================================================
-- PEDIDOS / DESPACHOS
-- =====================================================
CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    numero_orden VARCHAR(30) UNIQUE NOT NULL,
    fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usuario_id INTEGER,
    nombre_cliente VARCHAR(100) NOT NULL,
    apellidos_cliente VARCHAR(100) NOT NULL,
    rut_cliente VARCHAR(15) NOT NULL,
    correo_cliente VARCHAR(150) NOT NULL,
    telefono_cliente VARCHAR(20) NOT NULL,
    region_envio VARCHAR(100) NOT NULL,
    comuna_envio VARCHAR(100) NOT NULL,
    direccion_envio VARCHAR(255) NOT NULL,
    departamento_envio VARCHAR(50),
    metodo_despacho VARCHAR(30) NOT NULL,
    medio_pago VARCHAR(30) NOT NULL,
    notas TEXT,
    subtotal INTEGER NOT NULL,
    costo_despacho INTEGER NOT NULL,
    total_final INTEGER NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'COMPLETADO',
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL
);

-- =====================================================
-- DETALLES DE PEDIDO
-- =====================================================
CREATE TABLE detalles_pedido (
    id SERIAL PRIMARY KEY,
    pedido_id INTEGER NOT NULL,
    producto_id INTEGER,
    codigo_producto VARCHAR(20) NOT NULL,
    nombre_producto VARCHAR(150) NOT NULL,
    precio_unitario INTEGER NOT NULL,
    cantidad INTEGER NOT NULL,
    subtotal INTEGER NOT NULL,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE SET NULL
);

-- =====================================================
-- MENSAJES DE CONTACTO
-- =====================================================
CREATE TABLE mensajes_contacto (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(150) NOT NULL,
    asunto VARCHAR(150) NOT NULL,
    mensaje TEXT NOT NULL,
    fecha_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    leido BOOLEAN DEFAULT FALSE
);
