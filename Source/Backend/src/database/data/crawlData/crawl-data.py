import csv
import requests
from bs4 import BeautifulSoup
import os

os.chdir('d:\\Fitness-Application-Project\\Source\\Backend\\src\\database\\data\\crawlData')
print(os.getcwd())
url_template = "https://www.foodiesfeed.com/?s={}"

with open('food.csv', 'r') as file:
    reader = csv.DictReader(file)
    foods = list(reader)

foods_with_images = []

for food in foods:
    url = url_template.format(food['Food'])

    response = requests.get(url)
    response.raise_for_status()

    soup = BeautifulSoup(response.content, 'html.parser')

    image = soup.find('li', class_='photo-published') 
    if image:
        image_url = image.find('img')['src']
        print("Food image link:", image_url)
        food['food_image'] = image_url
        foods_with_images.append(food)
    else:
        print("No image found")

with open('food_with_images.csv', 'w', newline='') as file:
    fieldnames = foods_with_images[0].keys()
    writer = csv.DictWriter(file, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(foods_with_images)