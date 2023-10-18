const express = require("express");
const useProductController = require("../controller/productSaleController");
const authenticate = require("../middleware/authenticated");
const router= express.Router();

//middleware
//useProductController

//#region 
//(/product/add)
//(/product/remove)
//(/product/update)
//(/product/delete)
//#endregion


router.post("/add",authenticate,useProductController.CreateProduct);
router.delete("/remove/:productId",authenticate,useProductController.DeleteProduct);
router.patch("/update/:productId",authenticate,useProductController.EditProductData);
router.get("/:productId",useProductController.GetProductById);


module.exports = router;