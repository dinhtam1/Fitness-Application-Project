const { prisma } = require("../config/prismaDatabase");

const createKeyToken = async ({userId,publicKey, privateKey}) => {
    try {
        const tokens = await prisma.keyStore.create({
            data: {
                userId,
                publicKey,
                privateKey
            }
        })
        return tokens
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createKeyToken
}