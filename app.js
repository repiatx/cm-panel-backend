require('dotenv').config()

const express = require('express')

const Sequelize = require('sequelize')

const MainController = require('./Controller/MainController')

const ExpressHelper = require('./utils/expressHelper')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.post('/', MainController.login)

app.use(ExpressHelper.handleError)


const db = require('./models/index')

db.sequelize.authenticate().then(async () => {
  console.log('Connection has been established successfully.')
  await db.sequelize.sync({alter: true})
  ExpressHelper.start(app)

}).catch((err) => {

  console.error('Unable to connect to the database:', err)

})


