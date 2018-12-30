const bcrypt = require("bcryptjs");

module.exports = {
// #1
  ensureAuthenticated(req, res, next) {
    if (!req.user){
      return res.status(401).json({ error: "You must be signed in to do that." });
    } else {
      next();
    }
  },

// #2
  comparePass(userPassword, databasePassword) {
    return bcrypt.compareSync(userPassword, databasePassword);
  }
}


