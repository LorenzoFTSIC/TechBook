const router = require('express').Router();
const { Post, User, Comment } = require('../../models/index');

router.post('/create', async (req, res) => {
  try {
    const user = await User.findOne({
      raw: true,
      where: {
        username: req.session.username
      }
    });
    const post = await Post.findOne({
      raw: true,
      where: {
        id: req.body.id
      }
    });
    const dbCommentData = await Comment.create({
      content: req.body.content,
      user: req.session.username,
      post: post.id
    });

    res.status(201).json(dbCommentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/update', async (req, res) => {
  try {
    const dbCommentData = await Comment.update(
      {
        content: req.body.content
      },
      {where: {
        id: req.body.id
      }}
    );

    if (!dbCommentData[0]) {
      res.status(404).json({ message: 'Could not find comment to update!' });
      return;
    }

    res.status(200).json({ message: 'Successfully updated comment!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/delete', async (req, res) => {
  try {
    const dbCommentData = await Comment.destroy({
      where: {
        id: req.body.id
      }
    });

    if (!dbCommentData) {
      res.status(404).json({ message: 'Could not find post to delete!' });
      return;
    }

    res.status(200).json({ message: 'Post has been successfully deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;