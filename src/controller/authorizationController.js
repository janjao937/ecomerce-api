require("dotenv").config();
const prismaClient = require("../orm/prismaClient");
const authorizationValidator = require("../validator/authorizationValidator");
const jwt = require("jsonwebtoken");
const bcrypts = require("bcryptjs");

// model Customer{
//     id String @id @default(cuid())
//     firstName String//default varchar = 191
//     lastName String
//     userName String @unique
//     email String
//     mobile String
//     password String
//   }
const register = async(req,res,next)=>{
    try{
        const {usertype} = req.params;
        console.log(usertype)
        if(usertype=="customer")customerRegister(req,res,next);
        else if(usertype=="supplier") supplierRegister(req,res,next);
        else res.status(404).json({message:"not found this path"});
    }
    catch(error){
        next(error);
    }
        
}

const login = async(req,res,next)=>{
    try{
        // const {usertype} = req.params;
        // console.log(usertype)

        const checkUsrNameSub = await prismaClient.supplier.findFirst({
            where:{
                userName:req.body.userName
            }
        });
        const checkUserNameCus = await prismaClient.customer.findFirst({
            where:{
                userName:req.body.userName
            }
        })
        if(checkUserNameCus)customerLogin(req,res,next);
        else if(checkUsrNameSub) supplierLogin(req,res,next);
        else res.status(404).json({message:"not found this path"});

    }
    catch(error){
        next(error);
    }
}

const customerRegister= async(req,res,next)=>{
    try{
        //Validate
        const {value,error} = authorizationValidator.registerCustomerSchema.validate(req.body);
        
        if(error) return next(error);
        const checkUserName = await prismaClient.supplier.findFirst({
            where:{
                userName:value.userName
            }
        })
        console.log(checkUserName)
        if(checkUserName){
            return res.status(403).json({message:"duplicate username or password"});
        }
        //create
        value.password = await bcrypts.hash(value.password,12);
        const customer = await prismaClient.customer.create({
            data:value
        });
        //JWT
        //payload
        const payload = {customerId:customer.id};
        //accessToken
        const accessToken = jwt.sign(payload,process.JWT_SECRET_KEY ||"sdadwadwqldepofpwek",
        {expiresIn:process.env.JWT_EXPIRE});
        //Delete password
        delete customer.id;
        res.status(201).json({accessToken,customer});
        // res.status(201).json({accessToken,customer});
    }
    catch(error){
        return next(error);
    }
}

const supplierRegister= async(req,res,next)=>{
    try{
        //Validate
        const {value,error} = authorizationValidator.registerSupplierSchema.validate(req.body);
        
        if(error) return next(error);
        const checkUserName = await prismaClient.customer.findFirst({
            where:{
                userName:value.userName
            }
        })
 
        if(checkUserName){
            console.log(checkUserName)
            return res.status(403).json({message:"duplicate username or password"});
        }

        //create
        value.password = await bcrypts.hash(value.password,12);
        const supplier = await prismaClient.supplier.create({
            data:value
        });
        //JWT
        //payload
        const payload = {supplierId:supplier.id};
        //accessToken
        const accessToken = jwt.sign(payload,process.JWT_SECRET_KEY ||"sdadwadwqldepofpwek",
        {expiresIn:process.env.JWT_EXPIRE});
        //Delete password
        res.status(201).json({accessToken,supplier});
        // res.status(201).json({accessToken,customer});
    }
    catch(error){
        next(error);
    }
}

const supplierLogin = async(req,res,next)=>{
    try{
        console.log(req.params);
        const {value,error} = authorizationValidator.loginSchema.validate(req.body);
        //findFirst
        const supplier = await prismaClient.supplier.findFirst({
            where:{
                userName:value.userName
            }
        });
        const passwordCheck = await bcrypts.compare(value.password,supplier.password);
        if(!passwordCheck){
            const err = new Error("password not match");
            err.status=400;
            return next(err);
        }
        const payload = {supplierId:supplier.id};
        const accessToken = jwt.sign(payload,process.env.JWT_SECRET_KEY||"aqqewetlkgl",{expiresIn:process.env.JWT_EXPIRE} );
        delete supplier.password;
        return res.status(200).json({accessToken,supplier});

    }
    catch(error){
        next(error);
    }
}
const customerLogin= async(req,res,next)=>{
    try{
        console.log(req.params);
        const {value,error} = authorizationValidator.loginSchema.validate(req.body);
        //findFirst
        const customer = await prismaClient.customer.findFirst({
            where:{
                userName:value.userName
            }
        });
        const passwordCheck = await bcrypts.compare(value.password,customer.password);
        if(!passwordCheck){
            const err = new Error("password not match");
            err.status=400;
            return next(err);
        }
        const payload = {customerId:customer.id};
        const accessToken = jwt.sign(payload,process.env.JWT_SECRET_KEY||"aqqewetlkgl",{expiresIn:process.env.JWT_EXPIRE} );
        delete customer.password;
        return res.status(200).json({accessToken,customer});

    }
    catch(error){
        next(error);
    }
}





//send getUser In req For other middleware 
exports.getUserData = (req,res,next)=>{
    //check customer or 
    // const {usertype} = req.params;
    //     console.log(usertype)
    //     if(usertype=="customer")res.status(200).json({customer:req.customer});
    //     else if(usertype=="supplier")res.status(200).json({supplier:req.supplier});
    //     else res.status(401).json({message:"notFound"});
    // console.log(req.customer);
    
    //req.user มาจาก authenticate middleware
    res.status(200).json({user:req.user});
    
}
exports.register = register;
exports.login = login;