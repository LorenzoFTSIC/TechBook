const navLinks = document.getElementsByClassName('nav-link');

async function clickHandler(event) {
  const navItem = event.target.dataset['nav'];

  switch (navItem) {
    case 'home':
      window.location.href = '/';
      break;
    case 'dashboard':
      window.location.href = '/dashboard';
      break;
    case 'login':
      window.location.href = '/login';
      break;
    case 'logout':
      const request = await fetch('/api/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      window.location.href = '/';
      break;
  
    default:
      break;
  }
}

document.addEventListener('click', clickHandler);