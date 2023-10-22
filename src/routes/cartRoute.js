const express = require("express");
const cartRoute = require("../controller/cartController");
const authenticate = require("../middleware/authenticated");
const router= express.Router();

//routePath :"/cart"

//middleware
//useCartController

router.post("/create",authenticate,cartRoute.CreateCartItems);
router.delete("/delete",authenticate,cartRoute.DeleteItem);
router.patch("/add",authenticate,cartRoute.IncreseAmount);
router.patch("/remove",authenticate,cartRoute.DecreseAmount);



module.exports = router;