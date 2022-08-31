const router = require('express').Router();
const { Post, User } = require('../models/index'); 
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  // render homepage with loggedin status, user data, and post data
  try {
    const postData = await Post.findAll({
      order: [['createdAt', 'DESC']],
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    
    res.status(200).render('homepage', {
      posts,
      logged_in: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login', {
    logged_in: req.session.loggedIn
  });
});

router.get('/signup', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup', {
    logged_in: req.session.loggedIn
  });
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // get all posts from currently logged in user
    const user = await User.findOne({
      raw: true,
      where: {
        username: req.session.username
      }
    });
    const posts = await Post.findAll({
      raw: true,
      where: {
        user: user.username
      },
      order: [[ 'createdAt', 'DESC' ]]
    });
    
    res.render('dashboard', {
      posts,
      logged_in: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard/post/:id', withAuth, async (req, res) => {
  try {
    const user = await User.findOne({
      raw: true,
      where: {
        username: req.session.username
      }
    });
    const post = await Post.findByPk(req.params.id, {
      raw: true
    });
    
    if (user.username === post.user) {
      res.status(200).render('post-edits', {
        post,
        logged_in: req.session.loggedIn
      });
      return;
    }

    res.status(400).redirect(`/api/posts/${req.params.id}`);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;