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



export type GitHubDataInput = {
 "gitHubOAuthToken": string;  
 /**
 * The search string to look for.
 */
 "login": string;  
"login1"?: string
};

export type GitHubData = {
  /**
  * Any data from the function will be returned here
  */
data: {
  gitHub: {
  /**
  * Perform a search across resources.
  */
search: /** No fields, named fragments, or inline fragments found */ Record<string, unknown>;
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
