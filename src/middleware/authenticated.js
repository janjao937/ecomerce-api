require("dotenv");
// const createError = require("../utils/create-error");
const jwt = require("jsonwebtoken");
const prismaClient = require("../orm/prismaClient");

module.exports = async(req,res,next)=>{
    try{
        const authorization = req.headers.authorization;
        if(!authorization||!authorization.startsWith("Bearer ")){
            return next(new Error("create error"));//send ro error middleware
        }
        const token = authorization.split("Bearer ")[1];//split("Bearer ")return ["",token] or split(" ") return ["Bearer",token]
        
        //jwt verify token
        const payload = jwt.verify(token,process.env.JWT_SECRET_KEY||"asdadfv");
        let user = null
        if( payload.customerId){
            user= await prismaClient.customer.findFirst({
                where:{
                    id:payload.customerId
                }
            });
        }
        if(payload.supplierId){
           user = await prismaClient.supplier.findFirst({
                where:{
                    id:payload.supplierId
                }
            });
        }
        // const user = payload.customerId||payload.supplierId;
        // console.log(payload.supplierId)

        if(!user){
            return next(createError("unauthenticated",401));
        }
        delete user.password;
        req.user = user;//add user in middleware
        
        next();
    }
    catch(err){ 
        if(err.name ==="TokenExpiredError"||err.name ==="JsonWebTokenError")//check error 401 jwt:TokenExpiredError,JsonWebTokenError
        {
            err.statusCode=401;
        }
    }
}