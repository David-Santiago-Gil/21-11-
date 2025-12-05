// --------------------------------------------------------------
// js/security.js (Antes dashboard.js)
// Función: Proteger el acceso a la tienda y gestionar la seguridad
// --------------------------------------------------------------

(function () {
  const CURRENT_USER_KEY = 'gamingUtopiaCurrentUser';

  // Verifica si el usuario está autenticado
  function isAuthenticated() {
      try {
          const user = localStorage.getItem(CURRENT_USER_KEY);
          return user ? JSON.parse(user) : null;
      } catch (e) {
          return null;
      }
  }

  // 1. PROTECCIÓN DE PÁGINA: Si estamos en tienda.html sin sesión, sacar al usuario
  if (window.location.pathname.includes('tienda.html')) {
      if (!isAuthenticated()) {
          alert("🔒 Acceso restringido: Debes iniciar sesión para ver la Tienda.");
          window.location.href = "index.html";
      }
  }

  // 2. INTERCEPCIÓN DE CLICS: Evitar que se abra la tienda desde el menú si no hay sesión
  document.addEventListener("DOMContentLoaded", () => {
      // Busca todos los enlaces que lleven a tienda.html
      const storeLinks = document.querySelectorAll('a[href*="tienda.html"]');

      storeLinks.forEach(link => {
          link.addEventListener('click', (e) => {
              if (!isAuthenticated()) {
                  e.preventDefault(); // Detiene la navegación
                  alert("🔒 Debes iniciar sesión para acceder a la Tienda.");
                  
                  // Abrir modal de login si existe en la página actual
                  const authModal = document.getElementById('authModal');
                  const loginTab = document.getElementById('loginTab');
                  
                  if (authModal) {
                      authModal.style.display = 'block';
                      authModal.setAttribute("aria-hidden", "false");
                      if (loginTab) loginTab.click();
                  }
              }
          });
      });
  });

})();