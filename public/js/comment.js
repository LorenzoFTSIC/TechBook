const formComment = document.getElementById('comment');
const postId = document.getElementById('post').dataset['post'];

async function submitHandler(event) {
  event.preventDefault();

  const comment = document.getElementById('comment-content').value.trim();

  if (comment) {
    const request = await fetch('/api/comments/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: comment,
        id: parseInt(postId)
      })
    });

    if (request.ok) {
      window.location.reload();
      return;
    }

    return;
  }
};

formComment.addEventListener('submit', submitHandler);