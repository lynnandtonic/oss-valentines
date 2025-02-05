exports.data = {
  title: 'Open source, open hearts',
  bannerTitle: 'Share the love',
  scripts: [],
};

const ogURL = (path) => {
  if (path) {
    return `https://oss.cards/og/${path}`;
  } else {
    return `https://oss.cards/img/oss-og.png`;
  }
};

const getYear = () => {
  return new Date().getFullYear();
};

exports.render = function (data) {
  return `
<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Show your love for the OSS community and send a token of appreciation to your favorite open source developers and projects.">
  <title>Open source, Open hearts</title>
  <link rel="icon" type="image/png" href="/img/favicon-32x32.png" sizes="32x32">
  <link rel="icon" type="image/png" href="/img/favicon-16x16.png" sizes="16x16">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary_large_image">
  <meta content="@lynnandtonic" name="twitter:site">
  <meta content="@lynnandtonic" name="twitter:creator">
  <meta content="Open source, Open hearts" name="twitter:title" property="og:title">
  <meta content="Show your love for the OSS community and send a token of appreciation to your favorite open source developers and projects." name="twitter:description" property="og:description">
  <meta content="https://oss.cards" property="og:url">
  <meta content="https://oss.cards" property="twitter:url">
  <meta content="${ogURL(data.ogPath)}" property="og:image">
  <meta content="${ogURL(data.ogPath)}" name="twitter:image">
  <link rel="stylesheet" href="/styles.css">  
</head>

<body class="${data.pageClass}">
  <header>
      <a href="/" class="masthead">
        <svg class="masthead-heart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140">
          <polygon points="70 79.68 36.47 60.32 2.95 79.68 70 118.39 137.06 79.68 103.53 60.32 70 79.68" fill="#b7303d" stroke="#1c2126" stroke-linejoin="round" stroke-width="2"/>
          <polygon points="36.47 21.61 36.47 60.32 2.94 79.68 2.95 40.97 36.47 21.61" fill="#ea4f4b" stroke="#1c2126" stroke-linejoin="round" stroke-width="2"/>
          <polygon points="36.47 21.61 36.47 60.32 70 79.68 70 40.97 36.47 21.61" fill="#ff6b60" stroke="#1c2126" stroke-linejoin="round" stroke-width="2"/>
          <polygon points="103.53 21.61 103.52 60.32 70 79.68 70 40.97 103.53 21.61" fill="#ea4f4b" stroke="#1c2126" stroke-linejoin="round" stroke-width="2"/>
          <polygon points="103.53 21.61 103.53 60.32 137.05 79.68 137.05 40.97 103.53 21.61" fill="#ff6b60" stroke="#1c2126" stroke-linejoin="round" stroke-width="2"/>
        </svg>
        <span>oss.cards</span>
      </a>
      <div id="header-auth">    
      </div>
      <h2 class="instructions"><span>${data.bannerTitle}</span>
        <svg class="instructions-heart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140"><polygon points="70 79.68 36.47 60.32 2.95 79.68 70 118.39 137.06 79.68 103.53 60.32 70 79.68" fill="#b7303d" stroke="#1c2126" stroke-linejoin="round" stroke-width="2"/><polygon points="36.47 21.61 36.47 60.32 2.94 79.68 2.95 40.97 36.47 21.61" fill="#ea4f4b" stroke="#1c2126" stroke-linejoin="round" stroke-width="2"/><polygon points="36.47 21.61 36.47 60.32 70 79.68 70 40.97 36.47 21.61" fill="#ff6b60" stroke="#1c2126" stroke-linejoin="round" stroke-width="2"/><polygon points="103.53 21.61 103.52 60.32 70 79.68 70 40.97 103.53 21.61" fill="#ea4f4b" stroke="#1c2126" stroke-linejoin="round" stroke-width="2"/><polygon points="103.53 21.61 103.53 60.32 137.05 79.68 137.05 40.97 103.53 21.61" fill="#ff6b60" stroke="#1c2126" stroke-linejoin="round" stroke-width="2"/></svg>
      </h2>
  </header>

  <template id="header-logged-in">
    <span class="logged-in-user"></span>
    <a class="button" href="/auth/logout">Log out</a>
  </template>
  
  <template id="header-logged-out">
   <a class="button gh-login" href="/auth/login">Log in with GitHub</a>
   <a class="button make-your-own" href="/">Create your own</a>
  </template>
  
  ${data.content}

  <!-- Footer -->
  <footer class="footer-main">
    <div class="contributors">
      <p>Made with <svg class="footer-heart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140"><polygon points="70 79.68 36.47 60.32 2.95 79.68 70 118.39 137.06 79.68 103.53 60.32 70 79.68" fill="#b7303d" stroke="#1c2126" stroke-linejoin="round" stroke-width="2"/><polygon points="36.47 21.61 36.47 60.32 2.94 79.68 2.95 40.97 36.47 21.61" fill="#ea4f4b" stroke="#1c2126" stroke-linejoin="round" stroke-width="2"/><polygon points="36.47 21.61 36.47 60.32 70 79.68 70 40.97 36.47 21.61" fill="#ff6b60" stroke="#1c2126" stroke-linejoin="round" stroke-width="2"/><polygon points="103.53 21.61 103.52 60.32 70 79.68 70 40.97 103.53 21.61" fill="#ea4f4b" stroke="#1c2126" stroke-linejoin="round" stroke-width="2"/><polygon points="103.53 21.61 103.53 60.32 137.05 79.68 137.05 40.97 103.53 21.61" fill="#ff6b60" stroke="#1c2126" stroke-linejoin="round" stroke-width="2"/></svg> by <a href="https://lynnandtonic.com">Lynn Fisher</a></p>
      <small>Thank you to <a href='https://netlify.com'>Netlify</a>, <a href="https://www.hawksworx.com/">Phil Hawksworth</a>, <a href="https://jason.energy/">Jason Lengstorf</a>, and <a href="https://ryanmulligan.dev/">Ryan Mulligan</a></small>
      <p><small><a href="https://github.com/lynnandtonic/oss-valentines">This project is open source on GitHub</a></small></p>
    </div>
    <div class="sponsors">
      <h4>Presented by</h4>
      <div>
        <a href="https://opensauced.pizza"><img src="/img/opensauced.svg" class="opensauced" alt="OpenSauced" width="140" height="24"></a>
        <a href="https://ui.dev/"><img src="/img/uidotdev.svg" class="uidev" alt="ui.dev" width="50" height="50" /></a>
      </div>
    </div>
  </footer>

  ${data.scripts.map((s) => '<script src="/js/' + s + '"></script>').join('')}
</body>

</html>`;
};
