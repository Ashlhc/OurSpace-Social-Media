const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../models');
const { Op } = require("sequelize");


// POST ROUTE - LOGOUT
router.post("/logout",(req,res)=>{
  if (req.session.logged_in) {
    req.session.destroy(()=>{
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// GET ROUTE - ALL
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err});
  }
});

// GET ROUTE - ALL INCLUDING FRIENDS
router.get("/friends",(req,res)=>{
  User.findAll({
      include: {
          model: User,
          as: "Friends"
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

// GET ROUTE - SINGULAR BY ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json("");
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err});
  }
});

// GET ROUTE - SINGULAR BY USERNAME
router.get("/user/:username",(req,res)=>{
  User.findOne({
    where: {
      username: req.params.username
  }})
  .then(user=>{
    res.json(user);
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({msg:"error occured",err})
  })
})

// GET ROUTE - SINGULAR BY ID INCLUDING FRIENDS
router.get("/:userId/friends", (req,res)=>{
  User.findAll({
      where: { id: req.params.userId},
      include: {
          model: User,
          as: "Friends",
          attributes: ["id", "username", "first_name", "last_name"],
      },
  })
  .then((user)=>{
      if(!user) {
          return res.status(404).json({error: err});
      }
      res.json(user.friends);
  })
  .catch((err)=> {
      console.log(err);
      res.status(500).json({error: err});
  });
});

// POST ROUTE
// JSON FORMAT
// username
// first_name
// last_name
// password
router.post('/', async (req, res) => {
  const { username, first_name, last_name, password} = req.body;
  try {
    const newUser = await User.create({
      username,
      first_name,
      last_name,
      password
    });
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: err});
  }
});

// POST ROUTE - ADD FRIEND
// userId is the person clicking add friend
// friendId is the person they're clicking on
router.post("/:userId/newfriend/:friendId", (req,res)=> {
  User.findByPk(req.params.userId)
  .then((user)=> {
      if(!user) {
          return res.status(404).json({error: err});
      }
      User.findByPk(req.params.friendId)
      .then((friends)=> {
          if (!friends) {
              return res.status(404).json({error: err});
          }
          user.addFriend(friends);
          res.json({msg:"Friend added!"});
      })
      .catch((err)=> {
          console.log(err);
          res.status(500).json({error: err});
      });
  })
  .catch((err)=> {
      console.log(err);
      res.status(500).json({error: err});
  });
});

// POST ROUTE - LOGIN
// JSON FORMAT
// username
// password
router.post("/login", async (req,res)=>{
  try {
    const userData = await User.findOne({
      where: {
        username: req.body.username
      }
    });

    if(!userData) {
      res.status(400).json({msg:"Incorrect username or password"});
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if(!validPassword) {
      res.status(400).json({msg:"Incorrect username or password"});
      return;
    }

    req.session.save(()=>{
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({user: userData, message: "Logged In!"})
    })

  } catch (err) {
    console.log(err);
    res.status(400).json({msg:"error occured",err})
  }
});


// UPDATE ROUTE
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

// DELETE ROUTE
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

// DELETE ROUTE - FRIEND BY ID
router.delete("/:userId/friends/:friendId", (req,res)=> {
  User.findByPk(req.params.userId)
  .then((user)=> {
      if(!user) {
          return res.status(404).json({error: err});
      }
      User.findByPk(req.params.friendId)
      .then((friend)=> {
          if(!friend) {
              return res.status(404).json({error: err});
          }
          user.removeFriend(friend);
          res.json({msg:"Friend Removed"});
      });
  })
  .catch((err)=> {
      console.log(err);
      res.status(500).json({error: err});
  });
});

module.exports = router;