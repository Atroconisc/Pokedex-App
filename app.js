// app.js
const API_URL = "https://pokedex-app-production-c690.up.railway.app/api/pokemon";


function capitalize(word) {
    if (typeof word !== "string" || !word) {
        return ""; // Handle undefined or non-string values
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function formatPokedexNumber(number) {
    return `#${String(number).padStart(3, '0')}`;
}

// Fetch Pokémon data from the API
async function fetchPokemon() {
    try {
        const response = await fetch(API_URL);
        let pokemonList = await response.json();
        pokemonList.sort((a, b) => a.pokedex_number - b.pokedex_number);
        displayPokemon(pokemonList);
    } catch (error) {
        console.error("Failed to fetch Pokémon data:", error);
    }
}

function displayPokemon(pokemonList) {
    const pokedex = document.getElementById("pokedex");
    pokedex.innerHTML = ""; // Clear any existing content

    pokemonList.forEach(pokemon => {
        const pokemonCard = document.createElement("div");
        pokemonCard.classList.add("pokemon-card");

        // Apply background color based on the primary type
        if (pokemon.types && pokemon.types.length > 0) {
            const primaryType = pokemon.types[0].toLowerCase();
            pokemonCard.classList.add(`bg-${primaryType}`);
        }

        const formattedTypes = pokemon.types.map(type => capitalize(type));
        const formattedAbilities = pokemon.abilities.map(ability => capitalize(ability));
        const formattedName = capitalize(pokemon.name);

        let typeBadges = '';
        formattedTypes.forEach(type => {
            typeBadges += `<span class="pokemon-type type-${type.toLowerCase()}">${type}</span>`;
        });

        const pokemonImage = pokemon.image ? pokemon.image : "https://via.placeholder.com/150";  // Use placeholder if missing

        pokemonCard.innerHTML = `
            <div class="pokemon-header">
                <p class="pokedex-number">${formatPokedexNumber(pokemon.pokedex_number)}</p>
                <h2 class="pokemon-name">${formattedName}</h2>
                <p class="pokemon-category">${pokemon.category ? `The ${capitalize(pokemon.category)}` : ""}</p>
            </div>
            <img src="${pokemonImage}" alt="${formattedName}">
            <div class="pokemon-info">
                <div class="pokemon-types">${typeBadges}</div>
                <div class="divider"></div>
                <p><strong>Abilities:</strong> ${formattedAbilities.join(', ')}</p>
                <div class="divider"></div>
                <div class="pokemon-stats">
                    <p><strong>HP:</strong> ${pokemon.stats.hp}</p>
                    <p><strong>Attack:</strong> ${pokemon.stats.attack}</p>
                    <p><strong>Defense:</strong> ${pokemon.stats.defense}</p>
                    <p><strong>Sp. Attack:</strong> ${pokemon.stats['special-attack']}</p>
                    <p><strong>Sp. Defense:</strong> ${pokemon.stats['special-defense']}</p>
                    <p><strong>Speed:</strong> ${pokemon.stats.speed}</p>
                </div>
                <div class="divider"></div>
                <p><strong>Height:</strong> ${pokemon.height} m</p>
                <p><strong>Weight:</strong> ${pokemon.weight} kg</p>
            </div>
        `;

        pokedex.appendChild(pokemonCard);
    });
}

fetchPokemon();
