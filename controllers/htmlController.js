const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");

const { Comment, Interest, Post, User } = require("../models");


// Login/Home Page
router.get('/', function(req,res) {
    // TODO: check if user is logged in. If so, redirect to their profile
    res.render("login")
});


// Search DONE
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
        console.log(users)
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
        }
    })
    .then(userProfile=>{
        res.json(userProfile)
    })
});

module.exports = router;