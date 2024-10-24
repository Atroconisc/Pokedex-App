// index.js
const connectDB = require('./db');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

// Connect to MongoDB
connectDB();

// Define the Schema properly using destructured import
const { Schema } = mongoose;

const pokemonSchema = new Schema({
    name: String,
    pokedex_number: Number,
    types: [String],
    abilities: [String],
    stats: {
        hp: Number,
        attack: Number,
        defense: Number,
        "special-attack": Number,
        "special-defense": Number,
        speed: Number
    },
    height: Number,
    weight: Number,
    image: String,
    shiny_image: String,
});

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

async function insertPokemonData() {
    const filePath = path.resolve(__dirname, 'favorite_pokemon_data.json');
    
    // Read the data from JSON file
    const favoritePokemon = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    try {
        // Remove existing data to prevent duplicates
        await Pokemon.deleteMany({});
        
        // Insert new data
        await Pokemon.insertMany(favoritePokemon);
        console.log("Data inserted successfully!");
    } catch (error) {
        console.error("Failed to insert data:", error);
    } finally {
        mongoose.connection.close();
    }
}

// Ensure the function runs once connected to MongoDB
mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB. Starting data insertion...");
    insertPokemonData();
});
