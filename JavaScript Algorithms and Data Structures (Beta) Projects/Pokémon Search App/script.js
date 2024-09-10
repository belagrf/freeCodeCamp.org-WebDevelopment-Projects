const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const pokemonInfo = document.getElementById('pokemon-info');

const typeColors = {
    normal: "#A8A77A", fire: "#EE8130", water: "#6390F0", electric: "#F7D02C",
    grass: "#7AC74C", ice: "#96D9D6", fighting: "#C22E28", poison: "#A33EA1",
    ground: "#E2BF65", flying: "#A98FF3", psychic: "#F95587", bug: "#A6B91A",
    rock: "#B6A136", ghost: "#735797", dragon: "#6F35FC", dark: "#705746",
    steel: "#B7B7CE", fairy: "#D685AD"
};

const handleSearch = () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm) {
        searchPokemon(searchTerm);
    }
};

const searchPokemon = async (searchTerm) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
        if (!response.ok) {
            throw new Error('Pokémon not found');
        }
        const data = await response.json();
        displayPokemonInfo(data);
    } catch (error) {
        console.error('Error:', error);
        alert('Pokémon not found');
        pokemonInfo.style.display = 'none';
    }
};

const displayPokemonInfo = (pokemon) => {
    document.getElementById('pokemon-name').textContent = pokemon.name.toUpperCase();
    document.getElementById('pokemon-id').textContent = `#${pokemon.id}`;
    document.getElementById('weight').textContent = `Weight: ${pokemon.weight}`;
    document.getElementById('height').textContent = `Height: ${pokemon.height}`;

    const spriteElement = document.getElementById('sprite');
    spriteElement.src = pokemon.sprites.front_default;
    spriteElement.alt = `${pokemon.name} sprite`;

    displayTypes(pokemon.types);
    displayStats(pokemon.stats);

    pokemonInfo.style.display = 'block';
};

const displayTypes = (types) => {
    const typesElement = document.getElementById('types');
    typesElement.innerHTML = '';
    types.forEach(type => {
        const typeBadge = document.createElement('span');
        typeBadge.textContent = type.type.name.toUpperCase();
        typeBadge.className = 'type-badge';
        typeBadge.style.backgroundColor = typeColors[type.type.name];
        typesElement.appendChild(typeBadge);
    });
};

const displayStats = (stats) => {
    const statNames = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];
    statNames.forEach(stat => {
        const value = stats.find(s => s.stat.name === stat).base_stat;
        document.getElementById(stat).textContent = value;
        document.getElementById(`${stat}-bar`).style.width = `${(value / 255) * 100}%`;
    });
};

searchButton.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});
