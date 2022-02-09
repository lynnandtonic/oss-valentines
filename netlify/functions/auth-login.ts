import { Handler } from '@netlify/functions';
import { getWebFlowAuthorizationUrl } from '@octokit/oauth-methods';

export const handler: Handler = async () => {
  const { url } = await getWebFlowAuthorizationUrl({
    clientType: 'oauth-app',
    clientId: process.env.GITHUB_APP_CLIENT_ID,
    scopes: ['read:user'],
  });

  return {
    statusCode: 301,
    headers: { Location: url },
    body: JSON.stringify({ status: 'Redirecting...' }),
  };
};
