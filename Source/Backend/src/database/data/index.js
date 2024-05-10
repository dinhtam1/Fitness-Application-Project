const { PrismaClient } = require('@prisma/client');

// const { insertDataExercise } = require('./exercise.js');
const { insertDataEquipment } = require('./equipment.js');
const { insertDataMuscleGroup } = require('./muscle-group.js');
const { importDataFromCSV } = require('./exercise.js');
const csvFilePath = 'src/database/data/crawlData/videos.csv';


const prisma = new PrismaClient();

const insertData = async () => {
    await insertDataEquipment();
    await insertDataMuscleGroup();
    await importDataFromCSV(csvFilePath)
    .catch((error) => {
        console.error('Error importing data:', error);
    });
}

insertData()
    .then(async () => {
        prisma.$disconnect();
    })
    .catch(async (e) => {
        console.log(`error prisma insert Data: ${e}`);
        prisma.$disconnect
    })
