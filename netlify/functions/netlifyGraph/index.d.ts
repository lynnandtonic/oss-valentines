// GENERATED VIA NETLIFY AUTOMATED DEV TOOLS, EDIT WITH CAUTION!

export type NetlifyGraphFunctionOptions = {
  /**
   * The accessToken to use for the request
   */
  accessToken?: string;
  /**
   * The siteId to use for the request
   * @default process.env.SITE_ID
   */
  siteId?: string;
}

export type WebhookEvent = {
  body: string;
  headers: Record<string, string | null | undefined>;
};

export type GraphQLError = {
  "path": Array<string | number>,
  "message": string,
  "extensions": Record<string, unknown>
};



export type GitHubDataInput = {"gitHubOAuthToken": string; "login": string};

export type GitHubData = {
  /**
  * Any data from the function will be returned here
  */
data: {
  gitHub: {
  /**
  * Lookup a user by login.
  */
user: {
  /**
  * The username used to login.
  */
login: string;
  /**
  * The user's public profile name.
  */
name: string;
  /**
  * A URL pointing to the user's public avatar.
  */
avatarUrl: string;
  /**
  * Whether or not the viewer is able to sponsor this user/organization.
  */
viewerCanSponsor: boolean;
  /**
  * True if the viewer is sponsoring this user/organization.
  */
viewerIsSponsoring: boolean;
  /**
  * True if the viewer is sponsored by this user/organization.
  */
isSponsoringViewer: boolean;
};
};
};
  /**
  * Any errors from the function will be returned here
  */
errors: Array<GraphQLError>;
};

/**
 * Fetch the user data from GitHub
 */
export function fetchGitHubData(
  variables: GitHubDataInput,
  options?: NetlifyGraphFunctionOptions
): Promise<GitHubData>;
