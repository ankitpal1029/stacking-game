const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client("690778545706-nck63lit5qofrpe4o0qs65kk7h9un14u.apps.googleusercontent.com");

exports.googlelogin = (req, res) => {
    const { tokenId } = req.body;
    client.verifyIdToken({idToken: tokenId, clientId: "690778545706-nck63lit5qofrpe4o0qs65kk7h9un14u.apps.googleusercontent.comre"})
        .then(response => {
            const { email_verified, name, email } = response.getPayload();
            console.log(response.getPayload());
        });
    console.log();
}
