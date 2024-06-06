import os
import requests
import csv
from bs4 import BeautifulSoup

# Change to your directory
os.chdir('d:\\Fitness-Application-Project\\Source\\Backend\\src\\database\\data\\crawlData')
print(os.getcwd())
url_template = "https://www.foodiesfeed.com/?s={}"

# Specify the directory you want to use
directory = 'D:\\Fitness-Application-Project\\Source\\Backend\\src\\database\\data\\crawlData\\food\\images'

# Get a list of all folder names in the directory
folder_names = [name for name in os.listdir(directory) if os.path.isdir(os.path.join(directory, name))]

foods_with_images = []

default_url = "https://firebasestorage.googleapis.com/v0/b/fitness-application-proj-6e3c9.appspot.com/o/meal%2Fdefault_meal.jpg?alt=media&token=aa0db095-170c-4dfe-bd03-e33d17c1edf7"

for food in folder_names:
    url = url_template.format(food)

    response = requests.get(url)
    response.raise_for_status()

    soup = BeautifulSoup(response.content, 'html.parser')

    image = soup.find('li', class_='photo-published') 
    if image:
        image_url = image.find('img')['src']
    else:
        image_url = default_url
    print("Food image link:", image_url)
    food_dict = {'Food': food, 'Food_image': image_url}
    foods_with_images.append(food_dict)

# Write the data to a CSV file
with open('food.csv', 'w', newline='') as csvfile:
    fieldnames = ['Food', 'Food_image']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

    writer.writeheader()
    for food in foods_with_images:
        writer.writerow(food)