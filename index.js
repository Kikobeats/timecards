'use strict'

const {readdirSync} = require('fs')
const express = require('express')

const isProduction = process.env.NODE_ENV === 'production'

const app = express()
  .use(require('helmet')())
  .use(require('compression')())
  .use(require('cors')())
  .use(require('express-status-monitor')())
  .use(require('morgan')(isProduction ? 'combined' : 'dev'))
  .use(express.static('static'))

  .disable('x-powered-by')

const images = readdirSync('./static')
const size = images.length

const path = require('path')

app.get('/', function (req, res) {
  const image = images[Math.floor(Math.random() * size)]
  // res.redirect(`/${image}`)
  res.sendFile(path.resolve(__dirname, 'static', image))
})

app.get('/ping', function (req, res) {
  res.send('OK')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, function () {
  console.log(`Running at http://localhost:${PORT}`)
  console.log(`Loaded ${size} images`)
})
