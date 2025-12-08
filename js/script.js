// --- CONSTANTES GLOBALES ---
const CART_KEY = 'gamingUtopiaCart';
const SUPPORT_FORM_ID = 'supportForm';

// --- ELEMENTOS DEL DOM ---
const addToCartModal = document.getElementById('addToCartModal');
const modalGameName = document.getElementById('modalGameName');
const modalGamePrice = document.getElementById('modalGamePrice');
const confirmAddToCartBtn = document.getElementById('confirmAddToCartBtn');
const cancelAddToCartBtn = document.getElementById('cancelAddToCartBtn');
let currentProduct = null;

// Campos de Soporte
const supportForm = document.getElementById(SUPPORT_FORM_ID);

// --- LÓGICA DE MODALES DE CARRITO ---

// Cerrar modal al hacer clic fuera
window.addEventListener('click', function(event) {
    if (event.target == addToCartModal) { 
        addToCartModal.style.display = 'none';
        currentProduct = null;
    }
});

// Cerrar con tecla ESCAPE (Regla de consistencia)
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        if (addToCartModal && addToCartModal.style.display === 'block') {
            addToCartModal.style.display = 'none';
            currentProduct = null;
        }
    }
});

// --- LÓGICA DE SOPORTE Y VALIDACIÓN ---

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function validateSupportForm(form) {
    let isValid = true;
    document.querySelectorAll('#' + form.id + ' .error-message').forEach(el => el.textContent = '');

    const nameInput = document.getElementById('supportName');
    const emailInput = document.getElementById('supportEmail');
    const subjectInput = document.getElementById('supportSubject');
    const messageInput = document.getElementById('supportMessage');
    
    if (!nameInput || nameInput.value.trim().length < 3) {
        const errorName = document.getElementById('errorName');
        if (errorName) errorName.textContent = 'El nombre es obligatorio y debe tener al menos 3 caracteres.';
        isValid = false;
    }
    
    if (!emailInput || !isValidEmail(emailInput.value)) {
        const errorEmail = document.getElementById('errorEmail');
        if (errorEmail) errorEmail.textContent = 'Formato de correo inválido.';
        isValid = false;
    }
    
    if (!subjectInput || subjectInput.value.trim().length < 5) {
        const errorSubject = document.getElementById('errorSubject');
        if (errorSubject) errorSubject.textContent = 'El asunto es obligatorio y debe tener al menos 5 caracteres.';
        isValid = false;
    }
    
    if (!messageInput || messageInput.value.trim().length < 10) {
        const errorMessage = document.getElementById('errorMessage');
        if (errorMessage) errorMessage.textContent = 'El mensaje es obligatorio y debe tener al menos 10 caracteres.';
        isValid = false;
    }

    return isValid;
}

if (supportForm) {
    supportForm.addEventListener('submit', function(e) {
        e.preventDefault(); 
        
        const formStatus = document.getElementById('formStatus');
        if (formStatus) formStatus.textContent = ''; 

        if (validateSupportForm(this)) {
            if (formStatus) formStatus.textContent = '✅ Su solicitud ha sido enviada con éxito. Le responderemos pronto.';
            this.reset();
        } else {
            if (formStatus) formStatus.textContent = '❌ Por favor, corrija los errores en el formulario.';
        }
    });
}

const resetSupportBtn = document.getElementById('resetSupportBtn');
if (resetSupportBtn) {
    resetSupportBtn.addEventListener('click', function() {
        document.querySelectorAll('#supportForm .error-message').forEach(el => el.textContent = '');
        
        const formStatus = document.getElementById('formStatus');
        if (formStatus) formStatus.textContent = '';
    });
}


// --- LÓGICA DE BÚSQUEDA ---
// El buscador está disponible en cualquier página que tenga los elementos de búsqueda en el encabezado
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

if (searchBtn) {
    searchBtn.onclick = () => handleSearch();
}
if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
}

