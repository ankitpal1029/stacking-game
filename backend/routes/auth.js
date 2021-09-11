const express = require("express");
const router = express.Router();

const { googlelogin, logout, isUserAuthenticated } = require("../controllers/auth");
const verifyJWT = require("../middleware/verifyJWT");

router.post('/googlelogin',googlelogin);

router.post('/logout',logout);

router.get('/isUserAuth',verifyJWT, isUserAuthenticated)


module.exports = router;
