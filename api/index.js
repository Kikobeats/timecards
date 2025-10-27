/* global Response */

import uniqueRandomArray from 'unique-random-array'

import data from '../data.json'

const rand = uniqueRandomArray(data)

export const config = {
  runtime: 'edge'
}

const proxyUrl = url =>
  `https://images.weserv.nl/?${new URLSearchParams({
    url,
    default: url,
    l: 9,
    af: '',
    il: '',
    n: -1,
    w: 800
  }).toString()}`

const baseUrl = ({ headers }) =>
  `${headers.get('x-forwarded-proto')}://${headers.get('x-forwarded-host')}`

export default async req => {
  const urlObj = new URL(req.url, baseUrl(req))
  const timestamp = urlObj.searchParams.get('t')

  if (!timestamp) {
    urlObj.searchParams.set('t', Date.now())
    return Response.redirect(urlObj.toString())
  }

  const imageUrl = proxyUrl(rand().url)
  return new Response(JSON.stringify({ url: imageUrl }), {
    headers: {
      'access-control-allow-origin': '*',
      'cache-control': 'public, max-age=31536000, immutable',
      'content-type': 'application/json'
    }
  })
}
