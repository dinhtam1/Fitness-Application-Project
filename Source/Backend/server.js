const app = require('./src/app');
const PORT = process.env.PORT || 3000;
const appString = require('./src/constant/appString.js')
const typeProcess = {
    SIGINT: 'SIGINT',
    SIGTERM: 'SIGTERM',
    SIGKILL: 'SIGKILL',
    SIGSTOP: 'SIGSTOP',
    SIGHUP: 'SIGHUP',
    SIGUSR1: 'SIGUSR1',
    SIGUSR2: 'SIGUSR2',
}
const stringProcess = {
    url : 'http://localhost:'
}

const server = app.listen(PORT, () => {
    console.log(`${stringProcess.url}${PORT}`)
})

process.on(typeProcess.SIGINT, () => {
    server.close(() => console.log(appString.EXIT_SERVER))
})