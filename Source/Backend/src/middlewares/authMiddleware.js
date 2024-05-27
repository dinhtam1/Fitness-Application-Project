const keyTokenServices = require('../services/keyTokenServices.js');
const statusCode = require('../constant/appNumber.js')
const Type = require('../constant/appRequestType.js')
const jwt = require('jsonwebtoken');

const appString = require('../constant/appString.js')
const HEADER = {
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION: 'authorization',
}
const algorithm = {
    HS256: 'HS256',
}

const verifyToken = async (req, res, next) => {
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
                message: appString.NOT_AUTHENTICATED,
                data,
                requestType
            });
        }

        jwt.verify(accessToken, keyStore.privateKey, { algorithms: [algorithm.HS256] }, (err, decodeUser) => {
            if (err) {
                return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
                    statusCode: statusCode.FAIL,
                    message: appString.ERROR_VERIFYING_TOKEN,
                    data,
                    requestType
                });
            }

            if (userId !== decodeUser.userId) {
                return res.status(statusCode.SUCCESS).json({
                    statusCode: statusCode.SUCCESS,
                    message: appString.INVALID_USER,
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
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            statusCode: statusCode.FAIL,
            message: error.message,
            requestType
        });
    }
}

module.exports = { verifyToken };