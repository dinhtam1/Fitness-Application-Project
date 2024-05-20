import pandas as pd
import requests
from urllib.parse import quote

# Create the full path to the file
file_path = 'd:\\Fitness-Application-Project\\Source\\Backend\\src\\database\\data\\crawlData\\food.csv'
print("file path", file_path)

# Load the data
df = pd.read_csv(file_path)

# Initialize new columns
df['Calories'] = None
df['Protein'] = None
df['Fat'] = None
df['Carb'] = None

# Define the base URL
base_url = "https://api.edamam.com/api/food-database/parser?nutrition-type=logging&app_id=07d50733&app_key=80fcb49b500737827a9a23f7049653b9&ingr="

headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

# Create a list to store the indexes of rows to be dropped
rows_to_drop = []

# Loop over the names in the CSV file
for index, row in df.iterrows():
    name = row['Food']
    # Replace underscores with spaces in the name
    name = name.replace("_", " ")
    # Encode the name and create the URL for this name
    url = base_url + quote(name)

    # Make the request
    response = requests.get(url, headers=headers)
    data = response.json()

    if "parsed" in data and len(data["parsed"]) > 0:
        food_data = data["parsed"][0]["food"]["nutrients"]
        enerc_kcal = food_data.get("ENERC_KCAL")
        procnt = food_data.get("PROCNT")
        fat = food_data.get("FAT")
        chocdf = food_data.get("CHOCDF")

        # Update the DataFrame with the crawled data
        df.at[index, 'Calories'] = enerc_kcal
        df.at[index, 'Protein'] = procnt
        df.at[index, 'Fat'] = fat
        df.at[index, 'Carb'] = chocdf
    else:
        print(f"Error: Failed to retrieve nutrition data for {name}.")
        rows_to_drop.append(index)

# Drop the rows without data
df = df.drop(rows_to_drop)

# Write the updated DataFrame back to the CSV file
df.to_csv(file_path, index=False)