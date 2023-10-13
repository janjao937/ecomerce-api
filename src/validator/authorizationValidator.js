const Joi = require("joi");
// model Customer{
//     id String @id @default(cuid())
//     firstName String//default varchar = 191
//     lastName String
//     userName String @unique
//     email String
//     mobile String
//     password String
//   }


// model Supplier{
//     id String @id @default(cuid())
//     firstName String
//     lastName String
//     userName String @unique
//     shopName String @unique
//     shopImage String?
//     // paymentQrImg String  after "Test" login/register 
//     email String
//     mobile String
//     password String
//   }
  
const registerCustomerSchema = Joi.object(
    {
        firstName: Joi.string().trim().required(),
        lastName: Joi.string().trim().required(),
        userName: Joi.string().trim().required(),
        // userName: Joi.string().pattern(/^[a-z0-9]{6,10}$/).trim().required(),
        password: Joi.string().pattern(/^[a-zA-Z0-9]{6,30}$/).trim().required(),
        email: Joi.string().email().required(),
        mobile: Joi.string().pattern(/^[0-9]{10}$/).required()
    }
);
const registerSupplierSchema=Joi.object(
    {
        firstName: Joi.string().trim().required(),
        lastName: Joi.string().trim().required(),
        userName: Joi.string().trim().required(),
        shopName:Joi.string().required(),
        // userName: Joi.string().pattern(/^[a-z0-9]{6,10}$/).trim().required(),
        password: Joi.string().pattern(/^[a-zA-Z0-9]{6,30}$/).trim().required(),
        email: Joi.string().email().required(),
        mobile: Joi.string().pattern(/^[0-9]{10}$/).required()
    }
)

const loginSchema = Joi.object({
    userName:Joi.string().required(),
    password:Joi.string().required()
});

exports.loginSchema = loginSchema;
exports.registerCustomerSchema = registerCustomerSchema;
exports.registerSupplierSchema = registerSupplierSchema;