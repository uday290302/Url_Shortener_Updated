const {
  handleGenerateNewShortURL,
  redirectandanalytics,
} = require("../controllers/url");

const express = require("express");
const router = express.Router();

router.get('/',(req,res)=>{
    res.render('signin')
})


router.get('/signup',(req,res)=>{
    res.render('signup')
})

router.get("/:shortId",redirectandanalytics );

module.exports=router;
