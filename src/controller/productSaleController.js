const productValidator = require("../validator/productValidator");
const prismaClient = require("../orm/prismaClient");
// model Product{
//     id Int @id @default(autoincrement())
//     name String 
//     title String
//     price Int
//     img String
//     supplierId String
//     supplier Supplier @relation(fields: [supplierId],references: [id],onDelete: Cascade)
//     // productImg ProductImg[]
//     cart Cart[]
//   }

//Supplier Add/Remove/Delete
const CreateProduct = async (req, res, next) => {
    //create col product
    try {
        const productData = req.body;//{name,title,price,img,amount} //from front
        const supplierId = req.user.id;

        console.log(productData)
        //check data
        //{name,title,price,img,supplierId,amount}
        const newProduct = await prismaClient.product.create({
            data: {
                supplierId: supplierId,
                name: productData.name,
                title: productData.title,
                price: productData.price,
                img: productData.img,
                amount: productData.amount
            },
            include: {
                supplier: {
                    select: {
                        id: true,
                        shopName: true
                    }
                }
            }
        });
        // {
        //     id: 1,
        //     name: 'doooBia',
        //     title: 'titleeeeeeeeee',
        //     amount: 20,
        //     price: 200,
        //     img: 'productData.img',
        //     supplierId: 'clnt00ivx0000v78sk7aoxtia',
        //     supplier: { id: 'clnt00ivx0000v78sk7aoxtia', shopName: 'woodie' }
        //   }

        console.log(newProduct);

        res.status(201).json({ message: "Product Create", newProduct })

    }
    catch (error) {
        next(error);
    }

}

const DeleteProduct = async (req, res, next) => {

    try//delete in product table
    {
        const productId = +req.params.productId;
        console.log(productId)
        const { value, error } = productValidator.checkProductIdSchema.validate({ productId });//validate product 

        if (error) {
            return next(error);
        }

        console.log(value);
        const deleteProduct = await prismaClient.product.findFirst({
            where: {
                id: value.id
            }
        });
        await prismaClient.product.delete({
            where: {
                id: deleteProduct.id
            }
        });
        res.status(200).json({ message: "Delete Complete" })
    }
    catch (error) {
        next(error);
    }

}

//Edit
//name/price/title/img
// const editProduct = {
//     id Int 
//     name String 
//     title String
//     price Int    
//     img String
//}

// product/update/:productId
const EditProductData = async (req, res, next) => {
    try {
        // const editProp = req.params.editProp;
        const productId = +req.params.productId;
        const { value, error } = productValidator.checkProductIdSchema.validate({ productId });
        const updateData = req.body;//{name,title,price,img,amount}

        if (error) {
            return next(error);
        }

        const editProductData = await prismaClient.product.findFirst({
            where: {
                id: value.productId
            }
        });

        if (!editProductData) {
            const err = new Error("invalid product");
            err.status = 404;
            return next(err);
        }

        const updateObj = await prismaClient.product.update({
            data: {
                name: updateData.name,
                title: updateData.title,
                price: updateData.price,
                img: updateData.img,
                amount: updateData.amount
            },
            where: {
                id: value.productId
            }
        });

        // console.log(productId);
        // console.log(editProductData);
        // console.log(editProductData["name"]);

        // console.log(editProductData.name);
        res.status(200).json({ message: "editComplete", updateObj })
    }
    catch (error) {
        next(error);
    }
}

const GetProductById = async (req,res,next)=>{
    try{
        const productId = +req.params.productId;
        const { value, error } = productValidator.checkProductIdSchema.validate({ productId });
        if (error) {
            return next(error);
        }

        const productData = await prismaClient.product.findFirst({
            where: {
                id: value.productId
            }
        });
        if (!productData) {
            const err = new Error("product not found");
            err.status = 404;
            return next(err);
        }
        

        res.status(200).json({productData})
    }
    catch(error){
        next(error);
    }
} 

exports.CreateProduct = CreateProduct;
exports.EditProductData = EditProductData;
exports.DeleteProduct = DeleteProduct;
exports.GetProductById = GetProductById;