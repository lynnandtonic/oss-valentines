exports.data = {
  title: "Open source, open hearts",
  bannerTitle: "Share the love",
  scripts: []
};

exports.render = function(data) {
  return `
<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="">
  <title></title>
  <link rel="icon" type="image/png" href="/img/favicon-32x32.png" sizes="32x32">
  <link rel="icon" type="image/png" href="/img/favicon-16x16.png" sizes="16x16">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary_large_image">
  <meta content="@Netlify" name="twitter:site">
  <meta content="@Netlify" name="twitter:creator">
  <meta content="Open source, Open hearts" name="twitter:title" property="og:title">
  <meta content="To show our love for the OSS community, join us in sending a valentine—a token of appreciation—to your favorite open source developers and projects." name="twitter:description" property="og:description">
  <!-- TODO: double check final URL -->
  <meta content="https://oss.love" property="og:url">
  <meta content="https://oss.love" property="twitter:url">
  <!-- TODO: recipient view needs custom OG -->
  <meta content="https://oss.love/img/oss-og.png" property="og:image">
  <meta content="https://oss.love/img/oss-og.png" name="twitter:image">
  <link rel="stylesheet" href="/styles.css">  
</head>

<!-- TODO: Componentize the views properly -->

<body class="${data.pageClass}">
  <header>
      <a href="/" class="masthead"><img src="/img/netlify-logo-full.svg" alt="Netlify" /> 💗 OSS</a>
      <div id="auth-cta"></div>
      <h2 class="instructions">${data.bannerTitle}<span>💌</span></h2>
  </header>

  <template id="header-logged-in">
    <span class="logged-in-user"></span>
    <a class="button" href="/auth/logout">Log out</a>
  </template>
  
  <template id="header-logged-out">
   <a class="button" href="/auth/login">Log in with GitHub</a>
  </template>
  
  ${data.content}

  <!-- Footer -->
  <footer class="footer-main">
    <div class="grid">
      <div class="footer-grid grid-narrow">
        <h3>Netlify 💗 Open Source</h3>
        <p>Learn about how <a href="https://www.netlify.com/open-source">we support OSS</a> and how your open source project can <a href="https://www.netlify.com/legal/open-source-policy">use Netlify for free</a>.</p>
        <a href="//netlify.com" class="netlify-logo">
          <img src="/img/netlify-logo-mark-color.svg" alt="Netlify logo" />
        </a>
      </div>
    </div>
  </footer>


  <script src="/js/focus-visible.min.js"></script>
  ${data.scripts.map(s => '<script src="/js/'+s+'"></script>').join("")}
</body>

</html>`;
};
