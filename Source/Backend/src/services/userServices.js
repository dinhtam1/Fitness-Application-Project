const { prisma } = require('../config/prismaDatabase');
const createUser = async (user) => {
    try {
        return await prisma.user.create({
            data: user
        });
    } catch (e) {
        console.log(e)
        return false
    };

};

const getUserByEmail = async (email) => {
    try {
        return await prisma.user.findUnique({
            where: {
                email: email
            }
        });
    } catch (e) {
        return false
    }
}

module.exports = {
    createUser,
    getUserByEmail
}