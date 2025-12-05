// Obtener el ID del juego de la URL
const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get('id');

// Detectar si es un juego de próximos lanzamientos
const isUpcomingGame = gameId && /_new|proximo|proximos/i.test(gameId);

// Elementos del DOM
const gameImage = document.getElementById('gameImage');
const gameTitle = document.getElementById('gameTitle');
const gameDescription = document.getElementById('gameDescription');
const gamePlatforms = document.getElementById('gamePlatforms');
const gameRequirements = document.getElementById('gameRequirements');
const gamePrice = document.getElementById('gamePrice');
const gameRating = document.getElementById('gameRating');
const gameReviews = document.getElementById('gameReviews');
const gameGenre = document.getElementById('gameGenre');
const gameYear = document.getElementById('gameYear');
const gameDeveloper = document.getElementById('gameDeveloper');
const gameRelease = document.getElementById('gameRelease');
const gameRatingCard = document.getElementById('gameRatingCard');
const buyButton = document.getElementById('buyButton');
const priceDisplay = document.getElementById('priceDisplay');
const loginMessage = document.getElementById('loginMessage');

// Modal de carrito
const addToCartModal = document.getElementById('addToCartModal');
const modalGameName = document.getElementById('modalGameName');
const modalGamePrice = document.getElementById('modalGamePrice');
const confirmAddToCartBtn = document.getElementById('confirmAddToCartBtn');
const cancelAddToCartBtn = document.getElementById('cancelAddToCartBtn');

// Función para formatear precio
function formatPrice(price) {
    return price === 0 ? 'GRATIS' : 'COP ' + price.toLocaleString('es-CO');
}

// Función para cargar y mostrar el juego
function loadGameDetails() {
    // Verificar si el usuario está logueado
    const currentUser = window.getCurrentUser();
    
    if (!gameId) {
        if (!currentUser) {
            document.querySelector('.game-detail-container').innerHTML = 
                '<div style="padding: 40px; text-align: center; color: #8a2be2;"><h2>Para más información inicie sesión</h2><p>Debes iniciar sesión para ver los detalles del juego.</p><button id="redirectLoginBtn" style="margin-top: 20px; padding: 10px 30px; background: #8a2be2; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 1em;">Ir a Iniciar Sesión</button></div>';
            document.getElementById('redirectLoginBtn').onclick = () => {
                window.location.href = 'index.html';
            };
        } else {
            document.querySelector('.game-detail-container').innerHTML = 
                '<div style="padding: 40px; text-align: center; color: #8a2be2;"><h2>Juego no encontrado</h2><p>Parece que el juego que buscas no existe.</p></div>';
        }
        return;
    }

    const game = getGameById(gameId);
    if (!game) {
        if (!currentUser) {
            document.querySelector('.game-detail-container').innerHTML = 
                '<div style="padding: 40px; text-align: center; color: #8a2be2;"><h2>Para más información inicie sesión</h2><p>Debes iniciar sesión para ver los detalles del juego.</p><button id="redirectLoginBtn" style="margin-top: 20px; padding: 10px 30px; background: #8a2be2; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 1em;">Ir a Iniciar Sesión</button></div>';
            document.getElementById('redirectLoginBtn').onclick = () => {
                window.location.href = 'index.html';
            };
        } else {
            document.querySelector('.game-detail-container').innerHTML = 
                '<div style="padding: 40px; text-align: center; color: #8a2be2;"><h2>Juego no encontrado</h2><p>Parece que el juego que buscas no existe.</p></div>';
        }
        return;
    }

    // Actualizar información básica
    gameImage.src = game.image;
    gameTitle.textContent = game.name;
    gameDescription.textContent = game.description;
    gameRating.textContent = game.rating;
    gameRatingCard.textContent = game.rating;
    gameReviews.textContent = game.reviews;
    gameGenre.textContent = game.genre;
    gameYear.textContent = game.releaseDate;
    gameDeveloper.textContent = game.developer;
    gameRelease.textContent = game.releaseDate;

    // Mostrar precio
    if (isUpcomingGame) {
        // Para próximos lanzamientos: ocultar precio
        priceDisplay.innerHTML = '<div class="game-upcoming-text" style="color: #f0ad4e; font-weight: 600; font-size: 1.2em;">🔔 PRÓXIMAMENTE</div>';
        buyButton.textContent = '📅 Reservar';
        buyButton.classList.add('game-reserve-button');
        buyButton.style.background = 'linear-gradient(135deg, #8a2be2, #4b0082)';
    } else if (game.price === 0) {
        priceDisplay.innerHTML = '<div class="game-free-text">GRATIS</div>';
        buyButton.textContent = '✓ Descargar Gratis';
        buyButton.classList.add('game-free-button');
    } else {
        gamePrice.textContent = formatPrice(game.price);
    }

    // Plataformas
    gamePlatforms.innerHTML = game.platforms
        .map(platform => `<span class="platform-badge">${platform}</span>`)
        .join('');

    // Requisitos del sistema
    const reqsHtml = `
        <div class="requirement-item">
            <div class="requirement-label">Sistema Operativo</div>
            <div class="requirement-value">${game.requirements.os}</div>
        </div>
        <div class="requirement-item">
            <div class="requirement-label">Procesador</div>
            <div class="requirement-value">${game.requirements.processor}</div>
        </div>
        <div class="requirement-item">
            <div class="requirement-label">Memoria RAM</div>
            <div class="requirement-value">${game.requirements.ram}</div>
        </div>
        <div class="requirement-item">
            <div class="requirement-label">Tarjeta Gráfica</div>
            <div class="requirement-value">${game.requirements.graphics}</div>
        </div>
        <div class="requirement-item">
            <div class="requirement-label">Almacenamiento</div>
            <div class="requirement-value">${game.requirements.storage}</div>
        </div>
    `;
    gameRequirements.innerHTML = reqsHtml;

    // Reseñas: cargar sección de reseñas y formulario
    try {
        const infoSection = document.querySelector('.game-info-section');
        if (infoSection) {
            const reviewsHtml = `
                <h3>Reseñas</h3>
                <div id="reviewsList">Cargando reseñas...</div>
                <div id="leaveReview" style="margin-top:20px;"></div>
            `;
            infoSection.insertAdjacentHTML('beforeend', reviewsHtml);
            renderReviews();
        }
    } catch (e) {
        console.error('Error al insertar sección de reseñas', e);
    }

    // Actualizar botón de compra
    modalGameName.textContent = game.name;
    modalGamePrice.textContent = formatPrice(game.price);
}

