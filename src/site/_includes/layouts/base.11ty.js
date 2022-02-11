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
  
      <a href="/" class="masthead">
        <img class="masthead-logo" src="/img/netlify-logo-full.svg" alt="Netlify" />
        <svg class="masthead-heart" xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><title>heart</title><path d="M19.11,4.37A4.44,4.44,0,0,0,18,2.84,4.75,4.75,0,0,0,15,1.33a4.35,4.35,0,0,0-3.09,1.51A9.5,9.5,0,0,0,10.1,5.42,7.82,7.82,0,0,0,7.37,2a4.9,4.9,0,0,0-4.29-.62A3.59,3.59,0,0,0,.72,4.85C.84,6.28,1.91,7.42,2.93,8.43q3.83,3.78,7.77,7.43L17,9.35C18.36,8,19.79,6.15,19.11,4.37Z" fill="#ff6b60" stroke="#ff6b60" stroke-linejoin="round"/></svg>
        <span>OSS</span>
      </a>
      <div id="header-auth">
        <button class="button" id="gh-login" href="/auth/login">Log in with GitHub</button>
      </div>
      <h2 class="instructions"><span>${data.bannerTitle}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="62" height="23" viewBox="0 0 62 23"><title>hearts</title><path d="M42.34,8.16A5.25,5.25,0,0,0,41,6.31a5.76,5.76,0,0,0-3.56-1.83,5.33,5.33,0,0,0-3.74,1.83,11.75,11.75,0,0,0-2.2,3.12,9.38,9.38,0,0,0-3.3-4.13A5.9,5.9,0,0,0,23,4.56a4.32,4.32,0,0,0-2.85,4.17c.14,1.73,1.44,3.11,2.67,4.33q4.62,4.57,9.39,9l7.64-7.87C41.43,12.53,43.17,10.31,42.34,8.16Z" fill="#ff6b60" stroke="#1c2126" stroke-linejoin="round"/><path d="M61.34,6.8a3.84,3.84,0,0,0-.69-1.56,4.24,4.24,0,0,0-2.24-1.9,3.92,3.92,0,0,0-3,.68,8.52,8.52,0,0,0-2.1,1.87,7,7,0,0,0-1.67-3.51A4.36,4.36,0,0,0,48.07,1a3.18,3.18,0,0,0-2.74,2.51A5.46,5.46,0,0,0,46.52,7q2.55,4.05,5.22,8l6.79-4.36C60,9.78,61.57,8.48,61.34,6.8Z" fill="#ff6b60" stroke="#1c2126" stroke-linejoin="round"/><path d="M15.78,2.18a3.76,3.76,0,0,0-1.48-.84,4.19,4.19,0,0,0-2.93-.2,3.94,3.94,0,0,0-2,2.32A8.65,8.65,0,0,0,8.8,6.21,7,7,0,0,0,5.37,4.38a4.38,4.38,0,0,0-3.72,1A3.18,3.18,0,0,0,.94,9,5.49,5.49,0,0,0,4,11.19q4.46,1.74,9,3.33c.95-2.51,1.91-5,2.87-7.54C16.44,5.4,17,3.39,15.78,2.18Z" fill="#ff6b60" stroke="#1c2126" stroke-linejoin="round"/></svg>
      </h2>
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
  <footer class="footer-main container">
    <div class="content">
      <h3>Netlify <svg xmlns="http://www.w3.org/2000/svg" width="31" height="25" viewBox="0 0 31 25"><title>heart</title><path d="M30.14,5.86A7,7,0,0,0,28.29,3.4,7.64,7.64,0,0,0,23.56,1a7,7,0,0,0-5,2.43,15.68,15.68,0,0,0-2.93,4.15,12.47,12.47,0,0,0-4.39-5.49,7.84,7.84,0,0,0-6.89-1A5.73,5.73,0,0,0,.59,6.62c.18,2.3,1.91,4.14,3.55,5.76q6.15,6.09,12.49,12L26.8,13.87C28.94,11.67,31.25,8.72,30.14,5.86Z" fill="#ff6b60" stroke="#ff6b60" stroke-linejoin="round"/></svg> Open Source</h3>
      <p>Learn about how <a href="https://www.netlify.com/open-source">we support OSS</a> and getting your project onto our <a href="https://www.netlify.com/legal/open-source-policy">free Open Source plan</a>.</p>
      <p><a class="button blue" href="https://app.netlify.com/signup?_ga=2.112645956.1114105187.1644450539-551745678.1634056762">Get started for free</a></p>
      <a href="//netlify.com" class="netlify-logo">
        <img src="/img/netlify-logo-mark-color.svg" alt="Netlify logo" />
      </a>
    </div>
  </footer>


  <script src="/js/focus-visible.min.js"></script>
  ${data.scripts.map(s => '<script src="/js/'+s+'"></script>').join("")}
</body>

</html>`;
};
