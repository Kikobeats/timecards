'use strict'

const htmlUrls = require('html-urls')
const download = require('download')
const pAll = require('p-all')
const got = require('got')

const TARGET_URL = 'http://spongebob.wikia.com/wiki/List_of_time_cards'
;(async () => {
  try {
    const { body } = await got(TARGET_URL)

    const urls = htmlUrls({ html: body, url: TARGET_URL })
      .map(link => link.normalizedUrl)
      .filter(link => /revision\/latest/i.test(link) && !/wordmark|avatar/i.test(link))
      .map(link => () => {
        console.log(link)
        return download(link, 'static')
      })

    await pAll(urls, { concurrency: 2 })
    console.log('Done!', urls.length)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
})()
