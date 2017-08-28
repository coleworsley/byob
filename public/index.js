const email = document.querySelector('.email');
const app = document.querySelector('.app');

$('button').on('click', (e) => {
  e.preventDefault();
  $('.token-container').addClass('white');
  fetch('/auth', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      email: email.value,
      appName: app.value,
    }),
  })
    .then(res => res.json())
    .then((token) => {
      $('.token-container').append(`<div class="token">Your token: ${token.token}</div>`);
    })
    .catch(error => console.log(error));
});
