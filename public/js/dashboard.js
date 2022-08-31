const formPost = document.getElementById('new-post');

async function newPost(event) {
  event.preventDefault();

  const title = document.getElementById('newPostTitle').value.trim();
  const content = document.getElementById('newPostContent').value.trim();

  if (title && content) {
    const request = await fetch('/api/posts/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        content: content
      })
    });

    if (request.ok) {
      window.location.reload();
      return;
    }

    return;
  }
};

formPost.addEventListener('submit', newPost);