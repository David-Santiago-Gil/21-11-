// Script para manejar las tarjetas de juegos en tienda.html
// Añade botones transparentes para información y compra

// Mapeo de IDs alternativos a IDs canónicos
const ID_MAPPING = {
    'game-1': 'cod_mw',
    'game-2': 'valorant',
    'game-3': 'mk11',
    'game-4': 'fc3',
    'cs2_juegos': 'cs2',
    'arc_raiders_new': 'arc_raiders',
    'battlefield6_new': 'battlefield6',
    'cod_cat': 'cod_mw',
    'insurgency_cat': 'insurgency',
    'nfs_cat': 'nfs',
    'mk11_cat': 'mk11',
    'gow_cat': 'gow_ragnarok',
    'hk_silksong_cat': 'hk_silksong',
    'hl_alyx_cat': 'hl_alyx',
    're4_cat': 're4_remake',
    'kcd2_cat': 'kcd2',
    'clair_cat': 'clair_obscur',
    'trails_cat': 'trails_sky',
    'ff7_cat': 'ff7_rebirth',
    'futbol2025_cat': 'futbol2025',
    'fifa24_cat': 'fifa24',
    'forza_cat': 'forza',
    'fc26_cat': 'fc26',
    'f2p-lol': 'lol',
    'f2p-cs2': 'cs2',
    'f2p-leyendas': 'lol',
    'f2p-estrategia': 'lol'
};

function normalizeGameId(gameId) {
    return ID_MAPPING[gameId] || gameId;
}

document.addEventListener('DOMContentLoaded', () => {
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
        // Obtener datos de la tarjeta
        let gameId = card.getAttribute('data-id');
        const gameName = card.getAttribute('data-name');
        const gamePrice = card.getAttribute('data-price');
        
        // Normalizar el ID
        gameId = normalizeGameId(gameId);
        
        // Crear contenedor para los botones transparentes
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'game-card-buttons';
        buttonContainer.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            top: 0;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        // Botón de información (izquierda)
        const infoButton = document.createElement('button');
        infoButton.className = 'game-card-btn game-info-btn';
        infoButton.innerHTML = '<i class="bi bi-info-circle"></i><br>Información';
        infoButton.style.cssText = `
            background: linear-gradient(135deg, rgba(138, 43, 226, 0.8), rgba(74, 0, 130, 0.8));
            color: white;
            border: none;
            padding: 0;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: 0.85em;
            font-weight: 600;
            transition: all 0.3s;
            border-radius: 0;
            gap: 5px;
        `;
        
        // Botón de compra (derecha)
        const buyButton = document.createElement('button');
        buyButton.className = 'game-card-btn game-buy-btn';
        // Detectar si es lanzamiento próximo (el id original puede contener '_new')
        const originalId = card.getAttribute('data-id') || '';
        const isUpcoming = /_new|proximo|proximos|proximo/i.test(originalId);
        buyButton.innerHTML = isUpcoming ? '<i class="bi bi-calendar-check"></i><br>Reservar' : '<i class="bi bi-shopping-cart"></i><br>Comprar';

        // Si ya fue reservado previamente, mostrar estado reservado
        try {
            const reservations = JSON.parse(localStorage.getItem('gamingUtopiaReservations') || '[]');
            if (reservations.find(r => r.id === gameId)) {
                buyButton.innerHTML = '<i class="bi bi-check-circle"></i><br>Reservado';
                buyButton.disabled = true;
                buyButton.style.opacity = '0.8';
                buyButton.style.cursor = 'default';
            }
        } catch (e) {
            // ignore
        }
        buyButton.style.cssText = `
            background: linear-gradient(135deg, rgba(220, 53, 69, 0.8), rgba(200, 35, 51, 0.8));
            color: white;
            border: none;
            padding: 0;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: 0.85em;
            font-weight: 600;
            transition: all 0.3s;
            border-radius: 0;
            gap: 5px;
        `;
        
        // Efectos hover para botones
        infoButton.addEventListener('mouseenter', () => {
            infoButton.style.background = 'linear-gradient(135deg, rgba(138, 43, 226, 1), rgba(74, 0, 130, 1))';
            infoButton.style.transform = 'scale(1.05)';
        });
        
        infoButton.addEventListener('mouseleave', () => {
            infoButton.style.background = 'linear-gradient(135deg, rgba(138, 43, 226, 0.8), rgba(74, 0, 130, 0.8))';
            infoButton.style.transform = 'scale(1)';
        });
        
        buyButton.addEventListener('mouseenter', () => {
            buyButton.style.background = 'linear-gradient(135deg, rgba(220, 53, 69, 1), rgba(200, 35, 51, 1))';
            buyButton.style.transform = 'scale(1.05)';
        });
        
        buyButton.addEventListener('mouseleave', () => {
            buyButton.style.background = 'linear-gradient(135deg, rgba(220, 53, 69, 0.8), rgba(200, 35, 51, 0.8))';
            buyButton.style.transform = 'scale(1)';
        });
        
        // Evento click información
        infoButton.addEventListener('click', (e) => {
            e.stopPropagation();
            window.location.href = `juego-detalle.html?id=${gameId}`;
        });
        
        // Evento click compra/reserva
        buyButton.addEventListener('click', (e) => {
            e.stopPropagation();
            handleBuyClick(gameId, gameName, gamePrice, isUpcoming, buyButton);
        });
        
        // Agregar botones al contenedor
        buttonContainer.appendChild(infoButton);
        buttonContainer.appendChild(buyButton);
        
        // Hacer la tarjeta position: relative para que el buttonContainer sea absoluto dentro de ella
        card.style.position = 'relative';
        
        // Agregar botones a la tarjeta
        card.appendChild(buttonContainer);
        
        // Mostrar botones al hover
        card.addEventListener('mouseenter', () => {
            buttonContainer.style.opacity = '1';
            buttonContainer.style.pointerEvents = 'auto';
        });
        
        card.addEventListener('mouseleave', () => {
            buttonContainer.style.opacity = '0';
            buttonContainer.style.pointerEvents = 'none';
        });
        
        // Inicialmente los botones no son clickeables
        buttonContainer.style.pointerEvents = 'none';
    });
});

