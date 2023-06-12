require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/users");
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:1234/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      const newuser = await User.googleby(
        { id: profile.id },
        { name: profile._json.name },
        { email: profile._json.email },
        function (err, user) {
          return cb(err, user);
        }
      );
      console.log(cb);
      cb(null, profile);
    }
  )
);