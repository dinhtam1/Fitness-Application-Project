const sigIn = async (req, res, next) => {
    console.log("signIn API");
    return res.status(200).json({
        message: "sign in API"
    });
};

const signUp = async (req, res, next) => {
    console.log("signUp API");
    return res.status(200).json({
        message: "sign up API"
    });
};

module.exports = {
    sigIn,
    signUp
}