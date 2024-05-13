const authRouter = require('./auth');
const userRouter = require('./user');
const exerciseRouter = require('./exercise');

function route(app) {

app.use('/v1/api/auth', authRouter);
app.use('/v1/api/user', userRouter);
app.use('/v1/api/exercise', exerciseRouter);

}

module.exports = route;