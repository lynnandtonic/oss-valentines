module.exports = (data) => {


  const sponsorCTA = (data) => {


    console.log(data);

    if (data.recipientCanBeSponsored) {
      return `<div class="sponsor">
      <p class="sponsor-cta-viewer">Psst! Are you also an admirer of <strong>@${data.recipientName}?</strong><br/> Why not send them <a href="/">your own valentine</a> or sponsor them on GitHub?</p>
      <div>
        <h3>Sponsor @${data.recipientName}</h3>
        <p class="sponsor-cta">Send even more love by making a financial contribution.</p>
      </div>
      <a href="https://github.com/sponsors/${data.recipientName}" class="button blue">Sponsor now</a>
    </div>`
    } else {
      return "";
    }
  };



  return `
  <main class="container">
    <div class="content">
      <section class="cta cta-info">
        <p class="center"><span>@${data.senderName}</span> sent you an OSS valentine to say “Thank you!”</p>
      </section>
      <section class="cta cta-preview">
        <p class="center">Send this URL to your OSS valentine.</p>
        <!-- NOTE: Clicking this should probably copy the URL to your clipboard and not link to the page? -->
        <p>https://oss.love/card/${data.path}</p>
        <div class="button-group">
          <div class="copy-util">
            <small class="copy-success"></small>
            <button class="copy-url">Copy</button>
          </div>
          <a class="button tweet-link" href="https://twitter.com/intent/tweet?text=I can't keep my feelings a secret... I just have to share this valentine with the world!&url=https://oss.love/card/${data.path}">Tweet</a>
        </div>
      </section>
      
      
      <div class="card">
        <img src="/img/valentines/${data.cardVariant}" alt="" class="valentine" />
        <div class="recipient-details">
          <img class="user-avatar recipient-user-avatar" src="${data.recipientAvatar}" alt="" />
          <div class="user-handle recipient-user-handle">${data.recipientName}</div>
        </div>
        <div class="sender-details">
          <img class="user-avatar logged-in-user-avatar" src="${data.senderAvatar}" alt="" />
          <div class="user-handle logged-in-user-handle">${data.senderName}</div>
        </div>
      </div>

      ${sponsorCTA(data)}

    </div>
  </main>`;
};
