#!/usr/bin/env node

'use strict'

const jsonFuture = require('json-future')
const mql = require('@microlink/mql')

const TWO_MEGA_BYTES = 2000000

const main = async () => {
  const { data } = await mql('https://spongebob.fandom.com/wiki/List_of_time_cards', {
    data: {
      timecards: {
        selectorAll: 'td > a.image',
        attr: 'href',
        type: 'url'
      }
    }
  })

  const { timecards } = data

  const images = timecards.filter(Boolean).filter(image => image.size < TWO_MEGA_BYTES)
  return jsonFuture.saveAsync('data.json', images)
}

main()
  .then(size => {
    process.exit()
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
