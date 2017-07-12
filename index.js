'use strict'

const {readdirSync} = require('fs')
const express = require('express')
const path = require('path')

const isProduction = process.env.NODE_ENV === 'production'

const app = express()
  .use(require('helmet')())
  .use(require('compression')())
  .use(require('cors')())
  .use(require('express-status-monitor')())
  .use(require('morgan')(isProduction ? 'combined' : 'dev'))
  .use(express.static('static'))
  .disable('x-powered-by')

const staticFolder = path.resolve(__dirname, 'static')
const images = readdirSync('./static')
const size = images.length

const getRandomImage = () => images[Math.floor(Math.random() * size)]

app.get('/luck', (req, res) => res.redirect(`/${getRandomImage()}`))
app.get('/ping', (req, res) => res.send('OK'))
app.get('/', (req, res) => res.sendFile(path.resolve(staticFolder, getRandomImage())))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Running at http://localhost:${PORT}`)
  console.log(`Loaded ${size} images`)
})