function handleSearch() {
    const query = searchInput.value.trim().toLowerCase();
    if (query.length < 1) {
        alert('Por favor, ingrese un término para buscar.');
        return;
    }

    // Primero intentar buscar juegos en GAMES_DATA
    let gameResults = [];
    if (typeof getAllGames === 'function') {
        gameResults = getAllGames().filter(game => 
            game.name.toLowerCase().includes(query) || 
            game.genre.toLowerCase().includes(query) ||
            game.description.toLowerCase().includes(query)
        );
    }

    if (gameResults.length > 0) {
        // Mostrar resultados de juegos en un modal
        showGameSearchResults(gameResults, query);
        return;
    }

    // Si no encuentra juegos, buscar por páginas
    const searchMap = [
        { keywords: ['inicio', 'home', 'principal', 'samurai'], destination: 'index.html' },
        { keywords: ['tienda', 'comprar', 'shop', 'arma'], destination: 'tienda.html' },
        { keywords: ['informacion', 'halo', 'master chief', 'jefe maestro', 'futuro'], destination: 'informacion.html' },
        { keywords: ['todos', 'juegos', 'listado', 'populares', 'nuevos'], destination: 'juegos.html' },
        { keywords: ['nosotros', 'empresa', 'mision', 'equipo'], destination: 'nosotros.html' },
        { keywords: ['compañia', 'servicios', 'politicas', 'terminos', 'reglas'], destination: 'compañia.html' },
        { keywords: ['contacto', 'soporte', 'ayuda', 'ticket', 'formulario'], destination: 'soporte.html' },
        { keywords: ['categorias', 'genero', 'accion', 'rpg', 'aventura'], destination: 'categorias.html' },
        { keywords: ['catalogo', 'ofertas', 'coleccion', 'free to play', 'f2p'], destination: 'catalogo.html' },
        { keywords: ['carrito', 'cesta', 'compra', 'checkout'], destination: 'carrito.html' }
    ];

    const foundPage = searchMap.find(item => 
        item.keywords.some(keyword => query.includes(keyword))
    );

    if (foundPage) {
        // Validación de seguridad para la tienda en búsqueda
        if (foundPage.destination === 'tienda.html' && !window.getCurrentUser()) {
             alert('🔒 Acceso restringido: Debes iniciar sesión para entrar a la Tienda.');
             const authModal = document.getElementById('authModal');
             if (authModal) {
                authModal.style.display = 'block';
                const loginTab = document.getElementById('loginTab');
                if(loginTab) loginTab.click();
             }
             return;
        }
        window.location.href = foundPage.destination;
    } else {
        alert(`No se encontraron resultados para "${query}". Intente con otra palabra clave.`);
    }
}

function showGameSearchResults(games, query) {
    // Crear un modal con los resultados
    let modal = document.getElementById('searchResultsModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'searchResultsModal';
        modal.className = 'modal';
        document.body.appendChild(modal);
    }

    let resultsHTML = `
        <div class="modal-content" style="width: 90%; max-width: 1200px; max-height: 85vh; overflow-y: auto; margin: 5vh auto;">
            <span class="close-button" onclick="document.getElementById('searchResultsModal').style.display = 'none'; document.getElementById('searchInput').value = '';">&times;</span>
            <h2 style="color: #fff; margin-bottom: 10px;">Resultados de búsqueda: "${query}"</h2>
            <p style="color: #ccc; margin-bottom: 20px;">Se encontraron ${games.length} juego(s)</p>
            <div class="game-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px;">
    `;

    games.forEach(game => {
        resultsHTML += `
            <div class="game-card" data-id="${game.id}" data-name="${game.name}" data-price="${game.price}" style="cursor: pointer; transition: transform 0.3s, box-shadow 0.3s; border-radius: 8px; overflow: hidden;">
                <img src="${game.image}" alt="${game.name}" onerror="this.src='https://placehold.co/600x400?text=Juego'" style="width: 100%; height: 200px; object-fit: cover;">
                <div style="padding: 12px; background: #1a1a1a;">
                    <h4 style="color: #fff; margin: 8px 0; font-size: 0.95em; word-wrap: break-word;">${game.name}</h4>
                    <p style="color: #8a2be2; font-size: 0.85em; margin: 5px 0;">${game.genre}</p>
                    <p style="color: #4CAF50; font-weight: bold; margin: 5px 0;">${game.price === 0 ? 'Gratis' : 'COP ' + game.price.toLocaleString('es-CO')}</p>
                    <p class="rating" style="color: #ffc107; font-size: 0.9em; margin: 5px 0;">⭐ ${game.rating}</p>
                </div>
            </div>
        `;
    });

    resultsHTML += `
            </div>
        </div>
    `;

    modal.innerHTML = resultsHTML;
    modal.style.display = 'block';

    // Event listeners para abrir el juego al hacer clic
    const gameCards = modal.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        card.addEventListener('click', function() {
            const gameId = this.getAttribute('data-id');
            if (gameId) {
                // Cerrar el modal de búsqueda
                modal.style.display = 'none';
                document.getElementById('searchInput').value = '';
                
                // Redirigir a la página de detalle del juego
                window.location.href = `juego-detalle.html?id=${gameId}`;
            }
        });

        // Efecto hover
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 8px 25px rgba(138, 43, 226, 0.4)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Cerrar modal al hacer clic fuera de él
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.getElementById('searchInput').value = '';
        }
    });
}


