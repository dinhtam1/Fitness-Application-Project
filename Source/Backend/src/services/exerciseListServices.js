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

const levelToString = level => {
    switch(level) {
        case 0:
            return "BEGINNER";
        case 1:
            return "ADVANCED";
        default:
            return "UNKNOWN";
    }
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

const addExerciseToList = async (exerciseId, exerciseListIds) => {
    try {
        const results = [];
        for (const exerciseListId of exerciseListIds) {
            const exerciseList = await prisma.exerciseOnList.findFirst({
                where: {
                    exerciseListId: exerciseListId,
                    exerciseId: exerciseId
                }
            })
            if (!exerciseList) {
                const result = await prisma.exerciseOnList.create({
                    data: {
                        exerciseId: exerciseId,
                        exerciseListId: exerciseListId
                    }
                });
                results.push(result);
            }
        }
        return results;
    } catch (error) {
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
                                caloriesBurned : true,
                                muscle_group : {
                                    select : {
                                        level : true
                                    }
                                }
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
                    const { muscle_group: { level }, ...exercise } = exerciseOnList.exercise;
                    return {
                        ...exercise,
                        level,
                        name: getNamebyUrl(exercise.image)
                    }
                })
            }
        });
        const transformedData = exerciseWithNames.map(item => item.exercises).flat();
        const finalData = transformedData.map(item => {
            return {
                ...item,
                level: levelToString(item.level)
            }
        });
        
        return finalData;
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
            const quantityExercise = list.exercises.length;
            return {
                exerciseListId: list.exerciseListId,
                list_name: list.list_name,
                cover_image: list.cover_image,
                totalDuration,
                quantityExercise
            };
        });
    } catch (error) {
        return false;
    }
}

const deleteExerciseList = async (userId, exerciseListId) => {
    try {
        const exerciseList = await prisma.exerciseList.findFirst({
            where: {
                userId: userId,
                exerciseListId
            }
        });
        if(!exerciseList) return false;
        await prisma.exerciseOnList.deleteMany({
            where: {
                exerciseListId: exerciseListId,
            },
        });
        await prisma.exerciseList.delete({
            where: {
                userId: userId,
                exerciseListId
            }
        });
        return true;
    } catch (error) {
        return false;
    }
}

const deleteExerciseInList = async (userId, exerciseListId, exerciseId) => {
    try {
        const exerciseList = await prisma.exerciseList.findFirst({
            where: {
                userId: userId,
                exerciseListId
            }
        });
        if(!exerciseList) return false;
        await prisma.exerciseOnList.deleteMany({
            where: {
                exerciseListId: exerciseListId,
                exerciseId
            }
        });
        return true;
    } catch (error) {
        return false;
    }
}

const updateNameExerciseList = async (userId, exerciseListId, list_name) => {
    try {
        await prisma.exerciseList.update({
            where: {
                userId: userId,
                exerciseListId
            },
            data: {
                list_name
            }
        });
        return true;
    } catch (error) {
        return false;
    }
}

module.exports = {
    createExerciseList,
    addExerciseToList,
    getExerciseInList,
    getExerciseList,
    deleteExerciseList,
    deleteExerciseInList,
    updateNameExerciseList
}