const jwt = require('jsonwebtoken');
const crypto = require('crypto');


const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        const accessToken = await jwt.sign(payload, privateKey, {
            algorithm: 'HS256',
            expiresIn: '2 days'
        });
        const refreshToken = await jwt.sign(payload, privateKey, {
            algorithm: 'HS256',
            expiresIn: '7 days'
        });

        jwt.verify(accessToken, privateKey, { algorithms: ['HS256'] }, (err, decode) => {
            if (err) {
                console.error('error verify ', err)
            } else {
                console.log('decode verify ', decode)
            }
        })
        return { accessToken, refreshToken }
    } catch (error) {
        return error;
    }
}

module.exports = {
    createTokenPair
}