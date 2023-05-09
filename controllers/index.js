const router = require("express").Router();

const { Comment, Interest, Post, User } = require("../models");

const apiRoutes = require("./api");
const searchRoutes = require("./searchController");
const signupRoutes = require("./signupController");

// THESE ROUTES ARE ALL FOR TESTING PURPOSES

router.get("/",(req,res)=>{
    res.send("You found the home page!");
})

router.get("/sessiondata",(req,res)=>{
    res.json(req.session);
})

// To sign up, need:
// username
// password
// first name
// last name
router.post("/signup",(req,res)=>{
    User.create ({
        username: req.body.username,    
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
    })
    .then((newUser)=>{
        res.json(newUser);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({msg:"Error occurred creating database entry",err})
    });
})

// user_id is the person clicking the "add friend" button
// friend_id is the person they're clicking on
router.post("/newfriend",(req,res)=>{
    User.addFriend({
        UserId: req.body.user_id,
        FriendId: req.body.friend_id
    })
    .then(newFriend=>{
        res.json(newFriend)
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({msg:"Error occurred creating database entry",err})
    });
})

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
        res.status(500).json({msg:"Error occurred retrieving database entries",err})
    });
})

// END TESTING ROUTES


router.use("/api",apiRoutes);
router.use("/search",searchRoutes);
router.use("/signup",signupRoutes);

module.exports = router;