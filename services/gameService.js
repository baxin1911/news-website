const games = [
    { 
        id: 1, 
        name: 'Animal Crossing', 
        coverPath: '#',
        released: '16 de septiembre de 2002', 
        platforms: ['Nintendo-64', 'GameCube'], 
        genres: ['Simulación', 'Aventura', 'JRPG'],
        developers: ['Nintendo'],
        publishers: ['Nintendo'],
        links: ['#'],
        engine: 'Havok'
    },
    {
        id: 2,
        name: 'Resident Evil Village',
        coverPath: '#',
        released: '7 de mayo de 2021',
        platforms: ['PlayStation 5', 'PlayStation 4', 'PlayStation VR2', 'Xbox Series X', 'Xbox Series S', 'Xbox One', 'Nintendo Switch 2', 'Nintendo Switch', 'PC', 'iOS'],
        genres: ['Survival Horror', 'Survival', 'Horror'],
        developers: ['Capcom'],
        publishers: ['Capcom'],
        links: ['#'],
        engine: 'RE Engine'
    },
    {
        id: 3,
        name: 'Forza Horizon 5',
        coverPath: '#',
        released: '9 de noviembre de 2021',
        platforms: ['PC', 'Xbox One', 'Xbox Series S', 'Xbox Series X'],
        genres: ['Racing', 'Open-World'],
        developers: ['Playground Games'],
        publishers: ['Xbox Game Studios'],
        links: ['#'],
        engine: 'Forza Tech'
    }
]

export const getGameByName = (name) => {

    return games.find(game => game.name === name);
}

export const existsGameByName = (name) => {

    return games.some(game => game.name === name);
}