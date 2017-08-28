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
    .then(({ token }) => {
      document.querySelector('.token-container').innerHTML = `
        <div class="token">
          <p>Token: ${token}</p>
        </div>
      `;
    })
    .catch((error) => {
      document.querySelector('.token-container').innerHTML = `
      <div class="token">
        Error: ${error}
      </div>
    `;
    });
});
