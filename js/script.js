// --- Datos de los Productos ---
// Aquí puedes agregar más productos y categorías
const products = [
    { id: 'coca', name: 'Coca-Cola 2.25L', image: 'https://falconfresh.com/media/catalog/product/cache/0e405ab110ef006cccff6c2150b91e32/3/5/3532_3nd.jpg', priceDetal: 1200, priceMayor: 1000, category: 'bebidas' },
    { id: 'pepsi', name: 'Pepsi 2.25L', image: 'https://www.casa-segal.com/wp-content/uploads/2020/08/pepsi-2-25-supermercado-casa-segal-mendoza.jpg', priceDetal: 1150, priceMayor: 950, category: 'bebidas' },
    { id: 'manaos', name: 'Manaos Cola 2.25L', image: 'https://file.nubing.com.ar/product/6e757326-6ffe-43fe-8cd7-032dd9951b63_FULL.jpg', priceDetal: 800, priceMayor: 650, category: 'bebidas' },
    { id: 'galleta-choc', name: 'Galletitas Chocolate', image: 'https://distribuidorafresh.com.ar/wp-content/uploads/2024/01/CHIPSDECHOCOLATE.webp', priceDetal: 450, priceMayor: 380, category: 'galletitas' },
    { id: 'galleta-vain', name: 'Galletitas Vainilla', image: 'https://dcdn-us.mitiendanube.com/stores/001/151/835/products/77906281026841-d97c467b78cacde5ba15982919398153-1024-1024.jpg', priceDetal: 400, priceMayor: 350, category: 'galletitas' },
    { id: 'cerveza', name: 'Cerveza Quilmes Litro', image: 'https://static.wixstatic.com/media/d2b1c5_252fb740d86f4fee93b9d1e907648a7f~mv2_d_1728_1928_s_2.png/v1/fill/w_480,h_536,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/d2b1c5_252fb740d86f4fee93b9d1e907648a7f~mv2_d_1728_1928_s_2.png', priceDetal: 1500, priceMayor: 1300, category: 'alcohol' },
    { id: 'vino', name: 'Vino Tinto 750ml', image: 'https://ardiaprod.vtexassets.com/arquivos/ids/320321/Vino-Tinto-Seleccion-Toro-Clasico-750-Ml-_1.jpg?v=638599515980800000', priceDetal: 2500, priceMayor: 2200, category: 'alcohol' },
    { id: 'atun', name: 'Atún en Lata 170g', image: 'https://statics.dinoonline.com.ar/imagenes/full_600x600_ma/2400049_f.jpg', priceDetal: 900, priceMayor: 780, category: 'enlatados' },
    { id: 'arvejas', name: 'Arvejas en Lata 300g', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkA87ownqkcwoazTLq2BpCnvuLI7aPk81bCg&s', priceDetal: 600, priceMayor: 500, category: 'enlatados' },
];

// --- Configuración de WhatsApp ---
// REEMPLAZA ESTE NÚMERO con el número de WhatsApp de tu negocio (incluye código de país y área, sin '+' ni '00')
// Ej: '5491112345678' para Argentina (54), Buenos Aires (911), y un número (12345678)
const WHATSAPP_NUMBER = '5491136013353'; // EJEMPLO: Reemplaza con tu número real

// --- Estado del Carrito ---
let cart = []; // Almacena { productId, name, quantity, pricePerUnit, typePrice }

// --- Elementos del DOM ---
// Obtenemos referencias a los elementos HTML por su ID para poder manipularlos con JavaScript.
const productListDiv = document.getElementById('product-list');
const cartItemsDiv = document.getElementById('cart-items');
const cartTotalSpan = document.getElementById('cart-total');
const emptyCartMessage = document.getElementById('empty-cart-message');
const clientNameInput = document.getElementById('client-name');
const clientAddressInput = document.getElementById('client-address');
const orderNotesInput = document.getElementById('order-notes');

// --- Funciones del Carrito ---

/**
 * Renderiza los productos en la interfaz, opcionalmente filtrando por categoría.
 * @param {string} filteredCategory - La categoría por la que filtrar ('all' para mostrar todos).
 */
function renderProducts(filteredCategory = 'all') {
    productListDiv.innerHTML = ''; // Limpiamos la lista actual de productos para volver a renderizarla.

    // Determinamos qué productos mostrar: todos o solo los de la categoría seleccionada.
    const productsToDisplay = filteredCategory === 'all'
        ? products
        : products.filter(p => p.category === filteredCategory);

    // Iteramos sobre los productos a mostrar y creamos una tarjeta HTML para cada uno.
    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        // Asignamos clases de Tailwind para el estilo de la tarjeta del producto.
        productCard.className = 'bg-white rounded-xl shadow-md p-4 flex flex-col items-center border border-gray-200 hover:shadow-lg transition-shadow';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="w-28 h-28 object-cover rounded-lg mb-3 border border-gray-100">
            <h3 class="text-lg font-semibold text-gray-800 text-center mb-2">${product.name}</h3>
            <div class="flex gap-4 mb-3">
                <div class="text-center">
                    <p class="text-gray-600 text-sm">Detal</p>
                    <p class="text-blue-600 font-bold">$${product.priceDetal}</p>
                </div>
                <div class="text-center">
                    <p class="text-gray-600 text-sm">Mayor</p>
                    <p class="text-purple-600 font-bold">$${product.priceMayor}</p>
                </div>
            </div>
            <div class="flex items-center gap-2 mb-4 w-full justify-center">
                <label for="qty-${product.id}" class="sr-only">Cantidad</label>
                <input type="number" id="qty-${product.id}" min="1" value="1"
                       class="w-16 px-2 py-1 border border-gray-300 rounded-md text-center text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500">
                <select id="price-type-${product.id}" class="px-2 py-1 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <option value="detal">Detal</option>
                    <option value="mayor">Mayor</option>
                </select>
            </div>
            <button onclick="addProductToCart('${product.id}')"
                    class="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors shadow">
                Agregar al Pedido
            </button>
        `;
        productListDiv.appendChild(productCard); // Añadimos la tarjeta al contenedor de productos.
    });
    updateCategoryButtonStyles(filteredCategory); // Actualizamos los estilos de los botones de categoría.
}

/**
 * Filtra los productos visibles por la categoría seleccionada.
 * @param {string} category - La categoría a filtrar.
 */
function filterProducts(category) {
    renderProducts(category); // Volvemos a renderizar los productos, pero esta vez filtrados.
}

/**
 * Actualiza los estilos de los botones de categoría para resaltar la categoría activa.
 * @param {string} activeCategory - La categoría que está activa.
 */
function updateCategoryButtonStyles(activeCategory) {
    const buttons = document.querySelectorAll('.category-btn'); // Obtenemos todos los botones de categoría.
    buttons.forEach(button => {
        // Verificamos si el botón corresponde a la categoría activa.
        if (button.onclick.toString().includes(`'${activeCategory}'`)) {
            // Si es la categoría activa, le damos el estilo de botón primario (azul).
            button.classList.remove('bg-gray-200', 'text-gray-800');
            button.classList.add('bg-blue-600', 'text-white');
        } else {
            // Si no es la categoría activa, le damos el estilo de botón secundario (gris).
            button.classList.remove('bg-blue-600', 'text-white');
            button.classList.add('bg-gray-200', 'text-gray-800');
        }
    });
}

/**
 * Agrega un producto al carrito de compras o actualiza su cantidad si ya existe.
 * @param {string} productId - El ID del producto a agregar.
 */
function addProductToCart(productId) {
    const product = products.find(p => p.id === productId); // Buscamos el producto en la lista de productos.
    if (!product) return; // Si no se encuentra el producto, salimos de la función.

    // Obtenemos la cantidad y el tipo de precio seleccionados por el usuario.
    const quantityInput = document.getElementById(`qty-${productId}`);
    const priceTypeSelect = document.getElementById(`price-type-${productId}`);
    const quantity = parseInt(quantityInput.value); // Convertimos la cantidad a un número entero.
    const priceType = priceTypeSelect.value;
    // Determinamos el precio por unidad según si es mayorista o minorista.
    const pricePerUnit = priceType === 'mayor' ? product.priceMayor : product.priceDetal;

    // Validamos que la cantidad sea un número válido y mayor que cero.
    if (isNaN(quantity) || quantity <= 0) {
        alert("Por favor, ingresa una cantidad válida (mayor a 0).");
        return;
    }

    // Buscamos si el producto ya existe en el carrito con el mismo tipo de precio.
    const existingItemIndex = cart.findIndex(item => item.productId === productId && item.typePrice === priceType);

    if (existingItemIndex > -1) {
        // Si el producto ya existe, solo actualizamos su cantidad.
        cart[existingItemIndex].quantity += quantity;
    } else {
        // Si el producto no existe, lo agregamos como un nuevo ítem al carrito.
        cart.push({
            productId: product.id,
            name: product.name,
            quantity: quantity,
            pricePerUnit: pricePerUnit,
            typePrice: priceType
        });
    }
    updateCartDisplay(); // Actualizamos la visualización del carrito.
}

/**
 * Actualiza la visualización del carrito de compras y el total.
 */
function updateCartDisplay() {
    cartItemsDiv.innerHTML = ''; // Limpiamos la lista de ítems del carrito.
    let total = 0; // Inicializamos el total del carrito.

    // Mostramos u ocultamos el mensaje de "carrito vacío" según el contenido del carrito.
    if (cart.length === 0) {
        emptyCartMessage.classList.remove('hidden');
        cartTotalSpan.textContent = '$0.00';
        return;
    } else {
        emptyCartMessage.classList.add('hidden');
    }

    // Iteramos sobre cada ítem en el carrito para mostrarlo y calcular el total.
    cart.forEach(item => {
        const itemTotal = item.quantity * item.pricePerUnit;
        total += itemTotal; // Sumamos al total general.

        const cartItemDiv = document.createElement('div');
        // Asignamos clases de Tailwind para el estilo del ítem del carrito.
        cartItemDiv.className = 'flex justify-between items-center bg-gray-50 p-3 rounded-lg mb-2 shadow-sm border border-gray-200';
        cartItemDiv.innerHTML = `
            <div class="flex-1">
                <p class="font-medium text-gray-800">${item.name} (${item.typePrice === 'mayor' ? 'Mayor' : 'Detal'})</p>
                <p class="text-sm text-gray-600">$${item.pricePerUnit} x ${item.quantity} = $${itemTotal.toLocaleString('es-AR')}</p>
            </div>
            <button onclick="removeFromCart('${item.productId}', '${item.typePrice}')"
                    class="ml-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold hover:bg-red-600 transition-colors">
                X
            </button>
        `;
        cartItemsDiv.appendChild(cartItemDiv); // Añadimos el ítem al contenedor del carrito.
    });
    // Actualizamos el texto del total del carrito, formateado como moneda.
    cartTotalSpan.textContent = `$${total.toLocaleString('es-AR')}`;
}

/**
 * Elimina un producto específico del carrito de compras.
 * @param {string} productId - El ID del producto a eliminar.
 * @param {string} priceType - El tipo de precio (detal/mayor) para identificar el ítem único.
 */
function removeFromCart(productId, priceType) {
    // Filtramos el carrito para remover el ítem que coincide con el ID y el tipo de precio.
    cart = cart.filter(item => !(item.productId === productId && item.typePrice === priceType));
    updateCartDisplay(); // Actualizamos la visualización del carrito después de eliminar.
}

// --- Función para Enviar Pedido a WhatsApp ---
/**
 * Genera el mensaje del pedido y redirige al usuario a WhatsApp con el mensaje pre-llenado.
 */
function sendOrderToWhatsApp() {
    // Validamos que el carrito no esté vacío.
    if (cart.length === 0) {
        alert("Tu carrito está vacío. Por favor, agrega productos antes de enviar el pedido.");
        return;
    }

    // Obtenemos los datos del cliente y notas adicionales.
    const clientName = clientNameInput.value.trim();
    const clientAddress = clientAddressInput.value.trim();
    const orderNotes = orderNotesInput.value.trim();

    // Validamos que el nombre y la dirección del cliente estén completos.
    if (!clientName || !clientAddress) {
        alert("Por favor, completa tu nombre y dirección para el pedido.");
        return;
    }

    // Construimos el mensaje que se enviará por WhatsApp.
    // Usamos asteriscos para negritas en WhatsApp y saltos de línea para un formato legible.
    let message = `*¡Hola! Soy ${clientName}.*\n`;
    message += `_Quiero hacer el siguiente pedido:_\n\n`;

    let total = 0;
    // Recorremos los ítems del carrito para agregarlos al mensaje.
    cart.forEach(item => {
        const itemTotal = item.quantity * item.pricePerUnit;
        total += itemTotal;
        message += `* ${item.name} (${item.typePrice === 'mayor' ? 'Mayor' : 'Detal'}) x${item.quantity} = $${itemTotal.toLocaleString('es-AR')}\n`;
    });

    message += `\n*Total a pagar: $${total.toLocaleString('es-AR')}*\n`;
    message += `\n*Datos de Envío:*\n`;
    message += `  *Nombre:* ${clientName}\n`;
    message += `  *Dirección:* ${clientAddress}\n`;

    // Añadimos las notas adicionales si existen.
    if (orderNotes) {
        message += `  *Notas Adicionales:* ${orderNotes}\n`;
    }

    message += `\n_¡Gracias!_`;

    // Codificamos el mensaje para que sea una parte válida de la URL.
    const encodedMessage = encodeURIComponent(message);
    // Construimos la URL completa de WhatsApp.
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Abrimos la URL de WhatsApp en una nueva pestaña del navegador.
    window.open(whatsappUrl, '_blank');

    // Mostramos una alerta al usuario indicando que su pedido está listo para enviar.
    // En un sistema real, aquí iría una llamada al backend para guardar el pedido en la base de datos
    // ANTES de redirigir a WhatsApp.
    alert("Tu pedido está listo para ser enviado por WhatsApp. Revisa la ventana que se abrió para confirmar el envío.");

    // Opcional: Puedes descomentar las siguientes líneas si quieres limpiar el carrito y el formulario
    // inmediatamente después de que el usuario "envía" el pedido por WhatsApp.
    // cart = [];
    // updateCartDisplay();
    // clientNameInput.value = '';
    // clientAddressInput.value = '';
    // orderNotesInput.value = '';
}

// --- Inicialización ---
// Nos aseguramos de que el DOM esté completamente cargado antes de ejecutar el script.
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(); // Cargamos todos los productos en la interfaz al iniciar.
    updateCartDisplay(); // Inicializamos la visualización del carrito (mostrará "vacío").
});
