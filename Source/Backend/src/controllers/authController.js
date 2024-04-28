const userServices = require('../services/userServices');
const keyTokenServices = require('../services/keyTokenServices.js');
const bcrypt = require('bcrypt');
const constant = require('../constant/appNumber.js');
const { createTokenPair } = require('../auth/authUtils');
const crypto = require('crypto');
const statusCode = require('../constant/appNumber.js')
const Type = require('../constant/appRequestType.js')
const signIn = async (req, res, next) => {
    try {
        console.log("signIn API");
        return res.status(200).json({
            message: "sign in API"
        });
    } catch (error) {
        console.error("Error during sign in:", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

const signUp = async (req, res, next) => {
    try {
        var data = null;
        var requestType = Type.SIGN_UP
        const user = await userServices.getUserByEmail(req.body.email);
        if (user) {
            return res.status(400).json({
                statusCode: statusCode.BAD_REQUEST,
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
            const keyStore = await keyTokenServices.createKeyToken({
                userId: createUser.userId,
                publicKey,
                privateKey
            })
            if (!keyStore) {
                return res.status(400).json({
                    statusCode: statusCode.BAD_REQUEST,
                    message: "KeyStore not created",
                    data,
                    requestType
                })
            }
            const tokens = await createTokenPair({
                userId: createUser.userId, email: createUser.email, role: createUser.role
            },
                publicKey,
                privateKey
            )
            return res.status(200).json({
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

module.exports = {
    signIn,
    signUp
}