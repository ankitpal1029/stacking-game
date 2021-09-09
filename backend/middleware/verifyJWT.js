const jwt = require("jsonwebtoken");
const { SECRET } = process.env;
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
                next();
            }
        })
    }
}

module.exports = verifyJWT;
