module.exports = (data) => {
  return `
  <main class="container">
    <div class="content">
      <section class="cta">
        <p class="center"><span>${data.senderName}</span> sent you an OSS valentine to say “Thank you!”</p>
      </section>
      <img src="/img/${data.cardVariant}" alt="" class="valentine" />
    </div>
  </main>`;
};