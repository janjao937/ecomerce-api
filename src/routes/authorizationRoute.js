const express = require("express");
const route = express.Router();
const authorizationController = require("../controller/authorizationController");

//middleware
//usertype : customer / supplier
route.post("/register/:usertype",authorizationController.register);
route.post("/login",authorizationController.login);
// route.post("/login/:usertype",authorizationController.supplierLogin);

route.get("/customer/m:usertype",authorizationController.getUserData)



module.exports = route;