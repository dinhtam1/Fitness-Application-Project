const { prisma } = require("../config/prismaDatabase");

const createKeyToken = async ({userId, publicKey, privateKey, refreshToken}) => {
    try {
        const tokens = await prisma.keyStore.upsert({
            where: { userId: userId },
            update: { publicKey: publicKey, privateKey: privateKey, refreshToken: refreshToken },
            create: {
                userId: userId,
                publicKey: publicKey,
                privateKey: privateKey,
                refreshToken
            }
        });
        return tokens;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createKeyToken
}