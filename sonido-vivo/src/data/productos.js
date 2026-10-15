const STORAGE_KEY_PRODUCTOS = "sonidoVivo_productos";

// Catálogo extraído directamente de la base de datos oficial de Sonido Vivo
export const productosIniciales = [
    // Guitarras Acústicas
    {
        codigo: "GA001",
        categoria: "Guitarras Acústicas",
        nombre: "Guitarra Acústica Folk",
        marca: "Yamaha",
        modelo: "F310",
        stock: 8,
        stockCritico: 3,
        precio: 129990,
        descripcion: "Tapa de abeto, aros y fondo de meranti. Ideal para iniciantes.",
        imagen: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format&fit=crop"
    },
    {
        codigo: "GA002",
        categoria: "Guitarras Acústicas",
        nombre: "Guitarra Acústica Dreadnought",
        marca: "Fender",
        modelo: "CD-60S",
        stock: 5,
        stockCritico: 2,
        precio: 189990,
        descripcion: "Tapa de abeto macizo, brazo de caoba. Sonido cálido y proyectado.",
        imagen: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format&fit=crop"
    },
    {
        codigo: "GA003",
        categoria: "Guitarras Acústicas",
        nombre: "Guitarra Acústica Clásica 4/4",
        marca: "Yamaha",
        modelo: "C40",
        stock: 10,
        stockCritico: 4,
        precio: 89990,
        descripcion: "Nailon, tapa de abeto. Ideal para estudio y flamenco.",
        imagen: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format&fit=crop"
    },

    // Guitarras Eléctricas
    {
        codigo: "GE001",
        categoria: "Guitarras Eléctricas",
        nombre: "Guitarra Eléctrica Stratocaster",
        marca: "Squier",
        modelo: "Affinity Strat",
        stock: 5,
        stockCritico: 2,
        precio: 249990,
        descripcion: "Cuerpo de álamo, mástil de arce, pastillas SSS.",
        imagen: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=500&auto=format&fit=crop"
    },
    {
        codigo: "GE002",
        categoria: "Guitarras Eléctricas",
        nombre: "Guitarra Eléctrica Les Paul",
        marca: "Epiphone",
        modelo: "Les Paul Std",
        stock: 4,
        stockCritico: 2,
        precio: 329990,
        descripcion: "Cuerpo caoba, tapa arce, pastillas humbucker.",
        imagen: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=500&auto=format&fit=crop"
    },

    // Bajos Eléctricos
    {
        codigo: "BA001",
        categoria: "Bajos Eléctricos",
        nombre: "Bajo Eléctrico 4 Cuerdas",
        marca: "Squier",
        modelo: "Affinity PJ",
        stock: 5,
        stockCritico: 2,
        precio: 299990,
        descripcion: "Pickup PJ, cuerpo álamo, mástil arce.",
        imagen: "https://images.unsplash.com/photo-1550985616-10810253b84d?w=500&auto=format&fit=crop"
    },
    {
        codigo: "BA002",
        categoria: "Bajos Eléctricos",
        nombre: "Bajo Eléctrico Jazz Bass",
        marca: "Fender",
        modelo: "Player Jazz",
        stock: 2,
        stockCritico: 2,
        precio: 699990,
        descripcion: "Alder body, 2 Alnico V Jazz single-coil.",
        imagen: "https://images.unsplash.com/photo-1550985616-10810253b84d?w=500&auto=format&fit=crop"
    },

    // Baterías
    {
        codigo: "BT001",
        categoria: "Baterías",
        nombre: "Batería Acústica 5 piezas",
        marca: "Pearl",
        modelo: "Roadshow",
        stock: 2,
        stockCritico: 1,
        precio: 599990,
        descripcion: "Incluye stands, platillos y pedal de bombo.",
        imagen: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=500&auto=format&fit=crop"
    },
    {
        codigo: "BT002",
        categoria: "Baterías",
        nombre: "Batería Electrónica 8 pads",
        marca: "Roland",
        modelo: "TD-02KV",
        stock: 2,
        stockCritico: 1,
        precio: 799990,
        descripcion: "Módulo TD-02, 8 pads de goma, pedal hi-hat.",
        imagen: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=500&auto=format&fit=crop"
    },

    // Teclados y Pianos
    {
        codigo: "TC001",
        categoria: "Teclados y Pianos",
        nombre: "Teclado Digital 61 teclas",
        marca: "Yamaha",
        modelo: "PSR-E373",
        stock: 4,
        stockCritico: 2,
        precio: 249990,
        descripcion: "61 teclas sensibles al tacto, 622 voces.",
        imagen: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=500&auto=format&fit=crop"
    },
    {
        codigo: "TC002",
        categoria: "Teclados y Pianos",
        nombre: "Piano Digital 88 teclas",
        marca: "Yamaha",
        modelo: "P-45",
        stock: 2,
        stockCritico: 1,
        precio: 499990,
        descripcion: "88 teclas pesadas, 10 voces, pedal sustain incluido.",
        imagen: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=500&auto=format&fit=crop"
    },

    // Amplificadores
    {
        codigo: "AM001",
        categoria: "Amplificadores",
        nombre: "Amplificador Guitarra 15W",
        marca: "Fender",
        modelo: "Frontman 15G",
        stock: 5,
        stockCritico: 2,
        precio: 99990,
        descripcion: "15W, distorsión incorporada, entrada auxiliar.",
        imagen: "https://images.unsplash.com/photo-1558098329-a11cff621064?w=500&auto=format&fit=crop"
    },
    {
        codigo: "AM002",
        categoria: "Amplificadores",
        nombre: "Amplificador Guitarra 40W",
        marca: "Marshall",
        modelo: "MG40GFX",
        stock: 3,
        stockCritico: 1,
        precio: 299990,
        descripcion: "40W, 4 canales, efectos digitales integrados.",
        imagen: "https://images.unsplash.com/photo-1558098329-a11cff621064?w=500&auto=format&fit=crop"
    },

    // Micrófonos
    {
        codigo: "MI001",
        categoria: "Micrófonos",
        nombre: "Micrófono Dinámico Cardioide",
        marca: "Shure",
        modelo: "SM58",
        stock: 8,
        stockCritico: 3,
        precio: 149990,
        descripcion: "Estándar industria para voz en vivo.",
        imagen: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500&auto=format&fit=crop"
    },
    {
        codigo: "MI003",
        categoria: "Micrófonos",
        nombre: "Micrófono Condensador",
        marca: "Audio-Technica",
        modelo: "AT2020",
        stock: 4,
        stockCritico: 2,
        precio: 199990,
        descripcion: "Cardioide, XLR, ideal para grabación en estudio.",
        imagen: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500&auto=format&fit=crop"
    },

    // Pedales de Efectos
    {
        codigo: "PE001",
        categoria: "Pedales de Efectos",
        nombre: "Pedal Distorsión",
        marca: "Boss",
        modelo: "DS-1",
        stock: 7,
        stockCritico: 3,
        precio: 79990,
        descripcion: "Clásico pedal de distorsión, 3 controles.",
        imagen: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=500&auto=format&fit=crop"
    },
    {
        codigo: "PE002",
        categoria: "Pedales de Efectos",
        nombre: "Pedal Reverb",
        marca: "Boss",
        modelo: "RV-6",
        stock: 4,
        stockCritico: 2,
        precio: 179990,
        descripcion: "8 modos de reverb, control de shimmer.",
        imagen: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=500&auto=format&fit=crop"
    },

    // Accesorios
    {
        codigo: "AC001",
        categoria: "Accesorios",
        nombre: "Cuerdas Guitarra Eléctrica 09-42",
        marca: "Ernie Ball",
        modelo: "Super Slinky",
        stock: 25,
        stockCritico: 10,
        precio: 8990,
        descripcion: "Juego 6 cuerdas, calibre ligero.",
        imagen: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format&fit=crop"
    },
    {
        codigo: "AC004",
        categoria: "Accesorios",
        nombre: "Púas de Guitarra x10 (0.73mm)",
        marca: "Fender",
        modelo: "351",
        stock: 50,
        stockCritico: 15,
        precio: 3990,
        descripcion: "Celulosa, grosor medio.",
        imagen: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format&fit=crop"
    },

    // Estudio y Grabación
    {
        codigo: "ES001",
        categoria: "Estudio y Grabación",
        nombre: "Interfaz de Audio 2x2 USB",
        marca: "Focusrite",
        modelo: "Scarlett Solo",
        stock: 4,
        stockCritico: 2,
        precio: 149990,
        descripcion: "1 entrada XLR+instrumento, 2 salidas, 24bit/192kHz.",
        imagen: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500&auto=format&fit=crop"
    },
    {
        codigo: "ES003",
        categoria: "Estudio y Grabación",
        nombre: "Auriculares de Estudio Pro",
        marca: "Audio-Technica",
        modelo: "ATH-M50x",
        stock: 4,
        stockCritico: 2,
        precio: 219990,
        descripcion: "Referencia de industria, sonido neutro y detallado.",
        imagen: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500&auto=format&fit=crop"
    }
];