// --- LÓGICA DEL CARRUSEL ---
const carousel = document.getElementById('imageCarousel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentIndex = 0;

if (carousel && prevBtn && nextBtn) {
    const images = carousel.querySelectorAll('img');
    const totalImages = images.length;
    
    function updateCarousel() {
        const offset = -currentIndex * 100;
        carousel.style.transform = `translateX(${offset}%)`;
    }

    nextBtn.onclick = () => {
        currentIndex = (currentIndex + 1) % totalImages;
        updateCarousel();
    };

    prevBtn.onclick = () => {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        updateCarousel();
    };

    setInterval(() => {
        currentIndex = (currentIndex + 1) % totalImages;
        updateCarousel();
    }, 5000); 
}


// --- LÓGICA DEL CARRITO ---

function loadCart() {
    try {
        const cart = localStorage.getItem(CART_KEY);
        return cart ? JSON.parse(cart) : [];
    } catch (e) {
        console.error("Error al cargar carrito:", e);
        return [];
    }
}

function saveCart(cart) {
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        updateCartCount();
    } catch (e) {
        console.error("Error al guardar carrito:", e);
    }
}

function updateCartCount() {
    const cart = loadCart();
    const count = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    
    const cartCountIndicator = document.getElementById('cartCount');
    if (cartCountIndicator) {
        cartCountIndicator.textContent = count;
        cartCountIndicator.style.display = count > 0 ? 'inline-block' : 'none'; 
    }
}

function addGameToCart(game) {
    // Asegurarnos de tener el objeto completo del juego
    let gameObj = game;
    if (game && !game.minAge && typeof getGameById === 'function') {
        gameObj = getGameById(game.id) || game;
    }

    // Usamos window.getCurrentUser que definimos en login.js
    if (!window.getCurrentUser()) {
        console.error("Error de lógica: Intento de agregar al carrito sin sesión.");
        alert('🚨 Error: No tienes permiso para comprar. Debes iniciar sesión.');
        return;
    }
    // Validación por edad mínima del juego
    if (gameObj && gameObj.minAge && typeof gameObj.minAge === 'number') {
        const user = window.getCurrentUser();
        const age = user && user.dob ? window.calculateAge(user.dob) : 0;
        if (!user || !user.dob) {
            alert('Por favor verifica tu edad en tu perfil antes de comprar este juego.');
            return;
        }
        if (age < gameObj.minAge) {
            alert(`No cumples la edad mínima requerida (${gameObj.minAge} años) para comprar este juego.`);
            return;
        }
    }

    const cart = loadCart();
    const existingItem = cart.find(item => item.id === gameObj.id);

    if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
        cart.push({ ...gameObj, quantity: 1 });
    }
    saveCart(cart);
    alert(`"${gameObj.name}" ha sido agregado al carrito.`);
    
    if (window.location.pathname.endsWith('carrito.html')) {
        renderCartItems();
    }
}


// --- MANEJO DE EVENTOS DE TIENDA Y MODAL DE COMPRA ---

function formatPrice(price) {
    const value = parseFloat(price);
    if (value === 0) {
        return 'Gratis';
    }
    return `COP ${value.toLocaleString('es-CO')}`;
}

