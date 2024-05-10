const { prisma } = require('../config/prismaDatabase.js');
const nodemailer = require('nodemailer');
const moment = require('moment-timezone');
const { date } = require('joi');
const appString = require('../constant/appString.js')

const style = {
    divStyle: 'style="text-align: center;"',
    pStyle: 'style="color: black; font-size: 24px"'
}
const service = {
    gmail: 'gmail',
}

const getCategory = async () => {
    try {
        const specificEquipment = await prisma.equipment.findMany({
            where: {
                equipmentName: {
                    in: ['Yoga', 'Cardio', 'Bodyweight']
                }
            }
        });

        const otherEquipment = await prisma.equipment.findMany({
            where: {
                equipmentName: {
                    notIn: ['Yoga', 'Cardio', 'Bodyweight']
                }
            }
        });

        return [...specificEquipment, ...otherEquipment];
    } catch (e) {
        console.error(e);
        return [];
    }
}
// const getCategory = async () => {
//     try {
//         return await prisma.equipment.findMany({
//         });
//     } catch (e) {
//         return false
//     };
// };

const getExercise = async () => {
    try {
        return await prisma.exercise.findMany({
        });
    } catch (e) {
        return false
    };
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