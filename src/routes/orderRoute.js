const express = require("express");
const authenticate = require("../middleware/authenticated");
const uploadMiddleware = require("../middleware/uploadMiddleware");
const orderController = require("../controller/orderController");
const router= express.Router();

// path order

router.post("/create",authenticate,uploadMiddleware.single("image"),orderController.createOrder);
router.patch("/update",authenticate,orderController.updateOrder);
router.get("/",authenticate,orderController.getOrderItemByIsOrderStatusAtCart);



module.exports = router; 