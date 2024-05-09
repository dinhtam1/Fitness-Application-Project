const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

const insertDataEquipment = async () => {
    await prisma.equipment.createMany({
        data: [
            {
                equipmentId: 1,
                equipmentName: 'Barbell'
            },
            {
                equipmentId: 2,
                equipmentName: 'Dumbbells'
            },
            {
                equipmentId: 3,
                equipmentName: 'Bodyweight'
            },
            {
                equipmentId: 4,
                equipmentName: 'Machine'
            },
            {
                equipmentId: 6,
                equipmentName: 'Medicine-Ball'
            },
            {
                equipmentId: 7,
                equipmentName: 'Kettlebells'
            },
            {
                equipmentId: 8,
                equipmentName: 'Stretches'
            },
            {
                equipmentId: 9,
                equipmentName: 'Cables'
            },
            {
                equipmentId: 10,
                equipmentName: 'Band'
            },
            {
                equipmentId: 11,
                equipmentName: 'Plate'
            },
            {
                equipmentId: 12,
                equipmentName: 'TRX'
            },
            {
                equipmentId: 13,
                equipmentName: 'Yoga'
            },
            {
                equipmentId: 24,
                equipmentName: 'Bosu-Ball'
            },
            {
                equipmentId: 26,
                equipmentName: 'Vitruvian'
            },
            {
                equipmentId: 27,
                equipmentName: 'Cardio'
            },
            {
                equipmentId: 85,
                equipmentName: 'Smith-Machine'
            }
        ]
    })
}

module.exports = {
    insertDataEquipment
}