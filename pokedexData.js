const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
    name: String,
    pokedex_number: Number,
    types: [String],
    abilities: [String],
    stats: {
        hp: Number,
        attack: Number,
        defense: Number,
        'special-attack': Number,
        'special-defense': Number,
        speed: Number,
    },
    height: Number,
    weight: Number,
    image: String,
    shiny_image: String,
});

// Explicitly use 'favorites' collection
const Pokemon = mongoose.model('Pokemon', pokemonSchema, 'favorites');

module.exports = Pokemon;
