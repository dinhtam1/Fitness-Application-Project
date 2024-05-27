const { prisma } = require("../config/prismaDatabase");
const jwt = require('jsonwebtoken');
const algorithm = {
    HS256: 'HS256',
}
const createKeyToken = async ({ userId, publicKey, privateKey, refreshToken }) => {
    try {
        return tokens = await prisma.keyStore.upsert({
            where: { userId: userId },
            update: { publicKey: publicKey, privateKey: privateKey, refreshToken: refreshToken },
            create: {
                userId: userId,
                publicKey: publicKey,
                privateKey: privateKey,
                refreshToken
            }
        });
    } catch (error) {
        return false;
    }
}

const getKeyTokenByUserId = async (userId) => {
    try {
        return keyStore = await prisma.keyStore.findUnique({
            where: { userId: userId }
        });
    } catch (error) {
        return false;
    }
}

const removeKeyById = async (userId) => {
    return await prisma.keyStore.delete({
        where: {
            userId: userId
        }
    });
}

const verifyRefreshToken = (refreshToken, privateKey) => {
    return new Promise((resolve, reject) => {
        jwt.verify(refreshToken, privateKey, { algorithms: [algorithm.HS256] }, (err, decodeUser) => {
            if (err) {
                reject(err);
            } else {
                resolve(decodeUser);
            }
        });
    }).catch((error) => {
        console.log(error);
    });
};
module.exports = {
    createKeyToken,
    getKeyTokenByUserId,
    removeKeyById,
    verifyRefreshToken
}