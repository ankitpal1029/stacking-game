const express = require("express");
const router = express.Router();

const highscore = require("../controllers/highscore");
const leaderboard = require("../controllers/leaderboard");

router.get('/leaderboard',leaderboard);
router.post('/update_high_score',highscore);

module.exports = router;
