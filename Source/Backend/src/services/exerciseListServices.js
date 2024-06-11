const { prisma } = require('../config/prismaDatabase.js');
const { getNamebyUrl } = require('../helpers/exerciseHelper.js');
const { initializeApp } = require("firebase/app");
const { getStorage, ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const firebaseConfig = require('../config/firebase.js');
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const TYPE = {
    PNG: 'image/png',
    AVT: 'cover-exercise'
}
const createExerciseList = async (userId, list_name, image) => {
    try {
        const exerciseList = await prisma.exerciseList.create({
            data: {
                userId: userId,
                list_name: list_name
            }
        });
        if (image && image.buffer) {
            const blob = new Blob([image.buffer], { type: TYPE.PNG });
            const storageRef = ref(storage, `${TYPE.AVT}/${exerciseList.exerciseListId}`);
            await uploadBytes(storageRef, blob);
            const url = await getDownloadURL(storageRef);
            await prisma.exerciseList.update({
                where: {
                    exerciseListId: exerciseList.exerciseListId
                },
                data: {
                    cover_image: url
                }
            });
        }
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

const addExerciseToList = async (exerciseId, exerciseListId) => {
    try {
        const exerciseList = await prisma.exerciseOnList.findFirst({
            where: {
                exerciseListId: exerciseListId,
                exerciseId: exerciseId
            }
        })
        if (exerciseList) {
            return false
        } else {
            return await prisma.exerciseOnList.create({
                data: {
                    exerciseId: exerciseId,
                    exerciseListId: exerciseListId
                }
            });
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}

const getExerciseInList = async (userId, exerciseListId) => {
    try {
        const exercise = await prisma.exerciseList.findMany({
            where: {
                userId: userId,
                exerciseListId
            },
            select: {
                exercises: {
                    select: {
                        exercise: {
                            select: {
                                exerciseId: true,
                                image: true,
                                duration : true,
                                caloriesBurned : true
                            }
                        }
                    }
                }
            }
        });
        if(exercise[0].exercises.length == 0) return false;
        const exerciseWithNames = exercise.map(exerciseList => {
            return {
                ...exerciseList,
                exercises: exerciseList.exercises.map(exerciseOnList => {
                    return {
                        ...exerciseOnList,
                        exercise: {
                            ...exerciseOnList.exercise,
                            name: getNamebyUrl(exerciseOnList.exercise.image)
                        }
                    }
                })
            }
        });
        const transformedData = exerciseWithNames.map(item => item.exercises.map(exerciseItem => exerciseItem.exercise)).flat();
        return transformedData
    } catch (error) {
        return false;
    }
}

const getExerciseList = async (userId) => {
    try {
        const exerciseLists = await prisma.exerciseList.findMany({
            where: {
                userId: userId
            },
            select : {
                exerciseListId : true,
                list_name : true,
                cover_image : true,
                exercises: {
                    select: {
                        exercise: {
                            select: {
                                duration: true,
                                caloriesBurned: true
                            }
                        }
                    }
                }
            }
        });

        return exerciseLists.map(list => {
            const totalDuration = list.exercises.reduce((total, exerciseOnList) => total + exerciseOnList.exercise.duration, 0);
            const totalCaloriesBurned = list.exercises.reduce((total, exerciseOnList) => total + exerciseOnList.exercise.caloriesBurned, 0);
            return {
                exerciseListId: list.exerciseListId,
                list_name: list.list_name,
                cover_image: list.cover_image,
                totalDuration,
                totalCaloriesBurned
            };
        });
    } catch (error) {
        return false;
    }
}
module.exports = {
    createExerciseList,
    addExerciseToList,
    getExerciseInList,
    getExerciseList
}