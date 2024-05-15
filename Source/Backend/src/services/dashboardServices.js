const { prisma } = require('../config/prismaDatabase.js');


const getDashboard = async (userId) => {
    try {
        return await prisma.dashboard.findById(userId)
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
                level: user.level
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