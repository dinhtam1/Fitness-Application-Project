const { PrismaClient } = require('@prisma/client')
const fs = require('fs');
const csv = require('csv-parser');
const prisma = new PrismaClient();
const csvFilePath = './crawlData/videos.csv';

async function importDataFromCSV(filePath) {
    try {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', async (row) => {
                try {
                    row.musclesId = parseInt(row.musclesId);
                    row.equipmentId = parseInt(row.equipmentId);
                    // Replace 'Exercise' with your table name
                    await prisma.Exercise.create({ data: row });
                } catch (error) {
                    console.error('Error inserting row:', error);
                }
            })
            .on('end', () => {
                console.log('CSV file successfully processed');
                // Disconnect Prisma Client when done
                prisma.$disconnect();
            });
    } catch (error) {
        console.error('Error processing CSV file:', error);
        // Disconnect Prisma Client in case of error
        prisma.$disconnect();
    }
}

module.exports = { importDataFromCSV };