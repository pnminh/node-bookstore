const userQueries = require("../db/queries.users.js");
const passport = require("passport");

module.exports = {


  create(req, res, next) {
    let newUser = {
      email: req.body.email,
      password: req.body.password,
      passwordConfirmation: req.body.passwordConfirmation
    };
    userQueries.createUser(newUser, (err, user) => {
      if (err) {
        res.status(500).json({ "error": err.errors[0].message})
      } else {
        passport.authenticate("local")(req, res, () => {
          res.json(user);
        })
      }
    });
  },
  currentUser(req,res,next){
    res.status(200).json({user:{email:req.user.email,id:req.user.id}});
  },
  signIn(req, res, next) {
    passport.authenticate("local")(req, res, function () {
      if (!req.user) {
        /* req.flash("notice", "Sign in failed. Please try again.")
        res.redirect("/users/sign_in"); */
        res.status(401).json({error:"Sign in failed. Please try again."});
      } else {
        /* req.flash("notice", "You've successfully signed in!");
        res.redirect("/"); */
        res.status(200).json({user:{email:req.user.email,id:req.user.id}})
      }
    })
  },

  signOut(req, res, next) {
    req.logout();
    /* req.flash("notice", "You've successfully signed out!");
    res.redirect("/"); */
    res.status(200).json({message: "You've successfully signed out!"})
  },




}