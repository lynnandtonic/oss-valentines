module.exports = (data) => {


  const sponsorCTA = (data) => {


    console.log(data);

    if (data.recipientCanBeSponsored) {
      return `<div class="sponsor">
      <small class="sponsor-cta-eyebrow sponsor-cta-viewer">Psst! Do you also admire <strong>@${data.recipientName}?</strong></small>
      <div>
        <h3>Sponsor @${data.recipientName}</h3>
        <!-- <p class="sponsor-cta">Send even more love by helping to fund their work.</p>
        <p class="sponsor-cta-viewer">Show your support by helping to fund their work.</p> -->
        <p>Show your support by helping to fund their work.</p>
      </div>
      <a href="https://github.com/sponsors/${data.recipientName}?metadata_campaign=netlifysendosslove2022" class="button blue">Sponsor now</a>
    </div>`
    } else {
      return "";
    }
  };



  return `
  <main class="container">
    <div class="content">
      <section class="cta cta-info">
        <p class="center"><span><a href="https://github.com/${data.senderName}?metadata_campaign=netlifysendosslove2022">@${data.senderName}</a></span> sent you a card to say “Thank you!”</p>
      </section>
      <section class="cta cta-preview">
        <p class="center">Copy and share this URL with @${data.recipientName}.</p>
        <!-- NOTE: I removed the URL link because it was behaving unexpectedly -->
        <p class="share-link">https://oss.cards/card/${data.path}</p>
        <div class="button-group">
          <div class="copy-util">
            <small class="copy-success"></small>
            <button class="copy-url">Copy</button>
          </div>
          <a class="button tweet-link" href="https://twitter.com/intent/tweet?text=I can’t keep my feelings a secret... I just have to share this card with the world!&url=https://oss.cards/card/${data.path}">Tweet</a>
        </div>
      </section>
      
      
      <div class="card">
        <img src="/img/valentines/${data.cardVariant}" alt="" class="valentine" />
        <div class="recipient-details">
          <img class="user-avatar recipient-user-avatar" src="${data.recipientAvatar}" alt="" />
          <a href="https://github.com/${data.recipientName}?metadata_campaign=netlifysendosslove2022" class="user-handle recipient-user-handle" target="_blank">${data.recipientName}</a>
        </div>
        <div class="sender-details">
          <img class="user-avatar logged-in-user-avatar" src="${data.senderAvatar}" alt="" />
          <a href="https://github.com/${data.senderName}?metadata_campaign=netlifysendosslove2022" class="user-handle logged-in-user-handle" target="_blank">${data.senderName}</a>
        </div>
      </div>

      ${sponsorCTA(data)}

    </div>
  </main>`;
};
