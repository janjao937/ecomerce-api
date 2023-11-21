const express = require("express");
const authenticate = require("../middleware/authenticated");
const uploadMiddleware = require("../middleware/uploadMiddleware");
const orderController = require("../controller/orderController");
const router= express.Router();

router.delete("/delete/:orderId",orderController.deleteOrder);
router.patch("/delivery",orderController.updateDeliveryStatus);//updateDelivery

router.post("/create",authenticate,uploadMiddleware.single("image"),orderController.createOrder);
router.patch("/update",authenticate,orderController.updateOrder);

router.get("/",authenticate,orderController.getOrderItemByIsOrderStatusAtCart);
router.get("/supplier",authenticate,orderController.supplierGetOrder);



module.exports = router;