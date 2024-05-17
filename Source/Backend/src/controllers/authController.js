const userServices = require('../services/userServices');
const keyTokenServices = require('../services/keyTokenServices.js');
const bcrypt = require('bcrypt');
const constant = require('../constant/appNumber.js');
const { createTokenPair } = require('../auth/authUtils');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const randomatic = require('randomatic');

const statusCode = require('../constant/appNumber.js')
const Type = require('../constant/appRequestType.js')
const appString = require('../constant/appString.js')
const HEADER = {
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION: 'authorization',
}
const algorithm = {
    HS256 : 'HS256',
}
const NUMBER = {
    randomBytes : 64,
    lengthOTP : 4
}
const STRING = {
    hex : 'hex'
}
const TYPE_RANDOM = {
    string : '?',
    number : '0',
    string_upper : 'A',
    all_type : '*'
}

const signIn = async (req, res, next) => {
    var data = null;
    var requestType = Type.SIGN_IN;
    try {
        const foundUser = await userServices.getUserByEmail(req.body.email);
        if (!foundUser) {
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.FAIL,
                message: appString.USER_NOT_REGISTERED,
                data,
                requestType
            });
        }
        const match = await bcrypt.compare(req.body.password, foundUser.password);
        if (!match) {
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.FAIL,
                message: appString.AUTHENTICATION_FAILED,
                data,
                requestType
            });
        }
        const privateKey = crypto.randomBytes(NUMBER.randomBytes).toString(STRING.hex);
        const publicKey = crypto.randomBytes(NUMBER.randomBytes).toString(STRING.hex);
        const { userId } = foundUser;
        const tokens = await createTokenPair({ userId, email: foundUser.email, role: foundUser.role, goal : foundUser.goal, level: foundUser.level, gender: foundUser.gender, weight : foundUser.weight, height : foundUser.height }, publicKey, privateKey);
        const keyToken = await keyTokenServices.createKeyToken({
            refreshToken: tokens.refreshToken,
            privateKey,
            publicKey,
            userId
        })
        return res.status(statusCode.SUCCESS).json({
            statusCode: statusCode.SUCCESS,
            message: appString.LOGIN_SUCCESSFUL,
            data: {
                user : foundUser,
                tokens
            },
            requestType
        });

    }
    catch (error) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            statusCode: statusCode.INTERNAL_SERVER_ERROR,
            message: appString.INTERNAL_SERVER_ERROR,
            requestType
        });
    }
};

const signUp = async (req, res, next) => {
    var data = null;
    var requestType = Type.SIGN_UP
    try {
        const user = await userServices.getUserByEmail(req.body.email);
        if (user) {
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.FAIL,
                message: appString.USER_ALREADY_REGISTERED,
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
            console.log(createUser);
            const privateKey = crypto.randomBytes(NUMBER.randomBytes).toString(STRING.hex)
            const publicKey = crypto.randomBytes(NUMBER.randomBytes).toString(STRING.hex)
            const tokens = await createTokenPair({
                userId: createUser.userId, email: createUser.email, role: createUser.role, goal : createUser.goal, level: createUser.level, gender : createUser.gender, weight : createUser.weight, height : createUser.height
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
                return res.status(statusCode.SUCCESS).json({
                    statusCode: statusCode.FAIL,
                    message: appString.KEYSTORE_NOT_CREATED,
                    data,
                    requestType
                })
            }
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.SUCCESS,
                message: appString.CREATE_USER_SUCCESSFUL,
                data: { user : createUser, tokens },
                requestType
            });
        }
        return res.status(statusCode.SUCCESS).json({
            statusCode: statusCode.FAIL,
            message: appString.ERROR_CREATING_USER,
            data,
            requestType
        });
    } catch (error) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            statusCode: statusCode.INTERNAL_SERVER_ERROR,
            message: appString.INTERNAL_SERVER_ERROR,
            requestType

        });
    }
};

