const router = require("express").Router();

const apiRoutes = require("./api");
const searchRoutes = require("./searchController");
const signupRoutes = require("./signupController");

router.get("/",(req,res)=>{
    res.send("You found the home page!");
})

router.use("/api",apiRoutes);
router.use("/search",searchRoutes);
router.use("/signup",signupRoutes);

module.exports = router;