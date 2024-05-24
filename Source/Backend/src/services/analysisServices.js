const { prisma } = require('../config/prismaDatabase.js');

const getCalorieStatistics = async (userId, start_time , end_time) => {
    try {
        console.log(userId, start_time, end_time);
        const statistics = await prisma.dashboard.findMany({
            where: {
                userId: userId,
                AND: {
                    day: {
                        gte: start_time,
                        lte: end_time
                    }
                }
            },
            select: {
                calories_loaded: true
            }
        });
        return statistics;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = {
    getCalorieStatistics
}