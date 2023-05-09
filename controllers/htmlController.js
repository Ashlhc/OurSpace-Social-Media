const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");

const { Comment, Interest, Post, User } = require("../models");


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
    }).then(allUsers=>{
        // TODO: Append retrieved data to the search.handlebars
        res.json(allUsers)
    })
});

// Sign up
router.get('/signup', function(req,res) {
    // TODO: just renders an empty signup page
    res.render("signup")
});

// User Profiles
router.get('/profile/:username', function(req,res) {
    // TODO: renders the profile with all the user data
    res.render("profile");
});

module.exports = router;