// Función para manejar el clic en comprar/reservar
buyButton.onclick = async () => {
    const user = window.getCurrentUser();

    if (!user) {
        alert('🔒 Debes iniciar sesión para comprar o reservar.');
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) loginBtn.click();
        return;
    }

    // Verificar edad usando la función global (login.js)
    if (!window.checkAgeVerification(user)) {
        const ok = await window.promptForAgeAndSave(user);
        if (!ok) return;
    }

    const game = getGameById(gameId);
    if (!game) return;

    // Si es un próximo lanzamiento, hacer reserva
    if (isUpcomingGame) {
        addReservation(gameId, game.name);
        buyButton.innerHTML = '<i class="bi bi-check-circle"></i><br>Reservado';
        buyButton.disabled = true;
        buyButton.style.opacity = '0.8';
        buyButton.style.cursor = 'default';
        buyButton.style.pointerEvents = 'none';
        
        const release = game.releaseDate || 'Próximamente';
        alert(`✅ ${game.name} ha sido reservado.\n\n📅 Fecha estimada: ${release}\n\n💌 Te notificaremos cuando esté disponible.`);
        
        // Actualizar contador de reservas
        if (typeof updateReserveCount === 'function') {
            updateReserveCount();
        }
        return;
    }

    // Si no es próximo lanzamiento, mostrar modal de carrito
    addToCartModal.style.display = 'block';
};

// Confirmar agregar al carrito
confirmAddToCartBtn.onclick = () => {
    const game = getGameById(gameId);
    if (game) {
        // Obtener carrito actual
        let cart = JSON.parse(localStorage.getItem('gamingUtopiaCart') || '[]');
        
        // Verificar si el juego ya está en el carrito
        const existingGame = cart.find(item => item.id === game.id);
        
        if (existingGame) {
            alert(`${game.name} ya está en tu carrito.`);
        } else {
            // Agregar al carrito
            cart.push({
                id: game.id,
                name: game.name,
                price: game.price,
                image: game.image,
                quantity: 1
            });
            localStorage.setItem('gamingUtopiaCart', JSON.stringify(cart));
            
            // Actualizar contador del carrito
            updateCartCount();
            
            alert(`✅ ${game.name} ha sido agregado a tu carrito.`);
            addToCartModal.style.display = 'none';
        }
    }
};

// Cancelar carrito
cancelAddToCartBtn.onclick = () => {
    addToCartModal.style.display = 'none';
};

