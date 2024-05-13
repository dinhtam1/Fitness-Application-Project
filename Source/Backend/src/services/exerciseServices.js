const { Gender } = require('@prisma/client');
const { prisma } = require('../config/prismaDatabase.js');
const exerciseHelper = require('../helpers/exerciseHelper.js');
const LEVEL = {
    BEGINNER : 'Beginner',
    ADVANCED : 'Advanced',
}
const GOAL = {
    WEIGHT_LOSS : 'WEIGHT_LOSS',
    GAIN_MUSCLE : 'GAIN_MUSCLE',
}
const GOAL_WEIGHT = {
    WEIGHT_GAIN : '+weight',
    WEIGHT_LOSS : '-weight',
}

const POPULAR_CATEGORY = ['Yoga', 'Cardio', 'Bodyweight'];

const getCategory = async () => {
    try {
        const specificEquipment = await prisma.equipment.findMany({
            where: {
                equipmentName: {
                    in: POPULAR_CATEGORY
                }
            }
        });

        const otherEquipment = await prisma.equipment.findMany({
            where: {
                equipmentName: {
                    notIn: POPULAR_CATEGORY
                }
            }
        });

        return [...specificEquipment, ...otherEquipment];
    } catch (e) {
        return false;
    }
}


const getExercise = async (category, page, gender, goal, level, muscle_name) => {
    try {
        const limit = parseInt(process.env.LIMIT_GET_EXERCISE);
        if (page < 0 || !!page == false) page = 1;
        let start = (page - 1) * limit;
        var condition = {};
        switch (goal) {
            case GOAL.WEIGHT_LOSS:
                goal = GOAL_WEIGHT.WEIGHT_LOSS;
                break;
            case GOAL.GAIN_MUSCLE:
                goal = GOAL_WEIGHT.WEIGHT_GAIN;
                break;
        }
        switch (level) {
            case level.BEGINNER:
                level = 0;
                break;
            case level.ADVANCED:
                level = 1;
                break;
        }
        let levels = [level];
        if (level === 1 && level !== level.BEGINNER) {
            levels.push(0);
        }
        switch (muscle_name) {
            case undefined || null || '':
                condition = {
                    equipmentName: category,
                    ordering: goal,
                    muscle_group: {
                        level: {
                            in: levels
                        }
                    },
                    gender
                };
                break;
            default:
                condition = {
                    equipmentName: category,
                    ordering: goal,
                    muscle_group: {
                        level: {
                            in: levels
                        },
                    },
                    musclesName: muscle_name,
                    gender
                };

        }
        const result = await prisma.exercise.findMany({
            where: condition,
            select: {
                image: true,
                video_center: true,
                muscle_group: {
                    select: {
                        level: true
                    }
                }
            },
            skip: start,
            take: limit,
        });

        for (let i = 0; i < result.length; i++) {
            result[i].name = exerciseHelper.getNamebyUrl(result[i].video_center);
            delete result[i].video_center;
            if (result[i].muscle_group.level === 0) {
                result[i].level = LEVEL.BEGINNER;
            } else if (result[i].muscle_group.level === 1) {
                result[i].level = LEVEL.ADVANCED;
            }
            delete result[i].muscle_group;
        }
        return result;
    } catch (e) {
        return false;
    }
};

const getDetailExercise = async (exerciseId) => {
    try {
        return await prisma.exercise.findUnique({
            where: {
                exerciseId: exerciseId
            }
        });
    } catch (e) {
        return false
    };
};


module.exports = {
    getCategory,
    getExercise,
    getDetailExercise

}