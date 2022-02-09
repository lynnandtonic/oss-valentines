const NetlifyGraph = require("./netlifyGraph")

exports.handler = async(event) => {
  // By default, all API calls use no authentication
  let accessToken;

  //// If you want to use the client's accessToken when making API calls on the user's behalf:
  // accessToken = event.headers["authorization"]?.split(" ")[1]

  //// If you want to use the API with your own access token:
  // accessToken = event.authlifyToken

  const eventBodyJson = JSON.parse(event.body || "{}");



  const { errors: FetchGitHubUserDataErrors, data: FetchGitHubUserDataData } =
  await NetlifyGraph.fetchFetchGitHubUserData({}, {
    accessToken: accessToken,
    login: "philhawksworth"
  });

  if (FetchGitHubUserDataErrors) {
    console.error(JSON.stringify(FetchGitHubUserDataErrors, null, 2));
  }

  console.log(JSON.stringify(FetchGitHubUserDataData, null, 2));

  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      FetchGitHubUserDataErrors: FetchGitHubUserDataErrors,
      FetchGitHubUserDataData: FetchGitHubUserDataData
    }),
    headers: {
      'content-type': 'application/json',
    },
  };
};

/** 
 * Client-side invocations:
 * Call your Netlify function from the browser (after saving
 * the code to `FetchGitHubUserData.js`) with these helpers:
 */

/**
async function fetchFetchGitHubUserData(netlifyGraphAuth, params) {
  const {} = params || {};
  const resp = await fetch(`/.netlify/functions/FetchGitHubUserData`,
    {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        ...netlifyGraphAuth?.authHeaders()
      }
    });

    const text = await resp.text();

    return JSON.parse(text);
}
*/
