-- =====================================================
-- SCRIPT DE INSERCIÓN DE DATOS (POSTGRESQL) - SONIDO VIVO
-- =====================================================

-- =====================================================
-- USUARIOS DE PRUEBA (Contraseña de prueba encriptada BCrypt: '123456')
-- =====================================================
INSERT INTO usuarios (rut, nombre, apellidos, correo, password, telefono, region, comuna, direccion, rol, estado) VALUES
('12345678-9', 'Administrador', 'General', 'admin@sonidovivo.cl', '$2a$10$e8WpE9tOqE9U1Xq7V7/Z.e9y1dZ.yv7H5A1X7.5U1zX7v7Z.e9y1d', '+56912345678', 'Región de Valparaíso', 'Viña del Mar', 'Av. Libertad 450', 'ROLE_ADMINISTRADOR', 'ACTIVO'),
('18765432-1', 'Carlos', 'Pérez', 'vendedor@sonidovivo.cl', '$2a$10$e8WpE9tOqE9U1Xq7V7/Z.e9y1dZ.yv7H5A1X7.5U1zX7v7Z.e9y1d', '+56987654321', 'Región de Valparaíso', 'Viña del Mar', 'Calle Valparaíso 123', 'ROLE_VENDEDOR', 'ACTIVO'),
('19876543-2', 'María', 'González', 'cliente@gmail.com', '$2a$10$e8WpE9tOqE9U1Xq7V7/Z.e9y1dZ.yv7H5A1X7.5U1zX7v7Z.e9y1d', '+56911223344', 'Región Metropolitana de Santiago', 'Providencia', 'Av. Providencia 1234', 'ROLE_CLIENTE', 'ACTIVO');

-- =====================================================
-- CATEGORÍAS REALES DEL CATÁLOGO
-- =====================================================
INSERT INTO categorias (id, nombre, descripcion) VALUES
(1, 'Guitarras Acústicas', 'Guitarras de cuerda de acero y nailon, electroacústicas y modelos infantiles.'),
(2, 'Guitarras Eléctricas', 'Guitarras de cuerpo sólido, semi-hollow y modelos icónicos como Stratocaster y Les Paul.'),
(3, 'Bajos Eléctricos', 'Bajos activos y pasivos de 4 cuerdas y modelos acústicos.'),
(4, 'Baterías', 'Baterías acústicas, electrónicas, platillos de latón B20 y cajas snare.'),
(5, 'Teclados y Pianos', 'Pianos digitales de 88 teclas pesadas, teclados de 61 teclas y controladores MIDI.'),
(6, 'Amplificadores', 'Amplificadores combo para guitarra, bajo y guitarra acústica.'),
(7, 'Micrófonos', 'Micrófonos dinámicos cardioides, de condensador XLR y modelos USB para streaming.'),
(8, 'Pedales de Efectos', 'Pedales de distorsión, overdrive, delay analógico, reverb y afinadores cromáticos.'),
(9, 'Accesorios', 'Cuerdas para instrumentos, púas, capotrastes, cables de plug 1/4" y soportes de piso o pared.'),
(10, 'Estudio y Grabación', 'Interfaces de audio USB, auriculares de monitoreo profesional, monitores activos y pop filters.');

SELECT setval('categorias_id_seq', (SELECT MAX(id) FROM categorias));

