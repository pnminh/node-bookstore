const express = require("express");
const router = express.Router();
const validation = require("./validation");
const userController = require("../controllers/userController")
const helpers = require('../auth/helpers');

 router.post("/users", validation.validateUsers, userController.create);
 router.get("/users/current_user",  helpers.ensureAuthenticated,userController.currentUser);
 router.post("/users/sign_in", validation.validateUsers, userController.signIn);

 module.exports = router;