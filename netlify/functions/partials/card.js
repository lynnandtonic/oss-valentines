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
        <button class="copy-url">Copy</button>
        <button class="tweet-link">Tweet</button>
      </section>
      
      
      <div class="card">
        <img src="/img/valentines/${data.cardVariant}" alt="" class="valentine" />
        <div class="recipient-details">
          <img class="recipient-user-avatar" src="${data.recipientAvatar}" alt="" />
          <div class="recipient-user-handle">${data.recipientName}</div>
        </div>
        <div class="sender-details">
          <img class="logged-in-user-avatar" src="${data.senderAvatar}" alt="" />
          <div class="logged-in-user-handle">${data.senderName}</div>
        </div>
      </div>
      
    </div>
  </main>`;
};
