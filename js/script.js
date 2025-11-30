// --- CONSTANTES GLOBALES ---
const LOCAL_STORAGE_KEY = 'gamingUtopiaUsers';
const CURRENT_USER_KEY = 'gamingUtopiaCurrentUser';
const CART_KEY = 'gamingUtopiaCart';
const SUPPORT_FORM_ID = 'supportForm';

// --- ELEMENTOS DEL DOM ---
const authModal = document.getElementById('authModal');
// ✅ CORRECCIÓN CLAVE: Referencia manual al modal de perfil
const profileModal = document.getElementById('profileModal'); 

const addToCartModal = document.getElementById('addToCartModal'); 
const loginBtn = document.getElementById('loginBtn');
const profileUsernameSpan = document.getElementById('profileUsername');

const loginTab = document.getElementById('loginTab');
const registerTab = document.getElementById('registerTab');
const loginFormDiv = document.getElementById('loginForm');
const registerFormDiv = document.getElementById('registerForm');

const submitLoginBtn = document.getElementById('submitLogin');
const submitRegisterBtn = document.getElementById('submitRegister');
const logoutBtn = document.getElementById('logoutBtn');

// 💡 NUEVOS ELEMENTOS para el Modal de Perfil
const modalProfileImage = document.getElementById('modalProfileImage');
const imageUpload = document.getElementById('imageUpload');
const changeImageBtn = document.getElementById('changeImageBtn');

// Campos de Autenticación
const loginUserEmailInput = document.getElementById('loginUserEmail');
const loginPasswordInput = document.getElementById('loginPassword');
const registerUserInput = document.getElementById('registerUser');
const registerEmailInput = document.getElementById('registerEmail');
const registerPasswordInput = document.getElementById('registerPassword');
const registerPhoneInput = document.getElementById('registerPhone');

// Elementos del carrito
const cartCountSpan = document.getElementById('cartCount');
const modalGameName = document.getElementById('modalGameName');
const modalGamePrice = document.getElementById('modalGamePrice');
const confirmAddToCartBtn = document.getElementById('confirmAddToCartBtn');
const cancelAddToCartBtn = document.getElementById('cancelAddToCartBtn');
let currentProduct = null;

// Campos de Soporte
const supportForm = document.getElementById(SUPPORT_FORM_ID);
const resetSupportBtn = document.getElementById('resetSupportBtn');


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
    // Usamos el contenedor principal de .profile-icon de tu HTML
    const profileIconContainer = document.querySelector('.profile-icon');
    const profileImg = document.querySelector('.profile-icon img'); 

    if (user) {
        if (loginBtn) loginBtn.style.display = 'none';
        
        // ✅ CORRECCIÓN CLAVE: Asegura que el contenedor del ícono se muestre
        if (profileIconContainer) profileIconContainer.style.display = 'block'; 

        if (profileUsernameSpan) profileUsernameSpan.textContent = user.username || user.email;

        // Cargar imagen de perfil del usuario
        const imagePath = user.profileImage || 'img/perfil.jpg';
        if (profileImg) {
            profileImg.src = imagePath; 
        }
        if (modalProfileImage) {
            modalProfileImage.src = imagePath;
        }

    } else {
        if (loginBtn) loginBtn.style.display = 'block';
        if (profileIconContainer) profileIconContainer.style.display = 'none';
    }
}


// --- 2. LÓGICA DE MODALES Y PESTAÑAS (Interacción) ---

if (loginBtn) {
    loginBtn.onclick = () => {
        if (authModal) authModal.style.display = 'block';
        if (loginTab) loginTab.click(); 
    };
}

// Evento click para el contenedor del icono de perfil
const profileIconContainer = document.querySelector('.profile-icon');
if (profileIconContainer) {
    profileIconContainer.onclick = () => {
        // ✅ CORRECCIÓN CLAVE: Usamos display: block para el modal de perfil manual
        if (profileModal) profileModal.style.display = 'block';
    };
}

