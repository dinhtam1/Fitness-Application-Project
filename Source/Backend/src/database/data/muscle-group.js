const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

const insertDataMuscleGroup = async () => {
    await prisma.muscle_groups.createMany({
        data: [
            {
                musclesId: 1,
                musclesName: 'Biceps'
            },
            {
                musclesId: 16,
                musclesName: 'long-head-bicep'
            },
            {
                musclesId: 17,
                musclesName: 'short-head-bicep'
            },
            {
                musclesId: 14,
                musclesName: 'traps-middle'
            },
            {
                musclesId: 13,
                musclesName: 'Lowerback'
            },
            {
                musclesId: 12,
                musclesName: 'Abdominals'
            },
            {
                musclesId: 21,
                musclesName: 'lower-abdominals'
            },
            {
                musclesId: 22,
                musclesName: 'upper-abdominals'
            },
            {
                musclesId: 11,
                musclesName: 'Calves'
            },
            {
                musclesId: 31,
                musclesName: 'tibialis'
            },
            {
                musclesId: 32,
                musclesName: 'soleus'
            },
            {
                musclesId: 33,
                musclesName: 'gastrocnemius'
            },
            {
                musclesId: 10,
                musclesName: 'Forearms'
            },
            {
                musclesId: 25,
                musclesName: 'wrist-extensors'
            },
            {
                musclesId: 26,
                musclesName: 'wrist-flexors'
            },
            {
                musclesId: 9,
                musclesName: 'Glutes'
            },
            {
                musclesId: 37,
                musclesName: 'gluteus-medius'
            },
            {
                musclesId: 38,
                musclesName: 'gluteus-maximus'
            },
            {
                musclesId: 8,
                musclesName: 'Hamstrings'
            },
            {
                musclesId: 39,
                musclesName: 'medial-hamstrings'
            },
            {
                musclesId: 40,
                musclesName: 'lateral-hamstrings'
            },
            {
                musclesId: 7,
                musclesName: 'Lats'
            },
            {
                musclesId: 6,
                musclesName: 'Shoulders'
            },
            {
                musclesId: 18,
                musclesName: 'lateral-deltoid'
            },
            {
                musclesId: 19,
                musclesName: 'anterior-deltoid'
            },
            {
                musclesId: 20,
                musclesName: 'posterior-deltoid'
            },
            {
                musclesId: 5,
                musclesName: 'Triceps'
            },
            {
                musclesId: 34,
                musclesName: 'long-head-triceps'
            },
            {
                musclesId: 35,
                musclesName: 'lateral-head-triceps'
            },
            {
                musclesId: 36,
                musclesName: 'medial-head-triceps'
            },
            {
                musclesId: 4,
                musclesName: 'Traps'
            },
            {
                musclesId: 41,
                musclesName: 'upper-trapezius'
            },
            {
                musclesId: 42,
                musclesName: 'lower-trapezius'
            },
            {
                musclesId: 3,
                musclesName: 'Quads'
            },
            {
                musclesId: 27,
                musclesName: 'inner-thigh'
            },
            {
                musclesId: 28,
                musclesName: 'inner-quadricep'
            },
            {
                musclesId: 29,
                musclesName: 'outer-quadricep'
            },
            {
                musclesId: 30,
                musclesName: 'rectus-femoris'
            },
            {
                musclesId: 2,
                musclesName: 'Chest'
            },
            {
                musclesId: 23,
                musclesName: 'upper-pectoralis'
            },
            {
                musclesId: 24,
                musclesName: 'mid-lower-pectoralis'
            },
            {
                musclesId: 15,
                musclesName: 'Obliques'
            },
            {
                musclesId: 43,
                musclesName: 'hands'
            },
            {
                musclesId: 44,
                musclesName: ''
            },
            {
                musclesId: 46,
                musclesName: 'feet'
            },
            {
                musclesId: 47,
                musclesName: 'front-shoulders'
            },
            {
                musclesId: 48,
                musclesName: 'rear-shoulders'
            }
        ]
    })
}

module.exports = {
    insertDataMuscleGroup
}