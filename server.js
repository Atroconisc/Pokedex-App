const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS middleware
const connectDB = require('./db');
const Pokemon = require('./pokedexData');

const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors());

// Connect to MongoDB
connectDB();

app.use(express.json());

mongoose.connection.on('connected', () => {
    console.log("MongoDB connection established.");

    app.get('/api/pokemon', async (req, res) => {
        try {
            console.log("Attempting to fetch Pokémon data...");
            const pokemonList = await Pokemon.find();
            res.json(pokemonList);
        } catch (error) {
            console.error("Error while fetching Pokémon data: ", error);
            res.status(500).json({ error: "Failed to fetch Pokémon data" });
        }
    });

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});

mongoose.connection.on('error', (err) => {
    console.error("Error connecting to MongoDB:", err);
});
