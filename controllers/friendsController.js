const router = require("express").Router();
const { User } = require("../models");

router.get("/:userId/friends", (req,res)=>{
    User.findAll({
        where: { id: req.params.userId},
        include: {
            model: User,
            as: "Friend",
            attributes: ["id", "username", "first_name", "last_name"],
        },
    })
    .then((user)=>{
        if(!user) {
            return res.status(404).json({msg: "No User found"});
        }
        res.json(user.Friend);
    })
    .catch((err)=> {
        console.log(err);
        res.status(500).json({msg: "Error",err});
    });
});

router.post("/:userId/friends", (req,res)=> {
    User.findByPk(req.params.userId)
    .then((user)=> {
        if(!user) {
            return res.status(404).json({ msg: "No User found"});
        }
        User.findByPk(req.body.friendId)
        .then((friend)=> {
            if (!friend) {
                return res.status(404).json({msg: "No Friends found"});
            }
            user.addFriend(friend);
            res.json({msg:"Friend added!"});
        })
        .catch((err)=> {
            console.log(err);
            res.status(500).json({msg:"Error adding friend", err});
        });
    })
    .catch((err)=> {
        console.log(err);
        res.status(500).json({msg:"Error finding user", err});
    });
});
router.delete("./userId/friends/:friendId", (req,res)=> {
    User.findByPk(req.params.userId)
    .then((user)=> {
        if(!user) {
            return res.status(404).json({msg:"No User found"})
        }
        User.findByPk(req.params.friendId)
        .then((friend)=> {
            if(!friend) {
                return res.status(404).json({msg:"No Friend found"});
            }
            user.removeFriend(friend);
            res.json({msg:"Error removing friend", err });
        });
    })
    .catch((err)=> {
        console.log(err);
        res.status(500).json({msg:"Error finding user",err});
    });
});

module.exports = router;