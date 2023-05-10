const router = require("express").Router();
const { User } = require("../models");

router.get("/:userId/friends", (req,res)=>{
    User.findAll({
        where: { id: req.params.userId},
        include: {
            model: User,
            as: "friends",
            attributes: ["id", "username", "first_name", "last_name"],
        },
    })
    .then((user)=>{
        if(!user) {
            return res.status(404).json({error: err});
        }
        res.json(user.friends);
    })
    .catch((err)=> {
        console.log(err);
        res.status(500).json({error: err});
    });
});

router.post("/:userId/newfriend/:friendId", (req,res)=> {
    User.findByPk(req.params.userId)
    .then((user)=> {
        if(!user) {
            return res.status(404).json({error: err});
        }
        User.findByPk(req.params.friendId)
        .then((friends)=> {
            if (!friends) {
                return res.status(404).json({error: err});
            }
            user.addFriend(friends);
            res.json({msg:"Friend added!"});
        })
        .catch((err)=> {
            console.log(err);
            res.status(500).json({error: err});
        });
    })
    .catch((err)=> {
        console.log(err);
        res.status(500).json({error: err});
    });
});

router.delete("/:userId/friends/:friendId", (req,res)=> {
    User.findByPk(req.params.userId)
    .then((user)=> {
        if(!user) {
            return res.status(404).json({error: err});
        }
        User.findByPk(req.params.friendId)
        .then((friend)=> {
            if(!friend) {
                return res.status(404).json({error: err});
            }
            user.removeFriend(friend);
            res.json({msg:"Friend Removed"});
        });
    })
    .catch((err)=> {
        console.log(err);
        res.status(500).json({error: err});
    });
});

module.exports = router;