if (document.querySelector('.game-listings')) {
    document.querySelector('.game-listings').addEventListener('click', (e) => {
        const card = e.target.closest('.game-card');

        if (card && addToCartModal) {
            
            if (card.getAttribute('data-status') === 'upcoming') {
                alert('🚧 Este juego es un Próximo Lanzamiento y actualmente no está disponible para compra. ¡Vuelve pronto!');
                return;
            }

            if (!window.getCurrentUser()) {
                alert('🚨 Debes iniciar sesión para agregar productos al carrito.');
                const authModal = document.getElementById('authModal');
                if (authModal) {
                    authModal.style.display = 'block'; 
                    const loginTab = document.getElementById('loginTab');
                    if (loginTab) loginTab.click();
                } 
                return;
            }

            const id = card.getAttribute('data-id');
            const name = card.getAttribute('data-name');
            const priceAttr = card.getAttribute('data-price');
            const price = parseFloat(priceAttr);

            // validar edad mínima del juego antes de mostrar modal
            const gameObj = (typeof getGameById === 'function') ? getGameById(id) : null;
            const minAge = gameObj && gameObj.minAge ? gameObj.minAge : 0;

            // Si requiere edad, validar contra DOB guardado
            if (minAge > 0) {
                const user = window.getCurrentUser();
                if (!user) {
                    alert('🔒 Debes iniciar sesión para comprar este juego.');
                    const authModal = document.getElementById('authModal');
                    if (authModal) authModal.style.display = 'block';
                    return;
                }
                // Validar edad calculada desde DOB
                const userAge = user.dob ? window.calculateAge(user.dob) : 0;
                if (!user.dob || userAge < minAge) {
                    alert(`❌ "${name}"\n\nEdad mínima requerida: ${minAge} años\nTu edad: ${userAge} años\n\nNo cumples los requisitos de edad para comprar este juego.`);
                    return;
                }
            }

            currentProduct = { id, name, price };

            if (modalGameName) modalGameName.textContent = name;
            if (modalGamePrice) modalGamePrice.textContent = formatPrice(price);

            addToCartModal.style.display = 'block';
        }
    });
}

if (confirmAddToCartBtn) {
    confirmAddToCartBtn.onclick = () => {
        if (currentProduct) {
            addGameToCart(currentProduct); 
        }
        addToCartModal.style.display = 'none';
        currentProduct = null;
    };
}

if (cancelAddToCartBtn) {
    cancelAddToCartBtn.onclick = () => {
        addToCartModal.style.display = 'none';
        currentProduct = null;
    };
}


// --- RENDERIZADO DEL CARRITO ---

function renderCartItems() {
    const container = document.getElementById('cartItemsContainer');
    const totalSpan = document.getElementById('cartTotal');

    if (!container) {
        return; 
    } 

    const cart = loadCart();
    container.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = '<p style="color: #ccc;">Tu carrito está vacío. ¡Explora la <a href="tienda.html" style="color: #8a2be2; text-decoration: underline;">tienda</a>!</p>';
    } else {
        cart.forEach(item => {
            const itemPrice = parseFloat(item.price) || 0;
            const itemQuantity = parseInt(item.quantity) || 1;
            
            const itemTotal = itemPrice * itemQuantity;
            total += itemTotal;
            const priceDisplay = formatPrice(itemPrice);

            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            
            itemDiv.innerHTML = `
                <div style="flex: 3;">
                    <h4 style="margin: 0;">${item.name}</h4>
                    <span>${priceDisplay}</span>
                </div>
                <div style="flex: 1; text-align: center;">
                    Cantidad: <strong>${itemQuantity}</strong>
                </div>
                <div style="flex: 1; text-align: right;">
                    <strong>COP ${(itemTotal).toLocaleString('es-CO')}</strong>
                </div>
                <button data-id="${item.id}" class="remove-item-btn" title="Eliminar">&times;</button>
            `;
            container.appendChild(itemDiv);
        });
        
        document.querySelectorAll('.remove-item-btn').forEach(button => {
            button.addEventListener('click', removeItemFromCart);
        });
    }

    if (totalSpan) {
        totalSpan.textContent = `COP ${total.toLocaleString('es-CO')}`;
    }
}

function removeItemFromCart(e) {
    const itemId = e.target.getAttribute('data-id'); 
    let cart = loadCart();
    
    cart = cart.filter(item => item.id !== itemId); 
    
    saveCart(cart);
    renderCartItems();
}


