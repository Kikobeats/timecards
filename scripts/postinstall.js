#!/usr/bin/env node

'use strict'

const jsonFuture = require('json-future')

const mql = require('@microlink/mql')

const main = async () => {
  const { data } = await mql('https://spongebob.fandom.com/wiki/List_of_time_cards', {
    data: {
      images: {
        selectorAll: 'td a > img',
        attr: 'data-src',
        type: 'image'
      }
    }
  })

  const { images } = data

  const links = images.filter(Boolean).map(image => image.url.replace(/\/revision.*/, ''))

  return jsonFuture.saveAsync('data.json', links)
}

main().catch(error => console.error(error) || process.exit(1))
