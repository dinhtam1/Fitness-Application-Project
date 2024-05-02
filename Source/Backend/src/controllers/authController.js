const userServices = require('../services/userServices');
const keyTokenServices = require('../services/keyTokenServices.js');
const bcrypt = require('bcrypt');
const constant = require('../constant/appNumber.js');
const { createTokenPair } = require('../auth/authUtils');
const crypto = require('crypto');
const statusCode = require('../constant/appNumber.js')
const Type = require('../constant/appRequestType.js')
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const randomatic = require('randomatic');
const HEADER = {
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION: 'authorization',
}

const signIn = async (req, res, next) => {
    try {
        var data = null;
        var requestType = Type.SIGN_IN;
        const foundUser = await userServices.getUserByEmail(req.body.email);
        if (!foundUser) {
            return res.status(200).json({
                statusCode: statusCode.SUCCESS,
                message: 'User not already registered',
                data,
                requestType
            });
        }
        const match = await bcrypt.compare(req.body.password, foundUser.password);
        if (!match) {
            return res.status(200).json({
                statusCode: statusCode.SUCCESS,
                message: 'Authentication failed',
                data,
                requestType
            });
        }
        const privateKey = crypto.randomBytes(64).toString('hex');
        const publicKey = crypto.randomBytes(64).toString('hex');
        const { userId } = foundUser;
        const tokens = await createTokenPair({ userId, email: foundUser.email, role: foundUser.role }, publicKey, privateKey);
        const keyToken = await keyTokenServices.createKeyToken({
            refreshToken: tokens.refreshToken,
            privateKey,
            publicKey,
            userId
        })
        return res.status(200).json({
            statusCode: statusCode.SUCCESS,
            message: 'Login successfully',
            data: {
                foundUser,
                tokens
            },
            requestType
        });

    }
    catch (error) {
        return res.status(500).json({
            statusCode: statusCode.INTERNAL_SERVER_ERROR,
            message: "Internal server error",
            requestType
        });
    }
};

const signUp = async (req, res, next) => {
    try {
        var data = null;
        var requestType = Type.SIGN_UP
        const user = await userServices.getUserByEmail(req.body.email);
        if (user) {
            return res.status(200).json({
                statusCode: statusCode.SUCCESS,
                message: "User already registered",
                data,
                requestType
            });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, constant.SALT_ROUNDS);
        req.body.password = hashedPassword;
        const createUser = await userServices.createUser(
            req.body
        );

        if (createUser) {
            const privateKey = crypto.randomBytes(64).toString('hex')
            const publicKey = crypto.randomBytes(64).toString('hex')
            const tokens = await createTokenPair({
                userId: createUser.userId, email: createUser.email, role: createUser.role
            },
                publicKey,
                privateKey
            )
            const keyStore = await keyTokenServices.createKeyToken({
                userId: createUser.userId,
                publicKey,
                privateKey,
                refreshToken: tokens.refreshToken
            })
            if (!keyStore) {
                return res.status(200).json({
                    statusCode: statusCode.SUCCESS,
                    message: "KeyStore not created",
                    data,
                    requestType
                })
            }
            return res.status(201).json({
                statusCode: statusCode.CREATED,
                message: "Create user successfull",
                data: { createUser, tokens },
                requestType
            });
        }
        return res.status(400).json({
            statusCode: statusCode.BAD_REQUEST,
            message: "Error creating user",
            data,
            requestType
        });
    } catch (error) {
        console.error("Error during sign up:", error);
        return res.status(500).json({
            statusCode: statusCode.INTERNAL_SERVER_ERROR,
            message: "Internal server error",
            requestType

        });
    }
};

const logOut = async (req, res, next) => {
    try {
        var requestType = Type.LOGOUT
        var data = null
        const delKey = await keyTokenServices.removeKeyById(req.user.userId);
        if (!delKey) {
            return res.status(200).json({
                statusCode: statusCode.SUCCESS,
                message: "Error delete key",
                data,
                requestType
            });
        }
        return res.status(200).json({
            statusCode: statusCode.SUCCESS,
            message: "Logout successfully",
            data,
            requestType
        })
    } catch (error) {
        return res.status(500).json({
            statusCode: statusCode.INTERNAL_SERVER_ERROR,
            message: error.message,
            requestType
        });
    }

}

