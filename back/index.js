const express=require("express")
const app = express();
const cors=require('cors')
const database=require("./config/database")
const mongoose=require('mongoose')
const cookieParser=require('cookie-parser')
const multer  = require('multer')
const userRoutes = require('./routes/route');
const errorMiddleware = require("./middleware/error-middleware");
const { ImageModel } = require("./models/image-model");

// port connection
const path=require("path")
const dotenv=require("dotenv");

dotenv.config();
const PORT=process.env.PORT || 5000;

//database connect
database.connect();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"))
app.use(cookieParser())

// cors
app.use(cors({
	origin:"http://localhost:3000" || "https://6852bca233ae8b0144577c59--rad-travesseiro-d5b35b.netlify.app/",
	
	methods:["GET","POST","PUT","DELETE","PATCH"],
	allowedHeaders:["Content-Type","Authorization"],
	credentials:true,
}));
//app.options('*', cors());
//default route
app.get("/", (req, res) => {
    console.log(req)
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

// Routes
app.use(errorMiddleware);
app.use('/api', userRoutes);


// multer 
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  cb(null, './uploads')
	},
	filename: function (req, file, cb) {
	  cb(null, Date.now()+"-"+file.originalname)
	}
  })
  const upload = multer({ storage })
  app.post("/single", upload.single("image"), async (req, res) => {
	try {
		const { path, filename } = req.file;
		const image = new ImageModel({ path, filename });
		await image.save();
		res.send({ "msg": "Image Uploaded" });
	} catch (err) {
		res.send({ "error": "Unable to upload image" });
	}
  });

  app.get("/img/:id",async(req,res)=>{
	const {id}=req.params
	try{
		const image=await ImageModel.findById(id)
		if(!image) res.send({"msg":"Image not found"})
		const imagepath=path.join(__dirname,"uploads",img.filename)
	    res.sendFile(imagepath)
	} catch(err){
		res.send({"error":"unable to get image"})
	}
  })
// port connection
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})