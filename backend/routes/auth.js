const express = require("express");
const router = express.Router();

const { googlelogin, logout, isUserAuthenticated } = require("../controllers/auth");
const leaderboard = require("../controllers/leaderboard");
const verifyJWT = require("../middleware/verifyJWT");

router.post('/googlelogin',googlelogin);

router.post('/logout',logout);

router.get('/isUserAuth',verifyJWT, isUserAuthenticated)

router.get('/leaderboard',leaderboard);

module.exports = router;
