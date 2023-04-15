// require("../controllers/google-auth")
const {Router} = require("express")
// const passport = require("passport")
const { loginC, getAllUser, Registratisya, deleteUsers } = require("../controllers/auth.controller")
const {CheckRole} = require("../middlewares/check-role-middleware")
const {isAuth} = require("../middlewares/isAuth-middleware")
const { addUser } = require("../controllers/user.controller")

const routes = Router()

routes.post("/auth/login", loginC)
.post("/register", Registratisya)
// .get('/google',passport.authenticate('google', { scope: ['profile','email'] }))
// .get('/google/callback',passport.authenticate('google', { failureRedirect: '/get/users' }),function(req, res) { res.redirect('/')})
.post("/user",isAuth, CheckRole("superadmin"),  addUser)
.get("/get/users",isAuth,  getAllUser)

.delete("/user/:id", isAuth,CheckRole("superadmin","director"), deleteUsers)

module.exports = {routes}

// CheckRole("superadmin","director"),