# oss-valentines (https://oss.cards) 

![oss.cards interface](https://github.com/user-attachments/assets/fa85ec2e-ca8d-4cc0-94bd-40e45341358a)

Originally built by a small team at Netlify.
Now maintained by [@lynnandtonic](https://github.com/lynnandtonic).

## Overview

This site was built to allow people to express their appreciation of open source contributors and organisations by selecting a greeting card, adding a recipient and sender name, and generating a unique URL for their customised card which they could share. The site uses:

- [Eleventy](https://11ty.dev) for site templating
- [Netlify Functions](https://www.netlify.com/products/functions) and [on-demand builders](https://docs.netlify.com/configure-builds/on-demand-builders/) for creating unique pages on demand
- [Supabase](https://supabase.com/) via Netlify Functions for data persistence and retrieval
- [Cloudinary](https://cloudinary.com/) for generating composite open graph images
- [GitHub oAuth](https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps) for user authenticaion


## Development

The site uses some templating via 11ty. 

```bash
# install dependencies
npm i

# build, serve and watch with 11ty during development
# do this via Netlify Dev in order to get ODB goodies
ntl dev
```

Access to the database (Supabase) is provided by environment variables. Authorised Netlifyers will be able to access these by linking their local site to the Netlfy project via `ntl link`. This will [populate your local development version with the centrally-managed environment variables](https://www.netlify.com/blog/2021/12/10/more-tips-for-environment-variables-and-netlify-cli/).

Others will need to create their own Suapbase database and add their own environment variables to access it.


## Auth for local development

To test the GitHub oAuth flow on a local development server you can expose your local deve server on a public URL using [Netlify Dev](https://www.netlify.com/products/cli).

```bash
# Run a local dev server and serve it on a public URL
ntl dev --live
```

This will generate a unique public URL which is valid for the duration of the local server's life. Each time you kill the server and run it again, you'll get a new unique URL.

You can provide this URL to GitHub as the basis for an oAuth application. In production this is oAuth application is maintained under the Netlify account and associated with the https://oss.cards domain.

To create your own GitHub oAuth application for local testing visit the [Developer Settings](https://github.com/settings/developers) section of [your profile](https://github.com/settings/profile)

Here you can create a new oAuth Application and provide some details. Providing the public URL of your local dev server will enable you to test the athentication flow and authenticated features of the site.

| Setting | Value |
| ----- | -------- |
| **Homepage URL** | `https://oss-valentine-XXXXX.netlify.live/` (provided by `ntl dev --live`) |
| **Authorization callback URLL** | `https://oss-valentine-XXXXX.netlify.live/auth/callback` |