-- =====================================================
-- PRODUCTOS REALES (51 REFERENCIAS DEL CATÁLOGO OFICIAL)
-- =====================================================
INSERT INTO productos (codigo, nombre, marca, modelo, precio, stock, stock_critico, descripcion, imagen, categoria_id) VALUES
-- Guitarras Acústicas
('GA001', 'Guitarra Acústica Folk', 'Yamaha', 'F310', 129990, 8, 3, 'Tapa de abeto, aros y fondo de meranti. Ideal para iniciantes.', 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format&fit=crop', 1),
('GA002', 'Guitarra Acústica Dreadnought', 'Fender', 'CD-60S', 189990, 5, 2, 'Tapa de abeto macizo, brazo de caoba. Sonido cálido y proyectado.', 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format&fit=crop', 1),
('GA003', 'Guitarra Acústica Clásica 4/4', 'Yamaha', 'C40', 89990, 10, 4, 'Nailon, tapa de abeto. Ideal para estudio y flamenco.', 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format&fit=crop', 1),
('GA004', 'Guitarra Electroacústica', 'Takamine', 'GN20CE', 349990, 3, 2, 'Pickup integrado, afinador incorporado.', 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format&fit=crop', 1),
('GA005', 'Guitarra 3/4 Niños', 'Yamaha', 'JR1', 79990, 6, 2, 'Tamaño reducido para niños de 6 a 10 años.', 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format&fit=crop', 1),

-- Guitarras Eléctricas
('GE001', 'Guitarra Eléctrica Stratocaster', 'Squier', 'Affinity Strat', 249990, 5, 2, 'Cuerpo de álamo, mástil de arce, pastillas SSS.', 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=500&auto=format&fit=crop', 2),
('GE002', 'Guitarra Eléctrica Les Paul', 'Epiphone', 'Les Paul Std', 329990, 4, 2, 'Cuerpo caoba, tapa arce, pastillas humbucker.', 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=500&auto=format&fit=crop', 2),
('GE003', 'Guitarra Eléctrica SG', 'Epiphone', 'SG Standard', 319990, 3, 2, 'Cuerpo caoba, mástil caoba, 2 humbuckers.', 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=500&auto=format&fit=crop', 2),
('GE004', 'Guitarra Eléctrica Telecaster', 'Squier', 'Affinity Tele', 239990, 4, 2, 'Cuerpo álamo, clavijero vintage, 2 pastillas single.', 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=500&auto=format&fit=crop', 2),
('GE005', 'Guitarra Eléctrica Semi-hollow', 'Epiphone', 'ES-335', 549990, 2, 1, 'Semi-hueca, 2 humbuckers, ideal para jazz y blues.', 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=500&auto=format&fit=crop', 2),

-- Bajos Eléctricos
('BA001', 'Bajo Eléctrico 4 Cuerdas', 'Squier', 'Affinity PJ', 299990, 5, 2, 'Pickup PJ, cuerpo álamo, mástil arce.', 'https://images.unsplash.com/photo-1550985616-10810253b84d?w=500&auto=format&fit=crop', 3),
('BA002', 'Bajo Eléctrico Jazz Bass', 'Fender', 'Player Jazz', 699990, 2, 1, 'Alder body, 2 Alnico V Jazz single-coil.', 'https://images.unsplash.com/photo-1550985616-10810253b84d?w=500&auto=format&fit=crop', 3),
('BA003', 'Bajo Acústico 4 Cuerdas', 'Yamaha', 'APX700II', 429990, 2, 1, 'Electroacústico, afinador incorporado.', 'https://images.unsplash.com/photo-1550985616-10810253b84d?w=500&auto=format&fit=crop', 3),

-- Baterías
('BT001', 'Batería Acústica 5 piezas', 'Pearl', 'Roadshow', 599990, 2, 1, 'Incluye stands, platillos y pedal de bombo.', '[suspicious link removed]', 4),
('BT002', 'Batería Electrónica 8 pads', 'Roland', 'TD-02KV', 799990, 2, 1, 'Módulo TD-02, 8 pads de goma, pedal hi-hat.', '[suspicious link removed]', 4),
('BT003', 'Caja Snare 14"', 'Pearl', 'STE1450', 89990, 4, 2, 'Acero, 14x5", 10 tensores.', '[suspicious link removed]', 4),
('BT004', 'Platillo Hi-Hat 14"', 'Zildjian', 'A Series', 149990, 3, 1, 'Latón B20, sonido brillante y claro.', '[suspicious link removed]', 4),
('BT005', 'Platillo Crash 16"', 'Zildjian', 'A Series', 129990, 3, 1, 'Latón B20, ataque rápido.', '[suspicious link removed]', 4),

-- Teclados y Pianos
('TC001', 'Teclado Digital 61 teclas', 'Yamaha', 'PSR-E373', 249990, 4, 2, '61 teclas sensibles al tacto, 622 voces.', '[suspicious link removed]', 5),
('TC002', 'Piano Digital 88 teclas', 'Yamaha', 'P-45', 499990, 2, 1, '88 teclas pesadas, 10 voces, pedal sustain incluido.', '[suspicious link removed]', 5),
('TC003', 'Sintetizador 49 teclas', 'Arturia', 'MiniLab MKII', 129990, 5, 2, 'MIDI controller, 49 mini teclas.', '[suspicious link removed]', 5),
('TC004', 'Teclado MIDI 88 teclas', 'M-Audio', 'Hammer 88', 399990, 2, 1, '88 teclas martillo, sin sonidos propios.', '[suspicious link removed]', 5),

-- Amplificadores
('AM001', 'Amplificador Guitarra 15W', 'Fender', 'Frontman 15G', 99990, 5, 2, '15W, distorsión incorporada, entrada auxiliar.', '[suspicious link removed]', 6),
('AM002', 'Amplificador Guitarra 40W', 'Marshall', 'MG40GFX', 299990, 3, 1, '40W, 4 canales, efectos digitales integrados.', '[suspicious link removed]', 6),
('AM003', 'Amplificador Bajo 100W', 'Hartke', 'HD100', 449990, 2, 1, '100W, tweeter integrado, ecualizador de 4 bandas.', '[suspicious link removed]', 6),
('AM004', 'Amplificador Acústico 40W', 'Fishman', 'Loudbox Mini', 499990, 2, 1, '60W, 2 canales, reverb y chorus incorporados.', '[suspicious link removed]', 6),

-- Micrófonos
('MI001', 'Micrófono Dinámico Cardioide', 'Shure', 'SM58', 149990, 8, 3, 'Estándar industria para voz en vivo.', '[suspicious link removed]', 7),
('MI002', 'Micrófono Dinámico Instrumento', 'Shure', 'SM57', 139990, 6, 2, 'Ideal para captura de instrumentos y amplificadores.', '[suspicious link removed]', 7),
('MI003', 'Micrófono Condensador', 'Audio-Technica', 'AT2020', 199990, 4, 2, 'Cardioide, XLR, ideal para grabación en estudio.', '[suspicious link removed]', 7),
('MI004', 'Micrófono USB de Condensador', 'Blue', 'Yeti', 299990, 5, 2, 'USB, 4 patrones polares, ideal para streaming y podcast.', '[suspicious link removed]', 7),

-- Pedales de Efectos
('PE001', 'Pedal Distorsión', 'Boss', 'DS-1', 79990, 7, 3, 'Clásico pedal de distorsión, 3 controles.', 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=500&auto=format&fit=crop', 8),
('PE002', 'Pedal Reverb', 'Boss', 'RV-6', 179990, 4, 2, '8 modos de reverb, control de shimmer.', 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=500&auto=format&fit=crop', 8),
('PE003', 'Pedal Multi-efectos', 'Boss', 'ME-80', 349990, 2, 1, 'Diseño tipo pedalboard, 8 efectos simultáneos.', 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=500&auto=format&fit=crop', 8),
('PE004', 'Pedal Tuner Cromático', 'Boss', 'TU-3', 89990, 8, 3, 'Afinador cromático, indicador de tono.', 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=500&auto=format&fit=crop', 8),
('PE005', 'Pedal Delay', 'MXR', 'Carbon Copy', 179990, 4, 2, 'Delay analógico cálido, tiempo 600ms.', 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=500&auto=format&fit=crop', 8),
('PE006', 'Pedal Overdrive', 'Ibanez', 'TS9', 99990, 6, 2, 'Tube Screamer clásico, sonido suave y orgánico.', 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=500&auto=format&fit=crop', 8),

-- Accesorios
('AC001', 'Cuerdas Guitarra Eléctrica 09-42', 'Ernie Ball', 'Super Slinky', 8990, 25, 5, 'Juego 6 cuerdas, calibre ligero.', 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format&fit=crop', 9),
('AC002', 'Cuerdas Guitarra Acústica 12-53', 'Ernie Ball', 'Earthwood', 10990, 20, 5, 'Bronce fósforo, sonido cálido.', 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format&fit=crop', 9),
('AC003', 'Cuerdas Bajo 45-105', 'Ernie Ball', 'Regular Slinky', 14990, 12, 3, 'Cuerdas de níquel enrollado, set 4 cuerdas.', 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format&fit=crop', 9),
('AC004', 'Púas de Guitarra x10 (0.73mm)', 'Fender', '351', 3990, 50, 10, 'Celulosa, grosor medio.', 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format&fit=crop', 9),
('AC005', 'Capotraste Guitarra', 'Dunlop', 'Trigger', 12990, 15, 4, 'Capotraste de resorte, compatible 6 cuerdas.', 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format&fit=crop', 9),
('AC006', 'Afinador de Clip', 'Snark', 'SN-5', 8990, 20, 5, 'Afinador cromático de clip, pantalla giratoria.', 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format&fit=crop', 9),
('AC007', 'Cable Instrumento 3m', 'Monster', 'S100-I-3', 12990, 15, 4, 'Cable trenzado, conectores dorados, 3 metros.', 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format&fit=crop', 9),
('AC008', 'Cable Instrumento 6m', 'Monster', 'S100-I-6', 17990, 10, 3, 'Cable trenzado, conectores dorados, 6 metros.', 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format&fit=crop', 9),
('AC009', 'Soporte Guitarra de Piso', 'Hercules', 'GS302B', 22990, 12, 3, 'Soporte plegable con enganche automático.', 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format&fit=crop', 9),
('AC010', 'Soporte Guitarra de Pared', 'Hercules', 'WAH-202', 18990, 10, 3, 'Montaje a pared, enganche automático.', 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format&fit=crop', 9),

-- Estudio y Grabación
('ES001', 'Interfaz de Audio 2x2 USB', 'Focusrite', 'Scarlett Solo', 149990, 4, 2, '1 entrada XLR+instrumento, 2 salidas, 24bit/192kHz.', '[suspicious link removed]', 10),
('ES002', 'Auriculares de Estudio', 'Audio-Technica', 'ATH-M20x', 79990, 6, 2, 'Circumaurales, respuesta 15Hz-20kHz.', '[suspicious link removed]', 10),
('ES003', 'Auriculares de Estudio Pro', 'Audio-Technica', 'ATH-M50x', 219990, 4, 2, 'Referencia de industria, sonido neutro y detallado.', '[suspicious link removed]', 10),
('ES004', 'Monitor de Estudio 5"', 'Yamaha', 'HS5', 349990, 2, 1, 'Altavoz activo, respuesta plana, ideal mezcla.', '[suspicious link removed]', 10),
('ES005', 'Pop Filter para Micrófono', 'Sennheiser', 'MZP 40', 14990, 8, 2, 'Doble malla, brazo flexible con clip.', '[suspicious link removed]', 10);

-- =====================================================
-- PEDIDOS Y DESPACHOS DE PRUEBA
-- =====================================================
INSERT INTO pedidos (numero_orden, fecha_pedido, usuario_id, nombre_cliente, apellidos_cliente, rut_cliente, correo_cliente, telefono_cliente, region_envio, comuna_envio, direccion_envio, departamento_envio, metodo_despacho, medio_pago, notas, subtotal, costo_despacho, total_final, estado) VALUES
('SV-84920', CURRENT_TIMESTAMP - INTERVAL '2 days', 3, 'María', 'González', '19876543-2', 'cliente@gmail.com', '+56911223344', 'Región Metropolitana de Santiago', 'Providencia', 'Av. Providencia 1234', 'Depto 502', 'domicilio', 'tarjeta', 'Entregar en conserjería', 249990, 4990, 254980, 'COMPLETADO'),
('SV-91204', CURRENT_TIMESTAMP - INTERVAL '1 day', NULL, 'Juan', 'Tapia', '15432987-6', 'jtapia@empresa.cl', '+56955443322', 'Región de Valparaíso', 'Viña del Mar', 'Calle Alvarez 890', '', 'retiro', 'transferencia', 'Retira el titular con carnet', 149990, 0, 149990, 'COMPLETADO');

-- =====================================================
-- DETALLES DE PEDIDO
-- =====================================================
INSERT INTO detalles_pedido (pedido_id, producto_id, codigo_producto, nombre_producto, precio_unitario, cantidad, subtotal) VALUES
(1, (SELECT id FROM productos WHERE codigo = 'GE001'), 'GE001', 'Guitarra Eléctrica Stratocaster', 249990, 1, 249990),
(2, (SELECT id FROM productos WHERE codigo = 'MI001'), 'MI001', 'Micrófono Dinámico Cardioide', 149990, 1, 149990);

-- =====================================================
-- MENSAJES DE CONTACTO
-- =====================================================
INSERT INTO mensajes_contacto (nombre, correo, asunto, mensaje, fecha_envio, leido) VALUES
('Pedro Alvarado', 'palvarado@gmail.com', 'Consulta por disponibilidad', 'Hola, quisiera saber si llegarán más unidades del teclado Yamaha PSR-E373.', CURRENT_TIMESTAMP - INTERVAL '3 hours', FALSE),
('Lucía Fernandez', 'lfernandez@outlook.com', 'Servicio Técnico', 'Buenas tardes, realizan calibración de guitarras electroacústicas en su tienda de Providencia?', CURRENT_TIMESTAMP - INTERVAL '1 day', TRUE);