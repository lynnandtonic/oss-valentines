var localUser = false;

// simple button click event handler
function btnHandler(selector, callback) {
  var buttons = document.querySelectorAll(selector);
  buttons.forEach((btn) => {
    if (!btn) {
      console.log(`wgart btn?`);
      return;
    }
    btn.addEventListener(
      'click',
      function (event) {
        event.preventDefault();
        callback(event);
      },
      false
    );
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
    res.json()
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
    displayTemplate('#header-auth', '#header-logged-in');
    const handle = document.querySelector('.logged-in-user');
    handle.innerHTML = `@${localUser.login}`;
  } else {
    displayTemplate('#header-auth', '#header-logged-out');
  }
}

function toggleCardUI() {
  if (!document.querySelector('#customize-cta')) {
    return;
  }

  if (localUser) {
    displayTemplate('#customize-cta', '#logged-in');

    // update sender display deets
    const handle = document.querySelector('.logged-in-user-handle');
    const avatar = document.querySelector('.logged-in-user-avatar');
    handle.innerText = `@${localUser.login}`;
    handle.href = `https://github.com/${localUser.login}`;
    avatar.src = `${localUser.avatar_url}`;
    btnHandler('.add-recipient', findGitHubRecipient);

    //update form values
    const senderName = document.querySelector('#senderName');
    const senderAvatar = document.querySelector('#senderAvatar');
    senderName.value = localUser.login;
    senderAvatar.value = localUser.avatar_url;
  } else {
    displayTemplate('#customize-cta', '#logged-out');
  }
}

// Search github for a recipient
async function findGitHubRecipient() {
  const username = document.querySelector('#search-recipient').value;
  console.log(`look for a recipient, ${username}`);
  const userData = await fetch(`/api/user/${username}`).then((res) =>
    res.json()
  );

  const confirm = document.querySelector('.recipient-success');
  const searchBox = document.querySelector('#search-recipient');
  // Found one!
  if (userData.name) {
    setRecipientUser(userData);
    confirm.innerHTML = `Success!`;
    searchBox.classList.remove('error');
  }
  // No dice!
  else {
    confirm.innerHTML = `Try again!`;
    searchBox.classList.add('error');
    searchBox.focus();
  }
}

// Update the UI with the recipient data
function setRecipientUser(data) {
  const handle = document.querySelector('.recipient-user-handle');
  const avatar = document.querySelector('.recipient-user-avatar');
  handle.innerText = `@${data.login}`;
  handle.href = `https://github.com/${data.login}`;
  avatar.src = `${data.avatarUrl}`;

  //update form values
  const recipientName = document.querySelector('#recipientName');
  const recipientFullName = document.querySelector('#recipientFullName');
  const recipientAvatar = document.querySelector('#recipientAvatar');
  const recipientCanBeSponsored = document.querySelector(
    '#recipientCanBeSponsored'
  );
  recipientName.value = data.login;
  recipientFullName.value = data.name;
  recipientAvatar.value = data.avatarUrl;
  recipientCanBeSponsored.value = data.viewerCanSponsor;

  document.querySelector('#ship-it').removeAttribute('disabled');
}

(async function () {
  await checkLoggedIn();
  console.log(JSON.stringify(localUser));
  toggleHeaderLogin();
  toggleCardUI();
})();
