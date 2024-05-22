const { prisma } = require("../config/prismaDatabase");
const mealHelper = require('../helpers/mealHelper.js');
const mealCache = {};

const getMeal = async (userId, page) => {
    try {
        const limit = parseInt(process.env.LIMIT_GET_MEAL);
        if (page < 0 || !!page == false) page = 1;
        let start = (page - 1) * limit;

        const user = await prisma.user.findUnique({
            where: {
                userId: userId
            },
            select: {
                calories: true,
                dashboards: {
                    select: {
                        create_at: true,
                        calories_loaded: true,
                    }
                }
            }
        });
        const { calories, dashboards } = user;
        var { calories_loaded = 0 } = dashboards[0] || {}; // set default value to 0 if calories_loaded is not found
        if (!user) {
            return false;
        }
        let remainingCalories = Math.max(0, calories - calories_loaded);
        console.log("remainingCalories", remainingCalories)
        const currentDate = new Date().toISOString().split('T')[0];
        // const currentDate = new Date();
        // currentDate.setDate(currentDate.getDate() + 1);
        // const nextDate = currentDate.toISOString().split('T')[0];


        // If meals are not in the cache or the date has changed, fetch them from the database
        if (!mealCache[userId] || mealCache[userId].date !== currentDate) {
            const lastMeal = await prisma.meal.findFirst({
                orderBy: {
                    last_meal_date: 'desc'
                }
            });

            // Check if the meals need to be reset (reset if it's another day)
            if (!lastMeal || (lastMeal?.last_meal_date?.toISOString().split('T')[0] !== currentDate)) {
                // Reset the meals
                let condition = {};

                if (calories) {
                    condition = {
                        calories: {
                            lte: remainingCalories
                        }
                    };
                }

                const allMeals = await prisma.meal.findMany({
                    where: condition,
                    select: {
                        mealId: true,
                        meal_name: true,
                        calories: true,
                        meal_image: true
                    }
                });
                if (allMeals.length === 0) {
                    return [];
                }
                let filteredMeals = allMeals;
                // Filter meals based on remainingCalories
                if (calories) {
                    const filteredMeals = allMeals.filter(meal => meal.calories < remainingCalories);
                    if (filteredMeals.length === 0) {
                        return [];
                    }
                }
                if (filteredMeals.length === 0) {
                    return [];
                }

                // Shuffle the meals for each meal
                const breakfastMeals = mealHelper.shuffleMeals([...filteredMeals]);
                const lunchMeals = mealHelper.shuffleMeals([...filteredMeals]);
                const dinnerMeals = mealHelper.shuffleMeals([...filteredMeals]);

                // Store the meals in the cache
                mealCache[userId] = {
                    breakfastMeals,
                    lunchMeals,
                    dinnerMeals,
                    mealCount: filteredMeals.length,
                    date: currentDate
                };
            }
        }

        // Get the meals from the cache
        const meals = mealCache[userId];
        // Perform pagination on the cached meals
        const paginatedMeals = {
            breakfastMeals: meals.breakfastMeals.slice(start, start + limit),
            lunchMeals: meals.lunchMeals.slice(start, start + limit),
            dinnerMeals: meals.dinnerMeals.slice(start, start + limit),
            mealCount: meals.mealCount,
        };

        return paginatedMeals;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = {
    getMeal
}