// LÓGICA DE CIERRE DE MODAL CON EL BOTÓN &times; 
document.querySelectorAll('.close-button').forEach(button => {
    button.onclick = function() {
        const modalElement = this.closest('.modal');
        if (modalElement) {
            // Cierra el modal de forma manual
            modalElement.style.display = 'none';
        }
    };
});

// LÓGICA DE CIERRE DE MODAL AL CLICKEAR FUERA 
window.onclick = function(event) {
    // Si el objetivo del clic es el fondo del modal (el modal en sí), lo cierra
    if (event.target == authModal) {
        authModal.style.display = 'none';
    }
    // ✅ Incluimos el modal de perfil en el cierre al hacer clic fuera
    if (event.target == profileModal) {
        profileModal.style.display = 'none';
    }
    if (event.target == addToCartModal) { 
        addToCartModal.style.display = 'none';
        currentProduct = null;
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
    
    function showRegisterError(id, message) {
        const errorElement = document.getElementById(id);
        if(errorElement) errorElement.textContent = message;
    }
    
    document.querySelectorAll('#registerForm .error-message').forEach(el => el.textContent = '');

    if (registerUserInput.value.trim().length < 4) {
        showRegisterError('errorRegisterUser', 'El usuario debe tener al menos 4 caracteres.');
        isValid = false;
    } else if (users.some(u => u.username && u.username.toLowerCase() === registerUserInput.value.trim().toLowerCase())) {
        showRegisterError('errorRegisterUser', 'Este nombre de usuario ya está en uso.');
        isValid = false;
    }

    if (!isValidEmail(registerEmailInput.value)) {
        showRegisterError('errorRegisterEmail', 'Formato de correo inválido.');
        isValid = false;
    } else if (users.some(u => u.email && u.email.toLowerCase() === registerEmailInput.value.trim().toLowerCase())) {
        showRegisterError('errorRegisterEmail', 'Este correo ya está registrado.');
        isValid = false;
    }

    if (registerPasswordInput.value.length < 6) {
        showRegisterError('errorRegisterPassword', 'La contraseña debe tener al menos 6 caracteres.');
        isValid = false;
    }

    if (registerPhoneInput && registerPhoneInput.value.trim() !== '' && !/^\d{7,15}$/.test(registerPhoneInput.value.trim())) {
        showRegisterError('errorRegisterPhone', 'El formato del teléfono es inválido.');
        isValid = false;
    }

    return isValid;
}

// REGISTRO
if (submitRegisterBtn && registerUserInput && registerEmailInput && registerPasswordInput) {
    submitRegisterBtn.onclick = (e) => {
        e.preventDefault();
        
        if (validateRegistration()) {
            const newUser = {
                username: registerUserInput.value,
                email: registerEmailInput.value,
                password: registerPasswordInput.value, 
                phone: registerPhoneInput ? registerPhoneInput.value : null,
                profileImage: 'img/perfil.jpg' // Imagen por defecto
            };

            const users = loadUsers();
            users.push(newUser);
            saveUsers(users);
            setCurrentUser(newUser);
            if (authModal) authModal.style.display = 'none';
            alert('Registro exitoso e inicio de sesión completado.');
            registerUserInput.value = '';
            registerEmailInput.value = '';
            registerPasswordInput.value = '';
            if (registerPhoneInput) registerPhoneInput.value = '';
        } else {
            alert('Por favor, corrija los errores de registro.');
        }
    };
}


// LOGIN
if (submitLoginBtn) {
    submitLoginBtn.onclick = (e) => {
        e.preventDefault();
        
        const identifier = loginUserEmailInput.value.trim();
        const password = loginPasswordInput.value;
        const users = loadUsers();

        const user = users.find(u => 
            (u.email && u.email.toLowerCase() === identifier.toLowerCase() || u.username && u.username.toLowerCase() === identifier.toLowerCase()) && u.password === password
        );

        if (user) {
            setCurrentUser(user);
            if (authModal) authModal.style.display = 'none';
            alert(`Bienvenido, ${user.username || user.email}!`);
            loginUserEmailInput.value = '';
            loginPasswordInput.value = '';
        } else {
            alert('Credenciales inválidas. Revise su usuario/correo y contraseña.');
        }
    };
}

// LOGOUT
if (logoutBtn) {
    logoutBtn.onclick = () => {
        setCurrentUser(null);
        // ✅ Cierra el modal de forma manual
        if (profileModal) profileModal.style.display = 'none';
        alert('Sesión cerrada.');
    };
}

// --- 4. LÓGICA DE CAMBIO DE IMAGEN DE PERFIL (SOLO SI LOS ELEMENTOS EXISTEN) ---

if (changeImageBtn && imageUpload && modalProfileImage) {
    // 1. Al hacer clic en el botón, abre el selector de archivos
    changeImageBtn.onclick = () => {
        imageUpload.click();
    };

    // 2. Al seleccionar un archivo
    imageUpload.onchange = function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const base64Image = e.target.result;
                
                // Actualiza la imagen en el modal y la imagen en el header
                modalProfileImage.src = base64Image;
                const profileHeaderImg = document.querySelector('.profile-icon img');
                if (profileHeaderImg) {
                    profileHeaderImg.src = base64Image;
                }

                // Guarda la imagen en localStorage del usuario actual
                let user = getCurrentUser();
                let users = loadUsers();

                if (user) {
                    user.profileImage = base64Image;
                    setCurrentUser(user); // Actualiza la sesión actual

                    // Actualiza en el array de todos los usuarios
                    const userIndex = users.findIndex(u => u.email === user.email);
                    if (userIndex !== -1) {
                        users[userIndex].profileImage = base64Image;
                        saveUsers(users);
                    }
                    alert('Imagen de perfil actualizada.');
                }
            };
            reader.readAsDataURL(file); // Convierte la imagen a Base64 para guardarla
        }
    };
}

