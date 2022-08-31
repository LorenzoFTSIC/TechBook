const formSignup = document.getElementById('signup');

async function submitHandler(event) {
  event.preventDefault();

  const username = document.getElementById('username').value.trim().replace(/\s/g, "");
  const password = document.getElementById('password').value.trim();

  if (username && password) {
    const request = await fetch('/api/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    });

    if (request.ok) {
      window.location.href = '/';
      return;
    }

    return;
  }
};

formSignup.addEventListener('submit', submitHandler);