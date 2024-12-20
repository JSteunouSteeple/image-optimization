import { readFileSync } from 'node:fs'
import { getSignedUrl } from '@aws-sdk/cloudfront-signer'

const privateKey = readFileSync('private-key.pem')
// GET IT FROM YOUR STACK
const keyPairId = 'KJIVHGO47BVK2'

const EXPIRATION_IN_SECONDS = 15 * 60

const HOST = 'https://d2b39l1f6wjd3x.cloudfront.net'
const PATH = '/images/rio/1.jpeg'
const ARGS = 'width=300'

const URL = HOST + PATH + '?' + ARGS

const policy = {
  Statement: [
    {
      Resource: HOST + PATH + '\?*',
      Condition: {
        DateLessThan: {
          'AWS:EpochTime': Math.round((new Date).getTime() / 1000 + EXPIRATION_IN_SECONDS),
        },
      },
    },
  ],
}

const signedURL = getSignedUrl({
  url: URL,
  keyPairId,
  privateKey,
  policy: JSON.stringify(policy),
})

console.log(signedURL)
