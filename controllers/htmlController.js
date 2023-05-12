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

        // Checks if you're logged in
        if (cookie.logged_in){

            // Pulls your friend Ids
            User.findByPk(req.session.user_id,{
                include: {
                    model: User,
                    as: "Friends",
                    attributes: ["id"]
                }
            }).then(activeUser=>{
                const active = activeUser.get({plain:true});

                // Creates an array of just the IDs
                const friendIds = activeUser.Friends.map(friend=>friend.id)
                // Iterates over the list of search results
                for(let i=0;i<users.length;i++){
                    // If it's your own profile, marks it as such
                    if(users[i].id == active.id){
                        users[i]["self"] = true
                    }
                    // If it's a friend's profile, marks it as such
                    if(friendIds.indexOf(users[i].id) !== -1){
                        users[i]["friend"] = true
                    }
                }
                
                // Renders the search with extra info
                res.render("search",{users: users, cookie: cookie, active: active})
            })

        } else {
            // If not logged in, it just renders users
            res.render("search",{users: users, cookie: cookie})
        }
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
                model: Comment,
                include: {
                    model: User
                }
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
        const cookie = req.session
        let currentUser = false;
        // Checks if you're the owner of the current profile
        if(user.id===cookie.user_id) {
            currentUser = true;
        }
        // Creates an array of this profile's friends
        const friendIds = userProfile.Friends.map(friend=>friend.id)
        let currentFriend = false
        // Checks if the logged in user is on the profile's friends list
        if (friendIds.indexOf(cookie.user_id) !== -1) {
            currentFriend = true
        }
        
        res.render("profile",{user: user, currentUser, cookie: cookie, currentFriend})
    })
});

// Alternate route for reaching profiles using ID
router.get("/profile/id/:id",(req,res)=>{
    User.findByPk(req.params.id)
    .then(user=>{
        res.redirect(`/profile/${user.username}`)
    })
})

// just used for getting the profile data in json format
router.get('/profile/json/:username', function(req,res) {
    User.findOne({
        where: {
            username: req.params.username
        },
        include: [{
            model: Post,
            include: {
                model: Comment,
                include: {
                    model: User
                }
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
        const cookie = req.session
        let currentUser = false;
        // Checks if you're the owner of the current profile
        if(user.id===cookie.user_id) {
            currentUser = true;
        }
        // Creates an array of this profile's friends
        const friendIds = userProfile.Friends.map(friend=>friend.id)
        let currentFriend = false
        // Checks if the logged in user is on the profile's friends list
        if (friendIds.indexOf(cookie.user_id) !== -1) {
            currentFriend = true
        }
        
        res.json({user: user, currentUser, cookie: cookie, currentFriend})
    })
});

module.exports = router;