const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

const insertDataMuscleGroup = async () => {
    await prisma.muscle_groups.createMany({
        data: [
            {
                musclesId: 1,
                musclesName: 'Biceps',
                level: 0
            },
            {
                musclesId: 16,
                musclesName: 'long-head-bicep',
                level: 1
            },
            {
                musclesId: 17,
                musclesName: 'short-head-bicep',
                level: 1
            },
            {
                musclesId: 14,
                musclesName: 'traps-middle',
                level: 0
            },
            {
                musclesId: 13,
                musclesName: 'Lowerback',
                level: 0
            },
            {
                musclesId: 12,
                musclesName: 'Abdominals',
                level: 0
            },
            {
                musclesId: 21,
                musclesName: 'lower-abdominals',
                level: 1
            },
            {
                musclesId: 22,
                musclesName: 'upper-abdominals',
                level: 1
            },
            {
                musclesId: 11,
                musclesName: 'Calves',
                level: 0
            },
            {
                musclesId: 31,
                musclesName: 'tibialis',
                level: 1
            },
            {
                musclesId: 32,
                musclesName: 'soleus',
                level: 1
            },
            {
                musclesId: 33,
                musclesName: 'gastrocnemius',
                level: 1
            },
            {
                musclesId: 10,
                musclesName: 'Forearms',
                level: 0
            },
            {
                musclesId: 25,
                musclesName: 'wrist-extensors',
                level: 1
            },
            {
                musclesId: 26,
                musclesName: 'wrist-flexors',
                level: 1
            },
            {
                musclesId: 9,
                musclesName: 'Glutes',
                level: 0
            },
            {
                musclesId: 37,
                musclesName: 'gluteus-medius',
                level: 1
            },
            {
                musclesId: 38,
                musclesName: 'gluteus-maximus',
                level: 1
            },
            {
                musclesId: 8,
                musclesName: 'Hamstrings',
                level: 0
            },
            {
                musclesId: 39,
                musclesName: 'medial-hamstrings',
                level: 1
            },
            {
                musclesId: 40,
                musclesName: 'lateral-hamstrings',
                level: 1
            },
            {
                musclesId: 7,
                musclesName: 'Lats',
                level: 0
            },
            {
                musclesId: 6,
                musclesName: 'Shoulders',
                level: 0
            },
            {
                musclesId: 18,
                musclesName: 'lateral-deltoid',
                level: 1
            },
            {
                musclesId: 19,
                musclesName: 'anterior-deltoid',
                level: 1
            },
            {
                musclesId: 20,
                musclesName: 'posterior-deltoid',
                level: 1
            },
            {
                musclesId: 5,
                musclesName: 'Triceps',
                level: 0
            },
            {
                musclesId: 34,
                musclesName: 'long-head-triceps',
                level: 1
            },
            {
                musclesId: 35,
                musclesName: 'lateral-head-triceps',
                level: 1
            },
            {
                musclesId: 36,
                musclesName: 'medial-head-triceps',
                level: 1
            },
            {
                musclesId: 4,
                musclesName: 'Traps',
                level: 0
            },
            {
                musclesId: 41,
                musclesName: 'upper-trapezius',
                level: 1
            },
            {
                musclesId: 42,
                musclesName: 'lower-trapezius',
                level: 1
            },
            {
                musclesId: 3,
                musclesName: 'Quads',
                level: 0
            },
            {
                musclesId: 27,
                musclesName: 'inner-thigh',
                level: 1
            },
            {
                musclesId: 28,
                musclesName: 'inner-quadricep',
                level: 1
            },
            {
                musclesId: 29,
                musclesName: 'outer-quadricep',
                level: 1
            },
            {
                musclesId: 30,
                musclesName: 'rectus-femoris',
                level: 1
            },
            {
                musclesId: 2,
                musclesName: 'Chest',
                level: 0
            },
            {
                musclesId: 23,
                musclesName: 'upper-pectoralis',
                level: 1
            },
            {
                musclesId: 24,
                musclesName: 'mid-lower-pectoralis',
                level: 1
            },
            {
                musclesId: 15,
                musclesName: 'Obliques',
                level: 0
            },
            {
                musclesId: 43,
                musclesName: 'hands',
                level: 0
            },
            {
                musclesId: 44,
                musclesName: '',
                level: 0
            },
            {
                musclesId: 46,
                musclesName: 'feet',
                level: 0
            },
            {
                musclesId: 47,
                musclesName: 'front-shoulders',
                level: 0
            },
            {
                musclesId: 48,
                musclesName: 'rear-shoulders',
                level: 0
            }
        ]
    })
}

module.exports = {
    insertDataMuscleGroup
}