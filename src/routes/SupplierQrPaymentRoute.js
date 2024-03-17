const express = require("express");
const authenticate = require("../middleware/authenticated");
const uploadMiddleware = require("../middleware/uploadMiddleware");
const SupplierQrPaymentController = require("../controller/SupplierQrPaymentController");

const router = express.Router();

//middleware
//path: /qr

router.patch("/upload",authenticate,uploadMiddleware.single("image"),SupplierQrPaymentController.uploadQR);//"image ต้องเป็นชื่อไฟล์ที่ตรงกับหน้าบ้าน append มาจาก FormData"
router.get("/get",authenticate,SupplierQrPaymentController.getQR);


module.exports = router;