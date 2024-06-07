const { prisma } = require('../config/prismaDatabase.js');
const { initializeApp } = require("firebase/app");
const { getStorage, ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const firebaseConfig = require('../config/firebase.js');
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const TYPE = {
    PNG : 'image/png',
    AVT : 'cover-exercise'
}
const createExerciseList = async (userId, list_name, image) => {
    try {
        const exerciseList =  await prisma.exerciseList.create({
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


module.exports = {
    createExerciseList
}