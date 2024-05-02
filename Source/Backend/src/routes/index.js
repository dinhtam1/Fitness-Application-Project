const authRouter = require('./auth');

function route(app) {

app.use('/v1/api/auth', authRouter);

}

module.exports = route;