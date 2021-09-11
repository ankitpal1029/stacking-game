const jwt = require("jsonwebtoken");
const { SECRET } = process.env;
const User = require("../models/users");

const verifyJWT = (req, res, next) =>{
    const token = req.headers["x-access-token"]

    if(!token){
        res.send("Token not recieved");
    } else {
        jwt.verify(token, SECRET, (err, decoded) => {
            if(err){
                res.json({
                    auth: false,
                    message: "token authentication failed",
                    err
                });
            } else {
                req._id = decoded._id;
                User.find({ _id: decoded._id}).exec((err, user) =>{

                    if(err){
                        res.json({
                            auth: false,
                            message: "database couldn't find the user",
                            err
                        })
                    }
                    res.json({
                        auth: true,
                        message: "token is authenticated",
                        user
                    });
                    
                });
                next();
            }
        })
    }
}

module.exports = verifyJWT;
