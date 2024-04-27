const NodeRSA = require('node-rsa');
const jwt = require('jsonwebtoken');

// Tạo một cặp khóa RSA mới với kích thước là 2048 bit
const key = new NodeRSA({b: 2048});
const privateKey = key.exportKey('private');
const publicKey = key.exportKey('public');

const createTokenPair = async (payload) => {
    try {
        const accessToken = jwt.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '2 days'
        });
        const refreshToken = jwt.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '7 days'
        });

        jwt.verify(accessToken, publicKey, { algorithms: ['RS256'] }, (err, decode) => {
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