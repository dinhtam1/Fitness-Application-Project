const { prisma } = require('../config/prismaDatabase');
const nodemailer = require('nodemailer');
const moment = require('moment-timezone');
const { date } = require('joi');
const createUser = async (user) => {
    try {
        return await prisma.user.create({
            data: user
        });
    } catch (e) {
        console.log(e)
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
            service: 'gmail',
            auth: {

                user: process.env.USERNAME_EMAIL,
                pass: process.env.PASS_EMAIL
            }
        });
        const mailOptions = {
            from: process.env.USERNAME_EMAIL,
            to: email,
            subject: 'Your OTP',
            text: `Your OTP is ${otp}, it will expire in 5 minutes. Please do not share it with anyone.`
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
        console.log(error);
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
        console.log(e);
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
        console.log(e);
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

module.exports = {
    createUser,
    getUserByEmail,
    sendOTPtoEmail,
    saveOTPbyEmail,
    getOTPbyEmail,
    checkEmail,
    setStatusVerify,
    updatePasswordbyEmail
}