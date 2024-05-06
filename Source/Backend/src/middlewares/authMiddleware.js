const keyTokenServices = require('../services/keyTokenServices.js');
const statusCode = require('../constant/appNumber.js')
const Type = require('../constant/appRequestType.js')
const jwt = require('jsonwebtoken');
const HEADER = {
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION: 'authorization',
}

const verifyToken = async (req, res, next) => {
    var requestType = Type.DECODE_TOKEN;
    var data = null;
    try {
        const userId = Number(req.headers[HEADER.CLIENT_ID]);
        if (!userId) {
            return res.status(400).json({
                statusCode: statusCode.BAD_REQUEST,
                message: 'User not found',
                data,
                requestType
            });
        }

        const keyStore = await keyTokenServices.getKeyTokenByUserId(userId);
        if (!keyStore) {
            return res.status(400).json({
                statusCode: statusCode.BAD_REQUEST,
                message: 'KeyStore not found',
                data,
                requestType
            });
        }

        const accessToken = req.headers[HEADER.AUTHORIZATION];
        if (!accessToken) {
            return res.status(400).json({
                statusCode: statusCode.BAD_REQUEST,
                message: 'You are not authenticated',
                data,
                requestType
            });
        }

        jwt.verify(accessToken, keyStore.privateKey, { algorithms: ['HS256'] }, (err, decodeUser) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    statusCode: statusCode.INTERNAL_SERVER_ERROR,
                    message: 'Error verifying token',
                    data,
                    requestType
                });
            }

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
            req.user = decodeUser;
            next();
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: statusCode.INTERNAL_SERVER_ERROR,
            message: error.message,
            requestType
        });
    }
}

module.exports = { verifyToken };