const express = require("express")
require("dotenv").config()
const {routes} = require("./routes/routes.js")
const passport = require("passport")

const app = express();

app.use(express.json())
// app.use(express.urlencoded({extended:false}))
app.use(routes)
app.use(passport.initialize())



const Port = process.env.PORT || 5000;

app.listen(Port, ()=>{
console.log(`HOST CONNECTED IN ${Port}`);
})