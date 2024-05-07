const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const algorithms = {
    HS256: 'HS256'
}


const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        const accessToken = await jwt.sign(payload, privateKey, {
            algorithm: algorithms.HS256,
            expiresIn: process.env.ACCESS_TOKEN_EXPIRES
        });
        const refreshToken = await jwt.sign(payload, privateKey, {
            algorithm: algorithms.HS256,
            expiresIn: process.env.REFRESH_TOKEN_EXPIRES
        });

        // jwt.verify(accessToken, privateKey, { algorithms: [algorithms.HS256] }, (err, decode) => {
        //     if (err) {
        //         console.error('error verify ', err)
        //     } else {
        //         console.log('decode verify ', decode)
        //     }
        // })
        return { accessToken, refreshToken }
    } catch (error) {
        return error;
    }
}

module.exports = {
    createTokenPair
}