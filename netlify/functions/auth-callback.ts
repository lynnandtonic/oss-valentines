import { Handler } from '@netlify/functions';
import { serialize } from 'cookie';
import { parse } from 'cookie';

import { exchangeWebFlowCode } from '@octokit/oauth-methods';

export const handler: Handler = async (event) => {
  const { code } = event.queryStringParameters;

  const { data } = await exchangeWebFlowCode({
    clientType: 'oauth-app',
    clientId: process.env.GITHUB_APP_CLIENT_ID,
    clientSecret: process.env.GITHUB_APP_CLIENT_SECRET,
    code,
  });

  const tokenCookie = serialize('nf-gh-session', JSON.stringify(data), {
    secure: true,
    httpOnly: true,
    sameSite: true,
    path: '/',
    maxAge: 1000 * 60 * 60 * 24 * 14, // two weeks
  });

  let returnUrl = '/';
  if (event.headers.cookie) {
    const cookies = parse(event.headers.cookie);
    if (cookies['nf-authed-path']) {
      returnUrl = JSON.parse(cookies['nf-authed-path']).route;
      if (typeof returnUrl !== 'string') {
        returnUrl = '/';
      }
    }
  }
  return {
    statusCode: 301,
    headers: {
      'Set-Cookie': tokenCookie,
      Location: returnUrl,
    },
    body: 'redirecting...',
  };
};
