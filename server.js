// DEPENDENCIES
const express = require('express')
// const methodOverride = require('method-override')
// const mongoose = require('mongoose')

// CONFIGURATION
require('dotenv').config()
const PORT = process.env.PORT
const app = express()
// mongoose
//   .connect("mongodb+srv://raymond88wang:4Urz98fqlBdkvfie@cluster0.0fqrbfq.mongodb.net/")
//   .then(() => { console.log('connected to mongo: ', "mongodb+srv://raymond88wang:4Urz98fqlBdkvfie@cluster0.0fqrbfq.mongodb.net/") })


// MIDDLEWARE
// app.use(methodOverride('_method'))
// app.use(express.static('public'))
// app.use(express.urlencoded({extended: true}))
// app.set('views', __dirname + '/views')
// app.set('view engine', 'jsx')
// app.engine('jsx', require('express-react-views').createEngine())

// ROUTES
app.get('/', (req, res) => {
  res.send('Welcome to an Awesome App about Breads')
})
  
// // Breads
// const breadsController = require('./controllers/breads_controller.js')
// app.use('/breads', breadsController)

// // Bakers
// const bakersController = require('./controllers/bakers_controller.js')
// app.use('/bakers', bakersController)

// // 404 Page
// app.get('*', (req, res) => {
//   res.render('NotFound')
// })

// LISTEN
app.listen(PORT, () => {
  console.log('listening on port', PORT);
})

module.exports = app