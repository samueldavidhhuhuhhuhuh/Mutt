// --- CONFIGURACIÓN DE PRODUCTOS ---
// Hemos añadido propiedades para manejar tus imágenes dinámicamente.
// 'imageDefault': La imagen que se ve al cargar la página.
// 'imageBase': La parte del nombre del archivo que no cambia, para poder cambiar el peso (250, 500, 1000) dinámicamente.
// 'isDynamic': Si es true, el script intentará cambiar la foto según el peso seleccionado.

const products = [
    // --- LÍNEA TABLETAS (Nombres de archivo: Mutt-Prods-BazzarBog-[Sabor]-[Peso].jpg) ---
    { 
        id: 't-pollo',
        category: 'Tabletas', 
        name: 'Tableta de Pollo', 
        flavor: 'pollo', 
        desc: 'Deliciosa tableta rica en proteína magra.',
        variants: ['250', '500', '1000'], // Quitamos la 'g' aquí para facilitar la ruta de imagen
        imageDefault: 'images/Mutt-Prods-BazzarBog-Pollo-500.jpg',
        imageBase: 'images/Mutt-Prods-BazzarBog-Pollo-',
        isDynamic: true 
    },
    { 
        id: 't-res',
        category: 'Tabletas', 
        name: 'Tableta de Res', 
        flavor: 'res', 
        desc: 'Energía pura con carne de res seleccionada.',
        variants: ['250', '500', '1000'],
        imageDefault: 'images/Mutt-Prods-BazzarBog-Res-500.jpg',
        imageBase: 'images/Mutt-Prods-BazzarBog-Res-',
        isDynamic: true 
    },
    { 
        id: 't-cerdo',
        category: 'Tabletas', 
        name: 'Tableta de Cerdo', 
        flavor: 'cerdo', 
        desc: 'Sabor irresistible y alta palatabilidad.',
        variants: ['250', '500', '1000'],
        imageDefault: 'images/Mutt-Prods-BazzarBog-Cerdo-500.jpg',
        imageBase: 'images/Mutt-Prods-BazzarBog-Cerdo-',
        isDynamic: true 
    },
    { 
        id: 't-atun',
        category: 'Tabletas', 
        name: 'Tableta de Atún', 
        flavor: 'atun', 
        desc: 'Omega 3 natural para pelaje brillante.',
        variants: ['250', '500', '1000'],
        imageDefault: 'images/Mutt-Prods-BazzarBog-Atun-500.jpg',
        imageBase: 'images/Mutt-Prods-BazzarBog-Atun-',
        isDynamic: true 
    },
    { 
        id: 't-salmon',
        category: 'Tabletas', 
        name: 'Tableta de Salmón', 
        flavor: 'salmon', 
        desc: 'Lo mejor del mar para tu mascota.',
        variants: ['250', '500', '1000'],
        imageDefault: 'images/Mutt-Prods-BazzarBog-Salmon-500.jpg',
        imageBase: 'images/Mutt-Prods-BazzarBog-Salmon-',
        isDynamic: true 
    },

    // --- LÍNEA HUELLITAS (Solo 400g - Nombres fijos) ---
    { 
        id: 'h-pollo',
        category: 'Huellitas', 
        name: 'Huellitas de Pollo', 
        flavor: 'pollo', 
        desc: 'Formas divertidas, el mismo gran sabor.',
        variants: ['400'],
        imageDefault: 'images/Mutt-Prods-BazzarBog-Huellitas-Pollo.jpg',
        isDynamic: false 
    },
    { 
        id: 'h-res',
        category: 'Huellitas', 
        name: 'Huellitas de Res', 
        flavor: 'res', 
        desc: 'Snack saludable o comida completa.',
        variants: ['400'],
        imageDefault: 'images/Mutt-Prods-BazzarBog-Huellitas-Res.jpg',
        isDynamic: false 
    },
    { 
        id: 'h-cerdo',
        category: 'Huellitas', 
        name: 'Huellitas de Cerdo', 
        flavor: 'cerdo', 
        desc: 'Premia a tu mascota con salud.',
        variants: ['400'],
        imageDefault: 'images/Mutt-Prods-BazzarBog-Huellitas-Cerdo.jpg',
        isDynamic: false 
    },

    // --- LÍNEA CANITTAS (Nombres: Mutt-Prods-BazzarBog-Canittas-[Sabor]-[Peso].jpg) ---
    { 
        id: 'c-pollo',
        category: 'Canittas', 
        name: 'Canittas de Pollo', 
        flavor: 'pollo', 
        desc: 'Textura suave, ideal para todas las edades.',
        variants: ['250', '500'],
        imageDefault: 'images/Mutt-Prods-BazzarBog-Canittas-Pollo-250.jpg',
        imageBase: 'images/Mutt-Prods-BazzarBog-Canittas-Pollo-',
        isDynamic: true 
    },
    { 
        id: 'c-res',
        category: 'Canittas', 
        name: 'Canittas de Res', 
        flavor: 'res', 
        desc: 'Nutrición balanceada en cada bocado.',
        variants: ['250', '500'],
        imageDefault: 'images/Mutt-Prods-BazzarBog-Canittas-Res-250.jpg',
        imageBase: 'images/Mutt-Prods-BazzarBog-Canittas-Res-',
        isDynamic: true 
    },

    // --- LÍNEA GATOS (Única presentación) ---
    { 
        id: 'g-banquete',
        category: 'Gatos', 
        name: 'Banquete Felino', 
        flavor: 'salmon', 
        desc: 'Especialmente formulado para gatos exigentes.',
        variants: ['250'],
        imageDefault: 'images/Mutt-Prods-BazzarBog-Gattos-BanqueteFelino-250g.jpg',
        isDynamic: false 
    },
];

