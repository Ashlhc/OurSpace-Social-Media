const router = require("express").Router();

router.get("/",(req,res)=>{
    res.send("You found the API home page!");
})

module.exports = router;