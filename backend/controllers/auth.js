const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const { GOOGLECLIENTID,  SECRET} = process.env;
const client = new OAuth2Client(`${GOOGLECLIENTID}`);
const User = require("../models/users");

exports.googlelogin = (req, res) => {

    const { tokenId } = req.body;

    client.verifyIdToken({idToken: tokenId, clientId: "690778545706-nck63lit5qofrpe4o0qs65kk7h9un14u.apps.googleusercontent.comre"})
        .then(response => {
            const { email_verified, name, email } = response.getPayload();
            if(email_verified){
                User.findOne({email}).exec((err, user) => {
                    if(err){
                        //console.log(`some error on backend`);
                        return res.status(400).json({
                            auth: false,
                            message: err
                        });
                    }else{

                        if(user){
                            console.log("user found",user);
                            // user exists in db so we send a jwt token
                            const token = jwt.sign({_id: user._id}, SECRET, { expiresIn: '7d'})
                            const { _id, name, email } = user;

                            res.json({
                                auth: true,
                                token,
                                user: {_id, name, email}
                            });

                        }else{
                            console.log("user not found creating new one");
                            // user doesn't exist so create a new user
                            let password = email + SECRET;
                            let highscore = 0;
                            let newUser = new User({name, email, password, highscore});
                            newUser.save((err, data) => {
                                if(err){
                                    console.log(err);
                                    return res.status(400).json({
                                        auth: false,
                                        message: err
                                    });
                                }

                                const token = jwt.sign({_id: data._id}, SECRET, { expiresIn: 300});
                                const { _id, name, email } = newUser;


                                const auth = true;
                                res.json({
                                    auth: true,
                                    token,
                                    user: { _id, name, email}
                                });
                            });
                            

                        }
                    }
                })
                
            }
            console.log(response.getPayload());
        });
}

exports.isUserAuthenticated = (req, res) => {
}

exports.logout = (req, res) => {

}
