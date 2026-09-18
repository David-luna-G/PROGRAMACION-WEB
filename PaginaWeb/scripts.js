const products = [
    {
        id: 1,
        name: "Memoria RAM 16GB DDR4 3200MHz",
        category: "Componentes",
        price: 1199.00,
        rating: 4.8,
        reviewsCount: 142,
        image: "https://images.unsplash.com/photo-1562976540-1e02c5141203?auto=format&fit=crop&w=600&q=80",
        description: "Memoria de alto rendimiento con disipador térmico para multitarea escolar y profesional sin interrupciones.",
        specs: ["Capacidad: 16GB", "Tipo: DDR4", "Velocidad: 3200MHz", "Disipador de aluminio"]
    },
    {
        id: 2,
        name: "Procesador AMD Ryzen 5 5600G",
        category: "Componentes",
        price: 2899.00,
        rating: 4.9,
        reviewsCount: 230,
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=600&q=80",
        description: "Procesador de 6 núcleos con gráficos integrados Radeon Vega, ideal para productividad y entretenimiento.",
        specs: ["Núcleos: 6 / Hilos: 12", "Gráficos Radeon Vega 7", "Socket AM4"]
    },
    {
        id: 3,
        name: "Tarjeta Gráfica NVIDIA RTX 3060 12GB",
        category: "Componentes",
        price: 6499.00,
        rating: 4.9,
        reviewsCount: 310,
        image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80",
        description: "Potencia gráfica avanzada para diseño profesional, renderizado 3D y juegos con Ray Tracing.",
        specs: ["VRAM: 12GB GDDR6", "Ray Tracing Cores", "DLSS 2.0"]
    },
    {
        id: 4,
        name: "Disco Duro SSD M.2 NVMe 1TB",
        category: "Componentes",
        price: 1450.00,
        rating: 4.7,
        reviewsCount: 98,
        image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80",
        description: "Velocidades de lectura ultrarrápidas de hasta 3500 MB/s para iniciar tu sistema en segundos.",
        specs: ["Capacidad: 1TB", "Lectura hasta: 3500 MB/s", "Factor de forma: M.2 2280"]
    },
    {
        id: 5,
        name: "Fuente de Poder 650W 80+ Bronze",
        category: "Repuestos",
        price: 1299.00,
        rating: 4.6,
        reviewsCount: 75,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
        description: "Energía estable y segura con certificación 80 Plus Bronze para proteger todos tus componentes.",
        specs: ["Potencia: 650W", "Certificación: 80 Plus Bronze"]
    },
    {
        id: 6,
        name: "Teclado Mecánico RGB Compacto TKL",
        category: "Periféricos",
        price: 899.00,
        rating: 4.8,
        reviewsCount: 420,
        image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=600&q=80",
        description: "Teclado mecánico con switches táctiles y retroiluminación RGB personalizable para escritura fluida.",
        specs: ["Switches mecánicos", "Iluminación RGB por tecla"]
    },
    {
        id: 7,
        name: "Mouse Ergonómico Inalámbrico Óptico",
        category: "Periféricos",
        price: 499.00,
        rating: 4.7,
        reviewsCount: 180,
        image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80",
        description: "Diseño ergonómico avanzado para reducir la fatiga en jornadas prolongadas de estudio y trabajo.",
        specs: ["Sensor óptico de alta precisión", "Batería recargable USB-C"]
    },
    {
        id: 8,
        name: "Funda Protectora para Laptop 15.6\"",
        category: "Accesorios",
        price: 349.00,
        rating: 4.5,
        reviewsCount: 64,
        image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80",
        description: "Protección impermeable con forro de terciopelo interior y bolsillo frontal para accesorios.",
        specs: ["Compatible hasta 15.6 pulgadas", "Material impermeable"]
    },
    {
        id: 9,
        name: "Pasta Térmica de Alto Rendimiento",
        category: "Repuestos",
        price: 199.00,
        rating: 4.9,
        reviewsCount: 312,
        image: "https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&w=600&q=80",
        description: "Compuesto térmico de jeringa para mantener tu procesador y tarjeta gráfica a temperaturas óptimas.",
        specs: ["Contenido: Jeringa de 4g", "Alta conductividad térmica"]
    },
    {
        id: 10,
        name: "Batería de Repuesto para Laptop Estándar",
        category: "Repuestos",
        price: 850.00,
        rating: 4.6,
        reviewsCount: 52,
        image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=600&q=80",
        description: "Batería de repuesto compatible con múltiples modelos, celdas de ion de litio de larga duración.",
        specs: ["Tecnología Li-Ion", "Protección contra sobrecarga"]
    },
    {
        id: 11,
        name: "Hub USB-C 7 en 1 Multi-puerto",
        category: "Accesorios",
        price: 599.00,
        rating: 4.8,
        reviewsCount: 190,
        image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80",
        description: "Extiende la conectividad de tu laptop con puertos HDMI 4K, USB 3.0, lectores SD y carga Power Delivery.",
        specs: ["Salida HDMI 4K@30Hz", "Puertos USB 3.0 de alta velocidad"]
    },
    {
        id: 12,
        name: "Auriculares Gamer con Micrófono y LED",
        category: "Periféricos",
        price: 799.00,
        rating: 4.7,
        reviewsCount: 215,
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80",
        description: "Sonido envolvente estéreo con almohadillas acolchadas y micrófono con cancelación de ruido.",
        specs: ["Drivers de 50mm", "Micrófono omnidireccional flexible"]
    }
];

