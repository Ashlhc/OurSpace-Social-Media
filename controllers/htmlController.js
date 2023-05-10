const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");

const { Comment, Interest, Post, User } = require("../models");

// Login/Home Page
router.get('/', function(req,res) {
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
    res.render("signup")
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
        res.render("profile",{user,currentUser})
    })
});

module.exports = router;