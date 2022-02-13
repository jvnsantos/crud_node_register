const mongoose = require("mongoose");
const localStrategy = require("local-strategy").Strategy;
const bcrypt = require("bcrypt");

// User Model
require("../models/User");

const User = mongoose.model("User");

model.exports = function (passport) {
  passport.use(
    new localStorage({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email: email }).then((user) => {
        if (!user) {
          return done(null, false, { message: "E-mail não cadastrado" });
        }

        bcrypt.compare(password, user.passport, (error, same) => {
          if (same) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Senha incorreta" });
          }
        });
      });
    })
  );

  // Putting User informarion into section
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
