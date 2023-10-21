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

//post
const CreateCartItems=async(req,res,next)=>{
    try{
        await prismaClient.cart.create({
            data:{
                amount:1,
                isOrderStatus,
                // productId://1 productId
                // customerId//2 req.user

            }
        })
    }
    catch(error){

    }
}
//patch
const IncreseAmount=async(req,res,next)=>{
    try{

    }
    catch(error){

    }
}
//patch
const DecreseAmount=async(req,res,next)=>{
    try{

    }
    catch(error){

    }
}
//delete
const DeleteItem = async(req,res,next)=>{
    try{

    }
    catch(error){
        
    }
}
//delete
const DeletCartItemByCustomerId = async(req,res,next)=>{
    try{

    }
    catch(error){
        next(error);
    }
}

exports.CreateCartItems = CreateCartItems;//post
exports.DeleteItem = DeleteItem;//delete
exports.DeletCartItemByCustomerId = DeletCartItemByCustomerId;
exports.IncreseAmount = IncreseAmount;//patch
exports.DecreseAmount = DecreseAmount;//patch

