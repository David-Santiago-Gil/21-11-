// Script para gestionar reservas en reservas.html

function loadReservations() {
    try {
        return JSON.parse(localStorage.getItem('gamingUtopiaReservations') || '[]');
    } catch (e) {
        return [];
    }
}

function saveReservations(reservations) {
    localStorage.setItem('gamingUtopiaReservations', JSON.stringify(reservations));
}

function updateReserveCount() {
    const reservations = loadReservations();
    const reserveCount = document.getElementById('reserveCount');
    if (reserveCount) {
        reserveCount.textContent = reservations.length;
        if (reservations.length > 0) {
            reserveCount.style.display = 'flex';
        } else {
            reserveCount.style.display = 'none';
        }
    }
}

function renderReservations() {
    const reservations = loadReservations();
    const content = document.getElementById('reservesContent');

    if (reservations.length === 0) {
        content.innerHTML = `
            <div class="empty-state">
                <i class="bi bi-inbox"></i>
                <h3>No tienes reservas</h3>
                <p>Aún no has reservado ningún juego. Revisa los próximos lanzamientos.</p>
                <a href="juegos.html#proximos">Ver Próximos Lanzamientos →</a>
            </div>
        `;
        return;
    }

    content.innerHTML = reservations.map((reserve, idx) => {
        const releaseDate = new Date(reserve.releaseDate || reserve.release);
        const isValid = !isNaN(releaseDate.getTime());
        const formattedDate = isValid ? releaseDate.toLocaleDateString('es-CO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }) : reserve.release || 'Próximamente';

        const daysLeft = isValid ? Math.ceil((releaseDate - new Date()) / (1000 * 60 * 60 * 24)) : null;
        const statusText = daysLeft !== null && daysLeft > 0 
            ? `Lanzamiento en ${daysLeft} días` 
            : daysLeft === 0 
            ? '¡Se lanza hoy!' 
            : 'Ya disponible';

        const statusColor = daysLeft !== null && daysLeft <= 7 ? '#f0ad4e' : '#4CAF50';

        return `
            <div class="reserve-card">
                <div class="reserve-info">
                    <div class="reserve-title">${reserve.name}</div>
                    <div class="reserve-date">
                        <i class="bi bi-calendar-event me-1"></i> ${formattedDate}
                    </div>
                    <div class="reserve-release" style="color: ${statusColor};">
                        <i class="bi bi-clock-history me-1"></i> ${statusText}
                    </div>
                </div>
                <div class="reserve-actions">
                    <button class="btn-cancel-reserve" onclick="cancelReservation(${idx})">
                        <i class="bi bi-trash me-1"></i> Cancelar
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function cancelReservation(index) {
    if (!confirm('¿Deseas cancelar esta reserva?')) return;
    const reservations = loadReservations();
    reservations.splice(index, 1);
    saveReservations(reservations);
    updateReserveCount();
    renderReservations();
}

// Inicializar al cargar
window.addEventListener('load', () => {
    updateReserveCount();
    renderReservations();
    updateAuthUI();
});
