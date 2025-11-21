// --- CONSTANTES DE LOCAL STORAGE ---
const LOCAL_STORAGE_KEY = 'gamingUtopiaUsers';
const CURRENT_USER_KEY = 'gamingUtopiaCurrentUser';
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


// --- 1. GESTIÓN DE LOCAL STORAGE Y UI ---

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
        // Logueado: Muestra perfil, oculta LOGIN
        if (loginBtn) loginBtn.style.display = 'none';
        if (profileIcon) profileIcon.style.display = 'block';
        if (profileUsernameSpan) profileUsernameSpan.textContent = user.username || user.email;
    } else {
        // No Logueado: Muestra LOGIN, oculta perfil
        if (loginBtn) loginBtn.style.display = 'block';
        if (profileIcon) profileIcon.style.display = 'none';
    }
}


// --- 2. LÓGICA DE MODALES Y PESTAÑAS ---

// Abre el modal de Login/Registro
if (loginBtn) {
    loginBtn.onclick = () => {
        if (authModal) authModal.style.display = 'block';
        if (loginTab) loginTab.click();
    };
}

// Abre el modal de Perfil
if (profileIcon) {
    profileIcon.onclick = () => {
        if (profileModal) profileModal.style.display = 'block';
    };
}

// Cierra los modales al hacer clic en la 'x' o fuera
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
};

// Cambio entre pestañas
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
    
    // Validar Usuario
    if (registerUserInput.value.length < 3) {
        alert('El usuario debe tener al menos 3 caracteres.');
        isValid = false;
    } else if (users.some(u => u.username.toLowerCase() === registerUserInput.value.toLowerCase())) {
        alert('El nombre de usuario ya existe.');
        isValid = false;
    }
    
    // Validar Email
    if (!isValidEmail(registerEmailInput.value)) {
        alert('Formato de correo inválido.');
        isValid = false;
    } else if (users.some(u => u.email.toLowerCase() === registerEmailInput.value.toLowerCase())) {
        alert('El correo electrónico ya está registrado.');
        isValid = false;
    }

    // Validar Contraseña
    if (registerPasswordInput.value.length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres.');
        isValid = false;
    }

    return isValid;
}

// REGISTRO
if (submitRegisterBtn) {
    submitRegisterBtn.onclick = (e) => {
        e.preventDefault();
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
        const identifier = loginUserEmailInput.value;
        const password = loginPasswordInput.value;
        const users = loadUsers();

        const user = users.find(u => 
            (u.email.toLowerCase() === identifier.toLowerCase() || u.username.toLowerCase() === identifier.toLowerCase()) && u.password === password
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

// --- 4. LÓGICA DE SOPORTE Y VALIDACIÓN ---

function validateSupportForm(form) {
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


// --- 6. LÓGICA DEL CARRUSEL ---
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

    // Carrusel Automático 
    setInterval(() => {
        currentIndex = (currentIndex + 1) % totalImages;
        updateCarousel();
    }, 5000); 
}

// 7. INICIALIZACIÓN
window.onload = updateAuthUI;