
exports.data = {
  layout: "layouts/base.11ty.js",
  pageClass: "view-card view-customize"
};

exports.render = function(data) {
  return `
  <main class="container">
    <div class="content">
      <section class="cta">
        <p>If everything looks correct, let’s get this valentine on its way.</p>
        <form action="/create" method="post" name="new-valentine">
          <input type="hidden" id="senderName" name="senderName" value="lynnandtonic" />
          <input type="hidden" id="senderAvatar" name="senderAvatar" value="this it their avatar" />
          <input type="hidden" id="recipientName" name="recipientName" value="eleventy" />
          <input type="hidden" id="recipientAvatar" name="recipientAvatar" value="this it their avatar" />
          <input type="hidden" hidden id="cardVariant" name="cardVariant"  value="valentine-final.svg" />
          <input type="submit" class="button" value="Ship it!" />
        </form>
      </section>
      <img src="/img/valentine-with-recipient.svg"  alt="" class="valentine" />
    </div>
  </main>`;
}
