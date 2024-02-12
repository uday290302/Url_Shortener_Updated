const express = require("express");
const  connectDB= require("./connect");
//  const urlRoute = require("./routes/url");
const urlRoute = require("./routes/route");
const staticRoute = require("./routes/staticroutes");
const userRoute = require("./routes/user");
const cookieParser = require("cookie-parser")
const {restrictToLoggedUserOnly,checkAuth} = require("./middlewares/auth")

const URL = require("./models/url");
const  dotenv = require('dotenv')
const path = require('path')
const app = express();
dotenv.config(path.join(__dirname,'.env'))
connectDB()

app.set("view engine", "ejs")

app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(express.json());
app.use('/url', restrictToLoggedUserOnly ,urlRoute)
app.use('/',staticRoute)
app.use('/user', userRoute)




app.listen(process.env.PORT, () => console.log(`Server Started at PORT:${process.env.PORT}`));