// --- INICIALIZACIÓN ---
window.onload = function() {
    // Estas funciones deben estar disponibles desde login.js
    if (typeof updateAuthUI === 'function') updateAuthUI();
    updateCartCount();

    // Página Nosotros: abrir modal con información del perfil al hacer clic en la tarjeta
    if (window.location.pathname.endsWith('nosotros.html')) {
        const teamCards = document.querySelectorAll('.game-grid .game-card');
        const profileModal = document.getElementById('profileInfoModal');
        const nameEl = document.getElementById('profileInfoName');
        const roleEl = document.getElementById('profileInfoRole');
        const emailEl = document.getElementById('profileInfoEmail');
        const phoneEl = document.getElementById('profileInfoPhone');
        const bioEl = document.getElementById('profileInfoBio');

        teamCards.forEach(card => {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                const ds = card.dataset || {};
                if (nameEl) nameEl.textContent = ds.name || '';
                if (roleEl) roleEl.textContent = ds.role || '';
                if (emailEl) emailEl.textContent = ds.email || '';
                if (phoneEl) phoneEl.textContent = ds.phone || '';
                if (bioEl) bioEl.textContent = ds.bio || '';
                if (profileModal) profileModal.style.display = 'block';
            });
        });

        if (profileModal) {
            const closeBtn = profileModal.querySelector('.close-button');
            if (closeBtn) closeBtn.addEventListener('click', () => profileModal.style.display = 'none');
            profileModal.addEventListener('click', (e) => { if (e.target === profileModal) profileModal.style.display = 'none'; });
        }
    }

    function resetSupportForm() {
        const formStatus = document.getElementById('formStatus');
        if (supportForm) {
             supportForm.reset();
        }
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        if (formStatus) {
            formStatus.textContent = '';
        }
    }
    
    if (window.location.pathname.endsWith('soporte.html')) {
        resetSupportForm();
    }

    if (window.location.pathname.endsWith('carrito.html')) {
        renderCartItems();
    }

    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.onclick = () => {
            if (!window.getCurrentUser()) {
                alert('🚨 Debes iniciar sesión para finalizar la compra.');
                const authModal = document.getElementById('authModal');
                if (authModal) authModal.style.display = 'block';
                return;
            }

            const cart = loadCart();
            const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
            
            if (total > 0) {
                // Mostrar modal de pago
                const paymentModal = document.getElementById('paymentModal');
                if (paymentModal) {
                    document.getElementById('paymentTotal').textContent = `COP ${total.toLocaleString('es-CO')}`;
                    paymentModal.style.display = 'flex';
                    
                    // Limpiar formulario
                    const paymentForm = document.getElementById('paymentForm');
                    if (paymentForm) paymentForm.reset();
                }
            } else {
                alert('El carrito está vacío. ¡Agrega algunos juegos primero!');
            }
        };
    }
    
    // Procesar pago con tarjeta
    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        paymentForm.onsubmit = (e) => {
            e.preventDefault();
            
            const cardName = document.getElementById('cardName').value.trim();
            const cardNumber = document.getElementById('cardNumber').value.trim();
            const cardExpiry = document.getElementById('cardExpiry').value.trim();
            const cardCVV = document.getElementById('cardCVV').value.trim();
            const paymentMessage = document.getElementById('paymentMessage');
            
            // Validaciones básicas
            if (!cardName || cardName.length < 3) {
                paymentMessage.textContent = '❌ Por favor ingresa un nombre válido en la tarjeta.';
                paymentMessage.style.display = 'block';
                paymentMessage.style.color = '#ff6b6b';
                return;
            }
            
            if (!/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/.test(cardNumber)) {
                paymentMessage.textContent = '❌ Número de tarjeta inválido.';
                paymentMessage.style.display = 'block';
                paymentMessage.style.color = '#ff6b6b';
                return;
            }
            
            if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) {
                paymentMessage.textContent = '❌ Vencimiento debe ser MM/YY.';
                paymentMessage.style.display = 'block';
                paymentMessage.style.color = '#ff6b6b';
                return;
            }
            
            if (!/^\d{3}$/.test(cardCVV)) {
                paymentMessage.textContent = '❌ CVV debe ser 3 dígitos.';
                paymentMessage.style.display = 'block';
                paymentMessage.style.color = '#ff6b6b';
                return;
            }
            
            // Simular procesamiento
            paymentMessage.textContent = '⏳ Procesando pago...';
            paymentMessage.style.display = 'block';
            paymentMessage.style.color = '#ffc107';
            
            setTimeout(() => {
                const total = loadCart().reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
                
                // Compra exitosa
                alert(`✅ ¡Compra Exitosa!\n\nTotal pagado: COP ${total.toLocaleString('es-CO')}\nTarjeta: ${cardNumber.slice(-4)}\n\n¡Gracias por tu compra en Gaming Utopia!`);
                
                // Limpiar carrito y cerrar modal
                saveCart([]);
                renderCartItems();
                document.getElementById('paymentModal').style.display = 'none';
                
            }, 1500);
        };
    }
};
