(async function() {

  if (document.referrer) {
    const referrer = new URL(document.referrer);
    if (referrer.pathname = "/customize/") {
      const body = document.getElementsByTagName("body")[0];
      body.classList.add("previewing")
    }
  }


  btnHandler(".copy-url", function() {
    const copyFeedback = document.querySelector(".copy-success");
    navigator.clipboard.writeText(document.querySelector(".share-link").innerText).then(function() {
      console.log(`link copied`);
      copyFeedback.innerHTML = 'Copied!';
    }, function() {
      console.log(`Couldn't copy link to clipboard`);
      copyFeedback.innerHTML = 'Try again!';
    });
  });

})();
