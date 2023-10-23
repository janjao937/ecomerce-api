//import

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("../src/middleware/rateLimit");

//import middleware
const errorMiddleware = require("./middleware/errorMiddleware");
const notFoundMiddleware = require("./middleware/notFoundMiddleware");

//route
const authorizationRoute = require("./routes/authorizationRoute");
const productRoute = require("../src/routes/productRoute");
const cartRoute = require("../src/routes/cartRoute");
const SupplierQrPaymentRoute = require("../src/routes/SupplierQrPaymentRoute");
const orderRoute = require("../src/routes/orderRoute");


//init
const port = process.env.PORT||8000;
const app = express();

app.use(cors());
app.use(rateLimit);
app.use(express.json());
app.use(express.static("public"))

//register/login (Authorization)
app.use("/auth",authorizationRoute);
app.use("/product",productRoute);
app.use("/cart",cartRoute);
app.use("/qr",SupplierQrPaymentRoute);
app.use("/order",orderRoute);

//customer req.customer
//supplier  req.supplier


app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(port,()=>console.log("running port:"+port));