const grid = document.getElementById('product-grid');

/**
 * Función principal para renderizar productos
 */
function renderProducts(filter) {
    grid.innerHTML = ''; 

    const filtered = filter === 'all' 
        ? products 
        : products.filter(p => p.category === filter);

    filtered.forEach(product => {
        // Generar opciones del select (agregamos 'g' visualmente, pero el valor es número)
        let optionsHtml = product.variants.map(v => 
            `<option value="${v}">${v}g</option>`
        ).join('');

        // Determinamos si necesitamos añadir evento de cambio de imagen
        const onSelectChange = product.isDynamic 
            ? `onchange="changeProductImage('${product.id}', '${product.imageBase}', this.value)"` 
            : '';

        const card = document.createElement('div');
        card.className = 'product-card';
        
        card.innerHTML = `
            <div class="img-placeholder">
                <span class="meat-tag tag-${product.flavor}">${product.flavor}</span>
                <img 
                    src="${product.imageDefault}" 
                    alt="${product.name}" 
                    id="img-${product.id}"
                    onerror="this.style.display='none'; this.parentElement.innerText='Imagen no encontrada'"
                >
            </div>
            <div class="card-body">
                <div>
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-desc">${product.desc}</p>
                </div>
                <div>
                    <label class="variant-label">Selecciona presentación:</label>
                    <select class="variant-select" id="select-${product.id}" ${onSelectChange}>
                        ${optionsHtml}
                    </select>
                    <button class="add-btn" onclick="addToCart('${product.name}', '${product.id}')">
                        Añadir al Carrito
                    </button>
                </div>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

/**
 * Función para cambiar la imagen dinámicamente según el peso seleccionado
 */
function changeProductImage(productId, imageBase, weight) {
    const imgElement = document.getElementById(`img-${productId}`);
    if (imgElement) {
        // Construye la nueva ruta: "images/NombreBase-250.jpg"
        const newSrc = `${imageBase}${weight}.jpg`;
        imgElement.src = newSrc;
    }
}

/**
 * Filtro de categorías
 */
function filterProducts(category) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    renderProducts(category);
}

/**
 * Simulación de Carrito
 */
function addToCart(productName, productId) {
    const select = document.getElementById(`select-${productId}`);
    const presentation = select.value + 'g'; // Añadimos la 'g' para el mensaje
    
    // Alerta simple
    alert(`¡Genial! Has añadido al carrito:\n\n${productName}\nPresentación: ${presentation}`);
    
    // Aquí podrías integrar un enlace de WhatsApp:
    // const phone = "573001234567";
    // const message = `Hola, quiero pedir ${productName} de ${presentation}`;
    // window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
}

// Carga inicial
document.addEventListener('DOMContentLoaded', () => {
    renderProducts('all');
});