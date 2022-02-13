import { Handler } from '@netlify/functions';
import { getWebFlowAuthorizationUrl } from '@octokit/oauth-methods';
import { serialize } from 'cookie';

export const handler: Handler = async (event) => {

  let returnRoute = "/";
  if(event.headers.referer) {
    returnRoute = event.headers.referer;
  };

  const redirectCookie = serialize('nf-authed-path',  JSON.stringify({route: returnRoute}), {
    secure: true,
    httpOnly: true,
    sameSite: true,
    maxAge: 1000 * 60 * 60 * 24 * 14, // two weeks
  });

  const { url } = await getWebFlowAuthorizationUrl({
    clientType: 'oauth-app',
    clientId: process.env.GITHUB_APP_CLIENT_ID,
    scopes: ['read:user', 'read:org'],
  });

  return {
    statusCode: 301,
    headers: {
      'Set-Cookie': redirectCookie,
      Location: url,
    },
    body: JSON.stringify({ status: 'Redirecting...' }),
  };
};
