'use strict'

const {readdirSync} = require('fs')
const path = require('path')

module.exports = (app, express) => {
  app
    .use(require('helmet')())
    .use(require('compression')())
    .use(require('cors')())
    .use(require('express-status-monitor')())
    .use(require('morgan')('short'))
    .use(express.static('static'))
    .disable('x-powered-by')

  const staticFolder = path.resolve(process.cwd(), 'static')
  const images = readdirSync('./static')
  const size = images.length

  const getRandomImage = () => images[Math.floor(Math.random() * size)]

  app.get('/luck', (req, res) => res.redirect(`/${getRandomImage()}`))
  app.get('/ping', (req, res) => res.send('OK'))
  app.get('/', (req, res) => res.sendFile(path.resolve(staticFolder, getRandomImage())))

  return app
}
