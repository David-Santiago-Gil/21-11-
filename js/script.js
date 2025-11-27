// --- CONSTANTES GLOBALES ---
const LOCAL_STORAGE_KEY = 'gamingUtopiaUsers';
const CURRENT_USER_KEY = 'gamingUtopiaCurrentUser';
const CART_KEY = 'gamingUtopiaCart'; // Nueva constante para el carrito
const SUPPORT_FORM_ID = 'supportForm';

// --- ELEMENTOS DEL DOM ---
const authModal = document.getElementById('authModal');
const profileModal = document.getElementById('profileModal');
const loginBtn = document.getElementById('loginBtn');
const profileIcon = document.getElementById('profileIcon');
const profileUsernameSpan = document.getElementById('profileUsername');

const loginTab = document.getElementById('loginTab');
const registerTab = document.getElementById('registerTab');
const loginFormDiv = document.getElementById('loginForm');
const registerFormDiv = document.getElementById('registerForm');

const submitLoginBtn = document.getElementById('submitLogin');
const submitRegisterBtn = document.getElementById('submitRegister');
const logoutBtn = document.getElementById('logoutBtn');

// Campos de Autenticación
const loginUserEmailInput = document.getElementById('loginUserEmail');
const loginPasswordInput = document.getElementById('loginPassword');
const registerUserInput = document.getElementById('registerUser');
const registerEmailInput = document.getElementById('registerEmail');
const registerPasswordInput = document.getElementById('registerPassword');

// Elementos del carrito (NUEVOS)
const cartCountSpan = document.getElementById('cartCount');
const addToCartModal = document.getElementById('addToCartModal');
const modalGameName = document.getElementById('modalGameName');
const modalGamePrice = document.getElementById('modalGamePrice');
const confirmAddToCartBtn = document.getElementById('confirmAddToCartBtn');
const cancelAddToCartBtn = document.getElementById('cancelAddToCartBtn');
let currentProduct = null; // Variable global para almacenar el juego seleccionado


// --- 1. GESTIÓN DE LOCAL STORAGE Y UI (Autenticación) ---

function loadUsers() {
    try {
        const users = localStorage.getItem(LOCAL_STORAGE_KEY);
        return users ? JSON.parse(users) : [];
    } catch (e) {
        console.error("Error al cargar usuarios:", e);
        return [];
    }
}

function saveUsers(users) {
    try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
    } catch (e) {
        console.error("Error al guardar usuarios:", e);
    }
}

function getCurrentUser() {
    try {
        const user = localStorage.getItem(CURRENT_USER_KEY);
        return user ? JSON.parse(user) : null;
    } catch (e) {
        console.error("Error al cargar usuario actual:", e);
        return null;
    }
}

function setCurrentUser(user) {
    try {
        if (user) {
            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
        } else {
            localStorage.removeItem(CURRENT_USER_KEY);
        }
        updateAuthUI();
    } catch (e) {
        console.error("Error al establecer usuario actual:", e);
    }
}

function updateAuthUI() {
    const user = getCurrentUser();
    if (user) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (profileIcon) profileIcon.style.display = 'block';
        if (profileUsernameSpan) profileUsernameSpan.textContent = user.username || user.email;
    } else {
        if (loginBtn) loginBtn.style.display = 'block';
        if (profileIcon) profileIcon.style.display = 'none';
    }
}


// --- 2. LÓGICA DE MODALES Y PESTAÑAS (Autenticación) ---

if (loginBtn) {
    loginBtn.onclick = () => {
        if (authModal) authModal.style.display = 'block';
        if (loginTab) loginTab.click(); 
    };
}

if (profileIcon) {
    profileIcon.onclick = () => {
        if (profileModal) profileModal.style.display = 'block';
    };
}

document.querySelectorAll('.close-button').forEach(button => {
    button.onclick = function() {
        this.closest('.modal').style.display = 'none';
    };
});

window.onclick = function(event) {
    if (event.target == authModal) {
        authModal.style.display = 'none';
    }
    if (event.target == profileModal) {
        profileModal.style.display = 'none';
    }
    // Cierre del modal de carrito
    if (event.target == addToCartModal) { 
        addToCartModal.style.display = 'none';
    }
};

if (loginTab && registerTab) {
    loginTab.onclick = () => {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginFormDiv.classList.add('active');
        registerFormDiv.classList.remove('active');
    };

    registerTab.onclick = () => {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        registerFormDiv.classList.add('active');
        loginFormDiv.classList.remove('active');
    };
}


// --- 3. LÓGICA DE AUTENTICACIÓN Y VALIDACIÓN ---

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function validateRegistration() {
    let isValid = true;
    const users = loadUsers();
    
    // ... (Lógica de validación de registro) ...

    return isValid;
}

