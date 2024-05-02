const { prisma } = require("../config/prismaDatabase");

const createKeyToken = async ({userId, publicKey, privateKey, refreshToken}) => {
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
        console.log(error);
    }
}

const getKeyTokenByUserId = async (userId) => {
    try {
        return keyStore = await prisma.keyStore.findUnique({
            where: { userId: userId }
        });
    } catch (error) {
        console.log(error);
 }
}

const removeKeyById = async (userId) => {
    return await prisma.keyStore.delete({
        where: {
            userId: userId
        }
    });
}
module.exports = {
    createKeyToken,
    getKeyTokenByUserId,
    removeKeyById
}