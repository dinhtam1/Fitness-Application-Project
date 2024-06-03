const authRouter = require('./auth');
const userRouter = require('./user');
const adminRouter = require('./admin');
const exerciseRouter = require('./exercise');
const statisticRouter = require('./statistic');
const dashboardRouter = require('./dashboard');
const mealRouter = require('./meal');

function route(app) {

app.use('/v1/api/auth', authRouter);
app.use('/v1/api/admin', adminRouter);
app.use('/v1/api/user', userRouter);
app.use('/v1/api/exercise', exerciseRouter);
app.use('/v1/api/meal', mealRouter);
app.use('/v1/api/statistic', statisticRouter);
app.use('/v1/api/dashboard', dashboardRouter);

}

module.exports = route;