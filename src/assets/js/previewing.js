(async function() {

  if (document.referrer) {
    const referrer = new URL(document.referrer);
    if (referrer.pathname = "/customize/") {
      const body = document.getElementsByTagName("body")[0];
      body.classList.add("previewing")
    }
  }


  btnHandler(".copy-url", function() {
    navigator.clipboard.writeText(document.querySelector(".share-link").innerText).then(function() {
      console.log(`link copied`);
      const success = document.querySelector(".copy-success");
      success.style.display = 'block';
    }, function() {
      console.log(`Couldn't copy link to clipboard`);
    });
  });

})();