// Cerrar modal con X
document.querySelectorAll('.close-button').forEach(button => {
    button.onclick = function() {
        const modalParent = this.closest('.modal');
        if (modalParent && !modalParent.classList.contains('fade')) {
            modalParent.style.display = 'none';
        }
    };
});

// Función para actualizar el contador del carrito
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('gamingUtopiaCart') || '[]');
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Age verification handled by `js/login.js` (window.checkAgeVerification / window.promptForAgeAndSave)

// --- Reseñas: almacenamiento y renderizado ---
function getReviewsForGame(id) {
    try {
        return JSON.parse(localStorage.getItem(`gameReviews_${id}`) || '[]');
    } catch (e) {
        return [];
    }
}

function saveReviewForGame(id, review) {
    const reviews = getReviewsForGame(id);
    reviews.unshift(review);
    localStorage.setItem(`gameReviews_${id}`, JSON.stringify(reviews));
}

function renderReviews() {
    const listEl = document.getElementById('reviewsList');
    const leaveEl = document.getElementById('leaveReview');
    if (!listEl || !leaveEl) return;
    const reviews = getReviewsForGame(gameId);
    if (reviews.length === 0) {
        listEl.innerHTML = '<p style="color:#ccc;">Aún no hay reseñas. Sé el primero en opinar.</p>';
    } else {
        listEl.innerHTML = reviews.map(r => `
            <div style="border-bottom:1px solid rgba(138,43,226,0.08); padding:10px 0;">
                <strong style="color:#8a2be2;">${r.userName}</strong> <small style="color:#ccc;"> - ${new Date(r.date).toLocaleString()}</small>
                <p style="color:#ddd; margin:6px 0;">${escapeHtml(r.content)}</p>
            </div>
        `).join('');
    }

    const currentUser = window.getCurrentUser();
    if (!currentUser) {
        leaveEl.innerHTML = '<p style="color:#f0ad4e;">Para dejar una reseña debes <a id="openLoginFromReview">iniciar sesión</a>.</p>';
        const btn = document.getElementById('openLoginFromReview');
        if (btn) btn.onclick = () => document.getElementById('loginBtn').click();
        return;
    }

    leaveEl.innerHTML = `
        <textarea id="reviewText" rows="4" style="width:100%; padding:10px; background:#1a1a1a; color:#ddd; border:1px solid rgba(138,43,226,0.15); border-radius:6px;" placeholder="Escribe tu reseña..."></textarea>
        <button id="submitReview" style="margin-top:8px; padding:8px 14px; background:#8a2be2; color:white; border:none; border-radius:6px;">Enviar reseña</button>
    `;

    const submitBtn = document.getElementById('submitReview');
    if (submitBtn) {
        submitBtn.onclick = () => {
            const text = document.getElementById('reviewText').value.trim();
            if (!text) { alert('Escribe algo para publicar tu reseña.'); return; }
            const review = { userName: currentUser.username || currentUser.email, content: text, date: new Date().toISOString() };
            saveReviewForGame(gameId, review);
            document.getElementById('reviewText').value = '';
            renderReviews();
        };
    }
}

function escapeHtml(str) {
    return str.replace(/[&<>"']/g, function(m) { return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"})[m]; });
}

// Función para agregar reserva (desde game-detail.html)
function addReservation(gameId, gameName) {
    const reserved = JSON.parse(localStorage.getItem('gamingUtopiaReservations') || '[]');
    if (reserved.find(r => r.id === gameId)) return;
    const gameData = getGameById(gameId) || {};
    reserved.push({
        id: gameId,
        name: gameName,
        date: new Date().toISOString(),
        release: gameData.releaseDate || 'Próximamente',
        releaseDate: gameData.releaseDate || 'Próximamente'
    });
    localStorage.setItem('gamingUtopiaReservations', JSON.stringify(reserved));
}

// Cerrar login message cuando el usuario se loguea
const originalSetCurrentUser = window.setCurrentUser;
if (originalSetCurrentUser) {
    window.setCurrentUser = function(user) {
        originalSetCurrentUser.call(window, user);
        if (user) {
            loginMessage.classList.remove('show');
        }
    };
}

// Cargar detalles del juego al abrir la página
window.addEventListener('load', () => {
    loadGameDetails();
    updateCartCount();
    updateAuthUI();
});

// Cerrar modales con click fuera
window.onclick = function(event) {
    if (event.target == addToCartModal) {
        addToCartModal.style.display = 'none';
    }
};

// Cerrar modales con ESC
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        addToCartModal.style.display = 'none';
    }
});
