const router = require("express").Router();
const apiRoutes = require("./api");
const htmlController = require('./htmlController');


// THESE ROUTES ARE ALL FOR TESTING PURPOSES

// router.get("/sessiondata",(req,res)=>{
//     res.json(req.session);
// })

// To sign up, need:
// username
// password
// first name
// last name
// router.post("/signup",(req,res)=>{
//     User.create ({
//         username: req.body.username,    
//         password: req.body.password,
//         first_name: req.body.first_name,
//         last_name: req.body.last_name,
//     })
//     .then((newUser)=>{
//         res.json(newUser);
//     })
//     .catch(err=>{
//         console.log(err);
//         res.status(500).json({msg:"Error occurred creating database entry",err})
//     });
// })

// user_id is the person clicking the "add friend" button
// friend_id is the person they're clicking on



// END TESTING ROUTES

router.use("/api",apiRoutes);
router.use(htmlController);
router.use(require("./friendsController"));

module.exports = router;