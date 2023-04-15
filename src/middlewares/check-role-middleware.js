const { verify } = require("../utils/jwt");

const CheckRole = (role) => {
  return (req, res, next) => {
    const { user } = req
    console.log(user);

    if (role === "superadmin") {
      if (user.role === "superadmin") return next();
      else return res.status(403).json({ message: "Permission denied" });
    } else if (role === "director") {
      if (user.role === "director" || user.role === role) return next();
      else return res.status(403).json({ message: "Permission denied" });
    } else if (role === "user") {
      if (user.role === role) return next();
      else return res.status(403).json({ message: "Permission denied" });
    }else{
     return res.status(403).json({ message: "Permission denied" });
    }
  };
};
module.exports = {CheckRole};