let cart = [];
let currentFilter = 'all';
let searchQuery = '';
let currentUser = null;
let isRegisterMode = false;

document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
});

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
            <div class="relative overflow-hidden cursor-pointer bg-custom-subtle h-48" onclick="openProductDetail(${product.id})">
                <span class="absolute top-3 left-3 z-10 bg-[#131313]/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-lg border border-[#86868B]/30">${product.category}</span>
                <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90">
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

    storeView.classList.add('hidden');
    valuePropView.classList.add('hidden');
    detailView.classList.add('hidden');

    if (viewName === 'store') {
        storeView.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (viewName === 'valueProp') {
        valuePropView.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (viewName === 'detail') {
        detailView.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function openProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const container = document.getElementById('productDetailContent');
    container.innerHTML = `
        <div class="rounded-2xl overflow-hidden bg-custom-subtle border border-[#86868B]/30 h-80 lg:h-full flex items-center justify-center">
            <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">
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
            <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-xl bg-custom-subtle border border-[#86868B]/30">
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
    showToast("¡Pedido procesado con éxito! Gracias por comprar en MaDaTec.");
    cart = [];
    updateCartUI();
    toggleCartModal(false);
}

function openAuthModal() {
    if (currentUser) {
        if (confirm(`¿Deseas cerrar sesión de ${currentUser.name || currentUser.email}?`)) {
            currentUser = null;
            document.getElementById('userAccountBtnText').textContent = "CUENTA";
            showToast("Sesión cerrada correctamente");
        }
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

    if (isRegisterMode) {
        title.textContent = "Crear Cuenta";
        nameContainer.classList.remove('hidden');
        document.getElementById('authName').required = true;
        submitBtn.textContent = "Registrarse";
        toggleText.innerHTML = `¿Ya tienes cuenta? <button type="button" onclick="toggleAuthMode()" class="text-white font-semibold hover:underline">Inicia Sesión</button>`;
    } else {
        title.textContent = "Iniciar Sesión";
        nameContainer.classList.add('hidden');
        document.getElementById('authName').required = false;
        submitBtn.textContent = "Iniciar Sesión";
        toggleText.innerHTML = `¿No tienes cuenta? <button type="button" onclick="toggleAuthMode()" class="text-white font-semibold hover:underline">Regístrate</button>`;
    }
}

function handleAuthSubmit(event) {
    event.preventDefault();
    const email = document.getElementById('authEmail').value;
    const nameInput = document.getElementById('authName').value;

    currentUser = {
        email: email,
        name: isRegisterMode ? nameInput : (email.split('@')[0])
    };

    document.getElementById('userAccountBtnText').textContent = currentUser.name.toUpperCase();
    closeAuthModal();
    showToast(isRegisterMode ? "¡Cuenta creada exitosamente!" : "¡Sesión iniciada correctamente!");
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