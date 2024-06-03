const { prisma } = require("../config/prismaDatabase");
const mealHelper = require('../helpers/mealHelper.js');
const mealCache = {};
const axios = require('axios');
const TIME_MEAL = {
    BREAKFAST: 'breakfast',
    LUNCH: 'lunch',
    DINNER: 'dinner'
}
const getMeal = async (userId, time_meal, page, limit, return_random) => {
    try {
        limit = parseInt(limit) || parseInt(process.env.LIMIT_GET_MEAL);
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
                        protein : true,
                        fat : true,
                        carb : true,
                        meal_image: true,
                    }
                });
                allMeals.forEach(meal => {
                    meal.meal_name = meal.meal_name
                        .split('_')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ');
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
                const fullMeals = mealHelper.shuffleMeals([...filteredMeals]);
                // Store the meals in the cache
                mealCache[userId] = {
                    breakfastMeals,
                    lunchMeals,
                    dinnerMeals,
                    fullMeals,
                    mealCount: filteredMeals.length,
                    date: currentDate
                };
            }
        }

        // Get the meals from the cache
        const meals = mealCache[userId];
        let selectedMeals = [];
        if (time_meal) {
            switch (time_meal) {
                case TIME_MEAL.BREAKFAST:
                    selectedMeals = meals.breakfastMeals;
                    break;
                case TIME_MEAL.LUNCH:
                    selectedMeals = meals.lunchMeals;
                    break;
                case TIME_MEAL.DINNER:
                    selectedMeals = meals.dinnerMeals;
                    break;
                default:
                    selectedMeals = mealHelper.shuffleMeals([...meals.breakfastMeals, ...meals.lunchMeals, ...meals.dinnerMeals]);
                    break;
            }
        } else {
            selectedMeals = meals.fullMeals;
        }
        
        if (return_random) {
            selectedMeals = mealHelper.shuffleMeals([...selectedMeals]);
        }
        
        // Perform pagination on the selected meals
        const paginatedMeals = {
            meals: selectedMeals.slice(start, start + limit),
            mealCount: selectedMeals.length,
        };

        return paginatedMeals;
    } catch (error) {
        return false;
    }
}

const getDetailMeal = async (mealId) => {
    try {
        const meal = await prisma.meal.findUnique({
            where: {
                mealId: mealId
            },
            select: {
                meal_name: true,
                calories: true,
                protein: true,
                fat: true,
                carb: true,
                meal_image: true,
                description: true
            }
        });

        if (meal) {
            meal.calories = Math.round(meal.calories * 100) / 100;
            meal.protein = Math.round(meal.protein * 100) / 100;
            meal.fat = Math.round(meal.fat * 100) / 100;
            meal.carb = Math.round(meal.carb * 100) / 100;

            if (meal.meal_name) {
                meal.meal_name = meal.meal_name
                    .split('_')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
            }
            if (meal.description) {
                meal.description = meal.description.replace(/;/g, ",");
            }
        }
        return meal;
    } catch (error) {
        return false;
    }
}

const getNutritionbyImage = async (image) => {
    try {
        // Convert image to base64
        const imageBase64 = Buffer.from(image.buffer).toString('base64');

        const response = await axios.post('http://127.0.0.1:5000/predict', {
            image_path: imageBase64
        });
        const food = response.data.class;
        const mealId = await prisma.meal.findFirst({
            where : {
                meal_name : food
            },
            select : {
                mealId : true,
            }
        })
        return mealId.mealId;
    } catch (error) {
        return false;
    }
};

module.exports = {
    getMeal,
    getDetailMeal,
    getNutritionbyImage
}