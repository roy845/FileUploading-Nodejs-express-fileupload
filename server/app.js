const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require('cors');
const path = require('path');
const corsOptions = require('./config/corsOptions');
const filesPayloadExists = require('./middleware/filesPayloadExists');
const fileExtLimiter = require('./middleware/fileExtLimiter');
const fileSizeLimiter = require('./middleware/fileSizeLimiter');


const PORT = process.env.PORT || 3500;

const app = express();

app.use(cors(corsOptions));

app.post('/upload',
    fileUpload({createParentPath:true}),
    filesPayloadExists,
    fileExtLimiter(['.png','.jpg','.jpeg']),
    fileSizeLimiter,
    (req,res)=>{
        const files = req.files;
        console.log(files);

        Object.keys(files).forEach(key=>{
            const filePath = path.join(__dirname,'files',files[key].name);
            files[key].mv(filePath,(err)=>{
                if(err)
                    return res.status(500).json({status:"error",message:err});
            })
        })

        return res.json({status:'success',message:Object.keys(files).toString()});
    }
)







app.listen(PORT,()=> console.log(`Server running on port ${PORT}`));