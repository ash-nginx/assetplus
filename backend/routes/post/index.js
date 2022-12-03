const Post = require("../../models/Post");
const router = require("express").Router();
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination:'../frontend/src/images',
    filename:(req,file,cb)=>{cb(null,file.originalname)}
})

const upload = multer({storage
    , limits: {
        fileSize: 1000000 // 1000000 Bytes = 1 MB
      },
    //   fileFilter(req, file, cb) {
    //     if (!file.originalname.match(/\.(png|jpg)$/)) { 
    //        return cb(new Error('Please upload a Image'))
    //      }
    //    cb(undefined, true)
    // }
});

// @AssetPlus: This is a sample get request
router.get("/", async (_, res) => {
    // await Post.deleteMany({});
     await Post.find().then(content=>res.json(content).status(200)).catch(err=>res.status(400).send(`Error : ${err}`));
});


// @AssetPlus: Add other routes here
router.post("/add",upload.single("poster"),async(req,res)=>{
    const  { title, description } =  req.body;
    const poster = req.file;
    const post = new Post({title,description,poster:poster.originalname});
    await post.save().then(()=>res.json("Added New Content")).catch(err=>res.status(400).send(`Error : ${err}`))
    return post;
})

router.delete("/delete/:_id",async(req,res)=>{
    const {_id} = req.params;
    return await Post.deleteOne({_id:_id+""}).then(res=>console.log({res})).catch(err=>console.log({err}));
})

module.exports = router;