// REGISTRO
if (submitRegisterBtn) {
    submitRegisterBtn.onclick = (e) => {
        e.preventDefault();
        // ... (Lógica de registro) ...
        if (validateRegistration()) {
            const newUser = {
                username: registerUserInput.value,
                email: registerEmailInput.value,
                password: registerPasswordInput.value, 
                phone: document.getElementById('registerPhone').value || null
            };

            const users = loadUsers();
            users.push(newUser);
            saveUsers(users);
            setCurrentUser(newUser);
            if (authModal) authModal.style.display = 'none';
            alert('Registro exitoso e inicio de sesión completado.');
        }
    };
}

// LOGIN
if (submitLoginBtn) {
    submitLoginBtn.onclick = (e) => {
        e.preventDefault();
        // ... (Lógica de login) ...
        const identifier = loginUserEmailInput.value;
        const password = loginPasswordInput.value;
        const users = loadUsers();

        const user = users.find(u => 
            (u.email && u.email.toLowerCase() === identifier.toLowerCase() || u.username && u.username.toLowerCase() === identifier.toLowerCase()) && u.password === password
        );

        if (user) {
            setCurrentUser(user);
            if (authModal) authModal.style.display = 'none';
            alert(`Bienvenido, ${user.username || user.email}!`);
        } else {
            alert('Credenciales inválidas. Revise su usuario/correo y contraseña.');
        }
    };
}

// LOGOUT
if (logoutBtn) {
    logoutBtn.onclick = () => {
        setCurrentUser(null);
        if (profileModal) profileModal.style.display = 'none';
        alert('Sesión cerrada.');
    };
}

// --- 4. LÓGICA DE SOPORTE Y VALIDACIÓN (Para informacion.html) ---

function validateSupportForm(form) {
    // ... (Lógica de validación de formulario de soporte) ...
    let isValid = true;
    document.querySelectorAll('#' + form.id + ' .error-message').forEach(el => el.textContent = '');

    const nameInput = document.getElementById('supportName');
    const emailInput = document.getElementById('supportEmail');
    const subjectInput = document.getElementById('supportSubject');
    const messageInput = document.getElementById('supportMessage');
    
    if (nameInput && nameInput.value.trim().length < 3) {
        document.getElementById('errorName').textContent = 'El nombre debe tener al menos 3 caracteres.';
        isValid = false;
    }
    if (emailInput && !isValidEmail(emailInput.value)) {
        document.getElementById('errorEmail').textContent = 'Formato de correo inválido.';
        isValid = false;
    }
    if (subjectInput && subjectInput.value.trim().length < 5) {
        document.getElementById('errorSubject').textContent = 'El asunto debe tener al menos 5 caracteres.';
        isValid = false;
    }
    if (messageInput && messageInput.value.trim().length < 10) {
        document.getElementById('errorMessage').textContent = 'El mensaje debe tener al menos 10 caracteres.';
        isValid = false;
    }

    return isValid;
}

if (document.getElementById(SUPPORT_FORM_ID)) {
    document.getElementById(SUPPORT_FORM_ID).addEventListener('submit', function(e) {
        e.preventDefault();
        // ... (Lógica de envío de formulario) ...
        const formStatus = document.getElementById('formStatus');
        formStatus.textContent = '';

        if (validateSupportForm(this)) {
            formStatus.textContent = '✅ Su solicitud ha sido enviada con éxito. Le responderemos pronto.';
            this.reset();
        } else {
            formStatus.textContent = '❌ Por favor, corrija los errores en el formulario.';
        }
    });
}


// --- 5. LÓGICA DE BÚSQUEDA ---
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
    // ... (Lógica de búsqueda) ...
    const query = searchInput.value.trim().toLowerCase();
    if (query.length < 3) {
        alert('Por favor, ingrese al menos 3 caracteres para buscar.');
        return;
    }

    const searchMap = [
        { keywords: ['inicio', 'home', 'principal', 'samurai'], destination: 'index.html' },
        { keywords: ['tienda', 'comprar', 'shop', 'arma'], destination: 'tienda.html' },
        { keywords: ['informacion', 'halo', 'master chief', 'jefe maestro', 'futuro'], destination: 'informacion.html' },
        { keywords: ['todos', 'juegos', 'listado', 'populares', 'nuevos'], destination: 'juegos.html' },
        { keywords: ['nosotros', 'empresa', 'mision', 'equipo'], destination: 'nosotros.html' },
        { keywords: ['compañia', 'servicios', 'politicas', 'terminos', 'reglas'], destination: 'compañia.html' },
        { keywords: ['contacto', 'soporte', 'ayuda', 'ticket', 'formulario'], destination: 'soporte.html' },
        { keywords: ['categorias', 'genero', 'accion', 'rpg', 'aventura'], destination: 'categorias.html' },
        { keywords: ['catalogo', 'ofertas', 'coleccion', 'free to play', 'f2p'], destination: 'catalogo.html' }
    ];

    const foundPage = searchMap.find(item => 
        item.keywords.some(keyword => query.includes(keyword))
    );

    if (foundPage) {
        window.location.href = foundPage.destination;
    } else {
        alert(`No se encontraron resultados para "${query}". Intente con otra palabra clave.`);
    }
}