const logOut = async (req, res, next) => {
    var requestType = Type.LOGOUT
    var data = null
    try {
        const delKey = await keyTokenServices.removeKeyById(req.user.userId);
        if (!delKey) {
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.FAIL,
                message: appString.ERROR_DELETE_KEY,
                data,
                requestType
            });
        }
        return res.status(statusCode.SUCCESS).json({
            statusCode: statusCode.FAIL,
            message: appString.LOGOUT_SUCCESSFUL,
            data,
            requestType
        })
    } catch (error) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            statusCode: statusCode.INTERNAL_SERVER_ERROR,
            message: appString.INTERNAL_SERVER_ERROR,
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
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.FAIL,
                message: appString.USER_NOT_FOUND,
                data,
                requestType
            });
        }
        const keyStore = await keyTokenServices.getKeyTokenByUserId(userId);
        if (!keyStore) {
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.FAIL,
                message: appString.KEYSTORE_NOT_FOUND,
                data,
                requestType
            });
        }
        const accessToken = req.headers[HEADER.AUTHORIZATION];
        if (!accessToken) {
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.FAIL,
                message: appString.ACCESS_TOKEN_NOT_FOUND,
                data,
                requestType
            });
        }
        try {
            const decodeUser = jwt.verify(accessToken, keyStore.privateKey, { algorithms: [algorithm.HS256] });
            if (userId !== decodeUser.userId) {
                return res.status(statusCode.SUCCESS).json({
                    statusCode: statusCode.FAIL,
                    message: appString.INVALID_USER,
                    data,
                    requestType
                });
            }
            delete decodeUser.iat;
            delete decodeUser.exp;
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.SUCCESS,
                message: appString.DECODE_TOKEN_SUCCESSFUL,
                data: decodeUser,
            });
        } catch (err) {
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
                statusCode: statusCode.FAIL,
                message: appString.ERROR_VERIFYING_TOKEN,
                data,
                requestType
            });
        }
    } catch (error) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            statusCode: statusCode.FAIL,
            message: appString.INTERNAL_SERVER_ERROR,
            requestType
        });
    }
}

const sendOTP = async (req, res, next) => {
    var requestType = Type.SEND_OTP;
    try {
        const email = req.body.email;
        const OTP = randomatic(TYPE_RANDOM.number, NUMBER.lengthOTP);
        const checkEmail = await userServices.checkEmail(email);
        if (!checkEmail) {
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.FAIL,
                message: appString.EMAIL_DOES_NOT_EXIST,
                checkEmail,
                requestType
            });
        }
        const sendOTP = await userServices.sendOTPtoEmail(email, OTP);
        if (!sendOTP) {
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.FAIL,
                message: appString.ERROR_SENDING_OTP,
                sendOTP,
                requestType
            });
        }
        const saveOTP = await userServices.saveOTPbyEmail(email, OTP);
        if (!saveOTP) {
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.FAIL,
                message: appString.ERROR_SAVING_OTP,
                saveOTP,
                requestType
            });
        }
        return res.status(statusCode.SUCCESS).json({
            statusCode: statusCode.SUCCESS,
            message: appString.OTP_SENT_SUCCESSFULLY,
            sendOTP,
            requestType
        })
    }
    catch (error) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            statusCode: statusCode.FAIL,
            message: appString.INTERNAL_SERVER_ERROR,
            requestType
        });
    }
}

