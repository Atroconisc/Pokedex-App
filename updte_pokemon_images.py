import requests
import json
import time

# Helper function to generate possible Bulbapedia image URLs
def generate_bulbapedia_image_url(pokedex_number, name):
    # Format the Pokedex number and name
    number_str = str(pokedex_number).zfill(3)  # E.g., "001"
    name_formatted = name.capitalize()
    
    # Construct the base URL
    url = f"https://archives.bulbagarden.net/media/upload/thumb/6/68/{number_str}{name_formatted}.png/250px-{number_str}{name_formatted}.png"
    
    # Check if the URL is valid
    response = requests.get(url)
    if response.status_code == 200:
        return url
    else:
        print(f"Could not find image for {name}. URL tried: {url}")
        return None

# Load existing Pokémon data from JSON file
def load_pokemon_data(filename):
    with open(filename, "r") as file:
        return json.load(file)

# Save updated Pokémon data to JSON file
def save_pokemon_data(pokemon_data, filename):
    with open(filename, "w") as file:
        json.dump(pokemon_data, file, indent=4)
    print(f"Updated data saved to {filename}")

# Update only the images for existing Pokémon data
def update_pokemon_images(filename):
    pokemon_data = load_pokemon_data(filename)
    
    for pokemon in pokemon_data:
        # Attempt to add Bulbapedia image URL if missing or still using a default URL
        if "image" not in pokemon or pokemon["image"].startswith("https://raw.githubusercontent.com"):
            print(f"Attempting to get image for: {pokemon['name']}")
            bulbapedia_image_url = generate_bulbapedia_image_url(pokemon["pokedex_number"], pokemon["name"])
            if bulbapedia_image_url:
                pokemon["image"] = bulbapedia_image_url
        
        # Pause to respect rate limits
        time.sleep(0.5)
    
    save_pokemon_data(pokemon_data, filename)

# Name of your existing JSON file
json_filename = "favorite_pokemon_data.json"

# Run the update
update_pokemon_images(json_filename)
