'use strict'

const uniqueRandomArray = require('unique-random-array')
const express = require('express')
const got = require('got')

const data = require('./data.json')

const { Router } = express

const router = Router()
const cache = new Map()

router.use(require('helmet')())
router.use(require('compression')())
router.use(require('cors')())
router.use(require('morgan')('tiny'))

const rand = uniqueRandomArray(data)

router.get('/', (req, res) => {
  res.writeHead(200, { 'Cache-Control': 's-maxage=0, max-age=0' });
  return got.stream(rand(), { cache }).pipe(res)
})
router.get('/robots.txt', (req, res) => res.status(204).send())
router.get('/favicon.txt', (req, res) => res.status(204).send())

module.exports = express()
  .use(router)
  .disable('x-powered-by')
