const shuffleMeals = (meals) => {
    for (let i = meals.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [meals[i], meals[j]] = [meals[j], meals[i]];
    }
    return meals;
}

module.exports = {shuffleMeals}