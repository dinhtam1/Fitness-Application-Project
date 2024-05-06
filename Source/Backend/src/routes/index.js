const authRouter = require('./auth');
const userRouter = require('./user');

function route(app) {

app.use('/v1/api/auth', authRouter);
app.use('/v1/api/user', userRouter);

}

module.exports = route;