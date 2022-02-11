(async function() {

  const body = document.getElementsByTagName("body")[0];
  if (document.referrer) {
    const referrer = new URL(document.referrer);
    if (referrer.pathname.indexOf("/customize/") !== -1) {
      console.log(`previewing`);
      body.classList.add("previewing");
    }
  } else {
    console.log(`enjoying`);
    body.classList.add("gifted");
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
