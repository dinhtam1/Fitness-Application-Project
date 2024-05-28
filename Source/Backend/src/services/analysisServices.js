const { prisma } = require('../config/prismaDatabase.js');
const dayOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const getCalorieStatistics = async (userId, start_time, end_time, returnDayNames) => {
    try {
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
                day: true,
                calories_loaded: true
            }
        });
        const result = [];

        // Iterate over the statistics and populate the result array
        statistics.forEach(stat => {
            const date = new Date(stat.day);
            const dayIndex = (date.getDay() + 6) % 7;
            const formattedDate = returnDayNames ? dayOrder[dayIndex] : date.toISOString().split('T')[0];
            result.push({ date: formattedDate, calories_loaded: stat.calories_loaded });
        });


        // Calculate the start and end dates of the input range
        const startOfRange = new Date(start_time);
        const endOfRange = new Date(end_time);

        // Iterate over the days of the range and add missing dates to the result array
        let currentDateIterator = new Date(startOfRange);
        while (currentDateIterator <= endOfRange) {
            const formattedDate = returnDayNames ? dayOrder[currentDateIterator.getDay()] : currentDateIterator.toISOString().split('T')[0];
            if (!result.find(r => r.date === formattedDate)) {
                result.push({ date: formattedDate, calories_loaded: 0 });
            }
            currentDateIterator.setDate(currentDateIterator.getDate() + 1);
        }
        // Sort the result array by day of the week
        if (!returnDayNames) {
            result.sort((a, b) => new Date(a.date) - new Date(b.date));
        } else {
            result.sort((a, b) => dayOrder.indexOf(a.date) - dayOrder.indexOf(b.date));
        }

        return result;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = {
    getCalorieStatistics
}