// --- 5. LÓGICA DE SOPORTE Y VALIDACIÓN (Para soporte.html) ---

function validateSupportForm(form) {
    let isValid = true;
    document.querySelectorAll('#' + form.id + ' .error-message').forEach(el => el.textContent = '');

    const nameInput = document.getElementById('supportName');
    const emailInput = document.getElementById('supportEmail');
    const subjectInput = document.getElementById('supportSubject');
    const messageInput = document.getElementById('supportMessage');
    
    // Validación de Nombre (mínimo 3 caracteres)
    if (!nameInput || nameInput.value.trim().length < 3) {
        document.getElementById('errorName').textContent = 'El nombre es obligatorio y debe tener al menos 3 caracteres.';
        isValid = false;
    }
    
    // Validación de Email (Formato)
    if (!emailInput || !isValidEmail(emailInput.value)) {
        document.getElementById('errorEmail').textContent = 'Formato de correo inválido.';
        isValid = false;
    }
    
    // Validación de Asunto (mínimo 5 caracteres)
    if (!subjectInput || subjectInput.value.trim().length < 5) {
        document.getElementById('errorSubject').textContent = 'El asunto es obligatorio y debe tener al menos 5 caracteres.';
        isValid = false;
    }
    
    // Validación de Mensaje (mínimo 10 caracteres)
    if (!messageInput || messageInput.value.trim().length < 10) {
        document.getElementById('errorMessage').textContent = 'El mensaje es obligatorio y debe tener al menos 10 caracteres.';
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
            // ÉXITO: Limpiar campos y mostrar mensaje
            if (formStatus) formStatus.textContent = '✅ Su solicitud ha sido enviada con éxito. Le responderemos pronto.';
            this.reset(); // Limpia los campos
        } else {
            // ERROR: Mostrar mensaje, mantener campos llenos para corrección
            if (formStatus) formStatus.textContent = '❌ Por favor, corrija los errores en el formulario.';
        }
    });
}

// LÓGICA AGREGADA PARA EL BOTÓN DE LIMPIAR (resetSupportBtn)
if (resetSupportBtn) {
    resetSupportBtn.addEventListener('click', function() {
        // Limpiar mensajes de error generados por JS
        document.querySelectorAll('#supportForm .error-message').forEach(el => el.textContent = '');
        
        // Limpiar el mensaje de estado (éxito/error)
        const formStatus = document.getElementById('formStatus');
        if (formStatus) formStatus.textContent = '';
    });
}


