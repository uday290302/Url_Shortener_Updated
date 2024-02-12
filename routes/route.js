const express = require("express");

const router = express.Router();

const {
  handleGenerateNewShortURL,
  redirectandanalytics,
} = require("../controllers/url");
const shortUrl = require("../models/url");
const USER = require("../models/user");


router.get("/", async(req,res)=>{
  // const  
    const shortUrls =await shortUrl.find({ createdBy: req.user._id });
    const Users = req.user.name;
   console.log(Users)
res.render('index', { shortUrls: shortUrls  ,Users:Users})
});





try{
    router.post("/", handleGenerateNewShortURL);

}catch(err){
console.log(err)
}

router.get("/:shortId",redirectandanalytics );

module.exports = router;
