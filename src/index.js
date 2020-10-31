'use strict'

const uniqueRandomArray = require('unique-random-array')
const fileExtension = require('file-extension')
const express = require('express')
const mime = require('mime-types')
const got = require('got')

const data = require('../data.json')

const { Router } = express

const router = Router()
const cache = new Map()

router.use(require('helmet')())
router.use(require('compression')())
router.use(require('cors')())
router.use(require('morgan')('tiny'))

const rand = uniqueRandomArray(data)

const getExtension = str => {
  const url = new URL(str)
  url.hash = ''
  url.search = ''
  const normalizedUrl = url.toString().replace('/revision/latest', '')
  return fileExtension(normalizedUrl)
}

router.get('/', (req, res) => {
  const { url, type } = rand()
  const extension = type || getExtension(url)
  const contentType = mime.contentType(extension)
  res.writeHead(200, {
    'cache-control': 'no-cache',
    'content-type': contentType
  })

  return got.stream(url, { cache }).pipe(res)
})
router.get('/robots.txt', (req, res) => res.status(204).send())
router.get('/favicon.txt', (req, res) => res.status(204).send())

module.exports = express()
  .use(router)
  .disable('x-powered-by')
