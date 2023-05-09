const router = require('express').Router();
const { User } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to get User with this ID'});
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'No User found with this ID' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to get User with this ID'});
  }
});

router.post('/', async (req, res) => {
  const { userName, firstName, lastName, password, profile_img, bio } = req.body;
  try {
    const newUser = await User.create({
      userName,
      firstName,
      lastName,
      password,
      profile_img,
      bio,
    });
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'Unable to create User.'});
  }
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { userName, firstName, lastName, password, profile_img, bio } = req.body;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'No User found with this ID' });
    }
    const updatedUser = await user.update({
      userName,
      firstName,
      lastName,
      password,
      profile_img,
      bio,
    });
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'no user found' });
    }
    await user.destroy();
    res.json({ message: 'User deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'error' });
  }
});

module.exports = router;