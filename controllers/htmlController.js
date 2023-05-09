const express = require("express");
const router = express.Router();

const { Comment, Interest, Post, User } = require("../models");


// Login/Home Page
router.get('/', function(req,res) {
    // TODO: check if user is logged in. If so, redirect to their profile
    res.render("login")
});

// Search
router.get('/search/:username', function(req,res) {
    // TODO: Pull all users based on closely matched
    res.render("search")
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