// --- FUNCIONES DE PERSISTENCIA Y CRUD SIMULADO ---

// Cargar catálogo desde localStorage o inicializarlo si es la primera vez
export function obtenerProductos() {
    try {
        const guardados = localStorage.getItem(STORAGE_KEY_PRODUCTOS);
        if (!guardados) {
            localStorage.setItem(STORAGE_KEY_PRODUCTOS, JSON.stringify(productosIniciales));
            return productosIniciales;
        }
        return JSON.parse(guardados);
    } catch (error) {
        console.error("Error al obtener productos:", error);
        return productosIniciales;
    }
}

// Guardar el arreglo completo en localStorage
export function guardarProductos(productos) {
    localStorage.setItem(STORAGE_KEY_PRODUCTOS, JSON.stringify(productos));
}

// READ: Obtener un solo producto por código
export function obtenerProductoPorCodigo(codigo) {
    const productos = obtenerProductos();
    return productos.find((p) => p.codigo === codigo) || null;
}

// CREATE: Agregar un nuevo producto al catálogo
export function crearProducto(nuevoProducto) {
    const productos = obtenerProductos();
    const existe = productos.some((p) => p.codigo === nuevoProducto.codigo);
    if (existe) {
        throw new Error(`El producto con código ${nuevoProducto.codigo} ya existe.`);
    }
    const listaActualizada = [...productos, nuevoProducto];
    guardarProductos(listaActualizada);
    return listaActualizada;
}

// UPDATE: Modificar datos de un producto existente
export function actualizarProducto(codigo, datosActualizados) {
    const productos = obtenerProductos();
    const listaActualizada = productos.map((p) =>
        p.codigo === codigo ? { ...p, ...datosActualizados } : p
    );
    guardarProductos(listaActualizada);
    return listaActualizada;
}

// DELETE: Eliminar un producto por código
export function eliminarProducto(codigo) {
    const productos = obtenerProductos();
    const listaActualizada = productos.filter((p) => p.codigo !== codigo);
    guardarProductos(listaActualizada);
    return listaActualizada;
}

// OBTENER CATEGORÍAS ÚNICAS
export function obtenerCategorias() {
    const productos = obtenerProductos();
    const categorias = productos.map((p) => p.categoria);
    return [...new Set(categorias)];
}