const express = require("express");
const router = express.Router();

router.get('/', function(req,res) {
    res.render('index');
});

router.get('/Profile', function(req,res) {
    res.render('profile');
});

router.get('/Login' ,function (req,res) {
    res.render('login');
});

router.get('/User', function(req,res) {
    res.render('user');
});

router.get('/Comment', function(req,res) {
    res.render('comment');
});

router.get('/Interest', function(req,res) {
    res.render('interest');
});

module.exports = router;