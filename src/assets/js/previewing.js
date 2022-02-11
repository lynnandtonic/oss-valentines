(async function() {

  if (document.referrer) {
    const referrer = new URL(document.referrer);
    if (referrer.pathname = "/customize/") {
      const body = document.getElementsByTagName("body")[0];
      body.classList.add("previewing")
    }
  }


  btnHandler(".add-copy-url", function() {
    navigator.clipboard.readText()
      .then(clipText => document.querySelector(".share-link").innerText += clipText);
  });

})();
