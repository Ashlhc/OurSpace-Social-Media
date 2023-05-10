const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");

const { Comment, Interest, Post, User } = require("../models");

// TEST LOGIN ROUTES FOR FRONT-END TEAM
// ==============================
router.get("/test/login",(req,res)=>{
    res.render("login");
})

router.get("/test/profile",(req,res)=>{
    res.render("profile");
})

router.get("/test/search",(req,res)=>{
    res.render("search");
})

router.get("/test/signup",(req,res)=>{
    res.render("signup");
})
// ==============================
// END TEST ROUTES

// Login/Home Page
router.get('/', function(req,res) {
    // TODO: check if user is logged in. If so, redirect to their profile
    res.render("login")
});

// Search
router.get('/search/:username', function(req,res) {
    // Pulls all users based on similarity to entered parameter
    User.findAll({
        where: {
            username: {
                [Op.like]: `%${req.params.username}%`
            }
        }
    })
    .then(searchedUsers=>{
        const users = searchedUsers.map((user)=>user.get({plain:true}));
        res.render("search",{users})
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({msg:"Error retrieving search data",err});
    })
});

// Sign up
router.get('/signup', function(req,res) {
    // TODO: just renders an empty signup page
    res.render("signup")
});

// User Profiles
router.get('/profile/:username', function(req,res) {
    // TODO: include Comments, Posts, Friends, and Interests
    User.findOne({
        where: {
            username: req.params.username
        },
        include: [{
            model: Post,
            include: {
                model: Comment
            }
        },
        {
            model: User,
            as: "Friends"
        }
    ]})
    .then(userProfile=>{
        const user = userProfile.get({plain:true});
        const currentUser = true
        console.log({user,currentUser})
        res.render("profile",{user,currentUser})
    })
});

module.exports = router;