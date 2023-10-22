const prismaClient = require("../orm/prismaClient");

// paymentQrImg String?

const uploadQR=async(req,res,next)=>{
    try{
        const img = req.file.filename;
        const supplierId  = req.user.id;

        const qrUpload = await prismaClient.supplier.update({
            where:{
                id:supplierId
            },
            data:{
                paymentQrImg:img
            }
        });

        res.status(200).json({message:"update Complete",qrUpload});
    }
    catch(error){
        next(error)
    }
}
const getQR = async(req,res,next)=>{
    try{
        const supplierId = req.user.id;
        const paymentQrImg = await prismaClient.supplier.findFirst({
            where:{
                id:supplierId
            },
            select:{
                paymentQrImg:true
            }
        });

        res.status(200).json({message:"get success",paymentQrImg});

    }
    catch(error){
        next(error)
    }
}

exports.uploadQR = uploadQR;
exports.getQR = getQR;

