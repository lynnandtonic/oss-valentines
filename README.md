# oss-valentines

https://oss.love

## Development

The site uses some templating via 11ty. 

```bash
# install dependencies
npm i

# build, serve and watch with 11ty during development
# do this via Netlify Dev in order to get ODB goodies
ntl dev
```

## Auth for local development

To test the GitHub oAuth flow on a local development server you can expose your local deve server on a public URL using [Netlify Dev](https://www.netlify.com/products/cli).

```bash
# Run a local dev server and serve it on a public URL
ntl dev --live
```

This will generate a unique public URL which is valid for the duration of the local server's life. Each time you kill the server and run it again, you'll get a new unique URL.

You can provide this URL to GitHub as the basis for an oAuth application. In production this is oAuth application is maintained under the Netlify account and associated with the https://oss.love domain.

To create your own GitHub oAuth application for local testing visit the [Developer Settings](https://github.com/settings/developers) section of [your profile](https://github.com/settings/profile)

Here you can create a new oAuth Application and provide some details. Providing the public URL of your local dev server will enable you to test the athentication flow and authenticated features of the site.

| Setting | Value |
| ----- | -------- |
| **Homepage URL** | `https://oss-valentine-XXXXX.netlify.live/` (provided by `ntl dev --live`) |
| **Authorization callback URLL** | `https://oss-valentine-XXXXX.netlify.live/auth/callback` |



