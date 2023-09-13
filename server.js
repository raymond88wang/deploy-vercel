const express = require('express')
require('dotenv')

const app = express()

app.get('/', (req, res) => {
  res.send('Hello, class!')
})

app.listen(process.env.PORT)

module.exports = app