var localUser = false;


function showShareCTA() {
  if (document.referrer) {
    const referrer = new URL(document.referrer);
    if (referrer.pathname = "/customize/") {
      const body = document.getElementsByTagName("body")[0];
      body.classList.add("previewing")
    }
  }
};


// simple button click event handler
function btnHandler(selector, callback) {
  var buttons = document.querySelectorAll(selector);
  buttons.forEach(btn => {
    if (!btn) { console.log(`wgart btn?`); return; }
    btn.addEventListener('click', function(event) {
      event.preventDefault();
      callback(event);
    }, false);
  });
}

// function setUserDisplay(username, avatar) {

//   unsetUserDisplay();

//   var now = new Date();
//   var expires = now.getTime() + 1000 * 3600 * 24 * 7;
//   now.setTime(expires);
//   document.cookie = `nf_oss_user=${username};expires=${now.toUTCString()}`;
//   document.cookie = `nf_oss_avatar=${avatar};expires=${now.toUTCString()}`;
// }

// function unsetUserDisplay() {
//   document.cookie = "nf_oss_user=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
//   document.cookie = "nf_oss_avatar=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
// }


// function getUserDisplay() {

//   const usercookie = (document.cookie.split(';').some((item) => item.trim().startsWith('nf_oss_user=')));
//   const avatarcookie = (document.cookie.split(';').some((item) => item.trim().startsWith(' nf_oss_avatar=')));

//   console.log(`usercookie, avatarcookie `, usercookie, avatarcookie);
//   if (!(usercookie && avatarcookie)) {
//     return false;
//   }
//   console.log(document.cookie.split(';'));

//   const username = document.cookie.split(';').find(row => row.startsWith('nf_oss_user=')).split('=')[1];
//   const avatar = document.cookie.split(';').find(row => row.startsWith(' nf_oss_avatar=')).split('=')[1];


//   if (username && avatar) {
//     return {
//       login: username,
//       avatar_url: avatar
//     };
//   } else {
//     return null;
//   }
// }


function displayTemplate(element, template) {
  if ('content' in document.createElement('template')) {
    const target = document.querySelector(element);
    const tmpl = document.querySelector(template);

    if (!(tmpl && template)) {
      return;
    }

    while (target.firstChild) {
      target.removeChild(target.firstChild);
    }
    const clone = tmpl.content.cloneNode(true);
    target.appendChild(clone);
  }
}




// function showLoggedIn(user) {
//   const templateId = user ? "#header-logged-in" : "#header-logged-out";
//   displayTemplate("#auth-cta", templateId);
//   if (!user) {
//     return;
//   }
//   const handle = document.querySelector(".logged-in-user");
//   handle.innerHTML = `@${user.login}`;
// }



async function checkLoggedIn() {



  const { isLoggedIn, user } = await fetch('/auth/check').then((res) =>
    res.json(),
  );


  if (isLoggedIn) {
    // showLoggedIn(user);
    localUser = user;
    console.log(`local user set`);
  } else {
    console.log(`not logged in`);
    // showLoggedIn(false);
    localUser = false;
  }
}



function toggleHeaderLogin() {
  if (localUser) {
    displayTemplate("#header-auth", "#header-logged-in");
    const handle = document.querySelector(".logged-in-user");
    handle.innerHTML = `@${localUser.login}`;
  } else {
    displayTemplate("#header-auth", "#header-logged-out");
  }
}

function toggleCardUI() {

  if (localUser) {
    displayTemplate("#cta", "#logged-in");

    // update sender display deets
    const handle = document.querySelector(".logged-in-user-handle");
    const avatar = document.querySelector(".logged-in-user-avatar");
    handle.innerHTML = `@${localUser.login}`;
    avatar.src = `${localUser.avatar_url}`;
    btnHandler(".add-recipient", findGitHubRecipient);

    //update form values
    const senderName = document.querySelector("#senderName");
    const senderAvatar = document.querySelector("#senderAvatar");
    senderName.value = localUser.login;
    senderAvatar.value = localUser.avatar_url;

  } else {
    displayTemplate("#cta", "#logged-out");
  }
}



// Search github for a recipient
async function findGitHubRecipient() {
  const username = document.querySelector("#search-recipient").value;
  console.log(`look for a recipient, ${username}`);
  const userData = await fetch(`/api/user/${username}`).then((res) =>
    res.json(),
  );

  //TODO: handle search misses
  setRecipientUser(userData);
}


// Update the UI with the recipient data
function setRecipientUser(data) {
  const handle = document.querySelector(".recipient-user-handle");
  const avatar = document.querySelector(".recipient-user-avatar");
  handle.innerHTML = `@${data.login}`;
  avatar.src = `${data.avatarUrl}`;
  document.querySelector("#ship-it").removeAttribute("disabled");
}

(async function() {
  await checkLoggedIn();
  console.log(JSON.stringify(localUser));
  toggleHeaderLogin();
  toggleCardUI();
})();




// showShareCTA();