// Función para manejar el clic de compra
async function handleBuyClick(gameId, gameName, gamePrice, isUpcoming = false, buyButtonEl = null) {
    const user = window.getCurrentUser();
    const gamePrice_num = parseInt(gamePrice);

    // Si no hay sesión, pedir iniciar sesión y abrir modal
    if (!user) {
        alert('🔒 Debes iniciar sesión para comprar o reservar.');
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) loginBtn.click();
        return;
    }

    // Validar edad (requerido para comprar/reservar) usando función global
    if (!window.checkAgeVerification(user)) {
        const ok = await window.promptForAgeAndSave(user);
        if (!ok) return; // menor de edad o cancelado
    }

    // Si es lanzamiento próximo -> SOLO reservar, NO carrito
    if (isUpcoming) {
        // Registrar reserva en almacenamiento separado
        addReservation(gameId, gameName);
        
        // Actualizar UI del botón
        if (buyButtonEl) {
            buyButtonEl.innerHTML = '<i class="bi bi-check-circle"></i><br>Reservado';
            buyButtonEl.disabled = true;
            buyButtonEl.style.opacity = '0.8';
            buyButtonEl.style.cursor = 'default';
            // Remover hover effects
            buyButtonEl.style.pointerEvents = 'none';
        }
        
        // Obtener info de lanzamiento
        const gameData = getGameById(gameId) || {};
        const release = gameData.releaseDate || 'Próximamente';
        alert(`✅ ${gameName} ha sido reservado.\n\n📅 Fecha estimada: ${release}\n\n💌 Te notificaremos cuando esté disponible.`);
        return;
    }

    // Para juegos NO próximos -> mostrar modal de carrito
    const modalGameName = document.getElementById('modalGameName');
    const modalGamePrice = document.getElementById('modalGamePrice');
    const addToCartModal = document.getElementById('addToCartModal');

    if (modalGameName) {
        modalGameName.textContent = gameName;
        const priceText = gamePrice_num === 0 ? 'GRATIS' : 'COP ' + gamePrice_num.toLocaleString('es-CO');
        modalGamePrice.textContent = priceText;
    }

    if (addToCartModal) {
        // Actualizar el evento de confirmación
        const confirmBtn = document.getElementById('confirmAddToCartBtn');
        if (confirmBtn) {
            // Remover evento anterior
            const newConfirmBtn = confirmBtn.cloneNode(true);
            confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);

            newConfirmBtn.onclick = () => {
                addToCart(gameId, gameName, gamePrice_num);
            };
        }

        addToCartModal.style.display = 'block';
    }
}

