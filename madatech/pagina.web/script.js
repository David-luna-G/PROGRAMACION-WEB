// ===== CONFIGURACION =====
const API_URL = 'http://localhost:3000';

// Los productos ahora vienen de la base de datos (MySQL) a traves de la API
let products = [];

let cart = [];
let currentFilter = 'all';
let searchQuery = '';
let currentUser = null;
let authToken = localStorage.getItem('madatechToken');
let purchaseHistory = [];
let isRegisterMode = false;

document.addEventListener('DOMContentLoaded', async () => {
    await cargarProductos();
    await restoreSession();
});

async function apiRequest(endpoint, options = {}) {
    const headers = { ...(options.headers || {}) };
    if (options.body) headers['Content-Type'] = 'application/json';
    if (authToken) headers.Authorization = `Bearer ${authToken}`;

    const response = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
        if (response.status === 404) {
            throw new Error('El servidor tiene una versión anterior. Detén el backend y vuelve a iniciarlo desde madatech\\backend con npm start.');
        }
        throw new Error(`La API respondió con un formato inesperado (HTTP ${response.status}). Reinicia el backend e inténtalo de nuevo.`);
    }

    const data = await response.json();
    if (!response.ok) {
        const error = new Error(data.error || 'Ocurrió un error al comunicarse con el servidor');
        error.status = response.status;
        throw error;
    }
    return data;
}

function updateAccountUI() {
    document.getElementById('userAccountBtnText').textContent = currentUser ? currentUser.name.toUpperCase() : 'CUENTA';
    document.getElementById('orderHistoryBtn').classList.toggle('hidden', !currentUser);
}

async function restoreSession() {
    if (!authToken) return;
    try {
        const result = await apiRequest('/api/auth/me');
        currentUser = result.user;
        updateAccountUI();
    } catch (error) {
        authToken = null;
        localStorage.removeItem('madatechToken');
        if (error.status !== 401) showToast(error.message, 'fa-triangle-exclamation');
    }
}

function getImageUrl(image) {
    const filename = String(image || '').trim().replace(/\\/g, '/').split('/').pop();
    return filename ? new URL(`/img/${encodeURIComponent(filename)}`, API_URL).href : '';
}

async function cargarProductos() {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '<p class="text-xs text-custom-muted col-span-full">Cargando productos...</p>';
    try {
        const res = await fetch(`${API_URL}/api/productos`);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        products = await res.json();
        applyFiltersAndSearch();
    } catch (e) {
        console.error('No se pudo conectar con la API', e);
        grid.innerHTML = '<p class="text-xs text-custom-muted col-span-full">No se pudieron cargar los productos. Revisa que el servidor esté encendido.</p>';
    }
}

