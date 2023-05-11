const express = require('express');
const router = express.Router();
const { Post, User, Comment } = require('../../models');

// GET ROUTE - ALL
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({ include: [User, Comment] });
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: err});
  }
});

// GET ROUTE - SINGULAR BY ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const posts = await Post.findByPk(id, { include: [User, Comment] });
    if (!posts) {
      res.status(404).json({error: err});
    }
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: err});
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
      return res.status(404).json({error: err});
    }
    const posts = await Post.create({ title, body, UserId: author_id });
    res.status(201).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: err});
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
      return res.status(404).json({error: err});
    }
    posts.text = text;
    await posts.save();
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: err});
  }
});

// DELETE ROUTE
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const posts = await Post.findByPk(id);
    if (!posts) {
      return res.status(404).json({error: err});
    }
    await posts.destroy();
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({error: err});
  }
});

module.exports = router;