// Age verification handled by `js/login.js` (window.checkAgeVerification / window.promptForAgeAndSave)

// Reservas
function addReservation(gameId, gameName) {
    const reserved = JSON.parse(localStorage.getItem('gamingUtopiaReservations') || '[]');
    if (reserved.find(r => r.id === gameId)) return;
    const gameData = getGameById(gameId) || {};
    reserved.push({
        id: gameId,
        name: gameName,
        date: new Date().toISOString(),
        release: gameData.releaseDate || 'Próximamente'
    });
    localStorage.setItem('gamingUtopiaReservations', JSON.stringify(reserved));
    
    // Actualizar contador de reservas en la UI (si existe función en reservas.js)
    if (typeof updateReserveCount === 'function') {
        updateReserveCount();
    }
}

// Función para validar y limpiar el carrito de entradas inválidas
function validateAndCleanCart() {
    const cart = JSON.parse(localStorage.getItem('gamingUtopiaCart') || '[]');
    const cleanedCart = cart.filter(item => {
        // Remover items sin precio válido o sin ID
        return item.id && item.price !== null && item.price !== undefined && !isNaN(item.price) && item.price >= 0;
    });
    
    if (cleanedCart.length !== cart.length) {
        localStorage.setItem('gamingUtopiaCart', JSON.stringify(cleanedCart));
        updateCartCount();
        console.log(`🧹 Carrito limpiado. Se removieron ${cart.length - cleanedCart.length} item(s) inválido(s).`);
    }
    return cleanedCart;
}

// Función para vaciar completamente el carrito (útil para limpiar entradas antiguas)
function clearEntireCart() {
    localStorage.setItem('gamingUtopiaCart', JSON.stringify([]));
    updateCartCount();
    console.log('🗑️ Carrito completamente vaciado.');
}

// Función para agregar al carrito
function addToCart(gameId, gameName, gamePrice) {
    // Validar que el precio sea válido (no undefined, no NaN, mayor o igual a 0)
    if (gamePrice === undefined || gamePrice === null || isNaN(gamePrice) || gamePrice < 0) {
        alert('⚠️ Este juego no puede ser agregado al carrito. Precio inválido.');
        return;
    }

    const cart = JSON.parse(localStorage.getItem('gamingUtopiaCart') || '[]');
    const user = window.getCurrentUser();

    // Verificar si el juego ya está en el carrito
    const existingGame = cart.find(item => item.id === gameId);
    
    if (existingGame) {
        alert(`${gameName} ya está en tu carrito.`);
        return;
    }
    
    // Obtener la imagen del juego
    const gameData = getGameById(gameId);
    const gameImage = gameData ? gameData.image : 'img/default.jpg';
    
    // Agregar al carrito
    cart.push({
        id: gameId,
        name: gameName,
        price: gamePrice,
        image: gameImage,
        quantity: 1
    });
    
    localStorage.setItem('gamingUtopiaCart', JSON.stringify(cart));
    
    // Actualizar contador
    updateCartCount();
    
    // Cerrar modal
    const addToCartModal = document.getElementById('addToCartModal');
    if (addToCartModal) {
        addToCartModal.style.display = 'none';
    }
    
    alert(`✅ ${gameName} ha sido agregado a tu carrito.`);
}

// Función para actualizar contador del carrito
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('gamingUtopiaCart') || '[]');
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        cartCount.textContent = cart.length;
        if (cart.length > 0) {
            cartCount.style.display = 'block';
        }
    }
}

// Inicializar al cargar
window.addEventListener('load', () => {
    validateAndCleanCart();
    updateCartCount();
});
