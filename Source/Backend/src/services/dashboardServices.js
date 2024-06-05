const { initializeApp } = require("firebase/app");
const firebaseConfig = require('../config/firebase.js');
const { prisma } = require('../config/prismaDatabase.js');
const admin = require('firebase-admin');
// const serviceAccount = require('../config/fitness-application-proj-6e3c9-firebase-adminsdk-vk5n2-d743dfbb69.json');

// // Initialize Firebase Admin
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: 'https://fitness-application-proj-6e3c9.firebaseio.com'
// });


const getDashboard = async (userId) => {
    try {
        const today = new Date();
        const day = new Date(today.toISOString().split('T')[0] + 'T00:00:00Z');
        const dashboard = await prisma.dashboard.findFirst({
            where: {
                userId: userId,
                day: {
                    equals: day
                }
            },
            select: {
                time_practice: true,
                time_sleep: true,
                calories_burned: true,
                exercise_complete: true
            }
        });
        if (!dashboard) {
            return {
                time_practice: 0,
                time_sleep: 0,
                calories_burned: 0,
                exercise_complete: 0
            }
        }
        return dashboard;
    } catch (error) {
        return false;
    }
}

async function updateDashboard(user, data) {
    try {
        const today = new Date();
        data.day = new Date(today.toISOString().split('T')[0] + 'T00:00:00Z');
        const existingDashboard = await prisma.dashboard.findFirst({
            where: {
                userId: user.userId,
                day: data.day
            }
        });
        if (existingDashboard && existingDashboard.day.toISOString().split('T')[0] === data.day.toISOString().split('T')[0]) {
            const updatedDashboard = {
                ...existingDashboard,
                calories_burned: data.calories_burned !== undefined ? existingDashboard.calories_burned + data.calories_burned : existingDashboard.calories_burned,
                time_practice: data.time_practice !== undefined ? existingDashboard.time_practice + data.time_practice : existingDashboard.time_practice,
                time_sleep: data.time_sleep !== undefined ? data.time_sleep : existingDashboard.time_sleep,
                calories_loaded: data.calories_loaded !== undefined ? existingDashboard.calories_loaded + data.calories_loaded : existingDashboard.calories_loaded,
                weight: user.weight,
                level: user.level,
                exercise_complete: existingDashboard.exercise_complete + (data.time_practice && data.calories_burned ? 1 : 0)
            };
            delete updatedDashboard.dashboardId;
            delete updatedDashboard.userId
            const result = await prisma.dashboard.update({
                where: {
                    userId: user.userId,
                    dashboardId: existingDashboard.dashboardId
                },
                data: updatedDashboard
            });

            // Check if user has completed 10 exercises
            // if (result.exercise_complete = 10) {
            //     const message = {
            //         notification: {
            //             title: 'Congratulations!',
            //             body: 'A user has completed 10 exercises!'
            //         },
            //         topic: 'exercise_complete' // Replace with the actual topic
            //     };

            //     admin.messaging().send(message)
            //         .then((response) => {
            //             console.log('Successfully sent message:', response);

            //             // Store the message content and response in your Firebase Database
            //             return admin.database().ref('messages').push({
            //                 messageId: response,
            //                 content: message,
            //                 timestamp: admin.database.ServerValue.TIMESTAMP
            //             });
            //         })
            //         .catch((error) => {
            //             console.log('Error sending message:', error);
            //         });
            // }

            return result;
        } else {
            const newDashboard = {
                userId: user.userId,
                weight: user.weight,
                level: user.level,
                exercise_complete: data.time_practice && data.calories_burned ? 1 : 0,
                ...data,
                exercise_complete: data.time_practice && data.calories_burned ? 1 : 0
            };
            return await prisma.dashboard.create({
                data: newDashboard
            });
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}

module.exports = {
    getDashboard,
    updateDashboard
}