require('dotenv').config()
const express = require('express')
const {default: helmet} = require('helmet')
const app = express()
const morgan = require('morgan')
const compression = require('compression')
const route = require('./routes')
//init middleware
app.use(morgan("dev"))
app.use(helmet())
app.use(compression())
//init DB

//init routes
route(app)


//handling error

module.exports = app