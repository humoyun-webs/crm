const express = require("express")
const session = require("express-session");
require("dotenv").config()
const {routes} = require("./routes/routes.js")
const passport = require("passport")
const cors = require("cors")


const app = express();
app.use(express.json())

app.use(routes);
// app.use(passport.session()); 

// app.use(passport.initialize());


app.use(session({
    secret: process.env.GOOGLE_CLIENT_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors())

const Port = process.env.PORT || 5000;



app.listen(Port, ()=>{
console.log(`HOST CONNECTED IN ${Port}`);
})