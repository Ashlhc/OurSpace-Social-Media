const router = require("express").Router();

const apiRoutes = require("./api");
const htmlRoutes = require('./htmlController');

router.get("/sessiondata",(req,res)=>{
    res.json(req.session);
})

router.get("/favicon.ico",(req,res)=>{
    res.send("Y");
})

router.use("/api",apiRoutes);
router.use(htmlRoutes);

module.exports = router;