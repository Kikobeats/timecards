'use strict'

const uniqueRandomArray = require('unique-random-array')
const { readdirSync } = require('fs')

const path = require('path')

const pkg = require('../package.json')

module.exports = (app, express) => {
  app
    .use(require('helmet')())
    .use(require('compression')())
    .use(require('cors')())
    .use(require('morgan')('short'))
    .use(express.static('static'))
    .disable('x-powered-by')

  const staticFolder = path.resolve(process.cwd(), 'static')

  const rand = uniqueRandomArray(readdirSync('./static'))

  app.get('/luck', (req, res) => res.redirect(`/${rand()}`))
  app.get('/ping', (req, res) => res.send('OK'))
  app.get('/', (req, res) => res.sendFile(path.resolve(staticFolder, rand())))
  app.get('/_src', (req, res) => res.redirect(pkg.homepage))
}
