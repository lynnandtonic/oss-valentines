import { Handler } from '@netlify/functions';
import { parse } from 'cookie';
import { deleteToken } from '@octokit/oauth-methods';

export const handler: Handler = async (event) => {
  if (event.headers.cookie) {
    const cookies = parse(event.headers.cookie);
    if (cookies['nf-gh-session']) {
      const auth = JSON.parse(cookies['nf-gh-session']);
      await deleteToken({
        clientType: 'oauth-app',
        clientId: process.env.GITHUB_APP_CLIENT_ID,
        clientSecret: process.env.GITHUB_APP_CLIENT_SECRET,
        token: auth.access_token,
      });
    }
  }

  return {
    statusCode: 301,
    headers: {
      Location: '/',
    },
    body: JSON.stringify({ status: 'redirecting' }),
  };
};
