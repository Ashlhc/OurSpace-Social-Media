const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");

const { Comment, Interest, Post, User } = require("../models");

// Login/Home Page
router.get('/', function(req,res) {
    const cookie = req.session
    res.render("login",{cookie: cookie})
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
        const cookie = req.session
        res.render("search",{users: users, cookie: cookie})
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({msg:"Error retrieving search data",err});
    })
});

// Sign up
router.get('/signup', function(req,res) {
    const cookie = req.session
    res.render("signup",{cookie: cookie})
});

// User Profiles
router.get('/profile/:username', function(req,res) {
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
        },
        {
            model: Interest
        }
    ]})
    .then(userProfile=>{
        const user = userProfile.get({plain:true});
        let currentUser = false;
        if(user.id===req.session.user_id) {
            currentUser = true;
        }
        const cookie = req.session
        res.render("profile",{user: user, currentUser, cookie: cookie})
    })
});

module.exports = router;