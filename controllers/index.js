const router = require("express").Router();

const apiRoutes = require("./api");
const htmlRoutes = require('./htmlController');

// For retrieving session data for user in front-end
router.get("/sessiondata",(req,res)=>{
    res.json(req.session);
})

router.use("/api",apiRoutes);
router.use(htmlRoutes);

// Universal redirect to home page
router.use("*",(req,res)=>{
    res.redirect("/");
})

module.exports = router;