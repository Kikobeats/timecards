'use strict'

const uniqueRandomArray = require('unique-random-array')
const { readdirSync } = require('fs')
const express = require('express')
const path = require('path')

const { Router } = express

const router = Router()

router.use(require('helmet')())
router.use(require('compression')())
router.use(require('cors')())
router.use(require('morgan')('tiny'))
router.use(express.static(path.resolve('static')))

const staticFolder = path.resolve(process.cwd(), 'static')

const rand = uniqueRandomArray(readdirSync('./static'))

router.get('/', (req, res) => res.sendFile(path.resolve(staticFolder, rand())))
router.get('/luck', (req, res) => res.redirect(`/${rand()}`))
router.get('/robots.txt', (req, res) => res.status(204).send())
router.get('/favicon.txt', (req, res) => res.status(204).send())

module.exports = express()
  .use(router)
  .disable('x-powered-by')
