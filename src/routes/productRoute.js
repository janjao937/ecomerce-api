const express = require("express");
const useProductController = require("../controller/productSaleController");
const authenticate = require("../middleware/authenticated");
const uploadMiddleware = require("../middleware/uploadMiddleware");


const router= express.Router();

//middleware
//useProductController

//#region 
//(/product/add)
//(/product/remove)
//(/product/update)
//(/product/delete)
//#endregion


router.post("/add",authenticate,uploadMiddleware.single("image"),useProductController.CreateProduct);
router.get("/home",authenticate,useProductController.GetAllProduct);//get some product

router.get("/supplier",authenticate,useProductController.GetProductBySupplierId);

router.get("/:productId",useProductController.GetProductById);

// router.post("/add",authenticate,useProductController.CreateProduct);
router.delete("/remove/:productId",authenticate,useProductController.DeleteProduct);
router.patch("/update/:productId",authenticate,useProductController.EditProductData);


module.exports = router;