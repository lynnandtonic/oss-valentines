import NetlifyGraph from './netlifyGraph';
import { parse } from 'cookie';

export const handler = async (event) => {
  const [, , , username = 'philhawksworth'] = event.path.split('/');
  const cookies = parse(event.headers.cookie);
  const auth = JSON.parse(cookies['nf-gh-session']);

  const { errors: GitHubDataErrors, data: GitHubDataData } =
    await NetlifyGraph.fetchGitHubData({
      login: username,
      gitHubOAuthToken: auth.access_token,
    });

  if (GitHubDataErrors) {
    console.error(JSON.stringify(GitHubDataErrors, null, 2));
    return {
      statusCode: 500,
      body: JSON.stringify(GitHubDataErrors),
      headers: {
        'content-type': 'application/json',
      },
    };
  }

  const user = GitHubDataData.gitHub.user;

  return {
    statusCode: 200,
    body: JSON.stringify(user),
    headers: {
      'content-type': 'application/json',
    },
  };
};
