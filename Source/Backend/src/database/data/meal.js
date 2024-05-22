const fs = require('fs');
const csv = require('csv-parser');
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();
// const db = require('./db'); // Replace './db' with the path to your database module
async function importDataMealFromCsv(filePath) {
    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', async (row) => {
            try {
                const newMeal = {
                    meal_name: row.Food,
                    calories: parseFloat(row.Calories),
                    protein: parseFloat(row.Protein),
                    carb: parseFloat(row.Carb),
                    fat: parseFloat(row.Fat),
                    meal_image: row.Food_image,
                    description: row.Description, // Add the description field
                    create_at: new Date()
                };
                
                await prisma.Meal.create({ data: newMeal });
            } catch (error) {
                console.error('Error inserting row:', row);
                console.error(error);
            }
        })
        .on('end', () => {
            console.log('Data import complete');
        });
}

module.exports = {importDataMealFromCsv};
