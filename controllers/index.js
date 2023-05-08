const router = require("express").Router();

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
    res.json(req.body)
})

// END TESTING ROUTES


router.use("/api",apiRoutes);
router.use("/search",searchRoutes);
router.use("/signup",signupRoutes);

module.exports = router;