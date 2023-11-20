const prismaClient = require("../orm/prismaClient");

// id Int @id @default(autoincrement())
// createdAt DateTime @default(now())
// customerSlipImg String?
// deliveryStatus Int   //0 1
// adress String
// cartId Int
// cart Cart @relation(fields: [cartId],references: [id],onDelete: Cascade)

// path /create
const createOrder = async(req,res,next)=>{
    try{
        // const {body} = JSON.parse(req.body);
        // console.log(req.body)
        const cartId = +req.body.cartId;
        const adress = req.body.adress;
        const img = req.file.filename;
  
        const newOrder = await prismaClient.order.create({
            data:{
                adress:adress,
                cartId:cartId,
                deliveryStatus:0,
                customerSlipImg:img
            }
        });

        //update isOrderStatus = 1 by cartId
        await prismaClient.cart.update({
            where:{
                id:cartId
            },
            data:{
                isOrderStatus:1//update cartStatus
            }
        });

        res.status(200).json({message:"create payment Complete",newOrder});

    }
    catch(error){
        next(error);
    }
}
//path get
const getOrderItemByIsOrderStatusAtCart = async(req,res,next)=>{
    try{
        const customerId=req.user.id;
        //res คือ cart ที่ isOrderStatus = 1
        //res:product,cart
        const allOrder = await prismaClient.cart.findMany({
            where:{
                customerId:customerId,
                isOrderStatus:1
            },
            include:{
                product:{
                    select:{
                        price:true,
                        name:true,
                        img:true
                    }
                },
                order:true
            }
        });
       
        
        res.status(200).json({message:"success",allOrder});
    }
    catch(error){
        next(error);
    }

}

// get/supplier
const supplierGetOrder = async(req,res,next)=>{
    try{
        const supplierId = req.user.id;
    
        const allSupplierProduct= await prismaClient.product.findMany({
            where:{
                supplierId:supplierId
            },
            include:{
                cart:{
                    include:{
                        order:{
                            select:{
                                id:true
                            }
                        }
                    }
                }
            }
        });
        // // allSupplierProduct.cart.cartId
     
        // const allBuy = await prismaClient.order.findMany({
        //     where:{
        //         OR:[
        //             {
        //                 cartId:{
        //                     contains:5
        //                 }
        //             }
        //         ]
        //     }
        // })
        res.status(200).json({message:"supplier order",allSupplierProduct})

    }
    catch(error){
        console.log(error);
    }

}

// path /update
const updateOrder = async(req,res,next) =>{
    try{

    }
    catch(error){
        next(error);
    }
}

exports.createOrder = createOrder;
exports.updateOrder = updateOrder;
exports.getOrderItemByIsOrderStatusAtCart = getOrderItemByIsOrderStatusAtCart;
exports.supplierGetOrder = supplierGetOrder;
