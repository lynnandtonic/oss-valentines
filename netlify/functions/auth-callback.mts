import type { Context } from '@netlify/functions';
import { exchangeWebFlowCode } from '@octokit/oauth-methods';

export default async (req: Request, context: Context) => {
  const url = new URL(req.url);
  const code = url.searchParams.get('code') ?? '';

  const { data } = await exchangeWebFlowCode({
    clientType: 'oauth-app',
    clientId: process.env.GITHUB_APP_CLIENT_ID!,
    clientSecret: process.env.GITHUB_APP_CLIENT_SECRET!,
    code,
  });

  if (!data || !data.access_token) {
    console.log('no token found');

    return new Response('redirecting...', {
      status: 301,
      headers: {
        Location: '/',
      },
    });
  }

  context.cookies.set({
    name: 'nf-gh-session',
    value: encodeURIComponent(JSON.stringify(data)),
    secure: true,
    httpOnly: true,
    sameSite: 'Strict',
    path: '/',
    maxAge: 1000 * 60 * 60 * 24 * 14, // two weeks
  });

  const authPath = decodeURIComponent(context.cookies.get('nf-authed-path'));
  let returnUrl = '/';
  if (authPath) {
    returnUrl = JSON.parse(authPath).route;
    if (typeof returnUrl !== 'string') {
      returnUrl = '/';
    }
  }

  return new Response('redirecting...', {
    status: 301,
    headers: {
      Location: returnUrl,
    },
  });
};
