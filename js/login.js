// --- CONSTANTES GLOBALES DE AUTENTICACIÓN ---
const LOCAL_STORAGE_KEY = 'gamingUtopiaUsers';
const CURRENT_USER_KEY = 'gamingUtopiaCurrentUser';

// --- ELEMENTOS DEL DOM (Autenticación) ---
const authModal = document.getElementById('authModal');
// 💡 MODAL DE PERFIL: Solo Bootstrap
const profileModalElement = document.getElementById('profileModal');

const loginBtn = document.getElementById('loginBtn');
const profileUsernameSpan = document.getElementById('profileUsername');

const loginTab = document.getElementById('loginTab');
const registerTab = document.getElementById('registerTab');
const loginFormDiv = document.getElementById('loginForm');
const registerFormDiv = document.getElementById('registerForm');

const submitLoginBtn = document.getElementById('submitLogin');
const submitRegisterBtn = document.getElementById('submitRegister');
const logoutBtn = document.getElementById('logoutBtn');

// Elementos del modal de perfil
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
const registerDobInput = document.getElementById('registerDob');


// --- GESTIÓN DE LOCAL STORAGE ---

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

// Hacemos esta función global para que script.js la pueda usar
window.getCurrentUser = function() {
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
    const user = window.getCurrentUser();
    const profileIconContainer = document.querySelector('.profile-icon'); 
    const profileIconImg = document.querySelector('.profile-icon img'); 

    if (user) {
        // Usuario logueado: Ocultar Login, Mostrar Perfil
        if (loginBtn) loginBtn.style.display = 'none';
        if (profileIconContainer) profileIconContainer.style.display = 'block'; 
        if (profileUsernameSpan) profileUsernameSpan.textContent = user.username || user.email;

        const userImage = user.profileImage || 'img/perfil.jpg';
        if (profileIconImg) profileIconImg.src = userImage;
        if (modalProfileImage) modalProfileImage.src = userImage;
        
    } else {
        // Sin usuario: Mostrar Login, Ocultar Perfil
        if (loginBtn) loginBtn.style.display = 'block';
        if (profileIconContainer) profileIconContainer.style.display = 'none'; 
    }
}

// --- LÓGICA DE MODALES (Reglas de app.js incluidas) ---

// Abrir Login
if (loginBtn) {
    loginBtn.onclick = () => {
        if (authModal) {
            authModal.style.display = 'block';
            authModal.setAttribute("aria-hidden", "false"); // Regla app.js
        }
        if (loginTab) loginTab.click(); 
    };
}

// Abrir Perfil (Bootstrap)
const profileIconContainer = document.querySelector('.profile-icon');
if (profileIconContainer && profileModalElement) {
    profileIconContainer.onclick = () => {
        const modal = new bootstrap.Modal(profileModalElement);
        modal.show();
    };
}

// Cerrar modales personalizados (X)
document.querySelectorAll('.close-button').forEach(button => {
    button.onclick = function() {
        const modalParent = this.closest('.modal');
        if (modalParent && !modalParent.classList.contains('fade')) {
            modalParent.style.display = 'none';
            modalParent.setAttribute("aria-hidden", "true"); // Regla app.js
        }
    };
});

// REGLA DE APP.JS: Cerrar con click fuera
window.onclick = function(event) {
    if (event.target == authModal) {
        authModal.style.display = 'none';
        authModal.setAttribute("aria-hidden", "true");
    }
    // Nota: El modal de carrito se maneja en script.js, pero la lógica es similar
};

// REGLA DE APP.JS: Cerrar con tecla ESCAPE
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        if (authModal && authModal.style.display === 'block') {
            authModal.style.display = 'none';
            authModal.setAttribute("aria-hidden", "true");
        }
    }
});

// Pestañas Login/Registro
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

// --- CAMBIO DE IMAGEN DE PERFIL ---

function saveNewProfileImage(imageUrl) {
    const currentUser = window.getCurrentUser();
    if (currentUser) {
        currentUser.profileImage = imageUrl;
        setCurrentUser(currentUser);

        const users = loadUsers();
        const userIndex = users.findIndex(u => u.email === currentUser.email);

        if (userIndex !== -1) {
            users[userIndex].profileImage = imageUrl;
            saveUsers(users); 
        }
    }
}

if (changeImageBtn && imageUpload) {
    changeImageBtn.onclick = () => {
        imageUpload.click();
    };
}

