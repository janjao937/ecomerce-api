const express = require("express");
const cartRoute = require("../controller/cartController");
const authenticate = require("../middleware/authenticated");
const router= express.Router();

//routePath :"/cart"

//middleware
//useCartController

router.post("/add-item",authenticate,cartRoute.CreateOrUpdateCartItem);//new add and Create item in cart

router.post("/create",authenticate,cartRoute.CreateCartItems);
router.patch("/add",authenticate,cartRoute.IncreseAmount);

router.delete("/delete/:productId",authenticate,cartRoute.DeleteItem);
router.patch("/remove",authenticate,cartRoute.DecreseAmount);
router.get("/",authenticate,cartRoute.GetCartByCustomerId);



module.exports = router;