const express = require('express');
const router = express.Router();
const { Post, User } = require('../../models');

// GET ROUTE - ALL
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({ include: User });
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// GET ROUTE - SINGULAR BY ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const posts = await Post.findByPk(id, { include: User });
    if (!posts) {
      res.status(404).json({ error: 'Post with ID not found.' });
    }
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Not able to get Post with ID.' });
  }
});

// POST ROUTE
// JSON FORMAT:
// title
// body
// author_id
router.post('/', async (req, res) => {
  const { title, body, author_id } = req.body;
  try {
    const user = await User.findByPk(author_id);
    if (!user) {
      return res.status(404).json({ error: 'User with ID not found.' });
    }
    const posts = await Post.create({ title, body, UserId: author_id });
    res.status(201).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Not able to create Post.' });
  }
});

// UPDATE ROUTE
// JSON FORMAT:
// title
// body
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  try {
    const posts = await Post.findByPk(id);
    if (!posts) {
      return res.status(404).json({ error: 'Post with ID not found.' });
    }
    posts.text = text;
    await posts.save();
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Not able to update Post with ID.' });
  }
});

// DELETE ROUTE
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const posts = await Post.findByPk(id);
    if (!posts) {
      return res.status(404).json({ error: 'Post with ID not found.' });
    }
    await posts.destroy();
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Not able to delete Post with ID.' });
  }
});

module.exports = router;