if (imageUpload) {
    imageUpload.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert("El archivo es demasiado grande. Selecciona una imagen menor a 5MB.");
                return;
            }
            const reader = new FileReader();
            reader.onload = function(event) {
                const newImageUrl = event.target.result;
                if (modalProfileImage) modalProfileImage.src = newImageUrl;
                const profileIconImg = document.querySelector('.profile-icon img');
                if (profileIconImg) profileIconImg.src = newImageUrl;
                saveNewProfileImage(newImageUrl);
            };
            reader.readAsDataURL(file); 
        }
    };
}

// --- VALIDACIÓN Y REGISTRO ---

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

    if (!registerUserInput || registerUserInput.value.trim().length < 4) {
        showRegisterError('errorRegisterUser', 'El usuario debe tener al menos 4 caracteres.');
        isValid = false;
    } else if (users.some(u => u.username && u.username.toLowerCase() === registerUserInput.value.trim().toLowerCase())) {
        showRegisterError('errorRegisterUser', 'Este nombre de usuario ya está en uso.');
        isValid = false;
    }

    if (!registerEmailInput || !isValidEmail(registerEmailInput.value)) {
        showRegisterError('errorRegisterEmail', 'Formato de correo inválido.');
        isValid = false;
    } else if (users.some(u => u.email && u.email.toLowerCase() === registerEmailInput.value.trim().toLowerCase())) {
        showRegisterError('errorRegisterEmail', 'Este correo ya está registrado.');
        isValid = false;
    }

    if (!registerPasswordInput || registerPasswordInput.value.length < 6) {
        showRegisterError('errorRegisterPassword', 'La contraseña debe tener al menos 6 caracteres.');
        isValid = false;
    }

    if (registerPhoneInput && registerPhoneInput.value.trim() !== '' && !/^\d{7,15}$/.test(registerPhoneInput.value.trim())) {
        showRegisterError('errorRegisterPhone', 'El formato del teléfono es inválido.');
        isValid = false;
    }

    if (registerDobInput && registerDobInput.value) {
        const age = window.calculateAge(registerDobInput.value);
        if (isNaN(age) || age <= 0) {
            showRegisterError('errorRegisterDob', 'Fecha de nacimiento inválida.');
            isValid = false;
        }
    }

    return isValid;
}

if (submitRegisterBtn && registerUserInput && registerEmailInput && registerPasswordInput) {
    submitRegisterBtn.onclick = (e) => {
        e.preventDefault();
        
        if (validateRegistration()) {
            const newUser = {
                username: registerUserInput.value,
                email: registerEmailInput.value,
                password: registerPasswordInput.value, 
                phone: registerPhoneInput ? registerPhoneInput.value : null,
                dob: registerDobInput && registerDobInput.value ? registerDobInput.value : null,
                profileImage: null
            };

            const users = loadUsers();
            users.push(newUser);
            saveUsers(users);
            
            // 🎯 LIMPIAR FORMULARIO DE REGISTRO
            registerUserInput.value = '';
            registerEmailInput.value = '';
            registerPasswordInput.value = '';
            if (registerPhoneInput) registerPhoneInput.value = '';
            document.querySelectorAll('#registerForm .error-message').forEach(el => el.textContent = '');
            
            // 🎯 MOSTRAR ALERTA DE ÉXITO
            alert('✅ ¡Ya estás registrado! Ahora debes iniciar sesión con tu nueva cuenta.');
            
            // 🎯 CAMBIAR A PESTAÑA DE LOGIN
            if (loginTab) loginTab.click();
            
            // 🎯 LIMPIAR CAMPOS DE LOGIN TAMBIÉN
            loginUserEmailInput.value = '';
            loginPasswordInput.value = '';

        } else {
            alert('❌ Por favor, corrija los errores marcados en el formulario de registro.');
        }
    };
}

// --- LOGIN (Redirección a Tienda según reglas de dashboard.js) ---

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
            
            // Regla de dashboard.js: Al iniciar sesión, manda a la tienda
            window.location.href = 'tienda.html';
        } else {
            alert('Credenciales inválidas. Revise su usuario/correo y contraseña.');
        }
    };
}

if (logoutBtn) {
    logoutBtn.onclick = () => {
        setCurrentUser(null);
        const modalInstance = bootstrap.Modal.getInstance(profileModalElement);
        if (modalInstance) {
            modalInstance.hide();
        }
        alert('Sesión cerrada.');
        window.location.href = 'index.html'; // Redirige al inicio al cerrar
    };
}

// Inicializar UI al cargar este script
updateAuthUI();

