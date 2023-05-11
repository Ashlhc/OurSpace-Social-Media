const router = require("express").Router();

const commentRoutes = require("./commentController");
const interestRoutes = require("./interestController");
const postRoutes = require("./postController");
const userRoutes = require("./userController");

router.use("/comments",commentRoutes);
router.use("/interests",interestRoutes);
router.use("/posts",postRoutes);
router.use("/users",userRoutes);

module.exports = router;