const verifyOTP = async (req, res, next) => {
    var requestType = Type.VERIFY_OTP;
    try {
        const currentTime = new Date();
        const OTP = req.body.OTP;
        const email = req.body.email;
        const OTPUser = await userServices.getOTPbyEmail(email);
        if (!OTPUser) {
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.FAIL,
                message: appString.OTP_NOT_FOUND,
                OTPUser,
                requestType
            });
        }
        if (OTP !== OTPUser.OTP || OTPUser.otp_expiry_at < currentTime) {
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.FAIL,
                message: appString.INVALID_OTP,
                requestType
            });
        }
        if (OTP == OTPUser.OTP && OTPUser.otp_expiry_at > currentTime) {
            const foundUser = await userServices.getUserByEmail(email);
            const privateKey = crypto.randomBytes(NUMBER.randomBytes).toString(STRING.hex);
            const publicKey = crypto.randomBytes(NUMBER.randomBytes).toString(STRING.hex);
            const { userId } = foundUser;
            const tokens = await createTokenPair({userId, email: foundUser.email, role: foundUser.role, goal : foundUser.goal, level: foundUser.level, gender : foundUser.gender, weight : foundUser.weight , height : foundUser.height}, publicKey, privateKey);
            const keyToken = await keyTokenServices.createKeyToken({
                refreshToken: tokens.refreshToken,
                privateKey,
                publicKey,
                userId
            })
            const statusVerify = await userServices.setStatusVerify(email);
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.SUCCESS,
                message: appString.VERIFY_SUCCESSFUL,
                data: {
                    tokens,
                    userId
                },
                requestType
            });
        }

    } catch (error) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            statusCode: statusCode.FAIL,
            message: appString.INTERNAL_SERVER_ERROR,
            requestType
        });
    }
}

const forgotPassword = async (req, res, next) => {
    var requestType = Type.FORGOT_PASSWORD;
    var data = null;
    try {
        const new_password = req.body.new_password;
        const confirm_password =  req.body.confirm_password;
        if(new_password !== confirm_password){
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.FAIL,
                message: appString.PASSWORD_NOT_MATCH,
                data,
                requestType
            });
        }
        const hashedPassword = await bcrypt.hash(new_password, constant.SALT_ROUNDS);
        console.log(hashedPassword)
        const updatePassword = await userServices.updatePasswordbyEmail(req.user.email, hashedPassword)
        if(!updatePassword){
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.FAIL,
                message: appString.ERROR_UPDATE_PASSWORD,
                data,
                requestType
            });
        }
        return res.status(statusCode.SUCCESS).json({
            statusCode: statusCode.FAIL,
            message: appString.FORGOT_PASSWORD_SUCCESSFUL,
            data,
            requestType
        });

    } catch (error) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            statusCode: statusCode.INTERNAL_SERVER_ERROR,
            message: appString.INTERNAL_SERVER_ERROR,
            requestType
        });
    }
}

const renewToken = async (req,res,next) => {
    var data = null;
    var requestType = Type.RENEW_TOKEN;
    try {
        const {refreshToken , userId} = req.body;
        console.log(refreshToken);
        console.log(userId);
        if(!refreshToken) {
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.FAIL,
                message: appString.REFRESH_TOKEN_NOT_FOUND,
                data,
                requestType
            });
        }
        if(!userId) {
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.FAIL,
                message: USER_NOT_FOUND,
                data,
                requestType
            });
        }
        const keyStore = await keyTokenServices.getKeyTokenByUserId(userId);
        const payload = await keyTokenServices.verifyRefreshToken(refreshToken , keyStore.privateKey);
        delete payload.iat;
        delete payload.exp;
        if(!payload){
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.FAIL,
                message: appString.INVALID_REFRESH_TOKEN,
                data,
                requestType
            });
        }
        const token = await createTokenPair(payload ,undefined, keyStore.privateKey)
        const keyToken = await keyTokenServices.createKeyToken({
            refreshToken: token.refreshToken,
            privateKey:keyStore.privateKey,
            publicKey:keyStore.publicKey,
            userId
        })
        return res.status(statusCode.SUCCESS).json({
            statusCode: statusCode.SUCCESS,
            message: appString.RENEW_TOKEN_SUCCESSFUL,
            data : token,
            requestType
        })
    } catch (error) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            statusCode: statusCode.FAIL,
            message: appString.INTERNAL_SERVER_ERROR,
            requestType
        });
    }
}


module.exports = {
    signIn,
    signUp,
    logOut,
    decodeToken,
    sendOTP,
    verifyOTP,
    forgotPassword,
    renewToken
}