// --- Modal y funciones globales para verificación de edad ---
// Inserta modal en el DOM si no existe
function ensureAgeModalExists() {
    if (document.getElementById('ageVerifyModal')) return;
    const modal = document.createElement('div');
    modal.id = 'ageVerifyModal';
    modal.style.cssText = `position:fixed; left:0; top:0; right:0; bottom:0; display:none; align-items:center; justify-content:center; background:rgba(0,0,0,0.6); z-index:9999;`;
    modal.innerHTML = `
        <div style="background:#0f0f14; padding:20px; border-radius:10px; width:320px; color:#fff; box-shadow:0 10px 30px rgba(0,0,0,0.6);">
            <h3 style="margin-top:0; color:#8a2be2;">Verificación de edad</h3>
            <p id="ageModalMessage" style="color:#ccc; font-size:0.95em;">Introduce tu fecha de nacimiento:</p>
            <input id="ageInput" type="date" style="width:100%; padding:8px; margin-top:8px; border-radius:6px; border:1px solid rgba(138,43,226,0.12); background:#111; color:#fff;">
            <div style="display:flex; gap:8px; justify-content:flex-end; margin-top:12px;">
                <button id="ageCancelBtn" style="background:transparent; color:#ccc; border:1px solid rgba(255,255,255,0.06); padding:8px 12px; border-radius:6px;">Cancelar</button>
                <button id="ageConfirmBtn" style="background:#8a2be2; color:#fff; border:none; padding:8px 12px; border-radius:6px;">Confirmar</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

window.calculateAge = function(dob) {
    const d = new Date(dob);
    if (isNaN(d.getTime())) return 0;
    const diff = Date.now() - d.getTime();
    const ageDt = new Date(diff);
    return Math.abs(ageDt.getUTCFullYear() - 1970);
}

window.checkAgeVerification = function(user, minAge = 18) {
    try {
        if (!user) return false;
        if (user.dob) {
            return window.calculateAge(user.dob) >= minAge;
        }
        // Fallback to legacy key only valid for adult (>=18) confirmations
        if (user.email) {
            const key = `ageConfirmed_${user.email}`;
            if (minAge <= 18) return localStorage.getItem(key) === 'true';
        }
        return false;
    } catch (e) {
        return false;
    }
}

window.promptForAgeAndSave = function(user, minAge = 18) {
    return new Promise((resolve) => {
        try {
            if (!user) return resolve(false);
            // Si ya tiene dob y cumple la edad requerida, ok
            if (user.dob && window.calculateAge(user.dob) >= minAge) return resolve(true);

            ensureAgeModalExists();
            const modal = document.getElementById('ageVerifyModal');
            const input = document.getElementById('ageInput');
            const confirmBtn = document.getElementById('ageConfirmBtn');
            const cancelBtn = document.getElementById('ageCancelBtn');
            const msg = document.getElementById('ageModalMessage');

            // Ajustar mensaje dinámicamente según minAge
            if (msg) msg.textContent = `Debes tener ${minAge} años o más para comprar este juego. Introduce tu fecha de nacimiento:`;

            input.value = '';
            modal.style.display = 'flex';

            function cleanup() {
                confirmBtn.removeEventListener('click', onConfirm);
                cancelBtn.removeEventListener('click', onCancel);
            }

            function onCancel() {
                cleanup();
                modal.style.display = 'none';
                resolve(false);
            }

            function onConfirm() {
                const val = input.value;
                if (!val) {
                    alert('Por favor selecciona una fecha.');
                    return;
                }
                const age = window.calculateAge(val);
                if (age < minAge) {
                    alert(`Lo siento, debes tener al menos ${minAge} años para comprar este juego.`);
                    cleanup();
                    modal.style.display = 'none';
                    return resolve(false);
                }

                // Guardar DOB en el perfil del usuario
                try {
                    const users = loadUsers();
                    const idx = users.findIndex(u => u.email && user.email && u.email.toLowerCase() === user.email.toLowerCase());
                    if (idx !== -1) {
                        users[idx].dob = val;
                        saveUsers(users);
                        // actualizar usuario actual
                        const updated = users[idx];
                        setCurrentUser(updated);
                    } else if (user.email) {
                        // fallback: guardar llave legacy si minAge <= 18
                        if (minAge <= 18) {
                            const key = `ageConfirmed_${user.email}`;
                            localStorage.setItem(key, 'true');
                        }
                    }
                } catch (e) {
                    console.error('Error guardando fecha de nacimiento:', e);
                }

                cleanup();
                modal.style.display = 'none';
                resolve(true);
            }

            confirmBtn.addEventListener('click', onConfirm);
            cancelBtn.addEventListener('click', onCancel);
        } catch (e) {
            console.error(e);
            resolve(false);
        }
    });
}