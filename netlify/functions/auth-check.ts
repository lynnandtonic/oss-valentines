import { Handler } from '@netlify/functions';
import { parse } from 'cookie';
import { checkToken } from '@octokit/oauth-methods';

type User = {
  login?: string;
  avatar_url?: string;
};

export const handler: Handler = async (event) => {
  if (!event.headers.cookie) {
    return {
      statusCode: 401,
      body: JSON.stringify({ isLoggedIn: false, user: {} }),
    };
  }
  const cookies = parse(event.headers?.cookie);
  console.log({ cookies });
  if (!cookies['nf-gh-session']) {
    return {
      statusCode: 401,
      body: JSON.stringify({ isLoggedIn: false, user: {} }),
    };
  }
  const auth = JSON.parse(cookies['nf-gh-session']);
  let isLoggedIn = false;
  let user: User = {};

  try {
    const { data } = await checkToken({
      clientType: 'oauth-app',
      clientId: process.env.GITHUB_APP_CLIENT_ID,
      clientSecret: process.env.GITHUB_APP_CLIENT_SECRET,
      token: auth.access_token,
    });

    user.login = data.user.login;
    user.avatar_url = data.user.avatar_url;

    if (data.id) {
      isLoggedIn = true;
    }
  } catch (err) {
    console.log(err);
    return {
      statusCode: 401,
      body: JSON.stringify({ isLoggedIn: false, user: {} }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ isLoggedIn, user }),
  };
};
