(async function() {


  function toggleCardLogin() {

    console.log(`LOCAL ${localUser}`);

    if (!localUser) {
      displayTemplate("#cta", "#logged-in");
      displayTemplate("#auth-cta", "#header-logged-in");
    } else {
      displayTemplate("#cta", "#logged-out");
      displayTemplate("#auth-cta", "#header-logged-out");
    }

  }



})();
