const multer = require("multer");//https://www.npmjs.com/package/multer
const path = require("path");

const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        // callback(new Error(),"public")//(err,folderName)
        callback(null,"public");
    },
    filename:(req,file,callback)=>{
        console.log(file);
        // const split = file.originalname.split(".");
        // callback(null,""+Date.now()+Math.random()*1000000+"."+split[split.length-1]);//(err,fileName)//ชื่อไฟล์เป็นวัน

        callback(null,file.fieldname+"_"+Date.now()+ path.extname(file.originalname));

    }
});

const upload = multer({storage:storage});



module.exports = upload;