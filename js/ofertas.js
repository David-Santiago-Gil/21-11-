// --- SISTEMA DE OFERTAS DINÁMICAS ---
// Este archivo genera ofertas aleatorias de juegos de la tienda en catalogo.html

(function() {
    'use strict';

    // Base de datos de juegos de tienda.html con sus datos completos
    const juegosTienda = [
        { id: "cod_mw", name: "Call of Duty Modern Warfare", price: 45000, img: "img/Store_GamesPDP_Hero01.png", rating: "4.4 (6 K)" },
        { id: "valorant", name: "Valorant", price: 0, img: "img/ps-f2p-val-console-launch-16x9.jpg", rating: "4.8 (9.1 K)" },
        { id: "mk11", name: "Mortal Kombat 11", price: 19999, img: "img/mortal-kombat-x-1920-x-1080-wallpaper-ui3p8y221sohg42z.jpg", rating: "4.8 (3.1 K)" },
        { id: "fc3", name: "Far Cry 3", price: 43738, img: "img/far-cry-3-background-h18r9jqm76voyl4t.jpg", rating: "4.7 (2.1 K)" },
        { id: "hollow_knight", name: "Hollow Knight", price: 65623, img: "img/Holow.jpg", rating: "4.8(2 K)" },
        { id: "fc26", name: "Ea Sports Fc 26", price: 280608, img: "img/fc.jpeg", rating: "4.9(89 k)" },
        { id: "gta5", name: "Juego Grand Theft Auto V Gta 5", price: 138204, img: "img/gta5.jpeg", rating: "4.6(16 k)" },
        { id: "cuphead", name: "Cuphead", price: 75224, img: "img/cap.jpg", rating: "4.8(1.9 K)" },
        { id: "cs2", name: "Counter-Strike 2", price: 0, img: "img/conter.jpg", rating: "4.4 (6 K)" },
        { id: "fortnite", name: "Fortnite", price: 0, img: "img/fornite.jpeg", rating: "4.4(1.7 K)" },
        { id: "nfs", name: "Need For Speed", price: 219990, img: "img/nfs.png", rating: "4.4(1.9 K)" },
        { id: "lol", name: "League Of Legends", price: 0, img: "img/lol.jpeg", rating: "4.8(4)" },
        { id: "cp2077", name: "Cyberpunk 2077", price: 95000, img: "img/cylv.jpg", rating: "4.5 (10 K)" },
        { id: "elden_ring", name: "Elden Ring", price: 180000, img: "img/elden.jpg", rating: "4.9 (12 K)" },
        { id: "witcher3", name: "The Witcher 3: Wild Hunt", price: 35000, img: "img/thumb-1920-596902.jpg", rating: "4.7 (15 K)" },
        { id: "rocket_league", name: "Rocket League", price: 0, img: "img/rocke.jpg", rating: "4.3 (7 K)" },
        { id: "rdr2", name: "Red Dead Redemption 2", price: 150000, img: "img/red-dead-redemption-2560x1440-10885.jpg", rating: "4.9 (20 K)" },
        { id: "minecraft", name: "Minecraft", price: 90000, img: "img/minecraft.jpg", rating: "4.6 (18 K)" },
        { id: "ac_valhalla", name: "Assassin's Creed Valhalla", price: 80000, img: "img/assassin-s-creed-valhalla-game-intro-6vzkuzi806sg9ded.jpg", rating: "4.2 (5 K)" },
        { id: "fifa23", name: "FIFA 23", price: 25000, img: "img/wp11326330.jpg", rating: "3.8 (1 K)" },
        { id: "insurgency", name: "Insurgency: Sandstorm", price: 110000, img: "img/thumb-1920-1260011.jpg", rating: "4.7 (12 K)" },
        { id: "gow_ragnarok", name: "god of war ragnarok", price: 220000, img: "img/god-of-war-ragnarok-kratos-atreus-2022-games-playstation-4-3840x2160-8636.jpg", rating: "4.9 (20 K)" },
        { id: "hk_silksong", name: "Hollow Knight: Silksong", price: 100000, img: "img/holds.jpg", rating: "4.2 (3 K)" },
        { id: "hl_alyx", name: "Half-Life: Alyx", price: 190000, img: "img/half-life-alyx.jpg", rating: "4.2 (3 K)" },
        { id: "re4_remake", name: "Resident Evil 4 Remake", price: 205000, img: "img/RE4_1A.jpg", rating: "4.2 (3 K)" },
        { id: "kcd2", name: "Kingdom Come: Deliverance 2", price: 230000, img: "img/kingdom-come-deliverance-2-11f6u.jpg", rating: "4.8 (30 K)" },
        { id: "clair_obscur", name: "Clair Obscur: Expedition 33", price: 145000, img: "img/clair-obscur-2560x1080-20843.jpg", rating: "4.8 (30 K)" },
        { id: "trails_sky", name: "Trails in the Sky 1st Chapter", price: 85000, img: "img/maxresdefault.jpg", rating: "4.8 (30 K)" },
        { id: "ff7_rebirth", name: "Final Fantasy VII Rebirth", price: 280000, img: "img/final-fantasy-v-i-i-rebirth-promotional-artwork-6wv58kt23nfsmwsl.jpg", rating: "4.8 (30 K)" },
        { id: "futbol2025", name: "Fútbol Total 2025", price: 165000, img: "img/fot.jpg", rating: "4.0 (18 K)" },
        { id: "fifa24", name: "fifa 24", price: 250000, img: "img/thumb-1920-1332400.jpeg", rating: "4.0 (18 K)" },
        { id: "forza", name: "forza", price: 180000, img: "img/forza.jpg", rating: "4.0 (18 K)" }
    ];

    // Función para calcular descuento aleatorio entre 25% y 75%
    function calcularDescuento() {
        const descuentos = [25, 30, 40, 50, 60, 75];
        return descuentos[Math.floor(Math.random() * descuentos.length)];
    }

    // Función para formatear precio
    function formatPrice(price) {
        if (price === 0) {
            return 'Gratis';
        }
        return `COP ${price.toLocaleString('es-CO')}`;
    }

    // Función para seleccionar 4 juegos aleatorios (sin repetir)
    function seleccionarJuegosAleatorios() {
        // Filtrar solo juegos de pago (precio > 0)
        const juegosDePago = juegosTienda.filter(juego => juego.price > 0);
        
        // Mezclar array usando algoritmo Fisher-Yates
        const juegosMezclados = [...juegosDePago];
        for (let i = juegosMezclados.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [juegosMezclados[i], juegosMezclados[j]] = [juegosMezclados[j], juegosMezclados[i]];
        }
        
        // Tomar los primeros 4
        return juegosMezclados.slice(0, 4);
    }

    // Función para crear la tarjeta HTML de oferta
    function crearTarjetaOferta(juego) {
        const descuento = calcularDescuento();
        const precioOriginal = juego.price;
        const precioConDescuento = Math.round(precioOriginal * (1 - descuento / 100));

        const div = document.createElement('div');
        div.className = 'game-card';
        div.setAttribute('data-id', juego.id);
        div.setAttribute('data-name', juego.name);
        div.setAttribute('data-price', precioConDescuento);

        div.innerHTML = `
            <div style="position: relative;">
                <img src="${juego.img}" alt="${juego.name}" onerror="this.src='https://placehold.co/600x400?text=Juego'">
                <div style="position: absolute; top: 10px; right: 10px; background: linear-gradient(135deg, #e91e63, #ff4081); color: white; padding: 8px 12px; border-radius: 5px; font-weight: bold; font-size: 1.1em; box-shadow: 0 4px 10px rgba(233, 30, 99, 0.5);">
                    -${descuento}%
                </div>
            </div>
            <h3>${juego.name}</h3>
            <p style="text-decoration: line-through; color: #999; margin-bottom: 5px;">${formatPrice(precioOriginal)}</p>
            <p style="color: #4CAF50; font-weight: bold; font-size: 1.2em;">${formatPrice(precioConDescuento)}</p>
            <p class="rating">⭐ ${juego.rating}</p>
        `;

        return div;
    }

    // Función principal para renderizar ofertas
    function renderizarOfertas() {
        const container = document.getElementById('ofertaDinamicaGrid');
        
        if (!container) {
            console.warn('No se encontró el contenedor de ofertas (id: ofertaDinamicaGrid)');
            return;
        }

        // Limpiar contenedor
        container.innerHTML = '';

        // Seleccionar 4 juegos aleatorios
        const juegosSeleccionados = seleccionarJuegosAleatorios();

        // Crear y agregar tarjetas
        juegosSeleccionados.forEach(juego => {
            const tarjeta = crearTarjetaOferta(juego);
            container.appendChild(tarjeta);
        });

        console.log('✅ Ofertas dinámicas cargadas:', juegosSeleccionados.length);
    }

    // Ejecutar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderizarOfertas);
    } else {
        renderizarOfertas();
    }

})();