// --- 6. LÓGICA DE BÚSQUEDA ---
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
        { keywords: ['catalogo', 'ofertas', 'coleccion', 'free to play', 'f2p'], destination: 'catalogo.html' },
        { keywords: ['carrito', 'cesta', 'compra', 'checkout'], destination: 'carrito.html' }
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


// --- 7. LÓGICA DEL CARRUSEL (Para index.html) ---
const carousel = document.getElementById('imageCarousel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentIndex = 0;

if (carousel && prevBtn && nextBtn) {
    const images = carousel.querySelectorAll('img');
    const totalImages = images.length;
    
    function updateCarousel() {
        const offset = -currentIndex * 100 / totalImages;
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

    // Carrusel automático
    setInterval(() => {
        currentIndex = (currentIndex + 1) % totalImages;
        updateCarousel();
    }, 5000); 
}


// ----------------------------------------------
// --- 8. LÓGICA DEL CARRITO DE COMPRAS ---
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
    
    const cartCountIndicator = document.getElementById('cartCount');
    if (cartCountIndicator) {
        cartCountIndicator.textContent = count;
        cartCountIndicator.style.display = count > 0 ? 'inline-block' : 'none'; 
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
    alert(`"${game.name}" ha sido agregado al carrito.`);
    
    if (window.location.pathname.endsWith('carrito.html')) {
        renderCartItems();
    }
}


// ----------------------------------------------
// --- 9. MANEJO DE EVENTOS DE TIENDA Y MODAL (CON VERIFICACIÓN DE SESIÓN) ---
// ----------------------------------------------

function formatPrice(price) {
    const value = parseFloat(price);
    if (value === 0) {
        return 'Gratis';
    }
    return `COP ${value.toLocaleString('es-CO')}`;
}

// Detección de clicks en las tarjetas de juego (game-card)
if (document.querySelector('.game-listings')) {
    document.querySelector('.game-listings').addEventListener('click', (e) => {
        const card = e.target.closest('.game-card');

        if (card && addToCartModal) {
            // **PASO 1: VERIFICACIÓN DE SESIÓN**
            if (!getCurrentUser()) {
                alert('🚨 Debes iniciar sesión para agregar productos al carrito.');
                if (authModal) authModal.style.display = 'block'; 
                return;
            }

            const id = card.getAttribute('data-id');
            const name = card.getAttribute('data-name');
            const priceAttr = card.getAttribute('data-price');
            const price = parseFloat(priceAttr); 
            
            currentProduct = { id, name, price };

            if (modalGameName) modalGameName.textContent = name;
            if (modalGamePrice) modalGamePrice.textContent = formatPrice(price);
            
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
        currentProduct = null;
    };
}

// Evento de cancelación del modal
if (cancelAddToCartBtn) {
    cancelAddToCartBtn.onclick = () => {
        addToCartModal.style.display = 'none';
        currentProduct = null;
    };
}


// ----------------------------------------------
// --- 10. RENDERIZADO DEL CARRITO (Para carrito.html) ---
// ----------------------------------------------

function renderCartItems() {
    const container = document.getElementById('cartItemsContainer');
    const totalSpan = document.getElementById('cartTotal');

    if (!container) return; 

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
            const priceDisplay = itemPrice === 0 ? 'Gratis' : `COP ${itemPrice.toLocaleString('es-CO')}`;

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


// 11. INICIALIZACIÓN
window.onload = function() {
    updateAuthUI();
    updateCartCount();

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
            if (!getCurrentUser()) {
                alert('🚨 Debes iniciar sesión para finalizar la compra.');
                if (authModal) authModal.style.display = 'block';
                return;
            }

            const total = loadCart().reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
            if (total > 0) {
                alert(`Procesando pago de COP ${total.toLocaleString('es-CO')}. ¡Gracias por tu compra!`);
                saveCart([]); 
                renderCartItems(); 
            } else {
                alert('El carrito está vacío. ¡Agrega algunos juegos primero!');
            }
        };
    }
};