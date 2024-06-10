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

const getGenderStatisticsUser = async (start_time, end_time) => {
    try {
        start_time = new Date(start_time);
        end_time = new Date(end_time);
        start_time.setUTCHours(0, 0, 0, 0);
        end_time.setUTCHours(23, 59, 59, 999);

        const statistics = await prisma.user.findMany({
            where: {
                create_at: {
                    gte: start_time,
                    lte: end_time
                }
            }
        });


        let maleCount = 0;
        let femaleCount = 0;
        let otherCount = 0;

        for (let user of statistics) {
            switch (user.gender) {
                case 'male':
                    maleCount++;
                    break;
                case 'female':
                    femaleCount++;
                    break;
                default:
                    otherCount++;
                    break;
            }
        }
        return {
            male: maleCount,
            female: femaleCount,
            other: otherCount
        };
    } catch (error) {
        console.log(error)
        return false;
    }
}

const getAgeStatisticsUser = async (start_time, end_time) => {
    try {
        start_time = new Date(start_time);
        end_time = new Date(end_time);
        start_time.setUTCHours(0, 0, 0, 0);
        end_time.setUTCHours(23, 59, 59, 999);
        const statistics = await prisma.user.findMany({
            where: {
                create_at: {
                    gte: start_time,
                    lte: end_time
                }
            },
            select: {
                age: true
            }
        });
        const ageGroups = {
            'Unknown': 0,
            '0-18': 0,
            '19-30': 0,
            '31-50': 0,
            '51-70': 0,
            '71+': 0
        };
        
        statistics.forEach(user => {
            const age = user.age;
            if (age === null) {
                ageGroups['Unknown']++;
            } else if (age >= 0 && age <= 18) {
                ageGroups['0-18']++;
            } else if (age >= 19 && age <= 30) {
                ageGroups['19-30']++;
            } else if (age >= 31 && age <= 50) {
                ageGroups['31-50']++;
            } else if (age >= 51 && age <= 70) {
                ageGroups['51-70']++;
            } else if (age >= 71) {
                ageGroups['71+']++;
            }
        });
        
        return ageGroups;
    } catch (error) {
        return false;
    }
}

const getWeightStatisticsUser = async (start_time, end_time) => {
    try {
        start_time = new Date(start_time);
        end_time = new Date(end_time);
        start_time.setUTCHours(0, 0, 0, 0);
        end_time.setUTCHours(23, 59, 59, 999);
        const statistics = await prisma.user.findMany({
            where: {
                create_at: {
                    gte: start_time,
                    lte: end_time
                }
            },
            select: {
                weight: true
            }
        });
        const weightGroups = {
            'Unknown': 0,
            '0-50': 0,
            '51-70': 0,
            '71-90': 0,
            '91-110': 0,
            '111+': 0
        };
        
        statistics.forEach(user => {
            const weight = user.weight;
            if (weight === null) {
                weightGroups['Unknown']++;
            } else if (weight >= 0 && weight < 51) {
                weightGroups['0-50']++;
            } else if (weight >= 51 && weight < 71) {
                weightGroups['51-70']++;
            } else if (weight >= 71 && weight < 91) {
                weightGroups['71-90']++;
            } else if (weight >= 91 && weight < 111) {
                weightGroups['91-110']++;
            } else if (weight >= 111) {
                weightGroups['111+']++;
            }
        });
        
        return weightGroups;
    } catch (error) {
        return false;
    }

}

module.exports = {
    getCalorieStatistics,
    getGenderStatisticsUser,
    getAgeStatisticsUser,
    getWeightStatisticsUser
}