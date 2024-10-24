const path = require('path');

console.log('Starting test script...');

try {
    const pokedexData = require(path.resolve(__dirname, 'pokedexData.js'));
    console.log('Pokedex Data:', pokedexData);
} catch (error) {
    console.error('Error loading pokedexData.js:', error);
}

console.log('Test script completed.');

