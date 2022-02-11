(async function() {

  if (document.referrer) {
    const referrer = new URL(document.referrer);
    if (referrer.pathname = "/customize/") {
      const body = document.getElementsByTagName("body")[0];
      body.classList.add("previewing")
    }
  }

})();
