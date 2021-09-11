const User = require("../models/users");

const highscore = (req, res) => {
    User.updateOne({
        _id: req.body._id
    },{ highscore: req.body.new_highscore},{upsert: true}).exec((err, user) => {
        if(err){
            return res.json({
                status: false,
                err
            })
        }else{
            return res.json({
                status: true,
            });
        }

    })

}

module.exports = highscore;
