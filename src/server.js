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

//init
const port = process.env.PORT||8000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimit);

//register/login (Authorization)
app.use("/auth",authorizationRoute);
app.use("/product",productRoute);


//customer req.customer
//supplier  req.supplier


app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(port,()=>console.log("running port:"+port));