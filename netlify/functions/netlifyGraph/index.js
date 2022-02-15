// GENERATED VIA NETLIFY AUTOMATED DEV TOOLS, EDIT WITH CAUTION!
  const buffer = require("buffer")
  const crypto = require("crypto")
  const https = require("https")
  const process = require("process")

exports.verifySignature = (input) => {
  const secret = input.secret
  const body = input.body
  const signature = input.signature

  if (!signature) {
    console.error('Missing signature')
    return false
  }

  const sig = {}
  for (const pair of signature.split(',')) {
    const [key, value] = pair.split('=')
    sig[key] = value
  }

  if (!sig.t || !sig.hmac_sha256) {
    console.error('Invalid signature header')
    return false
  }

  const hash = crypto
    .createHmac('sha256', secret)
    .update(sig.t)
    .update('.')
    .update(body)
    .digest('hex')

  if (
    !crypto.timingSafeEqual(
      Buffer.from(hash, 'hex'),
      Buffer.from(sig.hmac_sha256, 'hex')
    )
  ) {
    console.error('Invalid signature')
    return false
  }

  if (parseInt(sig.t, 10) < Date.now() / 1000 - 300 /* 5 minutes */) {
    console.error('Request is too old')
    return false
  }

  return true
}

const operationsDoc = `query GitHubData($gitHubOAuthToken: String!, $login: String!, $login1: String = "") @netlify(id: """5d6aa26f-076c-48f8-89e4-bb4e7ff9a78e""", doc: """Fetch the user data from GitHub""") {
  gitHub(auths: {gitHubOAuthToken: $gitHubOAuthToken}) {
    search(query: $login, type: USER, first: 1) {
      nodes {
        ... on GitHubOrganization {
          login
          name
          avatarUrl
          viewerCanSponsor
          viewerIsSponsoring
          isSponsoringViewer
        }
        ... on GitHubUser {
          login
          name
          avatarUrl
          viewerCanSponsor
          viewerIsSponsoring
          isSponsoringViewer
        }
      }
    }
  }
}
`

const httpFetch = (siteId, options) => {
      const reqBody = options.body || null
      const userHeaders = options.headers || {}
      const headers = {
        ...userHeaders,
        'Content-Type': 'application/json',
        'Content-Length': reqBody.length,
      }

      const timeoutMs = 30_000

      const reqOptions = {
        method: 'POST',
        headers: headers,
        timeout: timeoutMs,
      }

  const url = 'https://serve.onegraph.com/graphql?app_id=' + siteId

  const respBody = []

  return new Promise((resolve, reject) => {
    const req = https.request(url, reqOptions, (res) => {
      if (res.statusCode && (res.statusCode < 200 || res.statusCode > 299)) {
        return reject(
          new Error(
            "Netlify Graph return non-OK HTTP status code" + res.statusCode,
          ),
        )
      }

      res.on('data', (chunk) => respBody.push(chunk))

      res.on('end', () => {
        const resString = buffer.Buffer.concat(respBody).toString()
        resolve(resString)
      })
    })

    req.on('error', (error) => {
      console.error('Error making request to Netlify Graph:', error)
    })

    req.on('timeout', () => {
      req.destroy()
      reject(new Error('Request to Netlify Graph timed out'))
    })

    req.write(reqBody)
    req.end()
  })
}



const fetchNetlifyGraph = async function fetchNetlifyGraph(input) {
  const query = input.query
  const operationName = input.operationName
  const variables = input.variables

  const options = input.options || {}
  const accessToken = options.accessToken
  const siteId = options.siteId || process.env.SITE_ID

  const payload = {
    query: query,
    variables: variables,
    operationName: operationName,
  }

  const result = await httpFetch(
    siteId,
    {
      method: 'POST',
      headers: {
        Authorization: accessToken ? "Bearer " + accessToken : '',
      },
      body: JSON.stringify(payload),
    },
  )

  return JSON.parse(result)
}


exports.verifyRequestSignature = (request, options) => {
  const event = request.event
  const secret = options.webhookSecret || process.env.NETLIFY_GRAPH_WEBHOOK_SECRET
  const signature = event.headers['x-netlify-graph-signature']
  const body = event.body

  if (!secret) {
    console.error(
      'NETLIFY_GRAPH_WEBHOOK_SECRET is not set, cannot verify incoming webhook request'
    )
    return false
  }

  return verifySignature({ secret, signature, body: body || '' })
}

exports.fetchGitHubData = (
      variables,
      options
    ) => {
      return fetchNetlifyGraph({
        query: operationsDoc,
        operationName: "GitHubData",
        variables: variables,
        options: options || {},
      });
    }


/**
 * The generated NetlifyGraph library with your operations
 */
const functions = {
  /**
  * Fetch the user data from GitHub
  */
  fetchGitHubData: exports.fetchGitHubData
}

exports.default = functions

exports.handler = () => {
      // return a 401 json response
      return {
        statusCode: 401,
        body: JSON.stringify({
          message: 'Unauthorized',
        }),
      }
    }