const User = require("../models/users");

const leaderboard = (req, res) => {
    console.log("find");
    User.find().sort({highscore : "desc"}).exec((err, users) => {
        if(err){
            return res.json({
                status: false,
                err
            });
        }
        else{
            return res.json({
                status: true,
                users
            });
        }
    });
}

module.exports = leaderboard;