function renderProducts(items) {
    const grid = document.getElementById('productsGrid');
    const emptyState = document.getElementById('emptyState');
    grid.innerHTML = '';

    if (items.length === 0) {
        emptyState.classList.remove('hidden');
        return;
    } else {
        emptyState.classList.add('hidden');
    }

    items.forEach(product => {
        const card = document.createElement('div');
        card.className = "bg-custom-card rounded-2xl border border-[#86868B]/30 overflow-hidden shadow-xs hover:border-custom-accent transition-all flex flex-col justify-between group";
        card.innerHTML = `
            <div class="relative overflow-hidden cursor-pointer bg-[#ececec] h-48" onclick="openProductDetail(${product.id})">
                <span class="absolute top-3 left-3 z-10 bg-[#131313]/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-lg border border-[#86868B]/30">${product.category}</span>
                <img src="${getImageUrl(product.image)}" alt="${product.name}" class="w-full h-full object-contain p-2 mix-blend-multiply group-hover:scale-105 transition-transform duration-500">
            </div>
            <div class="p-5 flex flex-col flex-grow justify-between space-y-4">
                <div class="space-y-2 cursor-pointer" onclick="openProductDetail(${product.id})">
                    <div class="flex items-center gap-1 text-[11px] text-amber-400 font-semibold">
                        <i class="fa-solid fa-star"></i>
                        <span>${product.rating}</span>
                        <span class="text-custom-muted font-normal">(${product.reviewsCount})</span>
                    </div>
                    <h3 class="font-bold text-white text-xs sm:text-sm line-clamp-1 group-hover:text-custom-accent transition-colors">${product.name}</h3>
                    <p class="text-custom-muted text-[11px] line-clamp-2 leading-relaxed">${product.description}</p>
                </div>
                <div class="pt-2 border-t border-[#86868B]/20 flex items-center justify-between">
                    <div>
                        <span class="text-[10px] text-custom-muted block uppercase">Precio</span>
                        <span class="text-sm font-bold text-white">$${product.price.toFixed(2)}</span>
                    </div>
                    <button onclick="addToCart(${product.id})" class="bg-custom-accent hover:bg-blue-600 text-white p-2.5 rounded-xl text-xs font-semibold shadow-xs transition-all flex items-center justify-center border border-custom-accent">
                        <i class="fa-solid fa-cart-plus"></i>
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function filterCategory(category) {
    currentFilter = category;
    document.querySelectorAll('.cat-btn').forEach(btn => {
        if (btn.textContent.toLowerCase() === category.toLowerCase() || (category === 'all' && btn.textContent === 'TODOS')) {
            btn.className = "cat-btn px-4 py-2 rounded-xl text-xs font-semibold bg-custom-accent text-white border border-custom-accent shadow-xs transition-all";
        } else {
            btn.className = "cat-btn px-4 py-2 rounded-xl text-xs font-semibold bg-custom-card text-custom-muted hover:text-white border border-[#86868B]/30 transition-all shadow-xs";
        }
    });
    applyFiltersAndSearch();
}

function handleSearch(query) {
    searchQuery = query.toLowerCase().trim();
    applyFiltersAndSearch();
}

function applyFiltersAndSearch() {
    let filtered = products;
    if (currentFilter !== 'all') {
        filtered = filtered.filter(p => p.category.toLowerCase() === currentFilter.toLowerCase());
    }
    if (searchQuery !== '') {
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(searchQuery) || 
            p.description.toLowerCase().includes(searchQuery) ||
            p.category.toLowerCase().includes(searchQuery)
        );
    }
    renderProducts(filtered);
}

function resetFilters() {
    currentFilter = 'all';
    searchQuery = '';
    document.getElementById('headerSearch').value = '';
    filterCategory('all');
}

function scrollToCatalog() {
    document.getElementById('catalogSection').scrollIntoView({ behavior: 'smooth' });
}

function switchView(viewName) {
    const storeView = document.getElementById('storeView');
    const valuePropView = document.getElementById('valuePropView');
    const detailView = document.getElementById('detailView');
    const ordersView = document.getElementById('ordersView');

    if (viewName === 'orders' && !currentUser) {
        openAuthModal();
        showToast('Inicia sesión para consultar tus compras', 'fa-triangle-exclamation');
        return;
    }

    storeView.classList.add('hidden');
    valuePropView.classList.add('hidden');
    detailView.classList.add('hidden');
    ordersView.classList.add('hidden');

    if (viewName === 'store') {
        storeView.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (viewName === 'valueProp') {
        valuePropView.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (viewName === 'detail') {
        detailView.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (viewName === 'orders') {
        ordersView.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        loadOrders();
    }
}

function openProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const container = document.getElementById('productDetailContent');
    container.innerHTML = `
        <div class="rounded-2xl overflow-hidden bg-[#ececec] border border-[#86868B]/30 h-80 lg:h-full flex items-center justify-center">
            <img src="${getImageUrl(product.image)}" alt="${product.name}" class="w-full h-full object-contain p-4 mix-blend-multiply">
        </div>
        <div class="space-y-6 flex flex-col justify-between">
            <div class="space-y-3">
                <span class="inline-block bg-custom-subtle text-custom-accent text-[10px] font-bold px-3 py-1 rounded-lg border border-[#86868B]/30">${product.category}</span>
                <h1 class="text-xl sm:text-2xl font-bold text-white">${product.name}</h1>
                <div class="flex items-center gap-2 text-xs text-amber-400 font-semibold">
                    <i class="fa-solid fa-star"></i>
                    <span>${product.rating}</span>
                    <span class="text-custom-muted font-normal">(${product.reviewsCount} valoraciones)</span>
                </div>
                <p class="text-custom-muted text-xs sm:text-sm leading-relaxed">${product.description}</p>
                <div class="pt-2">
                    <h4 class="text-white font-bold text-xs mb-2">Especificaciones técnicas:</h4>
                    <ul class="space-y-1.5 text-xs text-custom-muted">
                        ${product.specs.map(spec => `<li class="flex items-center gap-2"><i class="fa-solid fa-check text-custom-accent text-[10px]"></i> ${spec}</li>`).join('')}
                    </ul>
                </div>
            </div>
            <div class="pt-4 border-t border-[#86868B]/30 flex items-center justify-between">
                <div>
                    <span class="text-[10px] text-custom-muted block uppercase">Precio total</span>
                    <span class="text-xl font-bold text-white">$${product.price.toFixed(2)}</span>
                </div>
                <button onclick="addToCart(${product.id}); switchView('store');" class="bg-custom-accent hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl text-xs shadow-xs transition-all flex items-center gap-2 border border-custom-accent">
                    <i class="fa-solid fa-cart-plus"></i> AGREGAR AL CARRITO
                </button>
            </div>
        </div>
    `;
    switchView('detail');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartUI();
    showToast(`¡${product.name} agregado al carrito!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateQuantity(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCartUI();
    }
}

function updateCartUI() {
    const badge = document.getElementById('cartBadge');
    const itemsList = document.getElementById('cartItemsList');
    const subtotalEl = document.getElementById('cartSubtotal');

    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    badge.textContent = totalCount;
    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;

    if (cart.length === 0) {
        itemsList.innerHTML = `
            <div class="text-center py-12 space-y-3">
                <div class="w-10 h-10 bg-custom-subtle text-custom-muted rounded-full flex items-center justify-center mx-auto text-sm border border-[#86868B]/30">
                    <i class="fa-solid fa-cart-shopping"></i>
                </div>
                <p class="text-xs text-custom-muted font-medium">Tu carrito está vacío</p>
            </div>
        `;
        return;
    }

    itemsList.innerHTML = '';
    cart.forEach(item => {
        const div = document.createElement('div');
        div.className = "flex items-center gap-4 py-3";
        div.innerHTML = `
            <img src="${getImageUrl(item.image)}" alt="${item.name}" class="w-16 h-16 object-contain p-1 rounded-xl bg-white border border-[#86868B]/30">
            <div class="flex-grow space-y-1">
                <h4 class="text-xs font-bold text-white line-clamp-1">${item.name}</h4>
                <p class="text-xs font-semibold text-custom-muted">$${item.price.toFixed(2)}</p>
                <div class="flex items-center gap-2 pt-1">
                    <button onclick="updateQuantity(${item.id}, -1)" class="w-6 h-6 rounded-lg bg-custom-subtle border border-[#86868B]/30 text-white flex items-center justify-center text-xs">-</button>
                    <span class="text-xs font-bold text-white w-4 text-center">${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)" class="w-6 h-6 rounded-lg bg-custom-subtle border border-[#86868B]/30 text-white flex items-center justify-center text-xs">+</button>
                </div>
            </div>
            <button onclick="removeFromCart(${item.id})" class="text-custom-muted hover:text-red-400 p-2 transition-colors">
                <i class="fa-solid fa-trash-can text-xs"></i>
            </button>
        `;
        itemsList.appendChild(div);
    });
}

function toggleCartModal(open) {
    const modal = document.getElementById('cartModal');
    if (open) modal.classList.remove('hidden');
    else modal.classList.add('hidden');
}

function checkoutCart() {
    if (cart.length === 0) {
        showToast("Tu carrito está vacío", "fa-triangle-exclamation");
        return;
    }
    if (!currentUser) {
        toggleCartModal(false);
        openAuthModal();
        showToast('Inicia sesión para guardar tu compra', 'fa-triangle-exclamation');
        return;
    }

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const total = subtotal + (subtotal >= 1500 ? 0 : 99);
    document.getElementById('paymentTotal').textContent = `$${total.toFixed(2)}`;
    document.getElementById('paymentError').classList.add('hidden');
    toggleCardNumberField();
    toggleCartModal(false);
    document.getElementById('paymentModal').classList.remove('hidden');
}

function toggleCardNumberField() {
    const isCardPayment = document.getElementById('paymentMethod').value === 'tarjeta';
    const cardNumberField = document.getElementById('cardNumberField');
    const cardNumber = document.getElementById('cardNumber');
    cardNumberField.classList.toggle('hidden', !isCardPayment);
    cardNumber.required = isCardPayment;
    if (!isCardPayment) cardNumber.value = '';
}

function closePaymentModal() {
    document.getElementById('paymentModal').classList.add('hidden');
    if (cart.length > 0) toggleCartModal(true);
}

async function confirmCardPayment() {
    if (!currentUser || cart.length === 0) {
        document.getElementById('paymentError').textContent = 'Inicia sesión y verifica que tu carrito tenga productos.';
        document.getElementById('paymentError').classList.remove('hidden');
        return;
    }

    const confirmButton = document.getElementById('confirmCardPaymentButton');
    const paymentError = document.getElementById('paymentError');
    const street = document.getElementById('shippingStreet');
    const city = document.getElementById('shippingCity');
    const paymentMethod = document.getElementById('paymentMethod').value;
    const cardNumber = document.getElementById('cardNumber');
    if (!street.reportValidity() || !city.reportValidity()) return;
    if (paymentMethod === 'tarjeta' && !cardNumber.reportValidity()) return;

    confirmButton.disabled = true;
    confirmButton.textContent = 'Guardando compra...';
    paymentError.classList.add('hidden');
    try {
        const order = await apiRequest('/api/pedidos', {
            method: 'POST',
            body: JSON.stringify({
                metodo_pago: paymentMethod,
                numero_tarjeta: paymentMethod === 'tarjeta' ? cardNumber.value : undefined,
                direccion: {
                    calle: street.value.trim(),
                    ciudad: city.value.trim(),
                    codigo_postal: document.getElementById('shippingPostalCode').value.trim(),
                    pais: 'Mexico',
                },
                items: cart.map(item => ({ id: item.id, cantidad: item.quantity })),
            }),
        });
        cart = [];
        updateCartUI();
        document.getElementById('paymentModal').classList.add('hidden');
        street.value = '';
        city.value = '';
        document.getElementById('shippingPostalCode').value = '';
        cardNumber.value = '';
        showToast(`Compra #${order.id_pedido} guardada (simulación)`);
        switchView('orders');
    } catch (error) {
        paymentError.textContent = error.message;
        paymentError.classList.remove('hidden');
    } finally {
        confirmButton.disabled = false;
        confirmButton.textContent = 'Confirmar compra simulada';
    }
}

function openAuthModal() {
    if (currentUser) {
        if (confirm(`¿Deseas cerrar sesión de ${currentUser.name || currentUser.email}?`)) logout();
        return;
    }
    document.getElementById('authModal').classList.remove('hidden');
}

function closeAuthModal() {
    document.getElementById('authModal').classList.add('hidden');
}

function toggleAuthMode() {
    isRegisterMode = !isRegisterMode;
    const title = document.getElementById('authModalTitle');
    const nameContainer = document.getElementById('nameFieldContainer');
    const submitBtn = document.getElementById('authSubmitBtn');
    const toggleText = document.getElementById('authToggleText');
    document.getElementById('authError').classList.add('hidden');

    if (isRegisterMode) {
        title.textContent = "Crear Cuenta";
        nameContainer.classList.remove('hidden');
        document.getElementById('authName').required = true;
        submitBtn.textContent = "Registrarse";
        document.getElementById('authPassword').minLength = 8;
        document.getElementById('authPassword').autocomplete = 'new-password';
        toggleText.innerHTML = `¿Ya tienes cuenta? <button type="button" onclick="toggleAuthMode()" class="text-white font-semibold hover:underline">Inicia Sesión</button>`;
    } else {
        title.textContent = "Iniciar Sesión";
        nameContainer.classList.add('hidden');
        document.getElementById('authName').required = false;
        submitBtn.textContent = "Iniciar Sesión";
        document.getElementById('authPassword').removeAttribute('minlength');
        document.getElementById('authPassword').autocomplete = 'current-password';
        toggleText.innerHTML = `¿No tienes cuenta? <button type="button" onclick="toggleAuthMode()" class="text-white font-semibold hover:underline">Regístrate</button>`;
    }
}

async function handleAuthSubmit(event) {
    event.preventDefault();
    const errorMessage = document.getElementById('authError');
    const submitButton = document.getElementById('authSubmitBtn');
    errorMessage.classList.add('hidden');
    submitButton.disabled = true;

    try {
        const result = await apiRequest(isRegisterMode ? '/api/auth/registro' : '/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                name: document.getElementById('authName').value,
                email: document.getElementById('authEmail').value,
                password: document.getElementById('authPassword').value,
            }),
        });
        authToken = result.token;
        localStorage.setItem('madatechToken', authToken);
        currentUser = result.user;
        updateAccountUI();
        closeAuthModal();
        document.getElementById('authForm').reset();
        showToast(isRegisterMode ? 'Cuenta creada y guardada en la base de datos' : 'Sesión iniciada correctamente');
    } catch (error) {
        errorMessage.textContent = error.message;
        errorMessage.classList.remove('hidden');
    } finally {
        submitButton.disabled = false;
    }
}

