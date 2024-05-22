const { PrismaClient } = require('@prisma/client');

// const { insertDataExercise } = require('./exercise.js');
const { insertDataEquipment } = require('./equipment.js');
const { insertDataMuscleGroup } = require('./muscle-group.js');
const { importDataExerciseFromCSV } = require('./exercise.js');
const { importDataMealFromCsv } = require('./meal.js');
const exerciseFilePath = 'src/database/data/crawlData/videos.csv';
const mealFilePath = 'src/database/data/crawlData/food.csv';


const prisma = new PrismaClient();

const insertData = async () => {
    await insertDataEquipment();
    await insertDataMuscleGroup();
    await importDataExerciseFromCSV(exerciseFilePath)
    .catch((error) => {
        console.error('Error importing data:', error);
    });
    await importDataMealFromCsv(mealFilePath)
    .catch((error) => {
        console.error('Error importing data:', error);
    })
}

insertData()
    .then(async () => {
        prisma.$disconnect();
    })
    .catch(async (e) => {
        console.log(`error prisma insert Data: ${e}`);
        prisma.$disconnect
    })
