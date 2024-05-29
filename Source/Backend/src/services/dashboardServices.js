const { prisma } = require('../config/prismaDatabase.js');


const getDashboard = async (userId) => {
    try {
        const today = new Date();
        const day = new Date(today.toISOString().split('T')[0] + 'T00:00:00Z');
        const dashboard = await prisma.dashboard.findFirst({
            where: {
                userId: userId,
                day: {
                    equals: day
                }
            },
            select: {
                time_practice: true,
                time_sleep: true,
                calories_burned: true,
                exercise_complete: true
            }
        });
        if (!dashboard) {
            return {
                time_practice: 0,
                time_sleep: 0,
                calories_burned: 0,
                exercise_complete: 0
            }
        }
        return dashboard;
    } catch (error) {
        return false;
    }
}

const updateDashboard = async (user, data) => {
    try {
        const today = new Date();
        data.day = new Date(today.toISOString().split('T')[0] + 'T00:00:00Z');
        const existingDashboard = await prisma.dashboard.findFirst({
            where: {
                userId: user.userId,
                day: data.day
            }
        });
        if (existingDashboard && existingDashboard.day.toISOString().split('T')[0] === data.day.toISOString().split('T')[0]) {
            const updatedDashboard = {
                ...existingDashboard,
                calories_burned: existingDashboard.calories_burned + data.calories_burned,
                time_practice: existingDashboard.time_practice + data.time_practice,
                time_sleep: data.time_sleep,
                weight: user.weight,
                level: user.level,
                exercise_complete: existingDashboard.exercise_complete + (data.time_practice && data.calories_burned ? 1 : 0)
            };
            return await prisma.dashboard.update({
                where: {
                    userId: user.userId,
                    dashboardId: existingDashboard.dashboardId
                },
                data: updatedDashboard
            });
        } else {
            const newDashboard = {
                userId: user.userId,
                weight: user.weight,
                level: user.level,
                exercise_complete: data.time_practice && data.calories_burned ? 1 : 0,
                ...data,
            };
            return await prisma.dashboard.create({
                data: newDashboard
            });
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}

module.exports = {
    getDashboard,
    updateDashboard
}