const { prisma } = require('../config/prismaDatabase');
const nodemailer = require('nodemailer');
const moment = require('moment-timezone');
const { date } = require('joi');
const appString = require('../constant/appString.js')
const userHelper = require('../helpers/userHelper.js')
const { initializeApp } = require("firebase/app");
const { getStorage, ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const firebaseConfig = require('../config/firebase.js');

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
const storage = getStorage(app);
const style = {
    divStyle: 'style="text-align: center;"',
    pStyle: 'style="color: black; font-size: 24px"'
}
const service = {
    gmail: 'gmail',
}
const TYPE = {
    PNG : 'image/png',
    AVT : 'avatars'
}

const createUser = async (user) => {
    try {
        var calories = 0
        if (user.weight && user.height && user.age && user.gender && user.level) {
            calories = userHelper.calculatorCalories(user.weight, user.height, user.age, user.gender, user.level);
        }
        user.calories = calories;
        return await prisma.user.create({
            data: user
        });
    } catch (e) {
        return false
    };
};

const getUserByEmail = async (email) => {
    try {
        return await prisma.user.findUnique({
            where: {
                email: email
            }
        });
    } catch (e) {
        return false
    }
}

const checkEmail = async (email) => {
    try {
        return await prisma.user.findUnique({
            where: {
                email: email
            }
        })
    } catch (error) {
        return false
    }
}

const sendOTPtoEmail = async (email, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            service: service.gmail,
            auth: {
                user: process.env.USERNAME_EMAIL,
                pass: process.env.PASS_EMAIL
            }
        });
        const mailOptions = {
            from: process.env.USERNAME_EMAIL,
            to: email,
            subject: appString.SUBJECT_EMAIL,
            html: `<div ${style.divStyle}>
                <p ${style.pStyle}>${appString.CONTENT_EMAIL}</p>
                <h1>${otp}</h1>
            </div>`
        };

        const sendOTP = async () => {
            try {
                const info = await transporter.sendMail(mailOptions);
                return true;
            } catch (err) {
                return false;
            }
        };
        const result = await sendOTP();
        return result;

    }
    catch (error) {
        return false;
    }
}

const saveOTPbyEmail = async (email, OTP) => {
    const otp_expiry_at = new Date();
    otp_expiry_at.setMinutes(otp_expiry_at.getMinutes() + 5);
    try {
        return await prisma.user.update({
            where: { email: email },
            data: { OTP: OTP, otp_expiry_at },
        });
    } catch (e) {
        return false;
    }
}

const getOTPbyEmail = async (email) => {
    try {
        return await prisma.user.findUnique({
            where: {
                email: email
            },
            select: {
                OTP: true,
                otp_expiry_at: true,
            }
        });
    } catch (e) {
        return false
    }
}

const setStatusVerify = async (email) => {
    try {
        return await prisma.user.update({
            where: { email: email },
            data: { is_verified: true },
        });
    } catch (e) {
        return false;
    }
}

const updatePasswordbyEmail = async (email, password) => {
    try {
        return await prisma.user.update({
            where: { email: email },
            data: { password }
        })
    } catch (error) {
        return false
    }
}

const getUserByUserId = async (userId) => {
    try {
        return await prisma.user.findUnique({
            where: {
                userId: userId
            },
            select: {
                full_name: true,
                phone_number: true,
                email: true,
                weight: true,
                height: true,
                gender: true,
                age: true,
                avatar_url : true,
            }
        });
    } catch (e) {
        return false
    }
}

const updateUser = async (userId, data, avatarImage) => {
    try {
        if (data.weight && data.height && data.age && data.gender && data.level) {
            data.calories = userHelper.calculatorCalories(data.weight, data.height, data.age, data.gender, data.level);
        }
        if (avatarImage && avatarImage.buffer) {
            const blob = new Blob([avatarImage.buffer], { type: TYPE.PNG });
            const storage = getStorage();
            const storageRef = ref(storage, `${TYPE.AVT}/${userId}`);
            await uploadBytes(storageRef, blob);
            data.avatar_url = await getDownloadURL(storageRef);
        }
        return await prisma.user.update({
            where: {
                userId: userId
            },
            data: data
        });
    } catch (error) {
        return false;
    }
}

const getAllUser = async (userId) => {
    try {
        return await prisma.user.findMany({
            where: {
                userId: {
                    not: userId
                }
            },
            select : {
                full_name : true,
                phone_number : true,
                email : true,
                age : true,
                gender : true,
                weight : true,
                height : true,
                level : true,
                goal : true,
                avatar_url : true,
                role : true,
                status: true,
            }
        });

    } catch (error) {
        return false
    }
}

const updateStatusUser = async (userId, status) => {
    try {
        return await prisma.user.update({
            where: {
                userId: userId
            },
            data: {
                status: status
            }
        });
    } catch (error) {
        return false;
    }
}

module.exports = {
    createUser,
    getUserByEmail,
    sendOTPtoEmail,
    saveOTPbyEmail,
    getOTPbyEmail,
    checkEmail,
    setStatusVerify,
    updatePasswordbyEmail,
    getUserByUserId,
    updateUser,
    getAllUser,
    updateStatusUser
}