var localUser = false;


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

// Template display helper function
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




async function checkLoggedIn() {
  const { isLoggedIn, user } = await fetch('/auth/check').then((res) =>
    res.json(),
  );
  if (isLoggedIn) {
    console.log(`local user set`);
    localUser = user;
  } else {
    console.log(`not logged in`);
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

  if (!document.querySelector("#customize-cta")) {
    return;
  }

  if (localUser) {
    displayTemplate("#customize-cta", "#logged-in");

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
    displayTemplate("#customize-cta", "#logged-out");
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

  //update form values
  const recipientName = document.querySelector("#recipientName");
  const recipientAvatar = document.querySelector("#recipientAvatar");
  recipientName.value = data.login;
  recipientAvatar.value = data.avatarUrl;

  document.querySelector("#ship-it").removeAttribute("disabled");
}


(async function() {
  await checkLoggedIn();
  console.log(JSON.stringify(localUser));
  toggleHeaderLogin();
  toggleCardUI();
})();
