const prismaClient = require("../orm/prismaClient");

/*
model Cart{
  id Int @id @default(autoincrement())
  amount Int 
  isOrderStatus Int //0/1
  productId Int
  product Product @relation(fields: [productId],references: [id],onDelete: Cascade)
  customerId String
  customer Customer @relation(fields: [customerId],references: [id],onDelete: Cascade)
}
*/

// const newProduct = await prismaClient.product.create({
//     data: {
//         supplierId: supplierId,
//         name: productData.name,
//         title: productData.title,
//         price: +productData.price,
//         img: img,
//         amount: +productData.amount
//     },
//     include: {
//         supplier: {
//             select: {
//                 id: true,
//                 shopName: true
//             }
//         }
//     }
// });


//get
const GetCartByCustomerId = async(req,res,next)=>{
    try{
        // const productId = req.body.productId;
        const customerId = req.user.id;
        const userCartData = await prismaClient.cart.findMany({
            where:{
                customerId:customerId,
                isOrderStatus:0
            },
            include:{
                product:{
                    include:{
                        supplier:{
                            select:{
                                shopName:true,
                                paymentQrImg:true
                                
                            }
                          
                        }
                    }
                }
            }
        });




        res.status(200).json({message:"success",userCartData});


    }
    catch(error){
        next(error);
    }
}
//post
const CreateCartItems=async(req,res,next)=>{
    try{
        const productId = +req.body.productId;//req:productId
        const customerId = req.user.id;
        
        // console.log(customerId);
        const product = await prismaClient.product.findFirst({
            where:{
                id:productId
            }
        });

        if(!product){
            const err = new Error("dont have this product");
            err.status = 404;
            return next(err);
        }

        const cartItem = await prismaClient.cart.create({
            data:{
                amount:1,
                isOrderStatus:0,
                customerId:customerId,
                productId:productId
            }
        });

        res.status(201).json({message:"create cartItem",cartItem});//res:cartItem
        
    }
    catch(error){
        next(error);
    }
}

//patch
const IncreseAmount=async(req,res,next)=>{
    try{
        const productId = +req.body.productId;//req:productId
        const customerId = req.user.id;

        const cartItem = await prismaClient.cart.findFirst({
            where:{
                productId:productId,
                customerId:customerId,
            }
        });

        
        if(!cartItem){
            const err = new Error("you must create cart");
            err.status = 404;
            return next(err);
        }
        // console.log(cartItem.amount)
        const updateCart =await prismaClient.cart.update({
            where:{
                id:cartItem.id
            },
            data:{
                amount:++cartItem.amount
            }
        });
        
        res.status(200).json({message:"success",updateCart});//res:updateCart

    }
    catch(error){
        next(error);
    }
}
//patch
const DecreseAmount=async(req,res,next)=>{
    try{
        const productId = +req.body.productId;//req:productId
        const customerId = req.user.id;

        const cartItem = await prismaClient.cart.findFirst({
            where:{
                productId:productId,
                customerId:customerId
            }
        });

        
        if(!cartItem){
            const err = new Error("you must create cart");
            err.status = 404;
            return next(err);
        }
        // console.log(cartItem.amount)
        const updateCart =await prismaClient.cart.update({
            where:{
                id:cartItem.id
            },
            data:{
                amount:--cartItem.amount
            }
        });
        
        res.status(200).json({message:"success",updateCart});//res:updateCart

    }
    catch(error){
        next(error)

    }
}
//delete
//"/delete"
const DeleteItem = async(req,res,next)=>{
    try{
        // const productId = +req.body.productId; //req:productId
        const productId = +req.params.productId;
        const customerId = req.user.id;
        console.log(productId);
        const cartItem = await prismaClient.cart.findFirst({
            where:{
                productId:productId,
                customerId:customerId
            }
        });
        console.log(cartItem);

        if(!cartItem){
            const err = new Error("dont have this product in cart");
            err.status = 404;
            return next(err);
        }
        const deleteItem = await prismaClient.cart.delete({
            where:{
                id:cartItem.id,
                customerId:customerId
            }
        });
        
        res.status(200).json({message:"delete complete",deleteItem});
        
    }
    catch(error){
        next(error)
        
    }
}

//update code in 11/20

//new add item
const AddItemInCart = async(cartItem,res,next) =>{
    try{
        
        if(!cartItem){
            const err = new Error("you must create cart");
            err.status = 404;
            return next(err);
        }
        const updateCart =await prismaClient.cart.update({
            where:{
                id:cartItem.id,
                isOrderStatus:cartItem.isOrderStatus
            },
            data:{
                amount:++cartItem.amount
            }
        });
        
        res.status(200).json({message:"success",updateCart});//res:updateCart


    }
    catch(error){
        return next(error);
    }
}

//AddCartItem
const CreateOrUpdateCartItem = async(req,res,next)=>{
    try{
        const productId = +req.body.productId;//req:productId
        const customerId = req.user.id;
        
        const product = await prismaClient.product.findFirst({
            where:{
                id:productId
            }
        });

        if(!product){
            const err = new Error("dont have this product");
            err.status = 404;
            return next(err);
        }
        const checkItemInCart = await prismaClient.cart.findFirst({
            where:{
                productId:productId,
                customerId:customerId,
                isOrderStatus:0,
            }
        });

        if(checkItemInCart){
            // console.log(checkItemInCart)
            return AddItemInCart(checkItemInCart,res,next);
        }

        const cartItem = await prismaClient.cart.create({
            data:{
                amount:1,
                isOrderStatus:0,
                customerId:customerId,
                productId:productId
            }
        });

        res.status(201).json({message:"create cartItem",cartItem});//res:cartItem
        
    }
    catch(error){
        next(error);
    }
}

// add/update cartItem
exports.CreateCartItems = CreateCartItems;//post  
exports.DeleteItem = DeleteItem;//delete

// exports.DeletCartItemByCustomerId = DeletCartItemByCustomerId;
exports.IncreseAmount = IncreseAmount;//patch
exports.DecreseAmount = DecreseAmount;//patch
exports.GetCartByCustomerId = GetCartByCustomerId;//get
exports.CreateOrUpdateCartItem = CreateOrUpdateCartItem;