const decodeToken = async (req, res, next) => {
    var requestType = Type.DECODE_TOKEN;
    var data = null;
    try {
        const userId = Number(req.headers[HEADER.CLIENT_ID]);
        if (!userId) {
            return res.status(200).json({
                statusCode: statusCode.SUCCESS,
                message: 'User not found',
                data,
                requestType
            });
        }
        const keyStore = await keyTokenServices.getKeyTokenByUserId(userId);
        if (!keyStore) {
            return res.status(200).json({
                statusCode: statusCode.SUCCESS,
                message: 'KeyStore not found',
                data,
                requestType
            });
        }
        const accessToken = req.headers[HEADER.AUTHORIZATION];
        if (!accessToken) {
            return res.status(200).json({
                statusCode: statusCode.SUCCESS,
                message: 'accessToken not found',
                data,
                requestType
            });
        }
        try {
            const decodeUser = jwt.verify(accessToken, keyStore.privateKey, { algorithms: ['HS256'] });
            if (userId !== decodeUser.userId) {
                return res.status(200).json({
                    statusCode: statusCode.SUCCESS,
                    message: 'Invalid User',
                    data,
                    requestType
                });
            }
            delete decodeUser.iat;
            delete decodeUser.exp;
            return res.status(200).json({
                statusCode: statusCode.SUCCESS,
                message: 'Decode token successfully',
                data: decodeUser,
            });
        } catch (err) {
            console.error('error verify ', err);
            return res.status(500).json({
                statusCode: statusCode.INTERNAL_SERVER_ERROR,
                message: 'Error verifying token',
                data,
                requestType
            });
        }
    } catch (error) {
        return res.status(500).json({
            statusCode: statusCode.INTERNAL_SERVER_ERROR,
            message: error.message,
            requestType
        });
    }
}

const sendOTP = async (req, res, next) => {
    try {
        const email = req.body.email;
        const OTP = randomatic('0', 4);
        var requestType = Type.SEND_OTP;
        const checkEmail = await userServices.checkEmail(email);
        if (!checkEmail) {
            return res.status(200).json({
                statusCode: statusCode.SUCCESS,
                message: 'Email does not exist',
                checkEmail,
                requestType
            });
        }
        const sendOTP = await userServices.sendOTPtoEmail(email, OTP);
        if (!sendOTP) {
            return res.status(200).json({
                statusCode: statusCode.SUCCESS,
                message: 'Error sending OTP',
                sendOTP,
                requestType
            });
        }
        const saveOTP = await userServices.saveOTPbyEmail(email, OTP);
        if (!saveOTP) {
            return res.status(200).json({
                statusCode: statusCode.SUCCESS,
                message: 'Error saving OTP',
                saveOTP,
                requestType
            });
        }
        return res.status(200).json({
            statusCode: statusCode.SUCCESS,
            message: 'OTP sent successfully',
            sendOTP,
            requestType
        })
    }
    catch (error) {
        return res.status(500).json({
            statusCode: statusCode.INTERNAL_SERVER_ERROR,
            message: error.message,
            requestType
        });
    }
}

const verifyOTP = async (req, res, next) => {
    try {
        const currentTime = new Date();
        const OTP = req.body.OTP;
        const email = req.body.email;
        var requestType = Type.VERIFY_OTP;
        const OTPUser = await userServices.getOTPbyEmail(email);
        if (!OTPUser) {
            return res.status(200).json({
                statusCode: statusCode.SUCCESS,
                message: 'Not Found OTP',
                OTPUser,
                requestType
            });
        }
        if (OTP !== OTPUser.OTP || OTPUser.otp_expiry_at < currentTime) {
            return res.status(200).json({
                statusCode: statusCode.SUCCESS,
                message: 'Invalid OTP',
                requestType
            });
        }
        if (OTP == OTPUser.OTP && OTPUser.otp_expiry_at > currentTime) {
            const foundUser = await userServices.getUserByEmail(email);
            const privateKey = crypto.randomBytes(64).toString('hex');
            const publicKey = crypto.randomBytes(64).toString('hex');
            const { userId } = foundUser;
            const tokens = await createTokenPair({ userId, email: foundUser.email, role: foundUser.role }, publicKey, privateKey);
            const keyToken = await keyTokenServices.createKeyToken({
                refreshToken: tokens.refreshToken,
                privateKey,
                publicKey,
                userId
            })
            const statusVerify = await userServices.setStatusVerify(email);
            return res.status(200).json({
                statusCode: statusCode.SUCCESS,
                message: 'Verify successfully',
                data: {
                    tokens
                },
                requestType
            });
        }

    } catch (error) {

    }
}


module.exports = {
    signIn,
    signUp,
    logOut,
    decodeToken,
    sendOTP,
    verifyOTP,
}