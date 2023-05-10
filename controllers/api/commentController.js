const express = require('express');
const router = express.Router();
const { Comment, Post, User } = require('../../models');

// GET ROUTE - ALL
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.findAll({
      include: [Post, User] });
    res.status(200).json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// GET ROUTE - SINGULAR BY ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findByPk(id, { include: [Post, User] });
    if (!comment) {
      res.status(404).json({error: err});
    }
    res.status(200).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: err});
  }
});

// POST ROUTE
// JSON FORMAT:
// text
// author_id
// post_id
router.post('/', async (req, res) => {
  const { text, author_id, post_id } = req.body;
  try {
    const user = await User.findByPk(author_id);
    if (!user) {
      return res.status(404).json({error: err});
    }
    const comment = await Comment.create({
      text,
      UserId: author_id,
      PostId :post_id
    });
    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: err});
  }
});

// UPDATE ROUTE
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  try {
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({error: err});
    }
    comment.text = text;
    await comment.save();
    res.status(200).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: err});
  }
});

// DELETE ROUTE
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({error: err});
    }
    await comment.destroy();
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({error: err});
  }
});

module.exports = router;