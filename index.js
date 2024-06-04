const express = require('express')
const app = express()
app.get('/', function(req, res) {
  res.send('Darkio is running :D')
})
app.listen(5500)
require("./src/bot.js")