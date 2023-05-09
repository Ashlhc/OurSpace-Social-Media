const express = require('express');
const router = express.Router();
const { Comment, Post, User } = require('../models');

router.get('/', async (req, res) => {
  try {
    const comments = await Comment.findAll({ include: Post, User });
    res.status(200).json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findByPk(id, { include: Post, User });
    if (!comment) {
      res.status(404).json({ error: 'No Comment with this ID found.' });
    }
    res.status(200).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to get comment with this ID.' });
  }
});

router.post('/', async (req, res) => {
  const { text, author_id, post_id } = req.body;
  try {
    const user = await User.findByPk(author_id);
    if (!user) {
      return res.status(404).json({ error: 'No User with this ID found.' });
    }
    const comment = await Comment.create({ text, author_id, post_id });
    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to create comment.' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  try {
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ error: 'No Comment with this ID found.' });
    }
    comment.text = text;
    await comment.save();
    res.status(200).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to update comment with this ID.' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ error: 'No Comment with this ID found.' });
    }
    await comment.destroy();
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to delete comment with this ID.' });
  }
});

module.exports = router;