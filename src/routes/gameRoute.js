const express = require("express");
const authenticate = require("../middleware/authenticated");
const gameRoute = require("../controller/gameController");
const router = express.Router();

/* path 

/game/create
/game/update
/game/leaderboard
*/

//middleware
router.get("/leaderboard",authenticate,gameRoute.CreateGameData);
router.post("/create",authenticate,gameRoute.CreateGameData);
router.patch("/update",authenticate,gameRoute.CreateGameData);



module.exports = router;