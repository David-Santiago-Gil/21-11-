// Datos completos de todos los juegos
const GAMES_DATA = {
    cod_mw: {
        id: 'cod_mw',
        name: 'Call of Duty Modern Warfare',
        price: 45000,
        image: 'img/Store_GamesPDP_Hero01.png',
        rating: 4.4,
        reviews: '6 K',
        platforms: ['PC', 'PlayStation 5', 'Xbox Series X|S'],
        description: 'Call of Duty: Modern Warfare es un videojuego de disparos en primera persona que redefine el género. Vive una experiencia de campaña cinematográfica, multijugador dinámico y modos cooperativos épicos.',
        developer: 'Infinity Ward',
        releaseDate: '2019',
        genre: 'Acción, Shooter',
        requirements: {
            os: 'Windows 10/11 64-bit',
            processor: 'Intel Core i5-2500K / AMD Ryzen 5 1600',
            ram: '8 GB',
            graphics: 'NVIDIA GTX 670 / GTX 1650 / AMD Radeon HD 7970',
            storage: '175 GB'
        }
    },
    valorant: {
        id: 'valorant',
        name: 'Valorant',
        price: 0,
        image: 'img/ps-f2p-val-console-launch-16x9.jpg',
        rating: 4.8,
        reviews: '9.1 K',
        platforms: ['PC', 'Mobile (próximamente)'],
        description: 'Valorant es un juego de disparos táctico en equipo donde la precisión, el trabajo en equipo y la estrategia son claves. Compite en igualdad de condiciones con personajes únicos llamados Agentes.',
        developer: 'Riot Games',
        releaseDate: '2020',
        genre: 'Acción, Shooter Táctico',
        requirements: {
            os: 'Windows 7, 8, 10 o 11 64-bit',
            processor: 'Intel 2.4 GHz o AMD FX-8350',
            ram: '4 GB',
            graphics: 'Intel HD Graphics 4000 / AMD Radeon R7 200',
            storage: '20 GB'
        }
    },
    mk11: {
        id: 'mk11',
        name: 'Mortal Kombat 11',
        price: 19999,
        image: 'img/mortal-kombat-x-1920-x-1080-wallpaper-ui3p8y221sohg42z.jpg',
        rating: 4.8,
        reviews: '3.1 K',
        platforms: ['PC', 'PlayStation 4', 'Xbox One', 'Nintendo Switch'],
        description: 'Mortal Kombat 11 es el último capítulo de la legendaria serie de lucha. Domina a 25 luchadores únicos, desentraña una trama épica y participa en intensos combates multijugador.',
        developer: 'NetherRealm Studios',
        releaseDate: '2019',
        genre: 'Lucha, Acción',
        requirements: {
            os: 'Windows 10 64-bit',
            processor: 'Intel Core i5-9600K / AMD Ryzen 5 2600X',
            ram: '8 GB',
            graphics: 'NVIDIA GTX 1060 / AMD RX 580',
            storage: '150 GB'
        }
    },
    fc3: {
        id: 'fc3',
        name: 'Far Cry 3',
        price: 43738,
        image: 'img/far-cry-3-background-h18r9jqm76voyl4t.jpg',
        rating: 4.7,
        reviews: '2.1 K',
        platforms: ['PC', 'PlayStation 3', 'Xbox 360'],
        description: 'Far Cry 3 es un videojuego de disparos en primera persona donde exploras una isla tropical llena de peligros. Deberás usar toda tu astucia para sobrevivir en una isla controlada por piratas.',
        developer: 'Ubisoft Montreal',
        releaseDate: '2012',
        genre: 'Acción, Aventura, Shooter',
        requirements: {
            os: 'Windows XP, Vista, 7, 8 o 10',
            processor: 'Intel Core 2 Duo @ 2 GHz / AMD Athlon 64 X2 2 GHz',
            ram: '2 GB',
            graphics: 'NVIDIA GeForce 8800 / ATI Radeon HD 2900',
            storage: '10 GB'
        }
    },
    hollow_knight: {
        id: 'hollow_knight',
        name: 'Hollow Knight',
        price: 65623,
        image: 'img/Holow.jpg',
        rating: 4.8,
        reviews: '2 K',
        platforms: ['PC', 'Nintendo Switch', 'PlayStation 4', 'Xbox One'],
        description: 'Hollow Knight es un metroidvania clásico donde navegas por un antiguo reino de insectos. Explora ciudades subterráneas, aprende nuevas habilidades y derrota jefes desafiantes.',
        developer: 'Team Cherry',
        releaseDate: '2017',
        genre: 'Acción, Aventura, Indie',
        requirements: {
            os: 'Windows XP SP3, Vista, 7, 8 o 10',
            processor: 'Intel Pentium 4 @ 1.8 GHz',
            ram: '1 GB',
            graphics: 'GeForce3',
            storage: '3 GB'
        }
    },
    fc26: {
        id: 'fc26',
        name: 'EA Sports FC 26',
        price: 280608,
        image: 'img/fc.jpeg',
        rating: 4.9,
        reviews: '89 K',
        platforms: ['PC', 'PlayStation 5', 'Xbox Series X|S', 'PlayStation 4', 'Xbox One'],
        description: 'EA Sports FC 26 es el juego de fútbol más realista jamás creado. Construye tu equipo de sueños, compite en FUT (Football Ultimate Team) y vive la emoción del fútbol profesional.',
        developer: 'EA Sports',
        releaseDate: '2024',
        genre: 'Deportes, Fútbol',
        requirements: {
            os: 'Windows 10/11 64-bit',
            processor: 'Intel Core i5-6600K / AMD Ryzen 5 1600',
            ram: '8 GB',
            graphics: 'NVIDIA GTX 750 / AMD Radeon R9 270X',
            storage: '50 GB'
        }
    },
    gta5: {
        id: 'gta5',
        name: 'Grand Theft Auto V (GTA 5)',
        price: 138204,
        image: 'img/gta5.jpeg',
        rating: 4.6,
        reviews: '16 K',
        platforms: ['PC', 'PlayStation 4', 'PlayStation 5', 'Xbox One', 'Xbox Series X|S'],
        description: 'Grand Theft Auto V es un juego de acción aventura de mundo abierto. Juega como tres protagonistas diferentes en la ciudad de Los Santos, donde el crimen, el caos y la oportunidad te esperan.',
        developer: 'Rockstar Games',
        releaseDate: '2013',
        genre: 'Acción, Aventura, Mundo Abierto',
        requirements: {
            os: 'Windows 10/11 64-bit',
            processor: 'Intel Core i7-9700K / AMD Ryzen 5 3600',
            ram: '16 GB',
            graphics: 'NVIDIA RTX 2080 / AMD RX 5700 XT',
            storage: '87 GB'
        }
    },
    cuphead: {
        id: 'cuphead',
        name: 'Cuphead',
        price: 75224,
        image: 'img/cap.jpg',
        rating: 4.8,
        reviews: '1.9 K',
        platforms: ['PC', 'Nintendo Switch', 'PlayStation 4', 'Xbox One'],
        description: 'Cuphead es un juego de acción retro inspirado en los dibujos animados de los años 30. Corre y dispara contra enemigos inventivos en batallas de jefes desafiantes y emocionantes.',
        developer: 'Studio MDHR',
        releaseDate: '2017',
        genre: 'Acción, Aventura, Indie',
        requirements: {
            os: 'Windows Vista, 7, 8, 10 o 11',
            processor: 'Intel Pentium 4 @ 1.8 GHz',
            ram: '2 GB',
            graphics: 'GeForce3 / Radeon 8500',
            storage: '5 GB'
        }
    },
    cs2: {
        id: 'cs2',
        name: 'Counter-Strike 2',
        price: 0,
        image: 'img/conter.jpg',
        rating: 4.4,
        reviews: '6 K',
        platforms: ['PC'],
        description: 'Counter-Strike 2 es el sucesor del legendario Counter-Strike: Global Offensive. Compite en equipos de 5 contra 5 en intensas batallas tácticas. ¡Gratis para jugar!',
        developer: 'Valve',
        releaseDate: '2023',
        genre: 'Acción, Shooter Táctico',
        requirements: {
            os: 'Windows 10/11 64-bit',
            processor: 'Intel Core 2 Duo E8400',
            ram: '2 GB',
            graphics: 'Intel HD Graphics 5500 / GeForce GT 1030',
            storage: '40 GB'
        }
    },
    fortnite: {
        id: 'fortnite',
        name: 'Fortnite',
        price: 0,
        image: 'img/fornite.jpeg',
        rating: 4.4,
        reviews: '1.7 K',
        platforms: ['PC', 'PlayStation', 'Xbox', 'Nintendo Switch', 'Mobile'],
        description: 'Fortnite es un juego de batalla real donde 100 jugadores compiten para ser el último sobreviviente. Construye, lucha y busca botín en un mapa dinámico que cambia constantemente.',
        developer: 'Epic Games',
        releaseDate: '2017',
        genre: 'Acción, Aventura, Battle Royale',
        requirements: {
            os: 'Windows 7/8/10/11 64-bit',
            processor: 'Intel Core i5-7600K / AMD Ryzen 5 1600',
            ram: '8 GB',
            graphics: 'NVIDIA GTX 960 / AMD Radeon RX 480',
            storage: '90 GB'
        }
    },
    nfs: {
        id: 'nfs',
        name: 'Need For Speed',
        price: 219990,
        image: 'img/nfs.png',
        rating: 4.4,
        reviews: '1.9 K',
        platforms: ['PC', 'PlayStation 4', 'Xbox One'],
        description: 'Need for Speed es un juego de carreras de mundo abierto donde personalizas tus vehículos y compites en emocionantes carreras nocturnas. Vive la vida del corredor callejero.',
        developer: 'Ghost Games',
        releaseDate: '2015',
        genre: 'Carreras, Acción',
        requirements: {
            os: 'Windows Vista, 7, 8, 10 o 11 64-bit',
            processor: 'Intel Core i5-750 / AMD Phenom II X4',
            ram: '8 GB',
            graphics: 'NVIDIA GTX 650 / AMD Radeon HD 7770',
            storage: '20 GB'
        }
    },
    lol: {
        id: 'lol',
        name: 'League Of Legends',
        price: 0,
        image: 'img/lol.jpeg',
        rating: 4.5,
        reviews: '8.2 K',
        platforms: ['PC'],
        description: 'League of Legends es un MOBA (Multiplayer Online Battle Arena) de equipo. Controla un campeón único con habilidades especiales y trabaja con tu equipo para destruir la base enemiga.',
        developer: 'Riot Games',
        releaseDate: '2009',
        genre: 'Acción, MOBA, Estrategia',
        requirements: {
            os: 'Windows 7, 8, 10 o 11 32/64-bit',
            processor: 'Intel Pentium 4 @ 1.8 GHz',
            ram: '512 MB',
            graphics: 'Radeon 8500 / GeForce4 MX',
            storage: '8 GB'
        }
    },
    cp2077: {
        id: 'cp2077',
        name: 'Cyberpunk 2077',
        price: 95000,
        image: 'img/cylv.jpg',
        rating: 4.5,
        reviews: '10 K',
        platforms: ['PC', 'PlayStation 4', 'PlayStation 5', 'Xbox One', 'Xbox Series X|S'],
        description: 'Cyberpunk 2077 es un juego de rol de acción de mundo abierto ambientado en una metrópolis futurista. Crea tu personaje y vive una historia épica en el año 2077.',
        developer: 'CD Projekt Red',
        releaseDate: '2020',
        genre: 'RPG, Acción, Aventura',
        requirements: {
            os: 'Windows 10 64-bit',
            processor: 'Intel Core i7-9700 / AMD Ryzen 5 3600',
            ram: '20 GB',
            graphics: 'NVIDIA RTX 2070 / AMD RX 5700 XT',
            storage: '160 GB'
        }
    },
    elden_ring: {
        id: 'elden_ring',
        name: 'Elden Ring',
        price: 180000,
        image: 'img/elden.jpg',
        rating: 4.9,
        reviews: '12 K',
        platforms: ['PC', 'PlayStation 4', 'PlayStation 5', 'Xbox One', 'Xbox Series X|S'],
        description: 'Elden Ring es un videojuego de rol de acción desafiante con un mundo abierto para explorar. Enfrenta enemigos formidables, descubre misterios ocultos y domina poderosos hechizos.',
        developer: 'FromSoftware',
        releaseDate: '2022',
        genre: 'RPG, Acción, Aventura',
        requirements: {
            os: 'Windows 10/11 64-bit',
            processor: 'Intel Core i7-10700 / AMD Ryzen 5 3600',
            ram: '12 GB',
            graphics: 'NVIDIA RTX 2080 / AMD RX 5700 XT',
            storage: '60 GB'
        }
    },
    witcher3: {
        id: 'witcher3',
        name: 'The Witcher 3: Wild Hunt',
        price: 35000,
        image: 'img/thumb-1920-596902.jpg',
        rating: 4.7,
        reviews: '15 K',
        platforms: ['PC', 'PlayStation 4', 'Xbox One', 'Nintendo Switch'],
        description: 'The Witcher 3: Wild Hunt es una aventura de fantasía épica. Juega como Geralt of Rivia, un cazador de monstruos profesional, en un mundo vasto y hermoso lleno de giros inesperados.',
        developer: 'CD Projekt Red',
        releaseDate: '2015',
        genre: 'RPG, Acción, Aventura',
        requirements: {
            os: 'Windows 10/11 64-bit',
            processor: 'Intel Core i7-8700 / AMD Ryzen 5 2600',
            ram: '8 GB',
            graphics: 'NVIDIA GTX 1080 / AMD RX 480',
            storage: '150 GB'
        }
    },
    rocket_league: {
        id: 'rocket_league',
        name: 'Rocket League',
        price: 0,
        image: 'img/rocke.jpg',
        rating: 4.3,
        reviews: '7 K',
        platforms: ['PC', 'PlayStation 4', 'PlayStation 5', 'Xbox One', 'Xbox Series X|S', 'Nintendo Switch'],
        description: 'Rocket League es un videojuego de deportes futurista que combina fútbol con vehículos. Juega en equipos de 1 contra 1, 2 contra 2 o 3 contra 3 en emocionantes partidas de 5 minutos.',
        developer: 'Psyonix',
        releaseDate: '2015',
        genre: 'Deportes, Acción',
        requirements: {
            os: 'Windows 7/8/10/11 64-bit',
            processor: 'Intel Core i5-6600K / AMD Ryzen 5 1600',
            ram: '8 GB',
            graphics: 'NVIDIA GTX 960 / AMD Radeon R9 290',
            storage: '20 GB'
        }
    },
    rdr2: {
        id: 'rdr2',
        name: 'Red Dead Redemption 2',
        price: 150000,
        image: 'img/red-dead-redemption-2560x1440-10885.jpg',
        rating: 4.9,
        reviews: '20 K',
        platforms: ['PC', 'PlayStation 4', 'Xbox One'],
        description: 'Red Dead Redemption 2 es una aventura épica de mundo abierto ambientada en el Oeste Americano. Vive como Arthur Morgan, un miembro de una pandilla de forajidos, en una historia cautivadora.',
        developer: 'Rockstar Games',
        releaseDate: '2018',
        genre: 'Acción, Aventura, Mundo Abierto',
        requirements: {
            os: 'Windows 10/11 64-bit',
            processor: 'Intel Core i7-9700K / AMD Ryzen 5 3600',
            ram: '16 GB',
            graphics: 'NVIDIA RTX 2070 / AMD RX 5700 XT',
            storage: '150 GB'
        }
    },
    minecraft: {
        id: 'minecraft',
        name: 'Minecraft',
        price: 90000,
        image: 'img/minecraft.jpg',
        rating: 4.6,
        reviews: '18 K',
        platforms: ['PC', 'PlayStation 4', 'Xbox One', 'Nintendo Switch', 'Mobile'],
        description: 'Minecraft es un juego de construcción y exploración de sandbox donde puedes crear prácticamente cualquier cosa. Explora mundos generados proceduralmente, construye estructuras y sobrevive contra monstruos.',
        developer: 'Mojang Studios',
        releaseDate: '2009',
        genre: 'Sandbox, Construcción, Aventura',
        requirements: {
            os: 'Windows 7/8/10/11 32/64-bit',
            processor: 'Intel Core i3-8100 / AMD Ryzen 3 1200',
            ram: '4 GB',
            graphics: 'Intel UHD Graphics 630 / AMD Radeon Vega 3',
            storage: '3 GB'
        }
    },
    ac_valhalla: {
        id: 'ac_valhalla',
        name: 'Assassin\'s Creed Valhalla',
        price: 80000,
        image: 'img/assassin-s-creed-valhalla-game-intro-6vzkuzi806sg9ded.jpg',
        rating: 4.2,
        reviews: '5 K',
        platforms: ['PC', 'PlayStation 4', 'PlayStation 5', 'Xbox One', 'Xbox Series X|S'],
        description: 'Assassin\'s Creed Valhalla es una epopeya de acción ambientada en la era vikinga. Encarna a Eivor, un legendario vikingo, y lidera tus fuerzas en una búsqueda de gloria y venganza.',
        developer: 'Ubisoft Montreal',
        releaseDate: '2020',
        genre: 'Acción, Aventura, RPG',
        requirements: {
            os: 'Windows 10/11 64-bit',
            processor: 'Intel Core i7-9700K / AMD Ryzen 5 3600',
            ram: '16 GB',
            graphics: 'NVIDIA RTX 2080 / AMD RX 5700 XT',
            storage: '85 GB'
        }
    },
    fifa23: {
        id: 'fifa23',
        name: 'FIFA 23',
        price: 25000,
        image: 'img/wp11326330.jpg',
        rating: 3.8,
        reviews: '1 K',
        platforms: ['PC', 'PlayStation 4', 'PlayStation 5', 'Xbox One', 'Xbox Series X|S', 'Nintendo Switch'],
        description: 'FIFA 23 es el último juego de la serie de fútbol FIFA. Crea tu equipo de sueños en FUT, compite online y disfruta de la emoción del fútbol profesional.',
        developer: 'EA Sports',
        releaseDate: '2022',
        genre: 'Deportes, Fútbol',
        requirements: {
            os: 'Windows 10/11 64-bit',
            processor: 'Intel Core i5-6600K / AMD Ryzen 5 1600',
            ram: '8 GB',
            graphics: 'NVIDIA GTX 750 / AMD Radeon R9 270X',
            storage: '50 GB'
        }
    },
    insurgency: {
        id: 'insurgency',
        name: 'Insurgency: Sandstorm',
        price: 110000,
        image: 'img/thumb-1920-1260011.jpg',
        rating: 4.7,
        reviews: '12 K',
        platforms: ['PC', 'PlayStation 4', 'Xbox One'],
        description: 'Insurgency: Sandstorm es un juego de disparos táctico hardcore donde el trabajo en equipo y la comunicación son esenciales. Participa en intensas batallas con objetivos dinámicos.',
        developer: 'New World Interactive',
        releaseDate: '2019',
        genre: 'Acción, Shooter Táctico',
        requirements: {
            os: 'Windows 7/8/10/11 64-bit',
            processor: 'Intel Core i7-6700K / AMD Ryzen 5 1600',
            ram: '8 GB',
            graphics: 'NVIDIA GTX 1080 / AMD RX Vega 56',
            storage: '50 GB'
        }
    },
    gow_ragnarok: {
        id: 'gow_ragnarok',
        name: 'God of War Ragnarök',
        price: 220000,
        image: 'img/god-of-war-ragnarok-kratos-atreus-2022-games-playstation-4-3840x2160-8636.jpg',
        rating: 4.9,
        reviews: '20 K',
        platforms: ['PlayStation 4', 'PlayStation 5'],
        description: 'God of War Ragnarök es la conclusión épica de la era nórdica de la saga. Acompaña a Kratos y Atreus en su viaje final mientras se acerca el fin de los tiempos.',
        developer: 'Santa Monica Studio',
        releaseDate: '2022',
        genre: 'Acción, Aventura',
        requirements: {
            os: 'PlayStation 4/5 exclusivo',
            processor: 'AMD Ryzen 5 3600 (PS5)',
            ram: '16 GB (PS5)',
            graphics: 'AMD RDNA 2 (PS5)',
            storage: '85 GB'
        }
    },
    hk_silksong: {
        id: 'hk_silksong',
        name: 'Hollow Knight: Silksong',
        price: 100000,
        image: 'img/holds.jpg',
        rating: 4.2,
        reviews: '3 K',
        platforms: ['PC', 'Nintendo Switch'],
        description: 'Hollow Knight: Silksong es la secuela del aclamado Hollow Knight. Explora nuevas áreas, enfrenta jefes desafiantes y desentraña los misterios del reino.',
        developer: 'Team Cherry',
        releaseDate: '2023',
        genre: 'Acción, Aventura, Indie',
        requirements: {
            os: 'Windows XP SP3, Vista, 7, 8, 10 o 11',
            processor: 'Intel Pentium 4 @ 1.8 GHz',
            ram: '2 GB',
            graphics: 'GeForce3 / Radeon 8500',
            storage: '5 GB'
        }
    },
    hl_alyx: {
        id: 'hl_alyx',
        name: 'Half-Life: Alyx',
        price: 190000,
        image: 'img/half-life-alyx.jpg',
        rating: 4.2,
        reviews: '3 K',
        platforms: ['PC'],
        description: 'Half-Life: Alyx es una experiencia de VR revolucionaria. Juega como Alyx Vance en el universo de Half-Life y participa en una batalla contra una fuerza extraterrestre invasora.',
        developer: 'Valve',
        releaseDate: '2020',
        genre: 'Acción, Aventura, VR',
        requirements: {
            os: 'Windows 10 64-bit',
            processor: 'Intel Core i5-7600K / AMD Ryzen 5 1600',
            ram: '12 GB',
            graphics: 'NVIDIA GTX 1080 / AMD RX Vega 56',
            storage: '130 GB'
        }
    },
    re4_remake: {
        id: 're4_remake',
        name: 'Resident Evil 4 Remake',
        price: 205000,
        image: 'img/RE4_1A.jpg',
        rating: 4.2,
        reviews: '3 K',
        platforms: ['PC', 'PlayStation 5', 'Xbox Series X|S'],
        description: 'Resident Evil 4 Remake es una reimaginación moderna del clásico. Encarna a Leon S. Kennedy en un nuevo viaje lleno de horror, acción y misterio.',
        developer: 'Capcom',
        releaseDate: '2023',
        genre: 'Terror, Acción, Aventura',
        requirements: {
            os: 'Windows 10/11 64-bit',
            processor: 'Intel Core i9-9900KF / AMD Ryzen 5 5600X',
            ram: '16 GB',
            graphics: 'NVIDIA RTX 3070 / AMD RX 6800 XT',
            storage: '135 GB'
        }
    },
    kcd2: {
        id: 'kcd2',
        name: 'Kingdom Come: Deliverance 2',
        price: 230000,
        image: 'img/kingdom-come-deliverance-2-11f6u.jpg',
        rating: 4.8,
        reviews: '30 K',
        platforms: ['PC', 'PlayStation 5', 'Xbox Series X|S'],
        description: 'Kingdom Come: Deliverance 2 es un RPG inmersivo ambientado en la Bohemia medieval. Sin magia ni fantasía, solo una historia épica de guerra y supervivencia.',
        developer: 'Warhorse Studios',
        releaseDate: '2024',
        genre: 'RPG, Aventura, Acción',
        requirements: {
            os: 'Windows 10/11 64-bit',
            processor: 'Intel Core i9-9900KF / AMD Ryzen 7 3700X',
            ram: '16 GB',
            graphics: 'NVIDIA RTX 3080 / AMD RX 6800 XT',
            storage: '160 GB'
        }
    },
    clair_obscur: {
        id: 'clair_obscur',
        name: 'Clair Obscur: Expedition 33',
        price: 145000,
        image: 'img/clair-obscur-2560x1080-20843.jpg',
        rating: 4.8,
        reviews: '30 K',
        platforms: ['PC', 'PlayStation 5', 'Xbox Series X|S'],
        description: 'Clair Obscur: Expedition 33 es un RPG de acción de aventura en equipo. Explora un mundo hermoso destruido por una maldición y lucha contra enemigos formidables.',
        developer: 'Sandfall Interactive',
        releaseDate: '2024',
        genre: 'RPG, Acción, Aventura',
        requirements: {
            os: 'Windows 10/11 64-bit',
            processor: 'Intel Core i9-10900K / AMD Ryzen 7 5800X',
            ram: '16 GB',
            graphics: 'NVIDIA RTX 3080 / AMD RX 6800 XT',
            storage: '150 GB'
        }
    },
    trails_sky: {
        id: 'trails_sky',
        name: 'Trails in the Sky 1st Chapter',
        price: 85000,
        image: 'img/maxresdefault.jpg',
        rating: 4.8,
        reviews: '30 K',
        platforms: ['PC', 'PlayStation 4', 'Nintendo Switch'],
        description: 'Trails in the Sky es el inicio de una épica saga de RPG táctico. Únete a la Academia de la Fuerza Aérea de Liberl y vive una historia de amistad, misterio y acción.',
        developer: 'Falcom',
        releaseDate: '2004',
        genre: 'RPG, Táctico, Aventura',
        requirements: {
            os: 'Windows XP SP3, Vista, 7, 8, 10 o 11',
            processor: 'Intel Core 2 Duo @ 1.6 GHz',
            ram: '2 GB',
            graphics: 'NVIDIA GeForce 8800 / ATI Radeon HD 3850',
            storage: '3 GB'
        }
    },
    ff7_rebirth: {
        id: 'ff7_rebirth',
        name: 'Final Fantasy VII Rebirth',
        price: 280000,
        image: 'img/final-fantasy-v-i-i-rebirth-promotional-artwork-6wv58kt23nfsmwsl.jpg',
        rating: 4.8,
        reviews: '30 K',
        platforms: ['PlayStation 5'],
        description: 'Final Fantasy VII Rebirth es la conclusión de la trilogía de remake. Continúa la historia de Cloud y sus aliados en una aventura épica llena de misterio y emoción.',
        developer: 'Square Enix',
        releaseDate: '2024',
        genre: 'RPG, Acción, Aventura',
        requirements: {
            os: 'PlayStation 5 exclusivo',
            processor: 'AMD Ryzen 5000',
            ram: '16 GB',
            graphics: 'AMD RDNA 2',
            storage: '150 GB'
        }
    },
    futbol2025: {
        id: 'futbol2025',
        name: 'Fútbol Total 2025',
        price: 165000,
        image: 'img/fot.jpg',
        rating: 4.0,
        reviews: '18 K',
        platforms: ['PC', 'PlayStation 4', 'PlayStation 5', 'Xbox One', 'Xbox Series X|S'],
        description: 'Fútbol Total 2025 es el simulador de fútbol más completo. Gestiona tu equipo, participa en ligas mundiales y compite en emocionantes partidos.',
        developer: 'Konami',
        releaseDate: '2024',
        genre: 'Deportes, Fútbol',
        requirements: {
            os: 'Windows 10/11 64-bit',
            processor: 'Intel Core i5-8400 / AMD Ryzen 5 2600',
            ram: '8 GB',
            graphics: 'NVIDIA GTX 1060 / AMD RX 580',
            storage: '50 GB'
        }
    },
    fifa24: {
        id: 'fifa24',
        name: 'FIFA 24',
        price: 250000,
        image: 'img/thumb-1920-1332400.jpeg',
        rating: 4.0,
        reviews: '18 K',
        platforms: ['PC', 'PlayStation 4', 'PlayStation 5', 'Xbox One', 'Xbox Series X|S', 'Nintendo Switch'],
        description: 'FIFA 24 es el juego de fútbol más popular del mundo. Construye tu equipo en FUT, compite online y vive la emoción del fútbol mundial.',
        developer: 'EA Sports',
        releaseDate: '2023',
        genre: 'Deportes, Fútbol',
        requirements: {
            os: 'Windows 10/11 64-bit',
            processor: 'Intel Core i5-8400 / AMD Ryzen 5 2600',
            ram: '8 GB',
            graphics: 'NVIDIA GTX 1060 / AMD RX 580',
            storage: '50 GB'
        }
    },
    forza: {
        id: 'forza',
        name: 'Forza Motorsport',
        price: 180000,
        image: 'img/forza.jpg',
        rating: 4.0,
        reviews: '18 K',
        platforms: ['PC', 'Xbox Series X|S'],
        description: 'Forza Motorsport es el simulador de carreras más realista. Conduce cientos de vehículos en circuitos icónicos y compite en emocionantes carreras.',
        developer: 'Turn 10 Studios',
        releaseDate: '2023',
        genre: 'Carreras, Deportes',
        requirements: {
            os: 'Windows 10/11 64-bit / Xbox Series X|S',
            processor: 'Intel Core i7-8700K / AMD Ryzen 5 2600X',
            ram: '16 GB',
            graphics: 'NVIDIA RTX 2070 / AMD RX 5700 XT',
            storage: '130 GB'
        }
    },
    gta_vi_new: {
        id: 'gta_vi_new',
        name: 'Grand Theft Auto VI',
        price: 59999,
        image: 'img/grand-theft-auto-vi-1920x1200-22311.jpg',
        rating: 5.0,
        reviews: '50 K',
        platforms: ['PC', 'PlayStation 5', 'Xbox Series X|S'],
        description: 'El próximo capítulo de la legendaria serie Grand Theft Auto. Vuelve al corazón de Libertad City para una aventura épica de crimen y supervivencia.',
        developer: 'Rockstar Games',
        releaseDate: '2025-09-18',
        genre: 'Acción, Aventura',
        requirements: {
            os: 'Windows 10/11 64-bit',
            processor: 'Intel Core i7-10700K / AMD Ryzen 7 3700X',
            ram: '16 GB',
            graphics: 'NVIDIA RTX 3080 / AMD Radeon RX 5700 XT',
            storage: '200 GB'
        }
    },
    elliot_new: {
        id: 'elliot_new',
        name: 'The Adventures of Elliot: The Millennium Tales',
        price: 49999,
        image: 'img/NAT-Games-The-Adventures-Of-Elliot-The-Millenium-Tales-Titel.jpg',
        rating: 5.0,
        reviews: '50 K',
        platforms: ['PC', 'PlayStation 5'],
        description: 'Un juego de aventura y narrativa envolvente que te transportará a mundos increíbles llenos de misterios y magia.',
        developer: 'NAT Games',
        releaseDate: '2025-08-15',
        genre: 'Aventura, RPG',
        requirements: {
            os: 'Windows 10/11 64-bit',
            processor: 'Intel Core i5-10400 / AMD Ryzen 5 3600',
            ram: '12 GB',
            graphics: 'NVIDIA RTX 2080 / AMD Radeon RX 5600 XT',
            storage: '100 GB'
        }
    },
    aphelion_new: {
        id: 'aphelion_new',
        name: 'Aphelion',
        price: 39999,
        image: 'img/TLG-Launch-Trailer-Web2-1920x600-1.jpg',
        rating: 5.0,
        reviews: '50 K',
        platforms: ['PC', 'PlayStation 5'],
        description: 'Una experiencia de acción y ciencia ficción que desafía los límites del gameplay tradicional.',
        developer: 'The Game Labs',
        releaseDate: '2025-10-22',
        genre: 'Acción, Ciencia Ficción',
        requirements: {
            os: 'Windows 10/11 64-bit',
            processor: 'Intel Core i7-9700K / AMD Ryzen 7 2700X',
            ram: '16 GB',
            graphics: 'NVIDIA RTX 2080 Ti / AMD Radeon RX Vega 64',
            storage: '150 GB'
        }
    },
    batman_new: {
        id: 'batman_new',
        name: 'Batman: el Legado del Caballero Oscuro',
        price: 54999,
        image: 'img/dinner-2np91.jpg',
        rating: 5.0,
        reviews: '50 K',
        platforms: ['PC', 'PlayStation 5', 'Xbox Series X|S'],
        description: 'Vuelve a Gotham City como el Vigilante Nocturno en esta épica continuación de la saga de Batman. Enfrenta nuevos enemigos y desentraña misterios oscuros.',
        developer: 'Warner Bros. Games',
        releaseDate: '2025-11-08',
        genre: 'Acción, Aventura',
        requirements: {
            os: 'Windows 10/11 64-bit',
            processor: 'Intel Core i7-10700K / AMD Ryzen 7 3700X',
            ram: '16 GB',
            graphics: 'NVIDIA RTX 3070 / AMD Radeon RX 6700 XT',
            storage: '130 GB'
        }
    },
    ex_aether: {
        id: 'ex_aether',
        name: 'Aether Shapers: The Chrono-Fracture',
        price: 180000,
        image: 'img/Aether Shapers The Chrono-Fracture.png',
        rating: 4.9,
        reviews: '4.5 K',
        platforms: ['PC', 'PlayStation 5'],
        description: 'Aether Shapers es una epopeya de ciencia ficción donde manipulas las fracturas cronológicas del universo. Realiza saltos temporales para cambiar el destino del multiverso, resolviendo acertijos complejos y enfrentándote a enemigos de diferentes épocas. Cada decisión altera la realidad. Una experiencia profunda con cinemáticas épicas y banda sonora orquestal de primer nivel.',
        developer: 'Chronos Studios',
        releaseDate: '2024',
        genre: 'Aventura, RPG, Acción',
        requirements: {
            os: 'Windows 10/11 64-bit',
            processor: 'Intel Core i7-10700 / AMD Ryzen 7 3700X',
            ram: '16 GB',
            graphics: 'NVIDIA RTX 2080 / AMD RX 5700 XT',
            storage: '120 GB'
        }
    },
    ex_lumenfall: {
        id: 'ex_lumenfall',
        name: 'Lumenfall Echoes of the Deep',
        price: 80000,
        image: 'img/Lumenfall Echoes of the Deep.png',
        rating: 4.8,
        reviews: '3.2 K',
        platforms: ['PC', 'PlayStation 5', 'Xbox Series X|S'],
        description: 'Lumenfall Echoes of the Deep te lleva a un reino subacuático bioluminiscente lleno de secretos antiguos. Como arqueólogo aventurero, explora ruinas sumergidas, recolecta artefactos mágicos y desbloquea poderes elementales. El mundo respira con vida y cada descubrimiento revela una nueva capa de la trama. Gráficos impresionantes con física de fluidos realista y un mundo vivo que cambia según tus acciones.',
        developer: 'Deep Waters Games',
        releaseDate: '2024',
        genre: 'Aventura, RPG, Exploración',
        requirements: {
            os: 'Windows 10/11 64-bit',
            processor: 'Intel Core i7-9700K / AMD Ryzen 5 3600',
            ram: '12 GB',
            graphics: 'NVIDIA RTX 1080 / AMD RX 5600 XT',
            storage: '85 GB'
        }
    }
};

// Función para obtener un juego por ID
function getGameById(gameId) {
    return GAMES_DATA[gameId] || null;
}

// Función para obtener todos los juegos
function getAllGames() {
    return Object.values(GAMES_DATA);
}
