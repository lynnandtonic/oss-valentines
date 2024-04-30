import type { Context } from '@netlify/functions';

export default async (req: Request, context: Context) => {
  const [, , , username = ''] = new URL(req.url).pathname.split('/');
  const auth = JSON.parse(
    decodeURIComponent(context.cookies.get('nf-gh-session'))
  );

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${auth.access_token}`,
    },
    body: JSON.stringify({
      query: `
        query ($login: String!) {
          user: repositoryOwner(login: $login) {
            avatarUrl
            login
            
            ... on Organization {
              viewerCanSponsor
              name
            }
            ... on User {
              viewerCanSponsor
              name
            }
          }
        }
      `,
      variables: {
        login: username,
      },
    }),
  });

  if (!response.ok) {
    return new Response(response.statusText, {
      status: response.status,
    });
  }

  const { data } = await response.json();

  return new Response(JSON.stringify(data.user), {
    status: 200,
    headers: {
      'content-type': 'application/json',
    },
  });
};
