#!/usr/bin/env node

'use strict'

const mql = require('@microlink/mql')
const jsonFuture = require('json-future')

const main = async () => {
  const { data } = await mql(
    'http://spongebob.wikia.com/wiki/List_of_time_cards',
    {
      rules: {
        timecards: {
          selectorAll: 'td > a.image',
          attr: 'href',
          type: 'url'
        }
      }
    }
  )

  const { timecards } = data
  return jsonFuture.saveAsync('data.json', timecards)
}

main()
  .then(size => {
    process.exit()
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
