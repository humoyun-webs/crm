const { Router } = require("express");
const passport = require("passport");
const {
    loginC,
    Registratisya,
    
} = require("../controllers/auth.controller");
require("../controllers/google-auth");
const { CheckRole } = require("../middlewares/check-role-middleware");
const { isAuth } = require("../middlewares/isAuth-middleware");
const { addUser,deleteUsers,  getAllUser } = require("../controllers/for_admin");
const {
  addplan,
  getplans,
  editplan,
  deleteplan,
} = require("../controllers/defaultuser");

const routes = Router();
routes
  .post("/auth/login", loginC)
  .post("/register", Registratisya)

  .get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  )
  .get(
    "/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/register",
      successRedirect: "/get/users",
    })
  )
  
  .post("/user", isAuth, CheckRole("superadmin"), addUser)
  .get("/get/users", isAuth, getAllUser)
  .delete("/user/:id", isAuth, CheckRole("superadmin", "director"), deleteUsers)
  // default user --------------------------------  --------------------------------  --------------------------------  
  .get("/def/user", isAuth,  getplans)
  .post("/def/user", isAuth, addplan)
  .put("/def/user/:id", isAuth, editplan)
  .delete("/def/user/:id", isAuth, deleteplan);

module.exports = { routes };