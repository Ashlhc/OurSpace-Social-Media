const router = require('express').Router();
const { User } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err});
  }
});

router.get("/users",(req,res)=>{
  User.findAll({
      include: {
          model: User,
          as: "Friend"
      }
  })
  .then(allUsers=>{
      res.json(allUsers);
  })
  .catch(err=>{
      console.log(err);
      res.status(500).json({error: err});
  });
})

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({error: err});
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err});
  }
});

router.post('/', async (req, res) => {
  const { username, first_name, last_name, password, profile_img, bio } = req.body;
  try {
    const newUser = await User.create({
      username,
      first_name,
      last_name,
      password,
      profile_img,
      bio
    });
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: err});
  }
});

router.post("/addFriend",(req,res)=>{
  User.addFriend({
      UserId: req.body.user_id,
      FriendId: req.body.friend_id
  })
  .then(addFriend=>{
      res.json(addFriend)
  })
  .catch(err=>{
      console.log(err);
      res.status(500).json({error: err});
  });
})

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { username, first_name, last_name, password, profile_img, bio } = req.body;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({error: err});
    }
    const updatedUser = await user.update({
      username,
      first_name,
      last_name,
      password,
      profile_img,
      bio
    });
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: err});
  }
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json(err);
    }
    await user.destroy();
    res.json({ message: 'User deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({error: err});
  }
});

module.exports = router;