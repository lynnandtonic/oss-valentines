module.exports = (data) => {
  return `
  <main class="container">
    <div class="content">
      <section class="cta cta-info">
      <p class="center"><span>${data.senderName}</span> sent you an OSS valentine to say “Thank you!”</p>
      </section>
      <section class="cta cta-preview">
        <p class="center">Send this URL to your OSS valentine.</p>
        <!-- NOTE: Clicking this should probably copy the URL to your clipboard and not link to the page? -->
        <a href="/card/${data.path}" class="share-link">https://oss.love/card/${data.path}</a>
        <button>Copy</button>
        <button>Tweet</button>
      </section>
      <img src="/img/valentines/${data.cardVariant}" alt="" class="valentine" />
      <code>
        <pre>
          This page comes with some data...
          ${data.senderName}
          ${data.senderAvatar}
          ${data.recipientName}
          ${data.recipientAvatar}
          ${data.cardVariant}
          ${data.path}
        </pre>
      </code>
    </div>
  </main>`;
};
