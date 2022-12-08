/* global Response */

import uniqueRandomArray from 'unique-random-array'

import data from '../data.json'

const rand = uniqueRandomArray(data)

export const config = { runtime: 'experimental-edge' }

const proxyUrl = url =>
  `https://images.weserv.nl/?url=${encodeURIComponent(url)}&l=9&af&il&n=-1&w=800`

const CACHE = Object.create(null)

const image = async url => {
  const res = await fetch(proxyUrl(url))
  return [
    res.body,
    {
      headers: {
        'access-control-allow-origin': '*',
        'cache-control': 'no-cache',
        'content-type': res.headers.get('content-type'),
        'content-length': res.headers.get('content-length')
      }
    }
  ]
}

export default async () => {
  const { url } = rand()
  const [body, options] = CACHE[url] || (CACHE[url] = await image(url))
  return new Response(body, options)
}