async function logout() {
    try {
        await apiRequest('/api/auth/logout', { method: 'POST' });
        authToken = null;
        currentUser = null;
        localStorage.removeItem('madatechToken');
        if (isRegisterMode) toggleAuthMode();
        updateAccountUI();
        showToast('Sesión cerrada correctamente');
    } catch (error) {
        showToast(error.message, 'fa-triangle-exclamation');
    }
}

function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, character => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
    })[character]);
}

function formatOrderDate(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return 'Fecha no disponible';
    return new Intl.DateTimeFormat('es-MX', {
        dateStyle: 'medium',
        timeStyle: 'short',
        timeZone: 'America/Mexico_City',
    }).format(date);
}

function paymentMethodLabel(method) {
    const labels = {
        tarjeta: 'Tarjeta (simulación)',
        transferencia: 'Transferencia (simulación)',
        paypal: 'PayPal (simulación)',
    };
    return labels[method] || 'No especificado';
}

async function loadOrders() {
    const ordersList = document.getElementById('ordersList');
    ordersList.innerHTML = '<p class="text-sm text-custom-muted">Cargando historial...</p>';
    try {
        purchaseHistory = await apiRequest('/api/mis-pedidos');
        if (purchaseHistory.length === 0) {
            ordersList.innerHTML = '<div class="bg-custom-card border border-[#86868B]/30 rounded-2xl p-8 text-center text-sm text-custom-muted">Aún no tienes compras registradas.</div>';
            return;
        }

        ordersList.innerHTML = purchaseHistory.map(order => `
            <article class="bg-custom-card border border-[#86868B]/30 rounded-2xl p-5 sm:p-6">
                <div class="flex flex-col sm:flex-row sm:justify-between gap-3 border-b border-[#86868B]/20 pb-4">
                    <div>
                        <h2 class="font-bold text-white">Compra #${order.id}</h2>
                        <p class="text-xs text-custom-muted mt-1">Comprado: ${escapeHTML(formatOrderDate(order.purchasedAt))}</p>
                        <p class="text-xs text-custom-muted mt-1">Pago registrado: ${escapeHTML(formatOrderDate(order.paidAt))}</p>
                        <p class="text-xs text-custom-muted mt-1">Método: ${escapeHTML(paymentMethodLabel(order.paymentMethod))}${order.cardLast4 ? ` ···· ${escapeHTML(order.cardLast4)}` : ''}</p>
                    </div>
                    <div class="sm:text-right">
                        <p class="text-xs ${order.paymentStatus === 'aprobado' ? 'text-green-400' : 'text-amber-400'} font-semibold">${order.paymentStatus === 'aprobado' ? 'Pago aprobado (simulación)' : `Pago: ${escapeHTML(order.paymentStatus || 'pendiente')}`}</p>
                        <p class="text-lg font-bold text-white mt-1">$${Number(order.total).toFixed(2)}</p>
                    </div>
                </div>
                <div class="divide-y divide-[#86868B]/20">
                    ${order.items.map(item => `
                        <div class="flex items-center gap-3 py-3">
                            <img src="${item.image ? getImageUrl(item.image) : ''}" alt="${escapeHTML(item.name)}" class="w-14 h-14 object-contain p-1 rounded-xl bg-white">
                            <div class="min-w-0 flex-grow">
                                <p class="text-xs font-semibold text-white">${escapeHTML(item.name)}</p>
                                <p class="text-xs text-custom-muted mt-1">${item.quantity} × $${Number(item.price).toFixed(2)}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <button onclick="reorderPurchase(${order.id})" class="mt-3 bg-custom-accent hover:bg-blue-600 text-white px-4 py-2.5 rounded-xl text-xs font-semibold">
                    <i class="fa-solid fa-cart-plus mr-1"></i> Agregar de nuevo al carrito
                </button>
            </article>
        `).join('');
    } catch (error) {
        ordersList.innerHTML = `<p class="text-sm text-red-400">${escapeHTML(error.message)}</p>`;
    }
}

function reorderPurchase(orderId) {
    const order = purchaseHistory.find(purchase => purchase.id === orderId);
    if (!order) return;

    let addedCount = 0;
    for (const item of order.items) {
        const product = products.find(currentProduct => currentProduct.id === item.id);
        if (!product) continue;
        const cartItem = cart.find(currentItem => currentItem.id === product.id);
        if (cartItem) cartItem.quantity += item.quantity;
        else cart.push({ ...product, quantity: item.quantity });
        addedCount += item.quantity;
    }

    if (addedCount === 0) {
        showToast('Los productos de esta compra ya no están disponibles', 'fa-triangle-exclamation');
        return;
    }

    updateCartUI();
    showToast('Productos agregados de nuevo al carrito');
    toggleCartModal(true);
}

function showToast(message, iconClass = "fa-circle-check") {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    const toastIcon = document.getElementById('toastIcon');

    toastMessage.textContent = message;
    toastIcon.className = `fa-solid ${iconClass} text-custom-accent text-base`;

    toast.classList.remove('translate-y-24', 'opacity-0');
    setTimeout(() => {
        toast.classList.add('translate-y-24', 'opacity-0');
    }, 3500);
}