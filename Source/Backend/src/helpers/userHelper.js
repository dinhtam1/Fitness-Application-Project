const LEVEL_MULTIPLIERS = {
    "BEGINNER": 1.375,
    "ADVANCED": 1.55
};

const GENDER_CONSTANTS = {
    "male": { a: 66, b: 13.7, c: 5, d: 6.76 },
    "female": { a: 655, b: 9.6, c: 1.8, d: 4.7 }
};

const calculatorCalories = (weight, height, age, gender, level) => {
    const genderConstants = GENDER_CONSTANTS[gender];
    const bmr = genderConstants.a + (genderConstants.b * weight) + (genderConstants.c * height) - (genderConstants.d * age);
    const calories = LEVEL_MULTIPLIERS[level] * bmr;
    return calories;
};

module.exports = {calculatorCalories}