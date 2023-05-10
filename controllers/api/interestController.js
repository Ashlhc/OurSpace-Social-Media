const express = require('express');
const router = express.Router();
const { Interest, User } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const interests = await Interest.findAll({ include: User });
    res.status(200).json(interests);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: err});
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const interest = await Interest.findByPk(id, { include: User });
    if (!interest) {
      res.status(404).json({error: err});
    }
    res.status(200).json(interest);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: err});
  }
});

router.post('/', async (req, res) => {
  const { text, author_id, post_id } = req.body;
  try {
    const user = await User.findByPk(author_id);
    if (!user) {
      return res.status(404).json({ error: 'No User with this ID found.' });
    }
    const interest = await Interest.create({ text, author_id, post_id });
    res.status(201).json(interest);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: err});
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  try {
    const interest = await Interest.findByPk(id);
    if (!interest) {
      return res.status(404).json({error: err});
    }
    interest.text = text;
    await interest.save();
    res.status(200).json(interest);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: err});
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const interest = await Interest.findByPk(id);
    if (!interest) {
      return res.status(404).json({error: err});
    }
    await interest.destroy();
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({error: err});
  }
});

module.exports = router;