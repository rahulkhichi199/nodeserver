const express = require('express')
var request = require("request");
var cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const multer = require('multer');
const fs = require("fs");
const {promisify} = require("util");
const pipeline = promisify(require("stream").pipeline);
const app = express()

const port = 5000


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());


app.use(
    cors({
origin: 'http://localhost:3000',
credentials:true,
})
);
app.use(bodyParser.json());//add this line

app.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
     });


const upload =multer();
app.post("/upload",upload.single("file"),async function(req,res,next){

const{file,body:{name}}=req;
if(file.detectedFileExtension!=".jpg")next(new Error("invalid file type"));

const filename = name + Math.floor(math.random()*1000) + file.detectedFileExtension;
await pipeline(file.stream,fs.createWriteStream(`${__dirname}/./public/images/${filename}`))

res.send("file uploaded as" + filename)
});




let NFTs = [];

app.post('/createnft',function(req,res){
    const newNFT = {
        NFTname: req.body.NFTname,
        Title: req.body.Title,
        Amount: req.body.Amount,
        AssetID: req.body.AssetID,
        Tags: req.body.Tags,
        Creatorname: req.body.Creatorname,
    };
    NFTs.push(newNFT);
    console.log(NFTs);
});


app.get('/nft', function(req, res){
  console.log('nft data');
  res.writeHead(200,{
      'Content-Type': 'application/json',
  });
  console.log('NFTs :',JSON.stringify(NFTs));
  res.end(JSON.stringify(NFTs));
});


// app.get('/nft', (req, res) => {
//     request(
//         "http://localhost:3000",
//         function(error,response,body){
//             if(!error && response.statusCode ==200){
//                 var parsedBody =JSON.parse(body);
//                 var NFTname = parsedBody["current"]["NFTname"];
//                 var Title = parsedBody["current"]["Title"];
//                 var Amount = parsedBody["current"]["Amount"];
//                 res.send({NFTname,Title,Amount});
//             }
//         }
//     )
//   });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

