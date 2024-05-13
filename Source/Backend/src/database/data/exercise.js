const { PrismaClient } = require('@prisma/client')
const fs = require('fs');
const csv = require('csv-parser');
const prisma = new PrismaClient();
const csvFilePath = './crawlData/videos.csv';
const appString = require('../../constant/appString.js')

const type = {
    data : 'data',
    end : 'end',
}

const DURATION = {
    MIN : 5,
    MAX : 20
}

const CALORIES = {
    MIN : 180,
    MAX : 360
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function importDataFromCSV(filePath) {
    try {
        const rows = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on(type.data, (row) => {
                row.musclesId = parseInt(row.musclesId);
                row.equipmentId = parseInt(row.equipmentId);
                row.duration = getRandomInt(DURATION.MIN, DURATION.MAX);
                row.caloriesBurned = getRandomInt(CALORIES.MIN, CALORIES.MAX);
                rows.push(row);
            })
            .on(type.end, async () => {
                try {
                    const promises = rows.map(row => prisma.exercise.create({ data: row }));
                    await Promise.all(promises);
                    console.log(appString.CSV_FILE_PROCESSED);
                } catch (error) {
                    console.error(appString.ERROR_INSERTING_ROW, error);
                } finally {
                    prisma.$disconnect();
                }
            });
    } catch (error) {
        console.error(appString.ERROR_PROCESSING_CSV_FILE, error);
        prisma.$disconnect();
    }
}
module.exports = { importDataFromCSV };