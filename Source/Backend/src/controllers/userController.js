const userServices = require('../services/userServices');
const statusCode = require('../constant/appNumber.js')
const Type = require('../constant/appRequestType.js')

const getUsers = async (req, res) => {
    try {
        var data = null;
        var requestType = Type.VIEW_PROFILE;
        const userId = req.user.userId;
        const user = await userServices.getUserByUserId(userId)
        if(!user){
            return res.status(200).json({
                statusCode: statusCode.SUCCESS,
                message: 'User not found',
                data,
                requestType
            });
        }
        return res.status(200).json({
            statusCode: statusCode.SUCCESS,
            message: 'View profile successfully',
            data: user,
            requestType
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: statusCode.INTERNAL_SERVER_ERROR,
            message: error.message,
            requestType
        });
    }
}

module.exports = {getUsers};