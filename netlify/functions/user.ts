import { parse } from 'cookie';

export const handler = async (event) => {
  const [, , , username = ''] = event.path.split('/');
  const cookies = parse(event.headers.cookie);
  const auth = JSON.parse(cookies['nf-gh-session']);

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${auth.access_token}`,
    },
    body: JSON.stringify({
      query: `
        query ($login: String!) {
          user(login: $login) {
            avatarUrl
            login
            name
            viewerCanSponsor
          }
        }
      `,
      variables: {
        login: username,
      },
    }),
  });

  if (!response.ok) {
    return {
      statusCode: response.status,
      body: response.statusText,
    };
  }

  const { data } = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data.user),
    headers: {
      'content-type': 'application/json',
    },
  };
};
