#!/usr/bin/env node

'use strict'

const jsonFuture = require('json-future')
const mql = require('@microlink/mql')

const main = async () => {
  const { data } = await mql('https://spongebob.fandom.com/wiki/List_of_time_cards', {
    data: {
      timecards: {
        selectorAll: 'td > a.image',
        attr: 'href',
        type: 'image'
      }
    }
  })

  const { timecards } = data
  const images = timecards.filter(Boolean)
  return jsonFuture.saveAsync('data.json', images)
}

main().catch(error => console.error(error) || process.exit(1))