// --- 6. LÓGICA DEL CARRUSEL (Para index.html) ---
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


// ----------------------------------------------
// --- 7. LÓGICA DEL CARRITO DE COMPRAS (NUEVO) ---
// ----------------------------------------------

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
    
    if (cartCountSpan) {
        cartCountSpan.textContent = count;
        cartCountSpan.style.display = count > 0 ? 'block' : 'none';
    }
}

function addGameToCart(game) {
    const cart = loadCart();
    const existingItem = cart.find(item => item.id === game.id);

    if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
        cart.push({ ...game, quantity: 1 });
    }
    saveCart(cart);
    alert(`${game.name} ha sido agregado al carrito.`);
    
    // Si estamos en la página del carrito, la actualizamos
    if (window.location.pathname.endsWith('carrito.html')) {
        renderCartItems();
    }
}

// ----------------------------------------------
// --- 8. MANEJO DE EVENTOS DE TIENDA Y MODAL ---
// ----------------------------------------------

if (document.querySelector('.game-listings')) {
    // Delegación de eventos para manejar clics en todas las tarjetas de juego
    document.querySelector('.game-listings').addEventListener('click', (e) => {
        // Encontramos el elemento .game-card que fue clickeado (o su padre)
        const card = e.target.closest('.game-card');

        if (card && addToCartModal) {
            // Recolectar datos del juego
            const id = card.getAttribute('data-id');
            const name = card.getAttribute('data-name');
            const price = parseFloat(card.getAttribute('data-price'));
            
            // Guardar temporalmente el producto
            currentProduct = { id, name, price };

            // Mostrar datos en el modal
            modalGameName.textContent = name;
            modalGamePrice.textContent = price === 0 ? 'Gratis' : `COP ${price.toLocaleString('es-CO')}`;
            
            // Abrir modal
            addToCartModal.style.display = 'block';
        }
    });
}

// Evento de confirmación del modal
if (confirmAddToCartBtn) {
    confirmAddToCartBtn.onclick = () => {
        if (currentProduct) {
            addGameToCart(currentProduct);
        }
        addToCartModal.style.display = 'none';
        currentProduct = null; // Limpiar
    };
}

// Evento de cancelación del modal
if (cancelAddToCartBtn) {
    cancelAddToCartBtn.onclick = () => {
        addToCartModal.style.display = 'none';
        currentProduct = null; // Limpiar
    };
}


// ----------------------------------------------
// --- 9. RENDERIZADO DEL CARRITO (Para carrito.html) ---
// ----------------------------------------------

function renderCartItems() {
    const container = document.getElementById('cartItemsContainer');
    const totalSpan = document.getElementById('cartTotal');

    if (!container) return;

    const cart = loadCart();
    container.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = '<p style="color: #ccc;">Tu carrito está vacío. ¡Explora la <a href="tienda.html" style="color: #8a2be2;">tienda</a>!</p>';
    } else {
        cart.forEach(item => {
            const itemTotal = item.price * (item.quantity || 1);
            total += itemTotal;
            const priceDisplay = item.price === 0 ? 'Gratis' : `COP ${item.price.toLocaleString('es-CO')}`;

            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.style.cssText = 'display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #333; padding: 15px 0;';
            
            itemDiv.innerHTML = `
                <div style="flex: 3;">
                    <h4 style="margin: 0; color: white;">${item.name}</h4>
                    <span style="color: #8a2be2;">${priceDisplay}</span>
                </div>
                <div style="flex: 1; text-align: center;">
                    Cantidad: <strong>${item.quantity}</strong>
                </div>
                <div style="flex: 1; text-align: right;">
                    <strong>COP ${(itemTotal).toLocaleString('es-CO')}</strong>
                </div>
                <button data-id="${item.id}" class="remove-item-btn" style="background: none; border: none; color: #dc3545; margin-left: 20px; cursor: pointer;">&times;</button>
            `;
            container.appendChild(itemDiv);
        });
        
        // Agregar manejadores de eventos para eliminar ítems
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
    renderCartItems(); // Vuelve a renderizar la lista después de eliminar
}


// 10. INICIALIZACIÓN
window.onload = function() {
    updateAuthUI();
    updateCartCount(); // Carga la cuenta del carrito al inicio

    // Si la página actual es carrito.html, renderiza los items
    if (window.location.pathname.endsWith('carrito.html')) {
        renderCartItems();
    }

    // Manejador para el botón de pago (simulado)
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.onclick = () => {
            const total = loadCart().reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
            if (total > 0) {
                alert(`Procesando pago de COP ${total.toLocaleString('es-CO')}. ¡Gracias por tu compra!`);
                saveCart([]); // Vacía el carrito
                renderCartItems();
            } else {
                alert('El carrito está vacío. ¡Agrega algunos juegos primero!');
            }
        };
    }
};