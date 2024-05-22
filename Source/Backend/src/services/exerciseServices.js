const { Gender } = require('@prisma/client');
const { prisma } = require('../config/prismaDatabase.js');
const exerciseHelper = require('../helpers/exerciseHelper.js');
const LEVEL_CONSTANT = {
    BEGINNER: 'BEGINNER',
    ADVANCED: 'ADVANCED',
}
const GOAL_CONSTANT = {
    WEIGHT_LOSS: 'WEIGHT_LOSS',
    GAIN_MUSCLE: 'GAIN_MUSCLE',
}
const GOAL_WEIGHT_CONSTANT = {
    WEIGHT_GAIN: '+weight',
    WEIGHT_LOSS: '-weight',
    LOSE: 'Lose',
    GAIN: 'Gain'
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
        level = LEVEL_CONSTANT.BEGINNER
        const limit = parseInt(process.env.LIMIT_GET_EXERCISE);
        if (page < 0 || !!page == false) page = 1;
        let start = (page - 1) * limit;
        var condition = {};
        switch (goal) {
            case GOAL_CONSTANT.WEIGHT_LOSS:
                goal = GOAL_WEIGHT_CONSTANT.WEIGHT_LOSS;
                break;
            case GOAL_CONSTANT.GAIN_MUSCLE:
                goal = GOAL_WEIGHT_CONSTANT.WEIGHT_GAIN;
                break;
        }
        switch (level) {
            case LEVEL_CONSTANT.BEGINNER:
                level = 0;
                break;
            case LEVEL_CONSTANT.ADVANCED:
                level = 1;
                break;
        }
        console.log(level);
        let levels = [level];
        if (level === 1 && level !== level.BEGINNER) {
            levels.push(0);
        }
        switch (muscle_name) {
            case undefined || null || '':
                condition = {
                    equipmentName: category,
                    muscle_group: {
                        level: {
                            in: levels
                        }
                    }
                };
                if (goal) {
                    condition.ordering = goal;
                }
                if (gender) {
                    condition.gender = gender;
                }
                break;
            default:
                condition = {
                    equipmentName: category,
                    muscle_group: {
                        level: {
                            in: levels
                        },
                    },
                    musclesName: muscle_name
                };
                if (goal) {
                    condition.ordering = goal;
                }
                if (gender) {
                    condition.gender = gender;
                }
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
                },
                duration : true,
                caloriesBurned: true
            },
            skip: start,
            take: limit,
        });

        for (let i = 0; i < result.length; i++) {
            result[i].name = exerciseHelper.getNamebyUrl(result[i].video_center);
            delete result[i].video_center;
            if (result[i].muscle_group.level === 0) {
                result[i].level = LEVEL_CONSTANT.BEGINNER;
            } else if (result[i].muscle_group.level === 1) {
                result[i].level = LEVEL_CONSTANT.ADVANCED;
            }
            delete result[i].muscle_group;
        }
        return result;
    } catch (e) {
        console.log(e)
        return false;
    }
};

const getDetailExercise = async (exerciseId) => {
    try {
        const exercise = await prisma.exercise.findUnique({
            where: {
                exerciseId: exerciseId
            },
            select: {
                caloriesBurned: true,
                duration: true,
                video_center: true,
                video_side: true,
                image: true,
                ordering: true,
                equipmentName: true,
            }
        });
        console.log(exercise.video_center);
        exercise.name = exerciseHelper.getNamebyUrl(exercise.video_center);
        if (exercise.ordering === GOAL_WEIGHT_CONSTANT.WEIGHT_LOSS) {
            exercise.ordering = GOAL_WEIGHT_CONSTANT.LOSE;
        } else if (exercise.ordering === GOAL_WEIGHT_CONSTANT.WEIGHT_GAIN) {
            exercise.ordering = GOAL_WEIGHT_CONSTANT.GAIN;
        }
        exercise.weight = exercise.ordering;
        delete exercise.ordering;

        return exercise;
    } catch (e) {
        return false
    };
};

const getResultExercise = async (exerciseId) => {
    try {
        return await prisma.exercise.findUnique({
            where: {
                exerciseId: parseInt(exerciseId)
            },
            select: {
                duration: true,
                caloriesBurned: true,
                equipmentName: true,
            }
        });
    } catch (e) {
        console.log(e)
        return false;
    }

}

module.exports = {
    getCategory,
    getExercise,
    getDetailExercise,
    getResultExercise

}